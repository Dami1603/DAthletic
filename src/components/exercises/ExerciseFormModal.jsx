import { useState } from "react";
import { equipment, groupById, groups, muscles } from "../../data/muscles.js";

const SUBSTITUTE_SLOTS = [1, 2, 3];

/** Ventana para agregar un ejercicio propio. Llama a onSave(datos) y se cierra. */
export default function ExerciseFormModal({ ref, exercises, onSave }) {
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") ?? "").trim();
    const group = String(fd.get("group") ?? "");
    const primary = fd.getAll("primary");
    // `required` del navegador acepta un nombre de solo espacios: se valida acá antes de guardar.
    if (!name) return setError("Escribí un nombre para el ejercicio.");
    if (!(group in groupById)) return setError("Elegí un grupo muscular.");
    if (primary.length === 0) return setError("Elegí al menos un músculo principal.");

    const data = {
      name,
      group,
      equipment: fd.get("equipment"),
      primary,
      secondary: fd.getAll("secondary"),
      substitutes: fd.getAll("substitute").filter(Boolean),
      technique: fd.get("technique"),
      tips: { order: fd.get("order"), intensity: fd.get("intensity"), frequency: fd.get("frequency") },
    };
    form.reset();
    setError("");
    // Cerrar primero: así el foco vuelve a la página antes de abrir el detalle del ejercicio nuevo.
    ref.current?.close();
    onSave(data);
  }

  return (
    // onClose cubre Escape, el fondo y Cancelar: el error no queda colgado para la próxima vez.
    <dialog ref={ref} className="modal modal-bottom sm:modal-middle" onClose={() => setError("")}>
      <div className="modal-box max-w-2xl">
        <h3 className="text-lg font-bold">Agregar ejercicio</h3>
        <p className="text-sm text-base-content/60">Se guarda en este navegador.</p>

        {/* Cualquier cambio en el formulario borra el error anterior. */}
        <form className="mt-4 space-y-2" onSubmit={handleSubmit} onChange={() => error && setError("")}>
          <div className="grid gap-x-4 sm:grid-cols-2">
            <fieldset className="fieldset sm:col-span-2">
              <legend className="fieldset-legend">Nombre</legend>
              <input name="name" required maxLength={80} className="input w-full" placeholder="Ej. Press Arnold" />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Grupo muscular</legend>
              <select name="group" required defaultValue="" className="select w-full">
                <option value="" disabled>Elegí un grupo</option>
                {groups.map((g) => <option key={g.id} value={g.id}>{g.label}</option>)}
              </select>
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Equipo</legend>
              <select name="equipment" defaultValue="" className="select w-full">
                <option value="">Sin especificar</option>
                {equipment.map((q) => <option key={q.id} value={q.id}>{q.label}</option>)}
              </select>
            </fieldset>
          </div>

          <MuscleChecklist name="primary" legend="Músculos principales" />
          <MuscleChecklist name="secondary" legend="Músculos secundarios (opcional)" />

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Reemplazos si la máquina está ocupada (opcional)</legend>
            <div className="grid gap-2 sm:grid-cols-3">
              {SUBSTITUTE_SLOTS.map((n) => (
                <select key={n} name="substitute" defaultValue="" className="select select-sm w-full" aria-label={`Reemplazo ${n}`}>
                  <option value="">—</option>
                  {groups.map((g) => (
                    <optgroup key={g.id} label={g.label}>
                      {exercises.filter((ex) => ex.group === g.id).map((ex) => (
                        <option key={ex.id} value={ex.id}>{ex.name}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              ))}
            </div>
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Técnica (opcional)</legend>
            <textarea name="technique" rows={3} className="textarea w-full" placeholder="Un paso por línea" />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Consejos (opcional)</legend>
            <div className="grid gap-2 sm:grid-cols-3">
              <input name="order" className="input input-sm w-full" placeholder="Orden" aria-label="Orden" />
              <input name="intensity" className="input input-sm w-full" placeholder="Intensidad" aria-label="Intensidad" />
              <input name="frequency" className="input input-sm w-full" placeholder="Frecuencia" aria-label="Frecuencia" />
            </div>
          </fieldset>

          {error && <p role="alert" className="text-sm font-medium text-error">{error}</p>}
          <div className="modal-action">
            <button type="button" className="btn btn-ghost" onClick={() => ref.current?.close()}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">Guardar ejercicio</button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>cerrar</button>
      </form>
    </dialog>
  );
}

function MuscleChecklist({ name, legend }) {
  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">{legend}</legend>
      <div className="grid grid-cols-2 gap-x-4 gap-y-1 sm:grid-cols-4">
        {muscles.map((m) => (
          <label key={m.id} className="label cursor-pointer gap-2 text-sm text-base-content">
            <input type="checkbox" name={name} value={m.id} className="checkbox checkbox-sm" />
            {m.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
