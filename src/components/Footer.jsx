export default function Footer() {
  return (
    // Espacio extra en el celular para que el dock fijo no tape el pie. El dock mide 4rem más la zona segura
    // inferior del iPhone (viewport-fit=cover), así que se suma env(safe-area-inset-bottom).
    <footer className="border-t border-base-300 bg-base-100 pb-[calc(5rem_+_env(safe-area-inset-bottom))] lg:pb-0">
      <div className="footer mx-auto max-w-6xl gap-6 px-4 py-8 text-sm sm:footer-horizontal lg:px-8">
        <aside className="max-w-md">
          <h2 className="footer-title">Aviso de salud</h2>
          <p className="text-base-content/70">
            DAthletic ofrece información general sobre entrenamiento. No reemplaza el consejo de un médico ni de un
            profesional del deporte. Consultá antes de empezar una rutina, sobre todo si tenés lesiones o problemas
            de salud. Entrená bajo tu propia responsabilidad.
          </p>
        </aside>
        <div>
          <h2 className="footer-title">Créditos</h2>
          <p className="text-base-content/70">Íconos: Lucide (licencia ISC)</p>
          <p className="text-base-content/70">Hecho con React, Tailwind CSS y daisyUI</p>
        </div>
      </div>
      <div className="border-t border-base-300 py-4 text-center text-xs text-base-content/60">
        © {new Date().getFullYear()} DAthletic
      </div>
    </footer>
  );
}
