---
author: Damian Dandrade
branch: main
status: in-progress
---
# Fase 1A — Pie de página, introducción y guardado en el navegador

## Intent
Primera mitad de la fase 1 de la guía: pie de página con aviso legal y créditos, una introducción corta
y la base para guardar datos en el navegador (localStorage), que después usan los ejercicios.
Decisiones en [decisiones de producto](../decisiones-producto.md).

## Scope
- Dentro:
  - `src/lib/storage.js`: guardado en el navegador que nunca rompe la app (si el navegador lo bloquea,
    sigue funcionando sin guardar) y un hook `usePersistentState`, compartido entre componentes.
  - `src/components/Footer.jsx`: aviso de salud, «© DAthletic», créditos técnicos. Visible en todas las pantallas.
  - `src/components/Intro.jsx`: bienvenida arriba de Inicio; se cierra y queda guardado que se cerró.
  - `ThemeToggle.jsx` pasa a usar `storage.js` (misma clave `dathletic-theme`, no se pierde el tema elegido).
- Fuera: ejercicios (parte B), guardar el formulario de Perfil, cualquier cambio de diseño de las pantallas.

## Checklist
- [x] `storage.js` tolera un navegador sin localStorage — prueba: script con `localStorage` que lanza errores, sin excepciones.
- [x] Pie visible en todas las pantallas y por encima del dock en el celular — prueba: código revisado + `vite build` OK.
- [x] Introducción se cierra y no vuelve — prueba: lógica revisada (clave guardada) + `vite build` OK.
- [x] El tema elegido antes se conserva — prueba: misma clave y mismos valores en el código.
- [x] `rsc risk` — prueba: salida del comando.
- [x] Revisión independiente si nivel ≥ 1 — prueba: informe; 1 importante y 2 detalles corregidos.
- [x] Commit y push — prueba: `git push` OK.
- [ ] Revisión visual — la hace la persona.

## Evidence
- Error encontrado antes de probar: el tema viejo se guardaba como texto plano (`dathletic-dark`, no JSON);
  `JSON.parse` fallaba y quien eligió modo oscuro lo perdía. Corregido: `readValue` lee texto plano como string
  y acepta `validate` (forma incorrecta → valor inicial). `ThemeToggle` valida con `isTheme`, `Intro` con `isBoolean`.
- Script de prueba (`scratchpad/storage-test.mjs`, fuera del repo; el proyecto no tiene corredor de tests):
  `ok 1 - bloqueado: sin excepciones, usa memoria` · `ok 2 - tema viejo en texto plano se conserva` ·
  `ok 3 - dañado o con forma incorrecta: valor inicial` · `ok 4 - guarda JSON en localStorage` · `ALL PASS`.
- Pie: `Footer.jsx` con `footer`, `footer-title`, `sm:footer-horizontal`; `pb-20 lg:pb-0` para no quedar bajo el dock.
  `main` pasa de `pb-28` a `pb-10`. Intro arriba de `Home.jsx`, clave `dathletic:intro-dismissed`.
- `vite build`: `✓ built in 2.35s`. `rsc risk`: `tier 1`, `reviewers: 1`.

- Revisor (contexto nuevo): confirmó `ALL PASS`, snapshot estable (sin bucle de render), updater con función,
  nada lanza excepciones, tema viejo conservado, intro accesible, clases de daisyUI correctas. `vite build` OK.
  - **Importante, corregido:** con `viewport-fit=cover` el dock mide `4rem + env(safe-area-inset-bottom)` (~98 px en
    iPhone con notch) y `pb-20` (80 px) dejaba «© DAthletic» debajo. Ahora `pb-[calc(5rem_+_env(safe-area-inset-bottom))]`;
    la regla `padding-bottom:calc(5rem + env(safe-area-inset-bottom))` está en el CSS compilado.
  - Detalle, corregido: «Aviso de salud» pasa a `h2.footer-title`, igual que «Créditos».
  - Detalle, corregido: créditos en `<div>` en vez de `<nav>` (no tiene enlaces).
  - Detalle, aceptado: no se escucha el evento `storage`; un cambio en otra pestaña se ve al recargar.
- `vite build` tras las correcciones: `✓ built in 1.88s`.

## Next
Revisión visual de la persona (sobre todo el pie en el celular).
