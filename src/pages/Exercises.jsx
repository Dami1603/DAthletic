import Icon from "../components/Icon.jsx";
import { PageHeader } from "../components/ui.jsx";

const muscles = ["Pecho", "Espalda", "Piernas", "Hombros", "Brazos", "Core"];
const equipment = ["Mancuernas", "Barra", "Máquina", "Peso corporal"];

// Anchos variados para que las tarjetas vacías no se vean idénticas.
const skeletons = [
  ["w-3/4", ["w-14", "w-10"]],
  ["w-2/3", ["w-12", "w-12"]],
  ["w-4/5", ["w-16"]],
  ["w-1/2", ["w-14", "w-10"]],
  ["w-3/4", ["w-12"]],
  ["w-2/3", ["w-16", "w-10"]],
  ["w-4/5", ["w-12", "w-12"]],
  ["w-1/2", ["w-14"]],
];

export default function Exercises() {
  return (
    <section className="space-y-6">
      <PageHeader title="Ejercicios" subtitle="Tu biblioteca de movimientos.">
        <button className="btn btn-primary">
          <Icon name="plus" className="size-4" />
          Agregar ejercicio
        </button>
      </PageHeader>

      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="input w-full sm:max-w-sm">
          <Icon name="search" className="size-4 opacity-50" />
          <input type="search" placeholder="Buscar ejercicio" />
        </label>
        <select className="select w-full sm:w-48" defaultValue="">
          <option value="">Todos los músculos</option>
          {muscles.map((m) => <option key={m}>{m}</option>)}
        </select>
        <select className="select w-full sm:w-48" defaultValue="">
          <option value="">Todo el equipo</option>
          {equipment.map((e) => <option key={e}>{e}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
        {skeletons.map(([title, tags], i) => (
          <div key={i} className="card bg-base-100 shadow-sm">
            <figure className="grid aspect-[4/3] place-items-center bg-base-200 text-base-content/20">
              <Icon name="image" className="size-10" />
            </figure>
            <div className="card-body gap-2 p-4">
              <div className={`skeleton h-4 ${title}`} />
              <div className="flex gap-2">
                {tags.map((w, j) => <div key={j} className={`skeleton h-4 rounded-full ${w}`} />)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
