import Icon from "../Icon.jsx";
import { equipmentById, groupById } from "../../data/muscles.js";

/** Espacio reservado para el modelo 3D (fase 5). Solo usa <span> para poder ir dentro de un <button>. */
export function ModelPlaceholder({ className = "", compact = false }) {
  return (
    <span className={`grid place-items-center bg-base-200 text-base-content/40 ${className}`}>
      <span className="flex flex-col items-center gap-1 text-center">
        <Icon name="box" className={compact ? "size-8" : "size-12"} />
        <span className={compact ? "text-xs" : "text-sm"}>Modelo 3D próximamente</span>
      </span>
    </span>
  );
}

// Dentro de un <button> solo va contenido de frase (<span>), por eso no hay <div> ni <h2>.
export default function ExerciseCard({ exercise, onOpen }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(exercise.id)}
      className="card cursor-pointer overflow-hidden bg-base-100 text-left shadow-sm transition hover:shadow-md hover:ring-2 hover:ring-primary/30 focus-visible:ring-2 focus-visible:ring-primary"
    >
      <ModelPlaceholder compact className="aspect-4/3 w-full" />
      <span className="card-body gap-2 p-4">
        <span className="font-semibold leading-snug">{exercise.name}</span>
        <span className="flex flex-wrap gap-1.5">
          <span className="badge badge-soft badge-sm">{groupById[exercise.group]?.label}</span>
          {exercise.equipment && <span className="badge badge-ghost badge-sm">{equipmentById[exercise.equipment]?.label}</span>}
          {exercise.custom && <span className="badge badge-outline badge-sm">Propio</span>}
        </span>
      </span>
    </button>
  );
}
