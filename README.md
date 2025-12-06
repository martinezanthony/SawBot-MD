<div align="center">

# 🍥 SawBot-MD 🍥

<img src="https://i.ibb.co/0RWBjTsF/bannexrx.png" width="500" />

Bot de WhatsApp que vincula y trabaja en base a <a href="https://github.com/WhiskeySockets/Baileys">@WhiskeySockets/Baileys</a><br>
Con diversas funciones y comandos de chat para entretenimiento y control total principalmente en grupos de WhatsApp.

Se trata de evitar bastante el spameo masivo del bot en el chat, por lo cual <strong>no</strong> se añadieron comandos relacionados a RPG. Por el mismo motivo, este bot no exige a los participantes tener que registrarse para poder utilizar comandos e interactuar. Se evitó el uso de monedas, exp, diamantes, etc., simplificando drásticamente el uso del bot.

---

Este proyecto es totalmente libre para copias o modificaciones.

</div>

# 💻 Instalación

<details>
<summary><strong>📱Instalación en Termux - Android</strong></summary>

Este proyecto no está pensado para Termux debido a sus limitaciones. Aun así, se ha testeado en algunos dispositivos y funciona pese a que no es perfecto. Tras varios intentos fallidos, se llegó a la conclusión de que la siguiente línea de comando "todo en uno" para Termux es la que instaló todo correctamente, sin errores de SQLite3 ni dependencias obligatorias.

**Nota importante:**  Antes de ejecutar el comando en Termux, asegúrate de otorgar manualmente los permisos necesarios a la app Termux desde los ajustes de Android, especialmente el permiso de almacenamiento, ya que de lo contrario producirá error. Ademas, Android puede matar el proceso de Termux por eso se recomienda **deshabilitar la optimización de batería para Termux**. De esa manera se evita que Android cierre Termux del segundo plano.

```bash
apt update -y && yes | apt upgrade && termux-setup-storage && pkg install git nodejs ffmpeg python binutils -y && pip install setuptools && export GYP_DEFINES="android_ndk_path=''" && npm install -g yarn && git clone https://github.com/martinezanthony/SawBot-MD && cd SawBot-MD/ && npm install && yarn install
```
Si finalizó sin errores podrás iniciar el bot:
```bash
npm start
```
---
</details>

<details>
<summary><strong>🐧Instalación en Linux</strong></summary>
  
  Requisitos previos:
- Git
- NodeJs
- FFmpeg

Descarga e instala el bot:
```bash
git clone https://github.com/martinezanthony/SawBot-MD && cd SawBot-MD/ && npm install && yarn install
```
Si no hubo errores, ejecutar la siguiente linea para iniciar el bot:
```bash
npm start
```
---
</details>

<details>
<summary><strong>🪟Instalación en Windows</strong></summary>
  
  Requisitos previos:
- Instalar Git - [Link](https://git-scm.com/install/windows)
- Instalar NodeJs - [Link](https://nodejs.org/en/download)
- Descargar FFmpeg - [Link](https://www.gyan.dev/ffmpeg/builds/ffmpeg-release-essentials.7z)

**FFmpeg:**
- Extraer el archivo descargado de FFmpeg en `C:\`
- Renombrar la carpeta resultante a "ffmpeg" para simplicidad.
- Añadir la ruta de la carpeta bin de FFmpeg a path de variables de entorno. Para eso es necesario abrir una consola CMD (Simbolo del sistema) **como administrador** (importante ejecutar CMD como administrador o **no funcionará**) y ejecutar el siguiente comando:
```bash
setx PATH "%PATH%;C:\ffmpeg\bin"
```
Si hubo éxito deberá decir: `CORRECTO: se guardó el valor especificado.`

Finalmente ejecutar la siguiente linea en CMD, para descargar e instalar el bot.
```bash
git clone https://github.com/martinezanthony/SawBot-MD && cd SawBot-MD && npm install -g yarn && npm install && yarn install
```
Si no hubo errores, ejecutar la siguiente linea para iniciar el bot:
```bash
npm start
```

Al iniciar el bot en windows, verá que aparece un mensaje de color azul indicando que está haciendo una descarga. Es la descarga del binario de [YTDLP](https://github.com/yt-dlp/yt-dlp) el cual es necesario para poder descargar audio y video en el plugin de youtube.

---

</details>

### Notas extras:

- Por defecto el bot mostrará el codigo QR de vinculación que deberás escanear con WhatsApp. Si quieres vincular mediante código de 8 dígitos en vez de QR, deberás modificar la variable global "numberBot" en el archivo `globals.js` localizado en la raíz del bot, introduciendo el número de WhatsApp que vinculará con el bot, sin "+" ni espacios o guiones, y al volver a iniciar el bot, mostrará el codigo de 8 digitos que deberás introducir en tu WhatsApp.
Ejemplo de globals.js:

```JavaScript
// Numero del bot sin "+" ni espacios ni guiones. Dejar vacío para vincular con codigo QR.
globalThis.numberBot = "59899999999";

// Dejarlo vacío para vincular con QR:
globalThis.numberBot = "";
```

- Para tener privilegios de owner en el bot, deberás modificar en el archivo `globals.js` la variable global "owners", poniendo tu numero de telefono real con el que tendrás permisos de owner:

```JavaScript
// Numeros de owners del bot sin "+" ni espacios ni guiones
globalThis.owners = ["59899999999", ""];
```

- Si tienes problemas con la vinculación o quieres vincular con otro numero, debes eliminar la carpeta `botSession` e iniciar el bot nuevamente para poder vincular el bot correctamente.

---
