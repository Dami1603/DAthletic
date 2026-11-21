---
author: Damian Dandrade
branch: main
status: in-progress
---
# Fase 2A — Catálogo de rutinas, rutina activa y días

## Intent
Primera mitad de la fase 2 de la guía: rutinas populares y «de famosos», separadas por objetivo
(hipertrofia o fuerza), edad y experiencia; elegir una rutina como activa y los días de la semana.
Inicio muestra qué toca hoy y la semana. Decisiones en [decisiones de producto](../decisiones-producto.md).

## Scope
- Dentro:
  - `src/data/routines.js`: ~8 rutinas populares (genéricas, sin marcas) y 4 «inspiradas en» figuras públicas
    con programas publicados en sus libros (aviso «no oficial»). Solo usan ejercicios de la lista base.
  - `src/lib/routines.js`: validación, filtros, rutina activa (`dathletic:active-routine`) y calendario semanal.
  - Pantalla Rutinas: pestañas Populares / Famosas / Mis rutinas (esta última vacía hasta 2B), filtros por
    objetivo, experiencia, edad y días por semana, detalle de la rutina (días → ejercicios con series,
    repeticiones y descanso), «Usar esta rutina» eligiendo exactamente N días de la semana, plan semanal real.
  - Inicio: «Entrenamiento de hoy» (sesión de hoy, día de descanso o sin rutina) y «Tu semana» con los días reales.
- Fuera: crear rutinas propias (2B), registrar series hechas (fase 3), el porcentaje del objetivo semanal (fase 3).
- Rangos de edad: 18–39, 40–59, 60+. Experiencia: principiante (< 6 meses), intermedio (6 meses a 2 años),
  avanzado (> 2 años).

## Checklist
- [x] Rutinas coherentes — prueba: script que valida ids, ejercicios existentes, días por semana = cantidad de días,
      objetivo/nivel/edades válidos, y que cada rango de edad tenga al menos una rutina para principiantes.
- [x] Filtros y calendario — prueba: script (filtros combinados, días sugeridos, lunes = 0, qué toca hoy).
- [x] Rutina activa guardada y validada — prueba: script con datos dañados.
- [x] Pantallas Rutinas e Inicio — prueba: `vite build` OK + código revisado.
- [x] `rsc risk` — prueba: salida del comando.
- [x] Revisión independiente si nivel ≥ 1 — prueba: informe; 0 importantes, 3 detalles de contenido corregidos.
- [x] Commit y push — prueba: `git push` OK.
- [ ] Revisión visual — la hace la persona.

## Evidence
- Script `scratchpad/routines-test.mjs` (fuera del repo):
  `ok 1 - 12 rutinas coherentes (4 famosas)` (8 populares; cada rango de edad y cada objetivo con al menos una
  para principiantes) · `ok 2 - filtros combinados` · `ok 3 - días sugeridos, lunes = 0, semana arma sesiones en orden` ·
  `ok 4 - rutina activa dañada no pasa la validación` · `ALL PASS`.
- Famosas elegidas por tener programas publicados en sus libros: Arnold Schwarzenegger, Reg Park, Bill Starr, Steve Reeves.
  Todas con `inspiredBy` + `source` y el aviso «no oficial» en tarjeta y detalle.
- Error evitado antes de probar: poner `key` en el `<dialog>` lo re-montaba recién abierto y se cerraba solo.
  El `key` (rutina + número de apertura) va en el contenido.
- Las otras pruebas siguen pasando: `storage-test` y `exercises-test` → `ALL PASS`.
- `vite build`: `✓ built in 1.59s`. Dev transforma `Routines.jsx`, `Home.jsx`, `RoutineDetailModal.jsx` (200).
- `rsc risk`: `tier 1`, `reviewers: 1`.
- Transitorio conocido: «Crear rutina» todavía abre la ventana de maqueta; se reemplaza en 2B.

- Revisor (contexto nuevo): sin hallazgos de código. Confirmó ciclo de vida del `<dialog>` (no se re-monta;
  el contenido se reinicia en cada apertura), selección de exactamente N días, semana lunes-primero, búsqueda de
  próxima sesión que da la vuelta (domingo → lunes), estado compartido Inicio/Rutinas, HTML válido en tarjetas,
  aviso «no oficial» en todas las famosas y fuentes plausibles. `vite build` OK.
  - Detalle, corregido: «Rutina dorada de Arnold» remitía a su «Golden Six» (otra rutina de 3 días); ahora
    «Rutina dividida de Arnold», que es la de su Enciclopedia.
  - Detalle, corregido: el 5×5 decía alternar A-B-A / B-A-B pero la app siempre arma A-B-A; el texto ahora lo aclara.
  - Detalle, corregido: la nota del peso muerto de Reg Park sugería saltear el calentamiento; ahora dice acortarlo, no saltearlo.
- Tras las correcciones: `routines-test` → `ALL PASS`; `vite build`: `✓ built in 1.33s`.

## Next
Revisión visual de la persona. Sigue la parte 2B (rutinas propias).
