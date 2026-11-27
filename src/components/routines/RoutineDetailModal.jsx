import { useState } from "react";
import Icon from "../Icon.jsx";
import WeekdayPicker from "./WeekdayPicker.jsx";
import { RoutineBadges } from "./RoutineCard.jsx";
import { AGES, WEEKDAYS, formatDuration, labelOf, sessionSummary, suggestedWeekdays } from "../../lib/routines.js";
import { muscleById } from "../../data/muscles.js";

const formatRest = (s) => (s >= 60 ? `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")} min` : `${s} s`);
const dayList = (weekdays) => weekdays.map((d) => WEEKDAYS[d].short).join(", ");

/**
 * Detalle de una rutina con la opción de usarla (elegir días) o dejar de usarla.
 * `routine` puede ser null (ventana cerrada). `openKey` cambia en cada apertura para reiniciar el contenido
 * (va en el contenido, no en el <dialog>: re-montar el <dialog> lo cerraría recién abierto).
 */
export default function RoutineDetailModal({ ref, openKey, routine, exercisesById, active, onActivate, onDeactivate, onEdit, onDelete }) {
  const close = () => ref.current?.close();

  return (
    <dialog ref={ref} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box max-w-3xl">
        {routine && (
          <RoutineDetail
            key={`${routine.id}-${openKey}`}
            routine={routine}
            exercisesById={exercisesById}
            active={active}
            onActivate={(weekdays) => { onActivate(routine.id, weekdays); close(); }}
            onDeactivate={() => { onDeactivate(); close(); }}
            onEdit={() => { close(); onEdit(routine); }}
            onDelete={() => {
              if (window.confirm(`¿Borrar «${routine.name}»? No se puede deshacer.`)) {
                close();
                onDelete(routine.id);
              }
            }}
            onClose={close}
          />
        )}
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>cerrar</button>
      </form>
    </dialog>
  );
}

/** Tiempo estimado y series de la sesión; las series abren un desplegable con las series por músculo. */
function SessionSummary({ day, exercisesById }) {
  const { sets, seconds, muscles } = sessionSummary(day, exercisesById);
  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="flex items-center gap-1 text-base-content/70" title="Tiempo estimado: cada serie más su descanso">
        <Icon name="clock" className="size-4" />
        {formatDuration(seconds)}
      </span>
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-xs" aria-label={`${sets} series. Ver series por músculo`}>
          {sets} series ▾
        </div>
        <div tabIndex={0} className="dropdown-content z-20 mt-1 w-56 rounded-box border border-base-300 bg-base-100 p-3 shadow-lg">
          <p className="mb-2 text-xs font-semibold text-base-content/60">Series por músculo</p>
          {muscles.length ? (
            <ul className="space-y-1">
              {muscles.map((m) => (
                <li key={m.id} className="flex justify-between gap-2">
                  <span>{muscleById[m.id]?.label ?? m.id}</span>
                  <span className="font-semibold">{m.sets}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-base-content/60">Sin datos de músculos.</p>
          )}
          <p className="mt-2 text-xs text-base-content/50">Cuenta el músculo principal de cada ejercicio.</p>
        </div>
      </div>
    </div>
  );
}

function RoutineDetail({ routine, exercisesById, active, onActivate, onDeactivate, onEdit, onDelete, onClose }) {
  const isActive = active?.routine.id === routine.id;
  const n = routine.days.length;
  const [picking, setPicking] = useState(false);
  const [weekdays, setWeekdays] = useState(() => (isActive ? active.weekdays : suggestedWeekdays(n)));

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <RoutineBadges routine={routine} isActive={isActive} />
          <h3 className="text-xl font-bold">{routine.name}</h3>
          <p className="text-sm text-base-content/70">{routine.description}</p>
          <p className="text-xs text-base-content/50">Edades: {routine.ages.map((a) => labelOf(AGES, a)).join(" · ")}</p>
          {routine.custom && (
            <div className="flex gap-2 pt-1">
              <button className="btn btn-sm" onClick={onEdit}>Editar</button>
              <button className="btn btn-sm btn-error btn-outline" onClick={onDelete}>
                <Icon name="trash" className="size-4" />
                Borrar
              </button>
            </div>
          )}
        </div>
        <button className="btn btn-ghost btn-sm btn-circle" aria-label="Cerrar" onClick={onClose}>✕</button>
      </div>

      {routine.inspiredBy && (
        <div role="note" className="alert alert-warning alert-soft text-sm">
          <span>
            <strong>Inspirada en {routine.inspiredBy}, no oficial.</strong> {routine.source}
          </span>
        </div>
      )}

      <div className="space-y-4">
        {routine.days.map((day, i) => (
          <section key={i} className="rounded-box border border-base-300">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-base-300 px-4 py-2">
              <h4 className="font-semibold">
                <span className="text-base-content/50">Sesión {i + 1} · </span>{day.name}
              </h4>
              <SessionSummary day={day} exercisesById={exercisesById} />
            </div>
            <div className="overflow-x-auto">
              <table className="table table-sm">
                <thead>
                  <tr><th>Ejercicio</th><th className="text-right">Series × reps</th><th className="text-right">Descanso</th></tr>
                </thead>
                <tbody>
                  {day.exercises.map((x, j) => (
                    <tr key={j}>
                      <td>
                        {exercisesById[x.exerciseId]?.name ?? "Ejercicio no disponible"}
                        {x.note && <span className="block text-xs text-base-content/50">{x.note}</span>}
                      </td>
                      <td className="whitespace-nowrap text-right">{x.sets} × {x.reps}</td>
                      <td className="whitespace-nowrap text-right text-base-content/60">{formatRest(x.rest)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}
      </div>

      <div className="space-y-3 border-t border-base-300 pt-4">
        {picking ? (
          <>
            <p className="font-semibold">¿Qué días vas a entrenar? Elegí {n}.</p>
            <WeekdayPicker count={n} value={weekdays} onChange={setWeekdays} />
            {active && !isActive && (
              <p className="text-sm text-base-content/60">Reemplaza a tu rutina activa: {active.routine.name}.</p>
            )}
            <div className="flex flex-wrap justify-end gap-2">
              <button className="btn btn-ghost" onClick={() => setPicking(false)}>Cancelar</button>
              <button className="btn btn-primary" disabled={weekdays.length !== n} onClick={() => onActivate(weekdays)}>
                Guardar días
              </button>
            </div>
          </>
        ) : isActive ? (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm">Es tu rutina activa. Días: <strong>{dayList(active.weekdays)}</strong></p>
            <div className="flex gap-2">
              <button className="btn btn-ghost btn-sm" onClick={onDeactivate}>Dejar de usar</button>
              <button className="btn btn-sm" onClick={() => setPicking(true)}>Cambiar días</button>
            </div>
          </div>
        ) : (
          <div className="flex justify-end">
            <button className="btn btn-primary" onClick={() => setPicking(true)}>Usar esta rutina</button>
          </div>
        )}
      </div>
    </div>
  );
}
