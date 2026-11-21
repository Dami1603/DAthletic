---
author: Damian Dandrade
branch: main
status: in-progress
---
# Fase 1B — Lista de ejercicios

## Intent
Segunda mitad de la fase 1 de la guía: la lista de ejercicios. Cada ejercicio dice qué músculo trabaja,
con qué reemplazarlo si la máquina está ocupada, cómo se hace y consejos de orden, intensidad y frecuencia.
La persona puede agregar sus propios ejercicios, que se guardan en el navegador.
Decisiones en [decisiones de producto](../decisiones-producto.md). Es la base de las fases 2 a 4.

## Scope
- Dentro:
  - `src/data/muscles.js`: músculos, grupos (Pecho, Espalda, Hombros, Brazos, Piernas, Core) y equipos.
  - `src/data/exercises.js`: lista base (~36 ejercicios comunes), todos con reemplazos que existen en la lista.
  - `src/lib/exercises.js`: une la lista base con los ejercicios propios (`dathletic:custom-exercises`).
  - Pantalla Ejercicios: búsqueda y filtros que funcionan, tarjeta por ejercicio, ventana de detalle
    (recuadro «Modelo 3D próximamente», músculos, técnica, consejos, reemplazos navegables),
    ventana para agregar un ejercicio propio y borrar los propios.
- Fuera: rutinas, registro de series, modelos 3D, editar ejercicios de la lista base.
- Riesgo de contenido: los consejos son generales y prudentes; el aviso de salud del pie (parte A) los cubre.

## Checklist
- [x] Lista base coherente — prueba: script que valida ids únicos, músculos/grupos/equipos existentes y reemplazos que apuntan a ejercicios reales.
- [x] Ejercicios propios se guardan y se validan — prueba: datos dañados en el navegador no rompen la pantalla (validación revisada + script).
- [x] Búsqueda y filtros — prueba: función de filtrado probada con script.
- [x] Detalle y alta — prueba: `vite build` OK + código revisado.
- [x] `rsc risk` — prueba: salida del comando.
- [x] Revisión independiente si nivel ≥ 1 — prueba: informe; 1 importante y 4 detalles corregidos.
- [x] Commit y push — prueba: `git push` OK.
- [ ] Revisión visual — la hace la persona.

## Evidence
- Script `scratchpad/exercises-test.mjs` (fuera del repo; el proyecto no tiene corredor de tests):
  - `ok 1 - 36 ejercicios coherentes; por grupo {"pecho":7,"espalda":6,"hombros":6,"brazos":5,"piernas":8,"core":4}; sin reemplazos: elevacion-talones`
  - `ok 2 - búsqueda (sin importar tildes/mayúsculas), grupo y equipo`
  - `ok 3 - alta limpia datos (espacios, duplicados, músculos inventados, líneas vacías)`
  - `ok 4 - ejercicios dañados no pasan la validación` · `ALL PASS`
- `elevacion-talones` no tiene reemplazos en la lista base; el detalle muestra «Sin reemplazos cargados».
- `vite build`: `✓ built in 2.07s`. Dev transforma `Exercises.jsx`, `ExerciseFormModal.jsx`, `lib/exercises.js` (200).
- `rsc risk`: `tier 1`, `reviewers: 1`.

- Revisor (contexto nuevo): `ALL PASS`, build OK, sin bucle de render, `byId` tiene el nuevo id en el mismo render,
  borrar cierra sin error y limpia reemplazos, contenido sin indicaciones inseguras.
  - **Importante, corregido:** un nombre de solo espacios pasaba `required`, se guardaba un ejercicio inválido y el
    detalle se abría vacío y sin botón de cierre. Ahora `handleSubmit` valida nombre, grupo y músculo principal antes
    de guardar, y `addExercise` devuelve `null` sin guardar si `isValidExercise` falla. Prueba: `ok 5 - nombre vacío o
    grupo inválido no pasan (addExercise no guarda)`.
  - Detalle, corregido: al abrir un reemplazo, la caja vuelve arriba y el foco pasa al título.
  - Detalle, corregido: el formulario se cierra antes de abrir el detalle (el foco ya no se pierde).
  - Detalle, corregido: el error se borra al cerrar de cualquier forma (`onClose`) y al cambiar el formulario.
  - Detalle, corregido: la tarjeta usa solo `<span>` dentro del `<button>` (HTML válido).
- Tras las correcciones: script `ok 1–5 · ALL PASS`; `vite build`: `✓ built in 2.35s`.

## Next
Revisión visual de la persona en `/ejercicios`: buscar, filtrar, abrir detalle, saltar a un reemplazo,
agregar y borrar un ejercicio propio.
