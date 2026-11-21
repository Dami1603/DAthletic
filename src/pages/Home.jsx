import { Link, useOutletContext } from "react-router";
import Icon from "../components/Icon.jsx";
import Intro from "../components/Intro.jsx";
import { EmptyState, Panel, StatCard } from "../components/ui.jsx";

const weekDays = ["L", "M", "X", "J", "V", "S", "D"];

function greeting() {
  const h = new Date().getHours();
  return h < 12 ? "Buenos días" : h < 20 ? "Buenas tardes" : "Buenas noches";
}

export default function Home() {
  const { openNewRoutine } = useOutletContext();
  const today = new Date().toLocaleDateString("es", { weekday: "long", day: "numeric", month: "long" });

  return (
    <section className="space-y-6">
      <Intro />
      <div>
        <p className="text-sm capitalize text-base-content/60">{today}</p>
        <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">{greeting()}, atleta</h1>
      </div>

      {/* Entrenamiento de hoy */}
      <div className="card overflow-hidden bg-base-100 shadow-sm">
        <div className="card-body gap-6 p-6 md:flex-row md:items-center lg:p-8">
          <div className="grid size-16 shrink-0 place-items-center rounded-2xl bg-secondary text-secondary-content">
            <Icon name="dumbbell" className="size-8" />
          </div>
          <div className="flex-1 space-y-1">
            <span className="badge badge-soft badge-sm">Entrenamiento de hoy</span>
            <h2 className="card-title text-xl">Todavía no tenés una rutina para hoy</h2>
            <p className="text-base-content/60">Creá tu primera rutina y asignala a los días que vas a entrenar.</p>
          </div>
          <div className="card-actions">
            <button className="btn btn-primary" onClick={openNewRoutine}>
              <Icon name="plus" className="size-4" />
              Crear rutina
            </button>
          </div>
        </div>
      </div>

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
            <span className="text-sm text-base-content/50">0 de 0 sesiones</span>
          </div>
          <div className="mt-2 grid grid-cols-7 gap-2">
            {weekDays.map((d) => (
              <div key={d} className="flex flex-col items-center gap-2">
                <span className="text-xs font-medium text-base-content/50">{d}</span>
                <span className="aspect-square w-full max-w-12 rounded-full border-2 border-dashed border-base-300" />
              </div>
            ))}
          </div>
          <p className="mt-2 text-sm text-base-content/50">Los días con entrenamiento programado aparecerán acá.</p>
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
          <p className="text-sm text-base-content/60">Definí cuántos días querés entrenar por semana.</p>
          <Link to="/perfil" className="btn btn-sm btn-ghost mt-1">Configurar objetivo</Link>
        </Panel>
      </div>

      <Panel title="Actividad reciente">
        <EmptyState icon="calendar" title="Sin actividad todavía" description="Tus entrenamientos completados se mostrarán acá." />
      </Panel>
    </section>
  );
}
