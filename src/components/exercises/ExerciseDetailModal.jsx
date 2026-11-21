import { useEffect, useRef } from "react";
import Icon from "../Icon.jsx";
import { ModelPlaceholder } from "./ExerciseCard.jsx";
import { equipmentById, groupById, muscleById } from "../../data/muscles.js";

const tipRows = [
  { key: "order", label: "Orden" },
  { key: "intensity", label: "Intensidad" },
  { key: "frequency", label: "Frecuencia" },
];

/** Ventana de detalle. `exercise` puede ser null (ventana cerrada o ejercicio borrado). */
export default function ExerciseDetailModal({ ref, exercise, byId, onSelect, onDelete }) {
  const boxRef = useRef(null);
  const titleRef = useRef(null);
  const close = () => ref.current?.close();
  const exerciseId = exercise?.id;

  // Al pasar a otro ejercicio (p. ej. un reemplazo): volver arriba y llevar el foco al título,
  // porque el botón tocado desaparece y la caja conservaría la posición de scroll.
  useEffect(() => {
    if (!exerciseId) return;
    if (boxRef.current) boxRef.current.scrollTop = 0;
    if (ref.current?.open) titleRef.current?.focus({ preventScroll: true });
  }, [exerciseId, ref]);

  return (
    <dialog ref={ref} className="modal modal-bottom sm:modal-middle">
      <div ref={boxRef} className="modal-box max-w-2xl p-0">
        {exercise && (
          <>
            <ModelPlaceholder className="aspect-video w-full" />
            <div className="space-y-6 p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <h3 ref={titleRef} tabIndex={-1} className="text-xl font-bold outline-none">{exercise.name}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="badge badge-soft badge-sm">{groupById[exercise.group]?.label}</span>
                    {exercise.equipment && <span className="badge badge-ghost badge-sm">{equipmentById[exercise.equipment]?.label}</span>}
                    {exercise.custom && <span className="badge badge-outline badge-sm">Propio</span>}
                  </div>
                </div>
                <button className="btn btn-ghost btn-sm btn-circle" aria-label="Cerrar" onClick={close}>✕</button>
              </div>

              <section className="space-y-2">
                <h4 className="font-semibold">Músculos que trabaja</h4>
                <MuscleList label="Principales" ids={exercise.primary} badge="badge-primary badge-soft" />
                <MuscleList label="Secundarios" ids={exercise.secondary} badge="badge-ghost" />
              </section>

              <section className="space-y-2">
                <h4 className="font-semibold">Técnica</h4>
                {exercise.technique.length ? (
                  <ol className="list-decimal space-y-1 pl-5 text-sm text-base-content/80">
                    {exercise.technique.map((step, i) => <li key={i}>{step}</li>)}
                  </ol>
                ) : (
                  <p className="text-sm text-base-content/50">Sin pasos cargados.</p>
                )}
              </section>

              <section className="space-y-2">
                <h4 className="font-semibold">Consejos</h4>
                <dl className="grid gap-2 text-sm sm:grid-cols-[7rem_1fr]">
                  {tipRows.map((row) => (
                    <div key={row.key} className="contents">
                      <dt className="font-medium text-base-content/60">{row.label}</dt>
                      <dd className="text-base-content/80">{exercise.tips?.[row.key] || "—"}</dd>
                    </div>
                  ))}
                </dl>
              </section>

              <section className="space-y-2">
                <h4 className="flex items-center gap-2 font-semibold">
                  <Icon name="swap" className="size-4" />
                  Si la máquina está ocupada
                </h4>
                {exercise.substitutes.some((id) => byId[id]) ? (
                  <div className="flex flex-wrap gap-2">
                    {exercise.substitutes.filter((id) => byId[id]).map((id) => (
                      <button key={id} className="btn btn-sm" onClick={() => onSelect(id)}>
                        {byId[id].name}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-base-content/50">Sin reemplazos cargados.</p>
                )}
              </section>

              {exercise.custom && (
                <div className="flex justify-end border-t border-base-300 pt-4">
                  <button
                    className="btn btn-error btn-outline btn-sm"
                    onClick={() => {
                      if (window.confirm(`¿Borrar «${exercise.name}»? No se puede deshacer.`)) {
                        onDelete(exercise.id);
                        close();
                      }
                    }}
                  >
                    <Icon name="trash" className="size-4" />
                    Borrar ejercicio
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>cerrar</button>
      </form>
    </dialog>
  );
}

function MuscleList({ label, ids, badge }) {
  const known = ids.filter((id) => muscleById[id]);
  return (
    <div className="flex flex-wrap items-center gap-1.5 text-sm">
      <span className="w-24 text-base-content/60">{label}</span>
      {known.length ? (
        known.map((id) => <span key={id} className={`badge badge-sm ${badge}`}>{muscleById[id].label}</span>)
      ) : (
        <span className="text-base-content/40">—</span>
      )}
    </div>
  );
}
