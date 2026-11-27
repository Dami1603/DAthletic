---
author: Damian Dandrade
branch: main
status: in-progress
---
# App Android con Capacitor y publicación en Play Store

## Intent
Llevar DAthletic a una app Android real con Capacitor (mismo código que la web) y publicarla en Google Play.
Decisión de la persona (2026-11-27): «app real de Capacitor, Android + web, publicar en Play Store».

## Scope
- Parte 1 (este documento, FTD): proyecto Android, verlo en emulador y en el celular.
- Parte 2: publicación. Tiene decisiones permanentes que decide la persona antes de tocarlas:
  - **appId** (identificador del paquete). Hoy `com.dathletic.app`, **provisional**: el nombre de la app no es
    definitivo. Se puede cambiar libremente hasta la primera subida a Play; después, nunca.
  - **Llave de firma** (upload key): se genera una vez y se guarda fuera del repo, con copia de seguridad.
  - Nombre visible, ícono, capturas, descripción, política de privacidad (Play la exige), clasificación de contenido.
  - Cuenta de desarrollador de Google Play (pago único de 25 USD), la crea la persona.
- Fuera: iOS, sincronizar datos entre aparatos (hoy se guardan en cada aparato).

## Checklist
### Parte 1
- [x] Capacitor 8.6.3 instalado (`@capacitor/core`, `@capacitor/android`, `@capacitor/cli`) — prueba: `npm install` sin vulnerabilidades.
- [x] `capacitor.config.json` (appId provisional `com.dathletic.app`, `webDir: dist`) y proyecto `android/` — prueba: `cap add android` OK.
- [x] Barra superior respeta la zona de la hora/batería (`pt-[env(safe-area-inset-top)]`); el dock de daisyUI ya lo hace — prueba: código revisado; en la web el valor es 0.
- [x] Atajos `npm.cmd run android` (compila, copia y abre Android Studio) y `npm.cmd run android:sync` — prueba: `android:sync` OK.
- [ ] Instalar Android Studio — lo hace la persona.
- [ ] Abrir en el emulador y revisar (barra superior, dock, guardado) — prueba: la persona lo ve.
- [ ] Ícono propio (hoy es el de Capacitor) — generar desde `logo.png` con `@capacitor/assets`.
### Parte 2
- [ ] Nombre definitivo y appId definitivo.
- [ ] Llave de firma y `.aab` firmado.
- [ ] Política de privacidad publicada, ficha de Play, prueba interna, producción.

## Evidence
- `npx cap doctor`: `[success] Android looking great!` · `@capacitor/android: 8.6.3`.
- `android/variables.gradle`: `minSdkVersion 24`, `compileSdkVersion 36`, `targetSdkVersion 36`.
- `android:sync`: `Sync finished`; `android/app/src/main/assets/public` contiene `index.html` y `assets/`.
- Entorno de la PC: Node v26.13.1; Java 1.8 (viejo, Android Studio trae el suyo); sin Android SDK.

## Next
La persona instala Android Studio. Después: `npm.cmd run android` → botón ▶ con un emulador.
