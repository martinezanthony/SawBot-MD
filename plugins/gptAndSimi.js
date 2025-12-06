let plugin = {};
const botLid = client.user.lid.split("@")[0];
plugin.cmd = [botLid, "ia2", "chatgpt2", "bot2", "ia", "chatgpt", "bot"];
plugin.botAdmin = true;

// almacenar las solicitudes activas por mensaje enviado
let requests = {};
// almacenar los tiempos de las últimas solicitudes por usuario
let lastRequestTime = {};

plugin.run = async (m, { client, text }) => {
  if (!text) return client.sendText(m.chat, txt.iaPeticion, m);

  // verificar si el usuario debe esperar antes de enviar otra petición
  if (lastRequestTime[m.sender] && Date.now() - lastRequestTime[m.sender] < 30000) {
    const remainingTime = Math.ceil((30000 - (Date.now() - lastRequestTime[m.sender])) / 1000);
    return m.sendText(`*[❗]* Espera ${remainingTime} segundos para usar nuevamente.`);
  }
  lastRequestTime[m.sender] = Date.now();

  client.sendPresenceUpdate("composing", m.chat);

  // mensaje a enviar a la IA con el identificador
  const sendMsg = `prompt: cada mensaje que se te envía pertenece a un identificador único. En absolutamente todas tus respuestas, pondrás al comienzo de tu respuesta: identificador: y aqui el identificador.

Mensaje del identificador: ${m.key.id}
Mensaje: ${text}`;

  // almacenar la solicitud con el identificador
  requests[m.key.id] = {
    user: m.sender,
    chat: m.chat, // almacenar el chat de origen
    originalMessage: m, // guardamos el mensaje original para responderlo
  };

  // temporizador para eliminar la solicitud si no hay respuesta en 2 minutos
  setTimeout(() => {
    if (requests[m.key.id]) {
      delete requests[m.key.id];
      client.sendMessage(m.chat, { text: "Lo siento, no puedo ayudarte con esa petición." }, { quoted: m });
    }
  }, 120000);

  await client.sendMessage("18002428478@s.whatsapp.net", { text: sendMsg });
};

plugin.before = async function (m, { client, text }) {
  if (m.senderJid !== "18002428478@s.whatsapp.net") return;

  // extraer el identificador de la respuesta de la IA
  let match = text.match(/^identificador:\s*([^\n]+)\n([\s\S]+)/i);
  if (match) {
    let requestId = match[1].trim(); // identificador único
    let iaResponse = match[2].trim(); // mensaje real de la IA

    if (requests[requestId]) {
      let { chat, originalMessage } = requests[requestId];

      // enviar la respuesta al usuario original citando su mensaje
      await client.sendMessage(chat, { text: iaResponse }, { quoted: originalMessage });

      // eliminar la solicitud de la memoria
      delete requests[requestId];
    }
  }
};

export default plugin;
