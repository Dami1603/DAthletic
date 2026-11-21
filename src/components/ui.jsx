import Icon from "./Icon.jsx";

/** Título de página + subtítulo + acción opcional a la derecha. */
export function PageHeader({ title, subtitle, children }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">{title}</h1>
        {subtitle && <p className="text-base-content/60">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

/** Tarjeta base de la app. */
export function Panel({ title, className = "", bodyClassName = "", children }) {
  return (
    <div className={`card bg-base-100 shadow-sm ${className}`}>
      <div className={`card-body ${bodyClassName}`}>
        {title && <h2 className="card-title text-base">{title}</h2>}
        {children}
      </div>
    </div>
  );
}

/** Estado vacío con icono, título y descripción. */
export function EmptyState({ icon, title, description, children }) {
  return (
    <div className="flex flex-col items-center gap-3 py-10 text-center">
      <div className="grid size-14 place-items-center rounded-full bg-base-200 text-base-content/40">
        <Icon name={icon} className="size-7" />
      </div>
      <div>
        <p className="font-semibold">{title}</p>
        {description && <p className="text-sm text-base-content/60">{description}</p>}
      </div>
      {children}
    </div>
  );
}

/** Métrica individual en su propia caja. */
export function StatCard({ icon, title, value, unit, desc }) {
  return (
    <div className="stats bg-base-100 shadow-sm">
      <div className="stat">
        {icon && (
          <div className="stat-figure text-primary">
            <Icon name={icon} className="size-6" />
          </div>
        )}
        <div className="stat-title">{title}</div>
        <div className="stat-value">
          {value}
          {unit && <span className="text-base font-medium text-base-content/50"> {unit}</span>}
        </div>
        {desc && <div className="stat-desc">{desc}</div>}
      </div>
    </div>
  );
}
