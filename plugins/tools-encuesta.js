let plugin = {};
plugin.cmd = ["encuesta"];
plugin.onlyGroup = true;
plugin.botAdmin = true;

plugin.run = async (m, { client, text, usedPrefix, participants }) => {
  if (!text) return client.sendText(m.chat, txt.encuestaNull(usedPrefix), m);
  let parts = text
    .split("-")
    .map((p) => p.trim())
    .filter((p) => p);
  if (parts.length < 3) return client.sendText(m.chat, txt.encuestaMin(usedPrefix), m);
  if (parts.length > 13) return client.sendText(m.chat, txt.encuestaMax, m);
  const mentionsUsers = participants.map((u) => client.decodeJid(u.id));
  let pregunta = parts[0];
  let opciones = parts.slice(1);
  await client.sendMessage(m.chat, { poll: { name: pregunta, values: opciones, selectableCount: 1, toAnnouncementGroup: false } }, { quoted: null });
  await client.sendText(m.chat, "*¡Puedes votar si quieres!🙂👆*", null, { mentions: mentionsUsers });
};

export default plugin;
