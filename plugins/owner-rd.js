import { deleteUser } from "../databaseFunctions.js";

let plugin = {};
plugin.cmd = ["rd"];
plugin.onlyOwner = true;

plugin.run = async (m, { client, text, usedPrefix, command }) => {
  let who;
  const numberMatches = text.match(/@[0-9]+/g);
  if (numberMatches && numberMatches.length > 0) {
    who = numberMatches[0].replace("@", "") + "@lid";
  } else {
    who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : null;
  }

  if (!who) return client.sendText(m.chat, txt.defaultWho(usedPrefix, command), m);

  // no afectar a owners del bot
  const ownerJids = globalThis.owners.map((owner) => owner + "@s.whatsapp.net");
  for (const ownerJid of ownerJids) {
    const ownerData = getUser(ownerJid);
    if (who == ownerData?.lid) return m.react("❌");
  }

  // eliminar usuario de la db.
  deleteUser(who);
  client.sendText(m.chat, txt.rdSuccess(who), m);
};

export default plugin;
