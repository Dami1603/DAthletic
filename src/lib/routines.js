import { useCallback, useMemo } from "react";
import { baseRoutines } from "../data/routines.js";
import { KEYS, usePersistentState } from "./storage.js";

// ---------- Catálogos ----------

export const GOALS = [
  { id: "hipertrofia", label: "Hipertrofia" },
  { id: "fuerza", label: "Fuerza" },
];
export const LEVELS = [
  { id: "principiante", label: "Principiante", hint: "menos de 6 meses" },
  { id: "intermedio", label: "Intermedio", hint: "6 meses a 2 años" },
  { id: "avanzado", label: "Avanzado", hint: "más de 2 años" },
];
export const AGES = [
  { id: "18-39", label: "18–39 años" },
  { id: "40-59", label: "40–59 años" },
  { id: "60+", label: "60+ años" },
];
/** Lunes = 0 … domingo = 6. */
export const WEEKDAYS = [
  { short: "L", label: "Lunes" },
  { short: "M", label: "Martes" },
  { short: "X", label: "Miércoles" },
  { short: "J", label: "Jueves" },
  { short: "V", label: "Viernes" },
  { short: "S", label: "Sábado" },
  { short: "D", label: "Domingo" },
];

const ids = (list) => new Set(list.map((x) => x.id));
const GOAL_IDS = ids(GOALS);
const LEVEL_IDS = ids(LEVELS);
const AGE_IDS = ids(AGES);
export const labelOf = (list, id) => list.find((x) => x.id === id)?.label ?? id;

// ---------- Validación ----------

const isPlainObject = (x) => x !== null && typeof x === "object" && !Array.isArray(x);

function isValidRoutineExercise(x) {
  return isPlainObject(x) && typeof x.exerciseId === "string" && Number.isInteger(x.sets) && x.sets > 0 && typeof x.reps === "string" && Number.isFinite(x.rest) && x.rest >= 0;
}

export function isValidRoutine(r) {
  return (
    isPlainObject(r) &&
    typeof r.id === "string" &&
    typeof r.name === "string" &&
    r.name.trim() !== "" &&
    GOAL_IDS.has(r.goal) &&
    LEVEL_IDS.has(r.level) &&
    Array.isArray(r.ages) &&
    r.ages.length > 0 &&
    r.ages.every((a) => AGE_IDS.has(a)) &&
    Array.isArray(r.days) &&
    r.days.length >= 1 &&
    r.days.length <= 7 &&
    r.days.every((d) => isPlainObject(d) && typeof d.name === "string" && Array.isArray(d.exercises) && d.exercises.length > 0 && d.exercises.every(isValidRoutineExercise))
  );
}

/** Rutina activa: null o { routineId, weekdays: [0..6] sin repetir, ordenados }. */
export function isValidActive(v) {
  return (
    v === null ||
    (isPlainObject(v) &&
      typeof v.routineId === "string" &&
      Array.isArray(v.weekdays) &&
      v.weekdays.length >= 1 &&
      v.weekdays.every((d) => Number.isInteger(d) && d >= 0 && d <= 6) &&
      new Set(v.weekdays).size === v.weekdays.length)
  );
}

// ---------- Filtros ----------

/** Filtros vacíos = sin filtro. `days` es la cantidad de días por semana. */
export function filterRoutines(list, { kind = "", goal = "", level = "", age = "", days = "" } = {}) {
  return list.filter(
    (r) =>
      (!kind || r.kind === kind) &&
      (!goal || r.goal === goal) &&
      (!level || r.level === level) &&
      (!age || r.ages.includes(age)) &&
      (!days || r.days.length === Number(days)),
  );
}

// ---------- Calendario ----------

const SUGGESTED = { 1: [0], 2: [0, 3], 3: [0, 2, 4], 4: [0, 1, 3, 4], 5: [0, 1, 2, 3, 4], 6: [0, 1, 2, 3, 4, 5], 7: [0, 1, 2, 3, 4, 5, 6] };
/** Días de la semana sugeridos para n sesiones (con descansos repartidos). */
export const suggestedWeekdays = (n) => SUGGESTED[n] ?? [];

/** Índice de hoy con lunes = 0. */
export const todayIndex = (date = new Date()) => (date.getDay() + 6) % 7;

/**
 * Semana de 7 días para una rutina y los días elegidos.
 * Cada día elegido (en orden de lunes a domingo) recibe la sesión siguiente de la rutina.
 * Devuelve [{ weekday, dayIndex | null }] con dayIndex = índice en routine.days, o null si es descanso.
 */
