// Fuente única de las secciones: la usan el menú lateral y el dock móvil.
export const navSections = [
  {
    title: "Entrenar",
    items: [
      { to: "/", label: "Inicio", icon: "home" },
      { to: "/rutinas", label: "Rutinas", icon: "routines" },
      { to: "/ejercicios", label: "Ejercicios", icon: "dumbbell" },
    ],
  },
  {
    title: "Seguimiento",
    items: [
      { to: "/progreso", label: "Progreso", icon: "chart" },
      { to: "/perfil", label: "Perfil", icon: "user" },
    ],
  },
];

export const navItems = navSections.flatMap((s) => s.items);
