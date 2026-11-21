import Icon from "../components/Icon.jsx";
import { PageHeader, Panel } from "../components/ui.jsx";

const ranges = ["Semana", "Mes", "Año"];
const summary = [
  { title: "Sesiones", value: "0" },
  { title: "Tiempo total", value: "0 h" },
  { title: "Volumen total", value: "0 kg" },
];
const weekDays = ["L", "M", "X", "J", "V", "S", "D"];

export default function Progress() {
  return (
    <section className="space-y-6">
      <PageHeader title="Progreso" subtitle="Seguí tu evolución a lo largo del tiempo.">
        <div role="tablist" className="tabs tabs-box tabs-sm">
          {ranges.map((r, i) => (
            <input key={r} type="radio" name="progress_range" className="tab" aria-label={r} defaultChecked={i === 0} />
          ))}
        </div>
      </PageHeader>

      <div className="stats stats-vertical w-full bg-base-100 shadow-sm md:stats-horizontal">
        {summary.map((s) => (
          <div key={s.title} className="stat">
            <div className="stat-title">{s.title}</div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-desc">— vs. período anterior</div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Panel title="Volumen por sesión" className="lg:col-span-2">
          <div className="relative mt-2 h-56">
            <div className="absolute inset-0 flex flex-col justify-between">
              {[0, 1, 2, 3].map((n) => <div key={n} className="border-t border-dashed border-base-300" />)}
              <div className="border-t border-base-300" />
            </div>
            <div className="absolute inset-0 grid place-items-center">
              <div className="rounded-box bg-base-100 px-4 py-2 text-center">
                <p className="font-semibold">Aún no hay datos</p>
                <p className="text-sm text-base-content/60">Completá un entrenamiento para ver tu progreso.</p>
              </div>
            </div>
          </div>
          <div className="flex justify-between px-1 text-xs text-base-content/40">
            {weekDays.map((d) => <span key={d}>{d}</span>)}
          </div>
        </Panel>

        <Panel
          title={<><Icon name="trophy" className="size-5 text-primary" />Récords personales</>}
        >
          <ul className="list -mx-4">
            {[0, 1, 2].map((n) => (
              <li key={n} className="list-row items-center">
                <div className="skeleton size-9 rounded-full" />
                <div className="text-base-content/40">Sin récord</div>
                <span className="font-semibold text-base-content/40">— kg</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <Panel title="Historial">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr><th>Fecha</th><th>Rutina</th><th>Duración</th><th>Volumen</th><th /></tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={5} className="py-10 text-center text-base-content/50">No hay entrenamientos registrados.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Panel>
    </section>
  );
}