export function buildWeek(routine, weekdays) {
  const sorted = [...weekdays].sort((a, b) => a - b);
  return WEEKDAYS.map((_, weekday) => {
    const pos = sorted.indexOf(weekday);
    return { weekday, dayIndex: pos === -1 || !routine ? null : pos % routine.days.length };
  });
}

// ---------- Rutinas propias ----------

export const MAX_DAYS = 7;
export const MAX_SETS = 10;
const newId = () => `propia-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
const clean = (s) => (typeof s === "string" ? s.trim() : "");

/**
 * Arma una rutina propia limpia a partir del formulario. Si se pasa `id`, la conserva (edición).
 * Quita filas sin ejercicio y días vacíos; acota series a 1..MAX_SETS y descanso a ≥ 0.
 * El resultado puede no ser válido (p. ej. sin días): comprobar con isValidRoutine antes de guardar.
 */
export function makeCustomRoutine({ name, goal, level, ages = [], description = "", days = [] }, id) {
  const cleanDays = days
    .slice(0, MAX_DAYS)
    .map((d, i) => ({
      name: clean(d?.name) || `Día ${i + 1}`,
      exercises: (Array.isArray(d?.exercises) ? d.exercises : [])
        .filter((x) => x && typeof x.exerciseId === "string" && x.exerciseId)
        .map((x) => {
          const sets = Math.min(MAX_SETS, Math.max(1, Math.round(Number(x.sets)) || 1));
          const rest = Math.max(0, Math.round(Number(x.rest)) || 0);
          return { exerciseId: x.exerciseId, sets, reps: clean(String(x.reps ?? "")) || "10", rest };
        }),
    }))
    .filter((d) => d.exercises.length > 0);

  return {
    id: id ?? newId(),
    custom: true,
    kind: "propia",
    name: clean(name),
    goal,
    level,
    ages: AGES.map((a) => a.id).filter((a) => ages.includes(a)),
    description: clean(description),
    days: cleanDays,
  };
}

const isArray = (v) => Array.isArray(v);
const NO_CUSTOM = [];
const isValidCustom = (r) => isValidRoutine(r) && r.kind === "propia";

// ---------- Hooks ----------

/** Rutinas base + propias (guardadas en el navegador), con alta, edición y borrado. */
export function useRoutines() {
  const [stored, setStored] = usePersistentState(KEYS.customRoutines, NO_CUSTOM, isArray);
  const custom = useMemo(() => stored.filter(isValidCustom), [stored]);
  const routines = useMemo(() => [...baseRoutines, ...custom], [custom]);
  const byId = useMemo(() => Object.fromEntries(routines.map((r) => [r.id, r])), [routines]);

  /** Crea (sin id) o reemplaza (con id de una propia) una rutina. Devuelve la rutina o null si no es válida. */
  const saveRoutine = useCallback(
    (data, id) => {
      const r = makeCustomRoutine(data, id);
      if (!isValidCustom(r)) return null;
      setStored((prev) => {
        const list = prev.filter(isValidCustom);
        return list.some((x) => x.id === r.id) ? list.map((x) => (x.id === r.id ? r : x)) : [...list, r];
      });
      return r;
    },
    [setStored],
  );

  const removeRoutine = useCallback((id) => setStored((prev) => prev.filter((x) => isValidCustom(x) && x.id !== id)), [setStored]);

  return { routines, byId, saveRoutine, removeRoutine };
}

/**
 * Rutina activa con su semana armada. Si la rutina guardada ya no existe o la cantidad de días
 * no coincide, se considera que no hay rutina activa.
 */
export function useActiveRoutine(byId) {
  const [stored, setStored] = usePersistentState(KEYS.activeRoutine, null, isValidActive);

  const active = useMemo(() => {
    const routine = stored && byId[stored.routineId];
    if (!routine || stored.weekdays.length !== routine.days.length) return null;
    return { routine, weekdays: [...stored.weekdays].sort((a, b) => a - b), week: buildWeek(routine, stored.weekdays) };
  }, [stored, byId]);

  const activate = useCallback(
    (routineId, weekdays) => setStored({ routineId, weekdays: [...new Set(weekdays)].sort((a, b) => a - b) }),
    [setStored],
  );
  const deactivate = useCallback(() => setStored(null), [setStored]);
  /** Deja de usar la rutina guardada si es `routineId` (aunque hoy no se pueda mostrar por no coincidir los días). */
  const clearIfRoutine = useCallback((routineId) => setStored((prev) => (prev?.routineId === routineId ? null : prev)), [setStored]);

  return { active, activate, deactivate, clearIfRoutine };
}
