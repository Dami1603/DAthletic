import { Link } from "react-router";
import Icon from "../components/Icon.jsx";
import Intro from "../components/Intro.jsx";
import { EmptyState, Panel, StatCard } from "../components/ui.jsx";
import { useExercises } from "../lib/exercises.js";
import { WEEKDAYS, todayIndex, useActiveRoutine, useRoutines } from "../lib/routines.js";

function greeting() {
  const h = new Date().getHours();
  return h < 12 ? "Buenos días" : h < 20 ? "Buenas tardes" : "Buenas noches";
}

export default function Home() {
  const today = new Date().toLocaleDateString("es", { weekday: "long", day: "numeric", month: "long" });
  const { byId } = useRoutines();
  const { active } = useActiveRoutine(byId);
  const { byId: exercisesById } = useExercises();
  const t = todayIndex();

  return (
    <section className="space-y-6">
      <Intro />
      <div>
        <p className="text-sm capitalize text-base-content/60">{today}</p>
        <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">{greeting()}, atleta</h1>
      </div>

      <TodayCard active={active} today={t} exercisesById={exercisesById} />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon="activity" title="Entrenamientos" value={0} desc="esta semana" />
        <StatCard icon="clock" title="Minutos" value={0} desc="esta semana" />
        <StatCard icon="flame" title="Racha" value={0} desc="días seguidos" />
        <StatCard icon="dumbbell" title="Volumen" value={0} unit="kg" desc="levantados" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Panel className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="card-title text-base">Tu semana</h2>
            <span className="text-sm text-base-content/50">
              {active ? `${active.weekdays.length} días de entrenamiento` : "Sin rutina activa"}
            </span>
          </div>
          <div className="mt-2 grid grid-cols-7 gap-2">
            {WEEKDAYS.map((w, d) => {
              const dayIndex = active?.week[d].dayIndex ?? null;
              const training = dayIndex !== null;
              return (
                <div key={d} className="flex flex-col items-center gap-2" title={training ? active.routine.days[dayIndex].name : "Descanso"}>
                  <span className={`text-xs font-medium ${d === t ? "text-primary" : "text-base-content/50"}`}>{w.short}</span>
                  <span
                    className={`grid aspect-square w-full max-w-12 place-items-center rounded-full text-xs font-semibold ${
                      training ? "bg-secondary text-secondary-content" : "border-2 border-dashed border-base-300"
                    } ${d === t ? "ring-2 ring-primary ring-offset-2 ring-offset-base-100" : ""}`}
                  >
                    {training ? dayIndex + 1 : ""}
                  </span>
                </div>
              );
            })}
          </div>
          <p className="mt-2 text-sm text-base-content/50">
            {active ? "Los números son la sesión que te toca ese día." : "Los días con entrenamiento aparecerán acá cuando elijas una rutina."}
          </p>
        </Panel>

        <Panel title="Objetivo semanal" bodyClassName="items-center text-center [&>h2]:self-start">
          <div
            className="radial-progress my-2 text-primary"
            style={{ "--value": 0, "--size": "7rem", "--thickness": "0.6rem" }}
            aria-valuenow={0}
            role="progressbar"
          >
            <span className="text-2xl font-bold text-base-content">0%</span>
          </div>
          <p className="text-sm text-base-content/60">Vas a ver tu avance cuando puedas registrar tus entrenamientos.</p>
        </Panel>
      </div>

      <Panel title="Actividad reciente">
        <EmptyState icon="calendar" title="Sin actividad todavía" description="Tus entrenamientos completados se mostrarán acá." />
      </Panel>
    </section>
  );
}

/** Tarjeta principal: qué toca hoy, día de descanso o elegir una rutina. */
function TodayCard({ active, today, exercisesById }) {
  if (!active) {
    return (
      <HeroCard badge="Entrenamiento de hoy" title="Todavía no elegiste una rutina" text="Elegí una rutina según tu objetivo y marcá los días que vas a entrenar.">
        <Link to="/rutinas" className="btn btn-primary">
          <Icon name="routines" className="size-4" />
          Elegir rutina
        </Link>
      </HeroCard>
    );
  }

  const dayIndex = active.week[today].dayIndex;
  if (dayIndex === null) {
    const next = [1, 2, 3, 4, 5, 6].map((k) => (today + k) % 7).find((d) => active.week[d].dayIndex !== null);
    return (
      <HeroCard
        badge="Hoy descansás"
        title="Día de descanso"
        text={next !== undefined ? `Próxima sesión: ${WEEKDAYS[next].label.toLowerCase()}, ${active.routine.days[active.week[next].dayIndex].name}.` : ""}
      >
        <Link to="/rutinas" className="btn">Ver rutina</Link>
      </HeroCard>
    );
  }

  const day = active.routine.days[dayIndex];
  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body gap-4 p-6 lg:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-1">
            <span className="badge badge-soft badge-sm">Entrenamiento de hoy</span>
            <h2 className="card-title text-xl">{day.name}</h2>
            <p className="text-sm text-base-content/60">{active.routine.name} · sesión {dayIndex + 1} de {active.routine.days.length}</p>
          </div>
          <Link to="/rutinas" className="btn btn-primary">Ver rutina</Link>
        </div>
        <ul className="grid gap-2 sm:grid-cols-2">
          {day.exercises.map((x, i) => (
            <li key={i} className="flex items-center justify-between gap-3 rounded-box bg-base-200 px-4 py-2 text-sm">
              <span>{exercisesById[x.exerciseId]?.name ?? "Ejercicio no disponible"}</span>
              <span className="whitespace-nowrap text-base-content/60">{x.sets} × {x.reps}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function HeroCard({ badge, title, text, children }) {
  return (
    <div className="card overflow-hidden bg-base-100 shadow-sm">
      <div className="card-body gap-6 p-6 md:flex-row md:items-center lg:p-8">
        <div className="grid size-16 shrink-0 place-items-center rounded-2xl bg-secondary text-secondary-content">
          <Icon name="dumbbell" className="size-8" />
        </div>
        <div className="flex-1 space-y-1">
          <span className="badge badge-soft badge-sm">{badge}</span>
          <h2 className="card-title text-xl">{title}</h2>
          {text && <p className="text-base-content/60">{text}</p>}
        </div>
        <div className="card-actions">{children}</div>
      </div>
    </div>
  );
}
