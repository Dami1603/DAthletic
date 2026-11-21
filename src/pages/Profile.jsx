import Icon from "../components/Icon.jsx";
import { PageHeader, Panel } from "../components/ui.jsx";

const goals = ["Ganar fuerza", "Ganar masa muscular", "Perder grasa", "Mejorar resistencia"];
const dayTicks = [1, 2, 3, 4, 5, 6, 7];
const preferences = [
  { icon: "bell", title: "Recordatorios de entrenamiento", desc: "Te avisamos los días que tenés rutina." },
  { icon: "clock", title: "Temporizador de descanso", desc: "Inicia automáticamente al terminar una serie." },
];

export default function Profile() {
  return (
    <section className="space-y-6">
      <PageHeader title="Perfil" />

      <div className="grid gap-6 lg:grid-cols-3">
        <Panel bodyClassName="items-center text-center">
          <div className="avatar avatar-placeholder">
            <div className="w-24 rounded-full bg-secondary text-secondary-content">
              <Icon name="user" className="size-10" />
            </div>
          </div>
          <h2 className="card-title mt-2">Tu nombre</h2>
          <p className="text-sm text-base-content/60">Miembro desde —</p>
          <div className="mt-2 flex flex-wrap justify-center gap-2">
            <span className="badge badge-ghost">0 rutinas</span>
            <span className="badge badge-ghost">0 sesiones</span>
          </div>
        </Panel>

        <Panel title="Datos personales" className="lg:col-span-2">
          <div className="grid gap-x-4 sm:grid-cols-2">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Nombre</legend>
              <input type="text" className="input w-full" placeholder="Ej. Dami" />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Objetivo</legend>
              <select className="select w-full" defaultValue="">
                <option value="" disabled>Elegí un objetivo</option>
                {goals.map((g) => <option key={g}>{g}</option>)}
              </select>
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Peso</legend>
              <label className="input w-full">
                <input type="number" placeholder="0" />
                <span className="label">kg</span>
              </label>
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Altura</legend>
              <label className="input w-full">
                <input type="number" placeholder="0" />
                <span className="label">cm</span>
              </label>
            </fieldset>
            <fieldset className="fieldset sm:col-span-2">
              <legend className="fieldset-legend">Días de entrenamiento por semana</legend>
              <input type="range" min="1" max="7" defaultValue="3" step="1" className="range range-sm range-primary" />
              <div className="flex justify-between px-1 text-xs text-base-content/50">
                {dayTicks.map((n) => <span key={n}>{n}</span>)}
              </div>
            </fieldset>
          </div>
          <div className="card-actions mt-2 justify-end">
            <button className="btn btn-ghost">Cancelar</button>
            <button className="btn btn-neutral">Guardar cambios</button>
          </div>
        </Panel>
      </div>

      <Panel title="Preferencias">
        <ul className="list -mx-4">
          {preferences.map((p) => (
            <li key={p.title} className="list-row items-center">
              <Icon name={p.icon} className="size-5 text-base-content/60" />
              <div>
                <p className="font-medium">{p.title}</p>
                <p className="text-sm text-base-content/60">{p.desc}</p>
              </div>
              <input type="checkbox" className="toggle toggle-primary" />
            </li>
          ))}
          <li className="list-row items-center">
            <Icon name="dumbbell" className="size-5 text-base-content/60" />
            <div>
              <p className="font-medium">Unidad de peso</p>
              <p className="text-sm text-base-content/60">Kilogramos o libras.</p>
            </div>
            <div role="tablist" className="tabs tabs-box tabs-xs">
              <input type="radio" name="unit" className="tab" aria-label="kg" defaultChecked />
              <input type="radio" name="unit" className="tab" aria-label="lb" />
            </div>
          </li>
        </ul>
      </Panel>
    </section>
  );
}
