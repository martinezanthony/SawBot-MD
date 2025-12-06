import "./globals.js";
const { DisconnectReason, useMultiFileAuthState, makeCacheableSignalKeyStore } = await import(baileys);
import { readdirSync, rmSync } from "fs";
import { makeWASocket, protoType, serialize } from "./lib/waSocket.js";
import pino from "pino";
import { installYtDlp, loadPlugins, watchPlugins } from "./loadFunctions.js";
import { loadDatabase, getChat, getBotSettings, isBlacklisted } from "./databaseFunctions.js";
import qrcode from "qrcode-terminal";
let handler = await import("./handleMessage.js");

// Función principal del bot
async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState(authFile);

  const connectionOptions = {
    logger: pino({ level: "silent" }),
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "silent" })),
    },
    markOnlineOnConnect: true,
    generateHighQualityLinkPreview: true,
  };
  global.client = makeWASocket(connectionOptions);

  // Vinculación mediante codigo de ocho dígitos
  if (!client.authState.creds.registered && numberBot && numberBot !== "") {
    setTimeout(async () => {
      let pairingCode = await client.requestPairingCode(numberBot);
      pairingCode = pairingCode?.match(/.{1,4}/g)?.join("-");
      console.log(`CÓDIGO DE VINCULACIÓN:`, pairingCode);
    }, 2000);
  }

  // Eventos de actualización de conexión
  client.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (!numberBot && qr) {
      qrcode.generate(qr, { small: true });
      console.log("📌 Tienes 45 SEGUNDOS para escanear este QR:");
    }

    // sesión cerrada desde WhatsApp
    if (connection === "close" && lastDisconnect?.error?.output?.statusCode === DisconnectReason.loggedOut) {
      console.log('❌ La sesión fue cerrada desde WhatsApp. Vuelve a iniciar con "npm start" para volver a vincular.');
      rmSync(`./${globalThis.authFile}`, { recursive: true, force: true });
      setTimeout(() => process.exit(0), 2000);
      return;
    }

    if (connection === "close" && lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut) {
      console.log("⚠️ Conexión cerrada. Reconectando...");

      // PROVISORIO. Evita con un reinicio del proceso, la mala conexión inicial al vincular
      process.exit(1);
    } else if (connection === "open") {
      console.log("🟢 Conexión exitosa a WhatsApp");

      // se llaman ambas funciones aquí para evitar ReferenceError de client. Esperar que establezca conexión correctamente antes de inicializar funciones de plugins.
      loadPlugins();
      watchPlugins();
    }
  });

  // Definir client.handler
  client.handler = handler.handleMessage.bind(global.client);

  // Manejo de mensajes en msgQueue
  const msgQueue = [];
  async function processQueue() {
    if (msgQueue.length === 0) return;
    const msg = msgQueue.shift();
    try {
      client.handler(msg);
    } catch (error) {
      console.error("Error procesando mensaje:", error);
    }
    processQueue();
  }

  // Evento de mensajes entrantes
  client.ev.on("messages.upsert", ({ messages }) => {
    for (const m of messages) {
      msgQueue.push(m);
    }
    processQueue();
  });

  // Evento actualización de participantes de grupos
  client.ev.on("group-participants.update", async ({ id, participants, action }) => {
    // Obtener datos del chat
    const chat = getChat(id);

    switch (action) {
      case "add":
        const groupMetadatax = await client.groupMetadata(id);
        const participantsx = groupMetadatax.participants;
        const bot = participantsx.find((u) => u.phoneNumber === client.user.jid);
        const isBotAdmin = bot?.admin || false;
        for (let user of participants) {
          const jid = user.phoneNumber || user.pn;
          if (!jid) continue;

          // Verificar si el usuario está en lista negra.
          const blacklistEntry = isBlacklisted(jid);
          if (blacklistEntry) {
            if (!isBotAdmin) return;
            await client.groupParticipantsUpdate(id, [jid], "remove");
            await client.sendText(id, txt.blackList(jid, blacklistEntry.reason), null, { mentions: [jid] });
            return;
          }
        }

        // Si welcome está activo en el chat, enviar mensaje de bienvenida al usuario.
        if (chat?.welcome) {
          for (let user of participants) {
            const jid = user.id; // id, no jid. se requiere id (lid) para mención correcta y persistente en chat
            if (!jid) continue;

            client.sendText(id, txt.welcome(jid), null, { mentions: [jid] });
          }
        }
        break;

      case "remove":
        // Si welcome está activo en el chat, enviar mensaje de despedida al usuario.
        if (chat?.welcome) {
          for (let user of participants) {
            const jid = user.id; // id, no jid. se requiere id (lid) para mención correcta y persistente en chat
            if (!jid) continue;

            client.sendText(id, txt.welcomeBye(jid), null, { mentions: [jid] });
          }
        }
        break;
    }
  });

  // Evento de llamadas
  client.ev.on("call", async (callUpdate) => {
    // verificar si el antiCall está activo
    const botSettings = getBotSettings(client.user.jid);
    if (!botSettings?.antiCall) return;

    for (let call of callUpdate) {
      if (call.isGroup == false) {
        if (call.status == "offer") {
          await client.sendText(call.from, txt.antiCall(call.from), null, { mentions: [call.from] });
          await client.updateBlockStatus(call.from, "block");
        }
      }
    }
  });

  // Limpiar carpeta tmp cada 60 minutos
  function clearTmp() {
    const tmpDir = "./tmp";
    const filenames = readdirSync(tmpDir);
    filenames.forEach((file) => {
      const filePath = `${tmpDir}/${file}`;
      rmSync(filePath, { recursive: true, force: true });
    });
  }
  setInterval(async () => {
    if (!client || !client.user) return;
    clearTmp();
    console.log(txt.clearTmp);
  }, 1000 * 60 * 60);

  // Guardar sesión actualizada
  client.ev.on("creds.update", saveCreds);
}

// evitar que el bot crashee aunque haya errores no manejados. puesto principalmente por errores temporales de librerías que crasheaban todo.
process.on("uncaughtException", (err) => {
  console.error("uncaughtException:", err);
});
process.on("unhandledRejection", (reason) => {
  console.error("unhandledRejection:", reason);
});

// no mostrar logs de info, debug, warn
console.info = () => {};
console.debug = () => {};
console.warn = () => {};

// funciones de waSocket
protoType();
serialize();

// Cargar y guardar db
globalThis.db = loadDatabase();

// Instalar YTDLP
installYtDlp();

// Iniciar bot.
startBot();
