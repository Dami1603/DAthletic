import { useCallback, useSyncExternalStore } from "react";

// Guardado en el navegador (localStorage) que nunca rompe la app:
// en modo privado, con datos bloqueados o con JSON dañado, se usa el valor inicial en memoria.

const memory = new Map(); // respaldo cuando localStorage no está disponible
const listeners = new Map(); // key -> Set<callback>

/**
 * Lee una clave. `validate` (opcional) descarta valores con forma incorrecta y devuelve `initial`.
 * Un valor guardado como texto plano (no JSON, p. ej. el tema de versiones anteriores) se lee como string.
 */
export function readValue(key, initial, validate) {
  if (memory.has(key)) return memory.get(key);
  let value = initial;
  let raw = null;
  try {
    raw = window.localStorage.getItem(key);
  } catch {
    // sin acceso al almacenamiento: valor inicial
  }
  if (raw !== null) {
    try {
      value = JSON.parse(raw);
    } catch {
      value = raw;
    }
  }
  if (validate && !validate(value)) value = initial;
  memory.set(key, value);
  return value;
}

export function writeValue(key, value) {
  memory.set(key, value);
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // sin acceso o sin espacio: queda solo en memoria durante esta visita
  }
  listeners.get(key)?.forEach((cb) => cb());
}

function subscribe(key, cb) {
  if (!listeners.has(key)) listeners.set(key, new Set());
  listeners.get(key).add(cb);
  return () => listeners.get(key)?.delete(cb);
}

/**
 * Como useState, pero guardado en el navegador y compartido entre componentes que usan la misma clave.
 * `initial` y `validate` deben ser estables (valores o funciones definidos a nivel de módulo).
 */
export function usePersistentState(key, initial, validate) {
  const value = useSyncExternalStore(
    useCallback((cb) => subscribe(key, cb), [key]),
    () => readValue(key, initial, validate),
  );
  const setValue = useCallback(
    (next) => writeValue(key, typeof next === "function" ? next(readValue(key, initial, validate)) : next),
    [key, initial, validate],
  );
  return [value, setValue];
}

// Claves usadas por la app (prefijo común para no chocar con otras apps en el mismo dominio).
export const KEYS = {
  theme: "dathletic-theme", // se mantiene la clave original para no perder el tema ya elegido
  introDismissed: "dathletic:intro-dismissed",
  customExercises: "dathletic:custom-exercises",
  activeRoutine: "dathletic:active-routine",
  customRoutines: "dathletic:custom-routines",
};
