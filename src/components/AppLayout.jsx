import { useEffect, useRef } from "react";
import { NavLink, Outlet, useLocation } from "react-router";
import Icon from "./Icon.jsx";
import Logo from "./Logo.jsx";
import ThemeToggle from "./ThemeToggle.jsx";
import NewRoutineModal from "./NewRoutineModal.jsx";
import Footer from "./Footer.jsx";
import { navItems } from "../lib/nav.js";

export default function AppLayout() {
  const modalRef = useRef(null);
  const { pathname } = useLocation();

  // Al cambiar de página, volver arriba.
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

  const openNewRoutine = () => modalRef.current?.showModal();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pt-6 pb-10 lg:px-8 lg:pt-8 lg:pb-12">
        <Outlet context={{ openNewRoutine }} />
      </main>
      <Footer />
      <Dock />
      <NewRoutineModal ref={modalRef} />
    </div>
  );
}

function Header() {
  const accountRef = useRef(null);
  const { pathname } = useLocation();

  // El dropdown <details> no se cierra solo al navegar.
  useEffect(() => {
    accountRef.current?.removeAttribute("open");
  }, [pathname]);

  return (
    <header className="sticky top-0 z-30 border-b border-base-300 bg-base-100/85 backdrop-blur">
      <div className="navbar mx-auto max-w-6xl gap-2 px-4 lg:px-8">
        <div className="navbar-start">
          <div className="lg:hidden"><Logo size="sm" /></div>
          <div className="hidden lg:block"><Logo /></div>
        </div>

        <nav className="navbar-center hidden lg:flex" aria-label="Navegación principal">
          <ul className="menu menu-horizontal gap-1">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.to === "/"} className={({ isActive }) => (isActive ? "menu-active" : "")}>
                  <Icon name={item.icon} className="size-4" />
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="navbar-end gap-1">
          {/* Oculto en pantallas muy angostas (< 640px) para que la barra entre en 320px. */}
          <button className="btn btn-ghost btn-circle hidden sm:inline-flex" aria-label="Buscar">
            <Icon name="search" />
          </button>
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
      </div>
    </header>
  );
}

function Dock() {
  return (
    <nav className="dock border-t border-base-300 bg-base-100 lg:hidden" aria-label="Navegación principal (móvil)">
      {navItems.map((item) => (
        <NavLink key={item.to} to={item.to} end={item.to === "/"} className={({ isActive }) => (isActive ? "dock-active" : "")}>
          <Icon name={item.icon} />
          <span className="dock-label">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
