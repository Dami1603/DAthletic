# Decisiones de producto

Decisiones tomadas por la persona sobre DAthletic. La más reciente arriba.

## 2026-11-27 — Logo y estética aprobados; nombre provisional
- **Aprobado:** la persona revisó la app y está conforme con el logo (bíceps sin círculo) y la estética del modo oscuro.
- **Nombre:** «DAthletic» es **provisional**. A la persona no le termina de cerrar; queda pendiente elegir el definitivo.

## 2026-11-23 — Logo con bíceps aislado (sin fondo circular)
- **Logo:** se quita el fondo circular azul oscuro del logo para que quede únicamente la silueta del bíceps posando con fondo transparente.
- **Tamaño ajustado:** se escala el bíceps a ~72% del marco visual (aumentando su presencia frente a la escala inicial del 52% pero sin saturar los márgenes), logrando una proporción equilibrada y legible junto a la tipografía `DAthletic`.
- **Archivos actualizados:** `logo.png`, `logo-sin-fondo.png`, `public/logo.png` (256×256) y `public/favicon.png` (64×64). `public/apple-touch-icon.png` mantiene fondo sólido `#11192C` con el bíceps en su nueva escala para iOS.

## 2026-11-23 — Fondo y superficies en modo oscuro alineados al logo
- **Fondo (base-200):** `#11192C` (el azul oscuro del logo).
- **Superficies (base-100: header, dock, tarjetas, modales):** ajustadas a `oklch(25% 0.04 266)` (`#192135`), un tono más tenue y oscuro que el intento previo (`27.5%`), pero manteniendo la elevación justa sobre el fondo.
- **Bordes y divisores (base-300):** ajustados a `oklch(30% 0.038 266)` para marcar los límites de forma suave y no estridente.

## 2026-11-23 — Actualización de logo (emblema circular)
- **Nuevo logo:** reemplazado por el emblema circular con bíceps/brazo violeta sobre fondo azul oscuro (#11192C).
- **Eliminación de bordes blancos:** esquinas transparentes (alfa 0) en `logo.png`, `logo-sin-fondo.png`, `public/logo.png` y `public/favicon.png`.
- **Icono iOS:** `public/apple-touch-icon.png` generado con fondo sólido `#11192C` para evitar esquinas negras/blancas en iOS.
- **Alternativa sin círculo:** generado `logo-solo-brazo.png` con únicamente el brazo violeta recortado.

## 2026-11-21 — Fase 2: rutinas
- **Rutinas famosas:** programas clásicos populares **y** rutinas «inspiradas en» figuras públicas, cada una con
  aviso «basada en lo que contó en entrevistas o libros, no oficial», adaptadas a los ejercicios de la app.
- **Edad:** rangos **18–39 · 40–59 · 60+** (solo adultos).
- **Rutinas propias:** sí, lista base **y** rutinas propias armadas con ejercicios de la lista, guardadas en el navegador.
- **Días:** se **activa** una rutina y se eligen los días de la semana; Inicio muestra qué toca hoy y la semana.
- Se hace por FTD en dos partes: 2A (catálogo, filtros, activar y días, Inicio) y 2B (rutinas propias).

## 2026-11-21 — Guía, logo en modo oscuro y fase 1
- **Guía de ideas:** `Guia DAthletic.docx` queda **solo en la computadora**, fuera del repo público (está en `.gitignore`).
- **Logo en modo oscuro:** se deja como está por ahora (contraste bajo de las partes más oscuras, ya medido).
- **Fase 1:** se arranca, por FTD en dos partes (A: pie + introducción; B: ejercicios + guardado).
  rsc mantiene ASDD apagado (`rsc reassess` → `RSC_REASSESSMENT_NO_CHANGE`).
- **Ejercicios:** lista base (~30 ejercicios comunes) **y** ejercicios propios de la persona, guardados en el navegador.
- **Introducción:** bloque de bienvenida **arriba de Inicio**, se puede cerrar y no vuelve a aparecer.
- **Créditos del pie:** solo **«© DAthletic»**, sin nombre de persona (repo público).
- **Modelo 3D (hasta la fase 5):** recuadro «Modelo 3D próximamente», sin imágenes de terceros.

## 2026-11-21 — Puntos de la guía de ideas
Contexto: la guía (`Guia DAthletic.docx`) proponía cosas distintas a lo ya construido.

- **Colores:** se mantiene la paleta **violeta** basada en `#8e1cdb`. Se descarta la azul `#0066ff` de la guía.
- **Logo:** se usa el **PNG propio** (`logo.png` / `logo-sin-fondo.png`). Se descarta el ícono de Vecteezy de la guía.
- **Navegación:** pasa a una **barra arriba** (antes: menú lateral).
- **Repositorio:** el código se sube a `https://github.com/Dami1603/DAthletic` (público) a medida que se avanza.

## Ideas de la guía (pendientes, por fases)
1. Barra de arriba, pie de página (aviso legal, créditos), introducción, guardado en el navegador
   (localStorage) y lista de ejercicios (músculo trabajado, reemplazos, consejos).
2. Rutinas simples y famosas/en tendencia; hipertrofia o fuerza; filtros por edad y experiencia; días.
3. Registro de entrenamientos: series, repeticiones, RIR, RPE; progreso y sobrecarga progresiva.
4. Seguimiento por músculo: series hechas y lo que falta.
5. Modelos 3D de la técnica de cada ejercicio (lo más difícil: casi no hay animaciones libres).
