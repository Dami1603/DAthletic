import { WEEKDAYS } from "../../lib/routines.js";

/** Elegir exactamente `count` días de la semana. `value` es un array de índices (lunes = 0). */
export default function WeekdayPicker({ count, value, onChange }) {
  const full = value.length >= count;
  const toggle = (d) => onChange(value.includes(d) ? value.filter((x) => x !== d) : [...value, d].sort((a, b) => a - b));

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Días de entrenamiento">
        {WEEKDAYS.map((w, d) => {
          const checked = value.includes(d);
          return (
            <input
              key={d}
              type="checkbox"
              className="btn btn-circle"
              aria-label={w.short}
              title={w.label}
              checked={checked}
              disabled={!checked && full}
              onChange={() => toggle(d)}
            />
          );
        })}
      </div>
      <p className={`text-sm ${value.length === count ? "text-success" : "text-base-content/60"}`} aria-live="polite">
        {value.length} de {count} días elegidos
      </p>
    </div>
  );
}
