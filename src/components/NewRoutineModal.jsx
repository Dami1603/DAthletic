const days = ["L", "M", "X", "J", "V", "S", "D"];

/** Diálogo "Nueva rutina". Se abre con ref.current.showModal(). */
export default function NewRoutineModal({ ref }) {
  return (
    <dialog ref={ref} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="text-lg font-bold">Nueva rutina</h3>
        <p className="text-sm text-base-content/60">Podés agregar ejercicios después.</p>
        <form method="dialog" className="mt-4 space-y-1">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Nombre</legend>
            <input type="text" className="input w-full" placeholder="Ej. Tren superior" />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Tipo</legend>
            <select className="select w-full" defaultValue="">
              <option value="" disabled>Elegí un tipo</option>
              <option>Fuerza</option>
              <option>Hipertrofia</option>
              <option>Cardio</option>
              <option>Movilidad</option>
            </select>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Días</legend>
            <div className="flex flex-wrap gap-2">
              {days.map((d) => (
                <input key={d} className="btn btn-sm btn-circle" type="checkbox" aria-label={d} />
              ))}
            </div>
          </fieldset>
          <div className="modal-action">
            <button className="btn btn-ghost">Cancelar</button>
            <button className="btn btn-primary">Crear rutina</button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>cerrar</button>
      </form>
    </dialog>
  );
}
