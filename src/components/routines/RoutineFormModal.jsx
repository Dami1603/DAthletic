import { useRef, useState } from "react";
import Icon from "../Icon.jsx";
import { groups } from "../../data/muscles.js";
import { AGES, GOALS, LEVELS, MAX_DAYS, MAX_SETS } from "../../lib/routines.js";

const REST_OPTIONS = [30, 45, 60, 90, 120, 150, 180, 240];
const restLabel = (s) => (s >= 60 ? `${s / 60} min` : `${s} s`).replace(".5 min", " min 30 s");

/**
 * Crear o editar una rutina propia. `initial` es la rutina a editar o null para crear.
 * `onSave(data, id)` devuelve la rutina guardada o null; `onSaved(rutina)` se llama ya con la ventana cerrada.
 * `openKey` cambia en cada apertura para empezar con el formulario limpio.
 */
export default function RoutineFormModal({ ref, openKey, initial, exercises, activeRoutineId, onSave, onSaved }) {
  return (
    <dialog ref={ref} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box max-w-3xl">
        <RoutineForm
          key={openKey}
          initial={initial}
          exercises={exercises}
          isActive={!!initial && initial.id === activeRoutineId}
          onCancel={() => ref.current?.close()}
          onSave={(data) => {
            const saved = onSave(data, initial?.id);
            if (saved) {
              ref.current?.close();
              onSaved(saved);
            }
            return saved;
          }}
        />
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>cerrar</button>
      </form>
    </dialog>
  );
}

