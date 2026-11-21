import { useOutletContext } from "react-router";
import Icon from "../components/Icon.jsx";
import { PageHeader, Panel } from "../components/ui.jsx";

const categories = ["Fuerza", "Hipertrofia", "Cardio", "Movilidad"];
const weekDays = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
const placeholders = [1, 2];

export default function Routines() {
  const { openNewRoutine } = useOutletContext();

  return (
    <section className="space-y-6">
      <PageHeader title="Rutinas" subtitle="Organizá tus entrenamientos por días y objetivos.">
        <button className="btn btn-primary" onClick={openNewRoutine}>
          <Icon name="plus" className="size-4" />
          Nueva rutina
        </button>
      </PageHeader>

      <form className="filter">
        <input className="btn btn-sm btn-square" type="reset" value="×" aria-label="Limpiar filtro" />
        {categories.map((c) => (
          <input key={c} className="btn btn-sm" type="radio" name="routine-filter" aria-label={c} />
        ))}
      </form>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <button
          className="card card-dash min-h-56 border-base-300 bg-base-100 transition hover:border-primary hover:text-primary"
          onClick={openNewRoutine}
        >
          <div className="card-body items-center justify-center text-center">
            <div className="grid size-12 place-items-center rounded-full bg-base-200">
              <Icon name="plus" className="size-6" />
            </div>
            <p className="font-semibold">Crear rutina</p>
            <p className="text-sm text-base-content/50">Empezá desde cero</p>
          </div>
        </button>

        {placeholders.map((n) => (
          <RoutineCard key={n} />
        ))}
      </div>

      <Panel title="Plan semanal">
        <ul className="list">
          {weekDays.map((d) => (
            <li key={d} className="list-row items-center">
              <span className="w-24 font-medium">{d}</span>
              <span className="text-base-content/40">Descanso</span>
              <button className="btn btn-xs btn-ghost">Asignar</button>
            </li>
          ))}
        </ul>
      </Panel>
    </section>
  );
}

function RoutineCard({ name, category, days, exercises = 0, minutes = 0, progress = 0 }) {
  return (
    <div className="card min-h-56 bg-base-100 shadow-sm">
      <div className="card-body">
        <div className="flex items-start justify-between">
          <span className="badge badge-ghost badge-sm">{category ?? "Sin categoría"}</span>
          <span className="text-xs text-base-content/40">{days ?? "—"} días</span>
        </div>
        <h2 className={`card-title ${name ? "" : "text-base-content/40"}`}>{name ?? "Rutina sin nombre"}</h2>
        <div className="flex gap-4 text-sm text-base-content/50">
          <span className="flex items-center gap-1"><Icon name="dumbbell" className="size-4" />{exercises} ejercicios</span>
          <span className="flex items-center gap-1"><Icon name="clock" className="size-4" />{minutes} min</span>
        </div>
        <progress className="progress mt-auto" value={progress} max="100" />
        <div className="card-actions justify-end">
          <button className="btn btn-sm btn-ghost">Editar</button>
          <button className="btn btn-sm"><Icon name="play" className="size-3.5" />Empezar</button>
        </div>
      </div>
    </div>
  );
}
