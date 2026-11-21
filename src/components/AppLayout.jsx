import { useEffect, useRef, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router";
import Icon from "./Icon.jsx";
import Logo from "./Logo.jsx";
import ThemeToggle from "./ThemeToggle.jsx";
import NewRoutineModal from "./NewRoutineModal.jsx";
import { navItems, navSections } from "../lib/nav.js";

export default function AppLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const modalRef = useRef(null);
  const { pathname } = useLocation();

  // Al cambiar de página: cerrar el menú móvil y volver arriba.
  useEffect(() => {
    setDrawerOpen(false);
    window.scrollTo({ top: 0 });
  }, [pathname]);

  const openNewRoutine = () => modalRef.current?.showModal();

  return (
    <>
      <div className="drawer lg:drawer-open">
        <input
          id="app-drawer"
          type="checkbox"
          className="drawer-toggle"
          checked={drawerOpen}
          onChange={(e) => setDrawerOpen(e.target.checked)}
        />

        <div className="drawer-content flex min-h-screen flex-col">
          <Navbar />
          <main className="mx-auto w-full max-w-6xl flex-1 px-4 pt-6 pb-28 lg:px-8 lg:pt-8 lg:pb-12">
            <Outlet context={{ openNewRoutine }} />
          </main>
          <Dock />
        </div>

        <aside className="drawer-side z-40">
          <label htmlFor="app-drawer" aria-label="Cerrar menú" className="drawer-overlay" />
          <Sidebar onNewRoutine={openNewRoutine} />
        </aside>
      </div>

      <NewRoutineModal ref={modalRef} />
    </>
  );
}

function Navbar() {
  const accountRef = useRef(null);
  const { pathname } = useLocation();

  // El dropdown <details> no se cierra solo al navegar.
  useEffect(() => {
    accountRef.current?.removeAttribute("open");
  }, [pathname]);

  return (
    <header className="navbar sticky top-0 z-30 gap-2 border-b border-base-300 bg-base-100/85 px-4 backdrop-blur lg:px-8">
      <div className="navbar-start gap-2">
        <label htmlFor="app-drawer" aria-label="Abrir menú" className="btn btn-ghost btn-square drawer-button lg:hidden">
          <Icon name="menu" />
        </label>
        <Logo size="sm" className="lg:hidden" />
        <label className="input hidden w-72 lg:flex">
          <Icon name="search" className="size-4 opacity-50" />
          <input type="search" placeholder="Buscar rutinas o ejercicios" />
        </label>
      </div>
      <div className="navbar-end gap-1">
        <ThemeToggle />
        <button className="btn btn-ghost btn-circle" aria-label="Notificaciones">
          <div className="indicator">
            <span className="status status-primary indicator-item" />
            <Icon name="bell" />
          </div>
        </button>
        <details ref={accountRef} className="dropdown dropdown-end">
          <summary className="btn btn-ghost btn-circle avatar avatar-placeholder" aria-label="Cuenta">
            <div className="w-9 rounded-full bg-secondary text-secondary-content">
              <span className="text-sm font-semibold">DA</span>
            </div>
          </summary>
          <ul className="menu dropdown-content z-40 mt-3 w-52 rounded-box border border-base-300 bg-base-100 p-2 shadow-lg">
            <li><NavLink to="/perfil"><Icon name="user" className="size-4" />Mi perfil</NavLink></li>
            <li><NavLink to="/perfil"><Icon name="settings" className="size-4" />Ajustes</NavLink></li>
            <li><button><Icon name="logout" className="size-4" />Cerrar sesión</button></li>
          </ul>
        </details>
      </div>
    </header>
  );
}

function Sidebar({ onNewRoutine }) {
  return (
    <div className="flex min-h-full w-64 flex-col border-r border-base-300 bg-base-100">
      <Logo className="px-6 py-5" />

      <ul className="menu w-full gap-1 px-4">
        {navSections.map((section, i) => (
          <SidebarSection key={section.title} section={section} first={i === 0} />
        ))}
      </ul>

      <div className="mt-auto p-4">
        <div className="rounded-box bg-secondary p-4 text-secondary-content">
          <Icon name="target" className="size-6" />
          <p className="mt-2 font-semibold">Empezá tu plan</p>
          <p className="text-sm opacity-80">Armá tu primera rutina en menos de 2 minutos.</p>
          <button className="btn btn-sm btn-block mt-3" onClick={onNewRoutine}>Comenzar</button>
        </div>
      </div>
    </div>
  );
}

function SidebarSection({ section, first }) {
  return (
    <>
      <li className={`menu-title ${first ? "" : "mt-4"}`}>{section.title}</li>
      {section.items.map((item) => (
        <li key={item.to}>
          <NavLink to={item.to} end={item.to === "/"} className={({ isActive }) => (isActive ? "menu-active" : "")}>
            <Icon name={item.icon} />
            {item.label}
          </NavLink>
        </li>
      ))}
    </>
  );
}

function Dock() {
  return (
    <nav className="dock border-t border-base-300 bg-base-100 lg:hidden" aria-label="Navegación principal">
      {navItems.map((item) => (
        <NavLink key={item.to} to={item.to} end={item.to === "/"} className={({ isActive }) => (isActive ? "dock-active" : "")}>
          <Icon name={item.icon} />
          <span className="dock-label">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
