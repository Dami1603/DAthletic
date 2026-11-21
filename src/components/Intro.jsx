import { Link } from "react-router";
import Icon from "./Icon.jsx";
import { KEYS, usePersistentState } from "../lib/storage.js";

const highlights = [
  { icon: "routines", title: "Rutinas", text: "De hipertrofia y de fuerza, según tu experiencia." },
  { icon: "dumbbell", title: "Ejercicios", text: "Qué músculo trabaja cada uno y con qué reemplazarlo." },
  { icon: "chart", title: "Progreso", text: "Registrá tus series y mirá cómo avanzás." },
];

const isBoolean = (v) => typeof v === "boolean";

/** Bienvenida arriba de Inicio. Al cerrarla queda guardado y no vuelve a aparecer. */
export default function Intro() {
  const [dismissed, setDismissed] = usePersistentState(KEYS.introDismissed, false, isBoolean);
  if (dismissed) return null;

  return (
    <div className="card border border-primary/20 bg-secondary/60">
      <div className="card-body gap-5 p-6 lg:p-8">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h2 className="card-title text-xl">Bienvenido a DAthletic</h2>
            <p className="text-base-content/70">Tu lugar para armar rutinas de gimnasio, aprender los ejercicios y seguir tu progreso.</p>
          </div>
          <button className="btn btn-ghost btn-sm btn-circle" aria-label="Cerrar bienvenida" onClick={() => setDismissed(true)}>
            ✕
          </button>
        </div>
        <ul className="grid gap-3 sm:grid-cols-3">
          {highlights.map((h) => (
            <li key={h.title} className="flex gap-3 rounded-box bg-base-100 p-4">
              <Icon name={h.icon} className="size-5 shrink-0 text-primary" />
              <div>
                <p className="font-semibold">{h.title}</p>
                <p className="text-sm text-base-content/70">{h.text}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="card-actions">
          <Link to="/ejercicios" className="btn btn-neutral btn-sm">Ver ejercicios</Link>
          <button className="btn btn-ghost btn-sm" onClick={() => setDismissed(true)}>Entendido</button>
        </div>
      </div>
    </div>
  );
}
