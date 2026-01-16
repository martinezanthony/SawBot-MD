import { getUser } from "../database-functions.js";

let plugin = {};
plugin.cmd = ["kiss", "beso", "besar"];
plugin.onlyGroup = true;
plugin.botAdmin = true;

plugin.run = async (m, { client, text, usedPrefix, command, user }) => {
  let who;
  const numberMatches = text.match(/@[0-9\s]+/g);
  if (numberMatches && numberMatches.length > 0) {
    who = numberMatches[0].replace("@", "").replace(/\s+/g, "") + "@lid";
  } else if (m.quoted) {
    who = m.quoted.sender;
  }

  if (!who) return client.sendText(m.chat, txt.defaultWho(usedPrefix, command), m);
  if (who === client.user.lid) return client.sendText(m.chat, txt.besarBot, m);

  const parejaSenderJid = user.couple;
  const whoData = getUser(who);
  const whoCouple = whoData?.couple;
  const parejaSenderData = getUser(parejaSenderJid);
  const parejaSenderDataLid = parejaSenderData?.lid;
  const whoJid = whoData?.jid;

  if (parejaSenderJid != "" && parejaSenderData?.couple == m.senderJid && parejaSenderJid != whoJid) return client.sendText(m.chat, txt.besarInfiel(parejaSenderDataLid), m);

  if (whoCouple && m.senderJid !== whoCouple) return client.sendText(m.chat, txt.besarTienePareja(who), m);
  const teks = `${pickRandom([`¡Muah! 💋 Beso virtual enviado con cariño.`, `¡Besoo enviado! 💋`, `¡Hermoso beso virtual para ti! 💋`])}`.trim();
  let tekss = `
${teks}

*💌Lo recibe:* @${who.split`@`[0]}

*😚De parte de:* @${m.sender.split("@")[0]}
`.trim();

  const tek1 = `@${who.split`@`[0]} rechazó el beso y le corrió la cara a @${m.sender.split("@")[0]} 🤣`;
  const tekxx = [tekss, tek1].getRandom();
  let react;
  if (tekxx.includes("Lo recibe")) {
    react = "💋";
  } else react = "🤣";
  const kz = await client.sendText(m.chat, tekxx, m);
  client.sendMessage(m.chat, { react: { text: react, key: kz.key } });
};

export default plugin;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}
