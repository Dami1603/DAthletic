// Grupos musculares (para filtrar) y músculos (para indicar qué trabaja cada ejercicio).

export const groups = [
  { id: "pecho", label: "Pecho" },
  { id: "espalda", label: "Espalda" },
  { id: "hombros", label: "Hombros" },
  { id: "brazos", label: "Brazos" },
  { id: "piernas", label: "Piernas" },
  { id: "core", label: "Core" },
];

export const muscles = [
  { id: "pecho", label: "Pecho", group: "pecho" },
  { id: "dorsales", label: "Dorsales", group: "espalda" },
  { id: "trapecio", label: "Trapecio", group: "espalda" },
  { id: "lumbares", label: "Lumbares", group: "espalda" },
  { id: "hombro-anterior", label: "Hombro anterior", group: "hombros" },
  { id: "hombro-lateral", label: "Hombro lateral", group: "hombros" },
  { id: "hombro-posterior", label: "Hombro posterior", group: "hombros" },
  { id: "biceps", label: "Bíceps", group: "brazos" },
  { id: "triceps", label: "Tríceps", group: "brazos" },
  { id: "antebrazos", label: "Antebrazos", group: "brazos" },
  { id: "cuadriceps", label: "Cuádriceps", group: "piernas" },
  { id: "isquiotibiales", label: "Isquiotibiales", group: "piernas" },
  { id: "gluteos", label: "Glúteos", group: "piernas" },
  { id: "gemelos", label: "Gemelos", group: "piernas" },
  { id: "abdominales", label: "Abdominales", group: "core" },
  { id: "oblicuos", label: "Oblicuos", group: "core" },
];

export const equipment = [
  { id: "barra", label: "Barra" },
  { id: "mancuernas", label: "Mancuernas" },
  { id: "maquina", label: "Máquina" },
  { id: "polea", label: "Polea" },
  { id: "peso-corporal", label: "Peso corporal" },
];

const byId = (list) => Object.fromEntries(list.map((x) => [x.id, x]));
export const groupById = byId(groups);
export const muscleById = byId(muscles);
export const equipmentById = byId(equipment);
