---
author: Damian Dandrade
branch: main
status: in-progress
---
# Fase 2B — Rutinas propias

## Intent
Segunda mitad de la fase 2: que la persona arme sus propias rutinas con los ejercicios de la lista
(base y propios), las edite y las borre, y que pueda usarlas como rutina activa igual que las de la app.
Decisión en [decisiones de producto](../decisiones-producto.md) («Rutinas propias: sí»).

## Scope
- Dentro:
  - `src/lib/routines.js`: rutinas propias guardadas en el navegador (`dathletic:custom-routines`), validadas al
    leer y al guardar; crear, editar y borrar.
  - Ventana «Crear rutina» real: nombre, objetivo, experiencia, edades, descripción, días (1 a 7) con nombre y
    ejercicios (ejercicio, series, repeticiones, descanso).
  - Detalle de una rutina propia: «Editar» y «Borrar». Pestaña «Mis rutinas» con las propias.
  - Se quita la ventana de maqueta (`NewRoutineModal.jsx`) y su conexión en `AppLayout.jsx`.
- Comportamiento definido:
  - Borrar la rutina activa la deja de usar.
  - Editar la rutina activa cambiando la cantidad de días la deja sin días: hay que volver a elegirlos (se avisa).
- Fuera: registrar series hechas (fase 3), copiar una rutina de la app para modificarla.

## Checklist
- [x] Alta y validación de rutinas propias — prueba: script (limpieza de datos, rechazos, edición conserva el id).
- [x] Ventana de creación y edición — prueba: `vite build` OK + código revisado.
- [x] Borrar / editar la rutina activa se comporta como está definido — prueba: lógica revisada.
- [x] Sin restos de la maqueta — prueba: búsqueda de `NewRoutineModal|openNewRoutine` sin resultados.
- [x] `rsc risk` — prueba: salida del comando.
- [x] Revisión independiente si nivel ≥ 1 — prueba: informe; 0 importantes, 3 detalles corregidos, 1 anotado.
- [x] Commit y push — prueba: `git push` OK.
- [ ] Revisión visual — la hace la persona.

## Evidence
- Script `scratchpad/custom-routines-test.mjs` (fuera del repo):
  `ok 1 - alta limpia datos (nombre, edades, días vacíos, filas sin ejercicio, números)` ·
  `ok 2 - edición conserva el id` ·
  `ok 3 - rechaza sin nombre, sin edades, objetivo/nivel inválidos, sin ejercicios; máximo 7 días` · `ALL PASS`.
- El formulario valida antes de guardar (nombre, edades, días con ejercicios, filas con ejercicio elegido) y
  `saveRoutine` devuelve `null` sin guardar si `isValidRoutine` falla.
- Borrar la activa: `handleDelete` llama a `deactivate()` antes de `removeRoutine()`. Editarla cambiando la cantidad
  de días: aviso en el formulario; `useActiveRoutine` la toma como inactiva por no coincidir los días.
- `NewRoutineModal.jsx` borrado (`git rm`); búsqueda de `NewRoutineModal|openNewRoutine|useOutletContext` en `src`: sin resultados.
- Las cinco pruebas: `storage`, `exercises-test`, `routines-test`, `custom-routines-test` → `ALL PASS`.
- `vite build`: `✓ built in 1.25s`. Dev transforma `Routines.jsx`, `RoutineFormModal.jsx`, `AppLayout.jsx` (200).
- `rsc risk`: `tier 1`, `reviewers: 1`.

- Revisor (contexto nuevo): `ALL PASS`, build OK, sin restos ni imports sin uso. Confirmó los flujos crear → detalle,
  editar (mismo id), borrar con confirmación, reinicio del formulario en cada apertura, estado sin datos viejos,
  claves sin duplicados, botones `type="button"`, etiquetas en las filas, Inicio/Rutinas sin errores sin rutina activa.
  - Detalle, corregido: un ejercicio propio borrado aparecía como «Elegí un ejercicio» pero se guardaba con el id viejo.
    Ahora la fila queda vacía al editar y la validación pide elegir otro.
  - Detalle, corregido: series fuera de 1–10 o repeticiones vacías se guardaban en silencio como 1/10 y «10».
    Ahora el formulario lo avisa y no guarda.
  - Detalle, corregido: editar la activa cambiando la cantidad de días dejaba guardada la activa vieja (podía volver
    sola). Ahora `clearIfRoutine` la borra al guardar con otra cantidad de días y al borrar la rutina.
  - Detalle, anotado (confianza baja según el revisor): el foco podría caer en la caja del diálogo al re-montarse el
    contenido recién abierto. No se cambió.
- Tras las correcciones: `routines-test` y `custom-routines-test` → `ALL PASS`; `vite build`: `✓ built in 1.27s`.

## Next
Revisión visual de la persona: crear, editar, usar como activa y borrar una rutina propia.
