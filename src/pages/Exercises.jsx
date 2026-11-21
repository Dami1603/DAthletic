import { useMemo, useRef, useState } from "react";
import Icon from "../components/Icon.jsx";
import { EmptyState, PageHeader } from "../components/ui.jsx";
import ExerciseCard from "../components/exercises/ExerciseCard.jsx";
import ExerciseDetailModal from "../components/exercises/ExerciseDetailModal.jsx";
import ExerciseFormModal from "../components/exercises/ExerciseFormModal.jsx";
import { equipment, groups } from "../data/muscles.js";
import { filterExercises, useExercises } from "../lib/exercises.js";

const NO_FILTERS = { query: "", group: "", equipment: "" };

export default function Exercises() {
  const { exercises, byId, addExercise, removeExercise } = useExercises();
  const [filters, setFilters] = useState(NO_FILTERS);
  const [selectedId, setSelectedId] = useState(null);
  const detailRef = useRef(null);
  const formRef = useRef(null);

  const visible = useMemo(() => filterExercises(exercises, filters), [exercises, filters]);
  const hasFilters = filters.query || filters.group || filters.equipment;
  const setFilter = (key) => (e) => setFilters((f) => ({ ...f, [key]: e.target.value }));

  const openDetail = (id) => {
    setSelectedId(id);
    if (!detailRef.current?.open) detailRef.current?.showModal();
  };

  return (
    <section className="space-y-6">
      <PageHeader title="Ejercicios" subtitle={`${exercises.length} ejercicios: qué trabajan, cómo se hacen y con qué reemplazarlos.`}>
        <button className="btn btn-primary" onClick={() => formRef.current?.showModal()}>
          <Icon name="plus" className="size-4" />
          Agregar ejercicio
        </button>
      </PageHeader>

      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="input w-full sm:max-w-sm">
          <Icon name="search" className="size-4 opacity-50" />
          <input type="search" placeholder="Buscar por nombre o músculo" value={filters.query} onChange={setFilter("query")} />
        </label>
        <select className="select w-full sm:w-48" value={filters.group} onChange={setFilter("group")} aria-label="Grupo muscular">
          <option value="">Todos los músculos</option>
          {groups.map((g) => <option key={g.id} value={g.id}>{g.label}</option>)}
        </select>
        <select className="select w-full sm:w-48" value={filters.equipment} onChange={setFilter("equipment")} aria-label="Equipo">
          <option value="">Todo el equipo</option>
          {equipment.map((q) => <option key={q.id} value={q.id}>{q.label}</option>)}
        </select>
      </div>

      {hasFilters && (
        <p className="text-sm text-base-content/60" aria-live="polite">
          {visible.length} de {exercises.length} ejercicios.{" "}
          <button className="link" onClick={() => setFilters(NO_FILTERS)}>Limpiar filtros</button>
        </p>
      )}

      {visible.length ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
          {visible.map((ex) => <ExerciseCard key={ex.id} exercise={ex} onOpen={openDetail} />)}
        </div>
      ) : (
        <div className="card bg-base-100 shadow-sm">
          <EmptyState icon="search" title="No hay ejercicios con esos filtros" description="Probá con otra palabra o quitá algún filtro.">
            <button className="btn btn-sm" onClick={() => setFilters(NO_FILTERS)}>Limpiar filtros</button>
          </EmptyState>
        </div>
      )}

      <ExerciseDetailModal
        ref={detailRef}
        exercise={selectedId ? byId[selectedId] ?? null : null}
        byId={byId}
        onSelect={openDetail}
        onDelete={removeExercise}
      />
      <ExerciseFormModal
        ref={formRef}
        exercises={exercises}
        onSave={(data) => {
          const ex = addExercise(data);
          if (ex) openDetail(ex.id);
        }}
      />
    </section>
  );
}
