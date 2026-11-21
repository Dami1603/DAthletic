import { useMemo, useRef, useState } from "react";
import Icon from "../components/Icon.jsx";
import { EmptyState, PageHeader, Panel } from "../components/ui.jsx";
import RoutineCard from "../components/routines/RoutineCard.jsx";
import RoutineDetailModal from "../components/routines/RoutineDetailModal.jsx";
import RoutineFormModal from "../components/routines/RoutineFormModal.jsx";
import { useExercises } from "../lib/exercises.js";
import { AGES, GOALS, LEVELS, WEEKDAYS, filterRoutines, useActiveRoutine, useRoutines } from "../lib/routines.js";

const TABS = [
  { id: "popular", label: "Populares" },
  { id: "famosa", label: "Famosas" },
  { id: "propia", label: "Mis rutinas" },
];
const NO_FILTERS = { goal: "", level: "", age: "", days: "" };
const DAY_OPTIONS = [2, 3, 4, 5, 6];

export default function Routines() {
  const { routines, byId, saveRoutine, removeRoutine } = useRoutines();
  const { exercises, byId: exercisesById } = useExercises();
  const { active, activate, deactivate, clearIfRoutine } = useActiveRoutine(byId);

  const [tab, setTab] = useState("popular");
  const [filters, setFilters] = useState(NO_FILTERS);
  const [selected, setSelected] = useState({ id: null, n: 0 }); // n: cada apertura reinicia el detalle
  const detailRef = useRef(null);
  const [formState, setFormState] = useState({ initial: null, n: 0 }); // n: cada apertura empieza limpia
  const formRef = useRef(null);

  const visible = useMemo(() => filterRoutines(routines, { ...filters, kind: tab }), [routines, filters, tab]);
  const hasFilters = Object.values(filters).some(Boolean);
  const setFilter = (key) => (e) => setFilters((f) => ({ ...f, [key]: e.target.value }));

  const openDetail = (id) => {
    setSelected((s) => ({ id, n: s.n + 1 }));
    if (!detailRef.current?.open) detailRef.current?.showModal();
  };

  const openForm = (initial = null) => {
    setFormState((s) => ({ initial, n: s.n + 1 }));
    formRef.current?.showModal();
  };

  const handleDelete = (id) => {
    clearIfRoutine(id); // borrar la rutina activa la deja de usar
    removeRoutine(id);
  };

  // Si se edita la rutina activa y cambia la cantidad de días, deja de estar activa (hay que volver a elegir días).
  const handleSave = (data, id) => {
    const before = id ? byId[id] : null;
    const saved = saveRoutine(data, id);
    if (saved && before && saved.days.length !== before.days.length) clearIfRoutine(id);
    return saved;
  };

  return (
    <section className="space-y-6">
      <PageHeader title="Rutinas" subtitle="Elegí una rutina según tu objetivo, tu edad y tu experiencia, y los días que vas a entrenar.">
        <button className="btn btn-primary" onClick={() => openForm()}>
          <Icon name="plus" className="size-4" />
          Crear rutina
        </button>
      </PageHeader>

      {active && (
        <div className="card border border-primary/30 bg-secondary/50">
          <div className="card-body flex-row flex-wrap items-center justify-between gap-3 p-4">
            <div>
              <p className="text-sm text-base-content/60">Tu rutina activa</p>
              <p className="font-semibold">{active.routine.name}</p>
              <p className="text-sm text-base-content/70">{active.weekdays.map((d) => WEEKDAYS[d].label).join(", ")}</p>
            </div>
            <button className="btn btn-sm" onClick={() => openDetail(active.routine.id)}>Ver rutina</button>
          </div>
        </div>
      )}

      <div role="tablist" className="tabs tabs-border">
        {TABS.map((t) => (
          <button key={t.id} role="tab" aria-selected={tab === t.id} className={`tab ${tab === t.id ? "tab-active" : ""}`} onClick={() => setTab(t.id)}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <select className="select w-full" value={filters.goal} onChange={setFilter("goal")} aria-label="Objetivo">
          <option value="">Todos los objetivos</option>
          {GOALS.map((g) => <option key={g.id} value={g.id}>{g.label}</option>)}
        </select>
        <select className="select w-full" value={filters.level} onChange={setFilter("level")} aria-label="Experiencia">
          <option value="">Toda experiencia</option>
          {LEVELS.map((l) => <option key={l.id} value={l.id}>{l.label} ({l.hint})</option>)}
        </select>
        <select className="select w-full" value={filters.age} onChange={setFilter("age")} aria-label="Edad">
          <option value="">Todas las edades</option>
          {AGES.map((a) => <option key={a.id} value={a.id}>{a.label}</option>)}
        </select>
        <select className="select w-full" value={filters.days} onChange={setFilter("days")} aria-label="Días por semana">
          <option value="">Cualquier cantidad de días</option>
          {DAY_OPTIONS.map((n) => <option key={n} value={n}>{n} días por semana</option>)}
        </select>
      </div>

      {hasFilters && (
        <p className="text-sm text-base-content/60" aria-live="polite">
          {visible.length} rutina{visible.length === 1 ? "" : "s"} con estos filtros.{" "}
          <button className="link" onClick={() => setFilters(NO_FILTERS)}>Limpiar filtros</button>
        </p>
      )}

      {visible.length ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((r) => <RoutineCard key={r.id} routine={r} isActive={active?.routine.id === r.id} onOpen={openDetail} />)}
        </div>
      ) : (
        <div className="card bg-base-100 shadow-sm">
          {tab === "propia" && !hasFilters ? (
            <EmptyState icon="routines" title="Todavía no armaste rutinas propias" description="Armá la tuya eligiendo ejercicios de la lista.">
              <button className="btn btn-sm" onClick={() => openForm()}>Crear rutina</button>
            </EmptyState>
          ) : (
            <EmptyState icon="search" title="No hay rutinas con esos filtros" description="Probá quitando algún filtro.">
              <button className="btn btn-sm" onClick={() => setFilters(NO_FILTERS)}>Limpiar filtros</button>
            </EmptyState>
          )}
        </div>
      )}

      <Panel title="Plan semanal">
        {active ? (
          <ul className="list">
            {active.week.map(({ weekday, dayIndex }) => (
              <li key={weekday} className="list-row items-center">
                <span className="w-24 font-medium">{WEEKDAYS[weekday].label}</span>
                {dayIndex === null ? (
                  <span className="text-base-content/40">Descanso</span>
                ) : (
                  <span>{active.routine.days[dayIndex].name} <span className="text-sm text-base-content/50">· {active.routine.days[dayIndex].exercises.length} ejercicios</span></span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-base-content/60">Elegí una rutina y tocá «Usar esta rutina» para ver acá qué te toca cada día.</p>
        )}
      </Panel>

      <RoutineDetailModal
        ref={detailRef}
        openKey={selected.n}
        routine={selected.id ? byId[selected.id] ?? null : null}
        exercisesById={exercisesById}
        active={active}
        onActivate={activate}
        onDeactivate={deactivate}
        onEdit={openForm}
        onDelete={handleDelete}
      />
      <RoutineFormModal
        ref={formRef}
        openKey={formState.n}
        initial={formState.initial}
        exercises={exercises}
        activeRoutineId={active?.routine.id}
        onSave={handleSave}
        onSaved={(r) => {
          setTab("propia");
          setFilters(NO_FILTERS);
          openDetail(r.id);
        }}
      />
    </section>
  );
}
