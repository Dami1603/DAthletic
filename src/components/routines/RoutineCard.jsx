import Icon from "../Icon.jsx";
import { GOALS, LEVELS, labelOf } from "../../lib/routines.js";

/** Insignias comunes de una rutina (objetivo, nivel, días). */
export function RoutineBadges({ routine, isActive }) {
  return (
    <span className="flex flex-wrap gap-1.5">
      {isActive && <span className="badge badge-primary badge-sm">Activa</span>}
      {routine.trending && <span className="badge badge-accent badge-soft badge-sm">En tendencia</span>}
      {routine.custom && <span className="badge badge-outline badge-sm">Propia</span>}
      <span className="badge badge-soft badge-sm">{labelOf(GOALS, routine.goal)}</span>
      <span className="badge badge-ghost badge-sm">{labelOf(LEVELS, routine.level)}</span>
      <span className="badge badge-ghost badge-sm">{routine.days.length} días/sem</span>
    </span>
  );
}

// Dentro de un <button> solo va contenido de frase (<span>).
export default function RoutineCard({ routine, isActive, onOpen }) {
  const exercisesPerDay = Math.round(routine.days.reduce((n, d) => n + d.exercises.length, 0) / routine.days.length);
  return (
    <button
      type="button"
      onClick={() => onOpen(routine.id)}
      className={`card cursor-pointer bg-base-100 text-left shadow-sm transition hover:shadow-md hover:ring-2 hover:ring-primary/30 focus-visible:ring-2 focus-visible:ring-primary ${isActive ? "ring-2 ring-primary" : ""}`}
    >
      <span className="card-body gap-3">
        <RoutineBadges routine={routine} isActive={isActive} />
        <span className="block">
          <span className="card-title text-lg">{routine.name}</span>
          {routine.inspiredBy && <span className="block text-sm text-base-content/60">Inspirada en {routine.inspiredBy} · no oficial</span>}
        </span>
        <span className="line-clamp-2 text-sm text-base-content/70">{routine.description}</span>
        <span className="mt-auto flex gap-4 text-sm text-base-content/50">
          <span className="flex items-center gap-1"><Icon name="calendar" className="size-4" />{routine.days.length} días</span>
          <span className="flex items-center gap-1"><Icon name="dumbbell" className="size-4" />~{exercisesPerDay} ejercicios/día</span>
        </span>
      </span>
    </button>
  );
}
