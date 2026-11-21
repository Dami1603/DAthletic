---
author: Damian Dandrade
branch: main
status: in-progress
---
# Navegación en la barra superior

## Intent
La guía de ideas pide «header con navegación entre secciones». La persona decidió (2026-11-21) pasar la
navegación del menú lateral a una barra arriba. Ver [decisiones de producto](../decisiones-producto.md).

## Scope
- Dentro: `src/components/AppLayout.jsx` — quitar el menú lateral (drawer); barra superior con logo, las
  5 secciones y las acciones (tema, notificaciones, cuenta). En móvil sigue la barra inferior (dock).
- Fuera: el pie de página y la introducción (fase 1 de la guía, otro cambio). Las pantallas no cambian.
- Se quita la tarjeta «Empezá tu plan» del menú lateral: «Crear rutina» sigue en Inicio y Rutinas.
- El buscador de la barra pasa a ser un botón con lupa (todavía no busca nada; Ejercicios tiene su buscador).

## Checklist
- [x] Barra superior con las 5 secciones en escritorio — prueba: `vite build` OK y el HTML del layout sin `drawer`.
- [x] Móvil: logo + acciones arriba, dock abajo — prueba: clases responsive revisadas en el código.
- [x] El menú de la cuenta se cierra al navegar y la ventana «Nueva rutina» sigue abriendo — prueba: código revisado; `vite build` OK.
- [x] `rsc risk` del cambio — prueba: salida del comando.
- [x] Revisión independiente si el nivel es ≥ 1 — prueba: informe del revisor, 0 importantes, 1 detalle corregido.
- [x] Subido a GitHub — prueba: `git push` OK (hash abajo).
- [ ] Revisión visual en el navegador — la hace la persona.

## Evidence
- Commit base subido antes del cambio: `403fada 🎉 Maqueta inicial de DAthletic` → `origin/main`
  (repo público `Dami1603/DAthletic`, estaba vacío). `Guia DAthletic.docx` quedó fuera, pendiente de la persona.
- `AppLayout.jsx` reescrito sin drawer: `Header` (logo, menú horizontal `lg:flex`, acciones) + `Dock` (`lg:hidden`).
  `nav.js` exporta solo `navItems` (se quitó `navSections`, ya sin uso).
- Detalle corregido: el logo grande recibía `flex` y `hidden` a la vez (orden de CSS no garantizado);
  ahora cada versión va en su propio contenedor (`lg:hidden` / `hidden lg:block`).
- Búsqueda de `navSections|drawer|app-drawer|Sidebar` en `src`: sin resultados.
- `vite build`: `✓ built in 1.38s`. Dev `/rutinas`: 200.
- `rsc risk`: `tier 1`, `reviewers: 1`, `human approval: not required`.
- Tests: no hay todavía — no ejecutado.
- Revisor (contexto nuevo): sin hallazgos importantes. Verificó imports, que la navegación aparece una sola vez
  en cada ancho, estilos activos (`style.css:87`, `:94`), etiquetas distintas de los dos `<nav>`, cierre del
  menú de cuenta y la ventana «Nueva rutina» (Home y Routines). `vite build` OK.
  Detalle: a 320 px la barra necesitaba ~321 px para 288 disponibles (scroll lateral de ~33 px).
  Corregido: botón «Buscar» con `hidden sm:inline-flex` (−44 px → ~277 px). `vite build` OK y la regla
  `sm:inline-flex` está en el CSS compilado. No medido en un navegador real.

## Next
Revisión visual de la persona en computadora y celular.