function RoutineForm({ initial, exercises, isActive, onCancel, onSave }) {
  const keyRef = useRef(0);
  const nextKey = () => ++keyRef.current;
  const newRow = () => ({ key: nextKey(), exerciseId: "", sets: 3, reps: "8–12", rest: 90 });
  const newDay = (n) => ({ key: nextKey(), name: `Día ${n}`, exercises: [newRow()] });

  const [form, setForm] = useState(() =>
    initial
      ? {
          name: initial.name,
          goal: initial.goal,
          level: initial.level,
          ages: initial.ages,
          description: initial.description ?? "",
          // Un ejercicio que ya no existe (p. ej. uno propio borrado) queda vacío para que se elija otro.
          days: initial.days.map((d) => ({
            key: nextKey(),
            name: d.name,
            exercises: d.exercises.map((x) => ({ key: nextKey(), ...x, exerciseId: exercises.some((ex) => ex.id === x.exerciseId) ? x.exerciseId : "" })),
          })),
        }
      : { name: "", goal: "hipertrofia", level: "principiante", ages: ["18-39"], description: "", days: [newDay(1)] },
  );
  const [error, setError] = useState("");

  const set = (patch) => {
    setError("");
    setForm((f) => ({ ...f, ...patch }));
  };
  const setDay = (dayKey, patch) => set({ days: form.days.map((d) => (d.key === dayKey ? { ...d, ...patch } : d)) });
  const setRow = (dayKey, rowKey, patch) =>
    setDay(dayKey, { exercises: form.days.find((d) => d.key === dayKey).exercises.map((x) => (x.key === rowKey ? { ...x, ...patch } : x)) });

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim()) return setError("Escribí un nombre para la rutina.");
    if (form.ages.length === 0) return setError("Elegí al menos un rango de edad.");
    if (form.days.some((d) => d.exercises.length === 0)) return setError("Cada día necesita al menos un ejercicio.");
    const rows = form.days.flatMap((d) => d.exercises);
    if (rows.some((x) => !x.exerciseId)) return setError("Elegí el ejercicio en todas las filas, o quitá las que estén vacías.");
    if (rows.some((x) => { const n = Number(x.sets); return !Number.isInteger(n) || n < 1 || n > MAX_SETS; })) return setError(`Las series tienen que ser un número entero entre 1 y ${MAX_SETS}.`);
    if (rows.some((x) => !String(x.reps).trim())) return setError("Completá las repeticiones en todas las filas (por ejemplo «8–12» o «30 s»).");
    if (!onSave(form)) setError("No se pudo guardar la rutina. Revisá los datos.");
  }

  const daysChanged = isActive && form.days.length !== initial.days.length;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold">{initial ? "Editar rutina" : "Crear rutina"}</h3>
          <p className="text-sm text-base-content/60">Se guarda en este navegador.</p>
        </div>
        <button type="button" className="btn btn-ghost btn-sm btn-circle" aria-label="Cerrar" onClick={onCancel}>✕</button>
      </div>

      <div className="grid gap-x-4 sm:grid-cols-2">
        <fieldset className="fieldset sm:col-span-2">
          <legend className="fieldset-legend">Nombre</legend>
          <input className="input w-full" maxLength={60} placeholder="Ej. Mi torso / pierna" value={form.name} onChange={(e) => set({ name: e.target.value })} />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Objetivo</legend>
          <select className="select w-full" value={form.goal} onChange={(e) => set({ goal: e.target.value })}>
            {GOALS.map((g) => <option key={g.id} value={g.id}>{g.label}</option>)}
          </select>
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Experiencia</legend>
          <select className="select w-full" value={form.level} onChange={(e) => set({ level: e.target.value })}>
            {LEVELS.map((l) => <option key={l.id} value={l.id}>{l.label} ({l.hint})</option>)}
          </select>
        </fieldset>
        <fieldset className="fieldset sm:col-span-2">
          <legend className="fieldset-legend">Edades</legend>
          <div className="flex flex-wrap gap-4">
            {AGES.map((a) => (
              <label key={a.id} className="label cursor-pointer gap-2 text-sm text-base-content">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm"
                  checked={form.ages.includes(a.id)}
                  onChange={(e) => set({ ages: e.target.checked ? [...form.ages, a.id] : form.ages.filter((x) => x !== a.id) })}
                />
                {a.label}
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset className="fieldset sm:col-span-2">
          <legend className="fieldset-legend">Descripción (opcional)</legend>
          <textarea className="textarea w-full" rows={2} maxLength={300} value={form.description} onChange={(e) => set({ description: e.target.value })} />
        </fieldset>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold">Días ({form.days.length})</h4>
          <button type="button" className="btn btn-sm" disabled={form.days.length >= MAX_DAYS} onClick={() => set({ days: [...form.days, newDay(form.days.length + 1)] })}>
            <Icon name="plus" className="size-4" />
            Agregar día
          </button>
        </div>
        {daysChanged && (
          <p role="note" className="alert alert-warning alert-soft text-sm">
            Es tu rutina activa: si cambiás la cantidad de días, después vas a tener que volver a elegir qué días entrenás.
          </p>
        )}

        {form.days.map((day, i) => (
          <section key={day.key} className="space-y-2 rounded-box border border-base-300 p-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-base-content/50">Sesión {i + 1}</span>
              <input
                className="input input-sm flex-1"
                aria-label={`Nombre de la sesión ${i + 1}`}
                maxLength={40}
                value={day.name}
                onChange={(e) => setDay(day.key, { name: e.target.value })}
              />
              <button
                type="button"
                className="btn btn-ghost btn-sm btn-square"
                aria-label={`Quitar sesión ${i + 1}`}
                disabled={form.days.length <= 1}
                onClick={() => set({ days: form.days.filter((d) => d.key !== day.key) })}
              >
                <Icon name="trash" className="size-4" />
              </button>
            </div>

            {day.exercises.map((row, j) => (
              <div key={row.key} className="flex flex-wrap items-center gap-2 rounded-box bg-base-200 p-2">
                <select
                  className="select select-sm w-full sm:w-auto sm:flex-1"
                  aria-label={`Ejercicio ${j + 1} de la sesión ${i + 1}`}
                  value={row.exerciseId}
                  onChange={(e) => setRow(day.key, row.key, { exerciseId: e.target.value })}
                >
                  <option value="">Elegí un ejercicio</option>
                  {groups.map((g) => (
                    <optgroup key={g.id} label={g.label}>
                      {exercises.filter((x) => x.group === g.id).map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}
                    </optgroup>
                  ))}
                </select>
                <label className="input input-sm w-24">
                  <input type="number" min={1} max={MAX_SETS} aria-label="Series" value={row.sets} onChange={(e) => setRow(day.key, row.key, { sets: e.target.value })} />
                  <span className="label">series</span>
                </label>
                <label className="input input-sm w-28">
                  <input aria-label="Repeticiones" maxLength={12} value={row.reps} onChange={(e) => setRow(day.key, row.key, { reps: e.target.value })} />
                  <span className="label">reps</span>
                </label>
                <select className="select select-sm w-28" aria-label="Descanso" value={row.rest} onChange={(e) => setRow(day.key, row.key, { rest: Number(e.target.value) })}>
                  {REST_OPTIONS.map((s) => <option key={s} value={s}>{restLabel(s)}</option>)}
                </select>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm btn-square"
                  aria-label={`Quitar ejercicio ${j + 1}`}
                  onClick={() => setDay(day.key, { exercises: day.exercises.filter((x) => x.key !== row.key) })}
                >
                  ✕
                </button>
              </div>
            ))}
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => setDay(day.key, { exercises: [...day.exercises, newRow()] })}>
              <Icon name="plus" className="size-4" />
              Agregar ejercicio
            </button>
          </section>
        ))}
      </div>

      {error && <p role="alert" className="text-sm font-medium text-error">{error}</p>}
      <div className="modal-action">
        <button type="button" className="btn btn-ghost" onClick={onCancel}>Cancelar</button>
        <button type="submit" className="btn btn-primary">{initial ? "Guardar cambios" : "Crear rutina"}</button>
      </div>
    </form>
  );
}
