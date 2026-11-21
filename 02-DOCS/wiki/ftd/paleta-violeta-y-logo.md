---
author: Damian Dandrade
branch: main
status: in-progress
---
# Paleta violeta y logo nuevo

## Intent
Cambiar la identidad visual de DAthletic: pasar del naranja a la paleta violeta basada en `#8e1cdb`
(https://coolors.co/tailwind/8e1cdb) y reemplazar el logo dibujado en código por `logo.png`.

## Scope
- Dentro: temas claro y oscuro (`src/style.css`), componente `Logo`, favicon y `theme-color`.
- Fuera: textos, pantallas y comportamiento de la app. El archivo original `logo.png` de la raíz no se borra.

Decisión: la página de coolors genera la paleta en el navegador y no se pudo leer. La escala se generó
localmente en OKLCH con el mismo matiz y croma que `#8e1cdb` y las luminosidades de Tailwind v4.
`#8e1cdb` queda exacto como color principal (tono 700).

| Tono | HEX |
|---|---|
| 50 | #f9f5ff |
| 100 | #f2e8ff |
| 200 | #e8d5ff |
| 300 | #d7b6fd |
| 400 | #c184ff |
| 500 | #b157fe |
| 600 | #a328f9 |
| 700 | #8e1cdb (base) |
| 800 | #7522b3 |
| 900 | #5e218e |
| 950 | #400a66 |

## Checklist
- [x] Logo recortado y optimizado en `public/` — prueba: archivos generados con su tamaño.
- [x] Favicon nuevo desde el logo — prueba: archivo generado y referenciado en `index.html`.
- [x] Temas claro y oscuro con la paleta violeta — prueba: `vite build` sin errores y colores presentes en el CSS compilado.
- [x] Componente `Logo` usa la imagen — prueba: `vite build` sin errores y la imagen se sirve en dev.
- [x] Sin restos del naranja — prueba: búsqueda de los valores viejos sin resultados.
- [x] `rsc risk` del cambio — prueba: salida del comando.
- [x] Revisión independiente (nivel 1 → 1 revisor) — prueba: informe del revisor sin hallazgos importantes abiertos.
- [ ] Revisión visual en el navegador — no ejecutada por el agente (sin navegador); la hace la persona.

## Evidence
- Logo: recorte 768×768 desde (132,120) del original 1024×1024 (dibujo en x 156–876, y 216–792), fondo blanco opaco.
  `public/logo.png` 256 px (67 373 B), `public/favicon.png` 64 px (5 388 B), `public/apple-touch-icon.png` 180 px (32 517 B). Revisado a ojo: recorte centrado, nada cortado.
- `public/favicon.svg` (mancuerna naranja) eliminado; `index.html` apunta a `favicon.png` y `apple-touch-icon.png`, `theme-color` `#8e1cdb`.
- `vite build`: `✓ built in 1.12s`. CSS compilado contiene `#8e1cdb` ×2, `#b157fe` ×1, `#f2e8ff` ×2.
- Dev (`localhost:5174`): `/logo.png` 200 image/png, `/favicon.png` 200, `/apple-touch-icon.png` 200, `/` 200.
- Búsqueda de `naranja|orange|F26B1D|favicon.svg|DumbbellMark` y matices viejos en `src`, `index.html`, `public`: sin resultados.
- `rsc risk`: `tier 1`, `reviewers: 1`, `human approval: not required`.
- Tests: el proyecto no tiene tests todavía — no ejecutado. Escaneo de seguridad: no configurado — no ejecutado.

- Revisor (contexto nuevo): **sin hallazgos**. Verificó referencias rotas (ninguna), variables completas en
  ambos temas, `vite build` OK, accesibilidad del logo (`aria-label` + `alt=""` correctos) y contraste WCAG,
  todo ≥ 4.5:1 — claro / oscuro: primary 6.10 / 5.10, secondary 6.74 / 8.03, accent 5.51 / 5.51,
  neutral 15.67 / 11.35, texto base 17.01 / 14.86, texto primary sobre base-100 6.29 / 4.79.
- Punto que el revisor no pudo comprobar (opacidad de esquinas del icono iOS): comprobado después,
  alfa 255 en las 4 esquinas de `logo.png`, `favicon.png` y `apple-touch-icon.png`.

### Ampliación: logo sin fondo (pedido posterior)
- [x] PNG sin fondo a tamaño completo — prueba: `logo-sin-fondo.png` 1024×1024 generado; `logo.png` original intacto.
- [x] `public/logo.png` y `public/favicon.png` transparentes — prueba: alfa 0 en esquinas, 255 en el dibujo.
- [x] `Logo.jsx` sin recuadro blanco — prueba: `vite build` OK, `/logo.png` 200 en dev.
- [x] `rsc risk` — prueba: `tier 1`, `reviewers: 1`.
- [x] Revisión independiente — prueba: informe del revisor, 0 hallazgos importantes, 1 detalle (abajo).

Decisión: `apple-touch-icon.png` sigue con fondo blanco a propósito (iOS rellena la transparencia con negro).

Evidencia:
- Primer intento: solo se borró el blanco conectado al borde; la vista previa sobre fondo oscuro mostró que
  el hueco entre brazos, cabeza y barra quedaba blanco. Corregido: se borran todas las zonas blancas grandes
  (umbral 235 por canal, ≥ 400 px). Resultado: 2 zonas blancas, 2 borradas, 840 586 px transparentes,
  14 388 px de contorno suavizados ("color a alfa" contra blanco) para evitar halo.
- Vistas previas sobre fondo claro (#FAF8FC) y oscuro (#1C1A1F) revisadas a ojo: sin restos blancos ni halo.
- `public/logo.png` 256 px (50 828 B, alfa esquina 0 / centro 255); `public/favicon.png` 64 px (5 148 B, ídem).
- `vite build`: `✓ built in 1.15s`.

- Revisor (contexto nuevo): sin hallazgos importantes. Confirmó PNG limpios (sin píxeles casi blancos, sin halo),
  `apple-touch-icon.png` opaco, uso de `Logo` correcto, `vite build` OK.
  Detalle (nit, abierto): en modo oscuro el violeta más oscuro (#2D0E49) tiene contraste ~1.07:1 con base-100;
  ~70 % de los píxeles opacos del logo quedan por debajo de 1.5:1. Los logos están exentos de WCAG 1.4.11.
  Decisión pendiente de la persona: dejarlo o hacer una versión clara para modo oscuro.

## Next
Revisión visual de la persona (`npm run dev`). Decidir si el logo necesita versión para modo oscuro.
Si quiere los tonos exactos de coolors, pegar el export de esa página y reemplazar la escala.
