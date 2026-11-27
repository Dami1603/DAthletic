---
author: Damian Dandrade
branch: main
status: in-progress
---
# Resumen de sesión: tiempo y series por músculo

## Intent
En la ventana de detalle de una rutina, cada sesión muestra cuánto tiempo lleva (cada serie + su descanso) y
cuántas series tiene. Tocar las series abre un desplegable con las series de cada músculo. Pedido de la persona
(2026-11-27).

## Scope
- Dentro:
  - `src/lib/routines.js`: `setSeconds`, `sessionSummary`, `formatDuration` (funciones puras).
  - `RoutineDetailModal.jsx`: resumen en la cabecera de cada sesión (reloj + botón «N series ▾» con desplegable).
- Criterios definidos (cambiables si la persona lo pide):
  - Duración de una serie: repeticiones promedio del rango × 3 s («8–10» → 27 s); si dice segundos («30 s»),
    ese tiempo; texto sin números → 40 s.
  - Tiempo = suma de (series × (duración de serie + descanso)), sin el descanso tras la última serie.
    No incluye calentamiento ni cambios de ejercicio. Se muestra redondeado a 5 min («≈ 45 min»).
  - Series por músculo: solo el músculo **principal** de cada ejercicio (los secundarios no suman).
  - Es por sesión (cada día de la rutina), no por semana.
- Fuera: total semanal por músculo, contar secundarios como media serie, ejercicios «por pierna» al doble de tiempo.

## Checklist
- [x] Cálculo de duración, series y músculos — prueba: script de pruebas.
- [x] Resumen y desplegable en la ventana — prueba: `vite build` OK + código revisado.
- [x] `rsc risk` — prueba: salida del comando.
- [x] Revisión — autorrevisión (sin revisor aparte, para ahorrar tokens).
- [x] Commit.
- [ ] Revisión visual — la hace la persona.

## Evidence
- Script `scratchpad/summary-test.mjs` (fuera del repo): `ok 1 - duración de una serie` ·
  `ok 2 - suma series + descansos, sin descanso final; ejercicio borrado no rompe` · `ok 3 - formato` ·
  `ok 4 - todas las sesiones base tienen músculos` · `ALL PASS`.
  Ejemplo: «Cuerpo completo 3 días · Día 1: ≈ 30 min · 14 series». Sesiones base: entre 17 y 50 min.
- `vite build`: `✓ built in 1.12s`.
- `rsc risk --base HEAD` sobre los dos archivos: `tier 1`, `reviewers: 1`, sin aprobación humana obligatoria.
- Autorrevisión: ejercicio propio borrado → no suma músculos ni rompe; rutinas propias ya validan `sets` entero
  y `rest` numérico; el desplegable usa el patrón de foco de daisyUI (se cierra al tocar fuera).
  Anotado: tocar otra vez el botón no cierra el desplegable (limitación del patrón de foco).

## Next
Revisión visual de la persona (`npm.cmd run dev` → Rutinas → abrir una rutina → «N series ▾»).
