import { useCallback, useMemo } from "react";
import { baseExercises } from "../data/exercises.js";
import { equipmentById, groupById, muscleById } from "../data/muscles.js";
import { KEYS, usePersistentState } from "./storage.js";

// ---------- Validación de ejercicios propios (lo guardado en el navegador puede venir dañado) ----------

const isStringArray = (v) => Array.isArray(v) && v.every((x) => typeof x === "string");

export function isValidExercise(x) {
  return (
    x !== null &&
    typeof x === "object" &&
    typeof x.id === "string" &&
    typeof x.name === "string" &&
    x.name.trim() !== "" &&
    typeof x.group === "string" &&
    x.group in groupById &&
    (x.equipment === "" || x.equipment in equipmentById) &&
    isStringArray(x.primary) &&
    isStringArray(x.secondary) &&
    isStringArray(x.substitutes) &&
    isStringArray(x.technique) &&
    x.tips !== null &&
    typeof x.tips === "object"
  );
}

/** La lista guardada es válida si es un array; los elementos dañados se descartan al leer. */
const isArray = (v) => Array.isArray(v);
const NO_CUSTOM = [];

// ---------- Búsqueda y filtros ----------

const normalize = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

/** Filtra por texto (nombre o músculo, sin importar tildes), grupo y equipo. Filtros vacíos = sin filtro. */
export function filterExercises(list, { query = "", group = "", equipment = "" } = {}) {
  const q = normalize(query.trim());
  return list.filter((ex) => {
    if (group && ex.group !== group) return false;
    if (equipment && ex.equipment !== equipment) return false;
    if (!q) return true;
    const haystack = [ex.name, ...[...ex.primary, ...ex.secondary].map((m) => muscleById[m]?.label ?? "")].join(" ");
    return normalize(haystack).includes(q);
  });
}

// ---------- Alta de ejercicios propios ----------

const newId = () => `propio-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;

/** Arma un ejercicio propio limpio a partir de los datos del formulario. */
export function makeCustomExercise({ name, group, equipment = "", primary = [], secondary = [], substitutes = [], technique = "", tips = {} }) {
  const clean = (s) => (typeof s === "string" ? s.trim() : "");
  return {
    id: newId(),
    custom: true,
    name: clean(name),
    group,
    equipment,
    primary: [...new Set(primary)].filter((m) => m in muscleById),
    secondary: [...new Set(secondary)].filter((m) => m in muscleById && !primary.includes(m)),
    substitutes: [...new Set(substitutes)].filter(Boolean),
    technique: clean(technique).split("\n").map((l) => l.trim()).filter(Boolean),
    tips: { order: clean(tips.order), intensity: clean(tips.intensity), frequency: clean(tips.frequency) },
  };
}

// ---------- Hook ----------

/** Lista base + ejercicios propios guardados en el navegador. */
export function useExercises() {
  const [stored, setStored] = usePersistentState(KEYS.customExercises, NO_CUSTOM, isArray);
  const custom = useMemo(() => stored.filter(isValidExercise), [stored]);

  const exercises = useMemo(() => [...baseExercises, ...custom], [custom]);
  const byId = useMemo(() => Object.fromEntries(exercises.map((e) => [e.id, e])), [exercises]);

  /** Guarda un ejercicio propio. Devuelve el ejercicio, o null si los datos no son válidos (no guarda nada). */
  const addExercise = useCallback(
    (data) => {
      const ex = makeCustomExercise(data);
      if (!isValidExercise(ex)) return null;
      setStored((prev) => [...prev.filter(isValidExercise), ex]);
      return ex;
    },
    [setStored],
  );

  const removeExercise = useCallback(
    (id) =>
      setStored((prev) =>
        prev
          .filter((e) => isValidExercise(e) && e.id !== id)
          // que ningún ejercicio propio quede apuntando a uno borrado
          .map((e) => (e.substitutes.includes(id) ? { ...e, substitutes: e.substitutes.filter((s) => s !== id) } : e)),
      ),
    [setStored],
  );

  return { exercises, byId, addExercise, removeExercise };
}
