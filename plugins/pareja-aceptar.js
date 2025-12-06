import { getUser, updateUser } from "../databaseFunctions.js";

let plugin = {};
plugin.cmd = ["aceptar"];
plugin.onlyGroup = true;
plugin.botAdmin = true;

plugin.run = async (m, { client, text, usedPrefix, command, user }) => {
  let who, whoJid, whoLid;
  const numberMatches = text.match(/@[0-9\s]+/g);
  if (numberMatches && numberMatches.length > 0) {
    who = numberMatches[0].replace("@", "").replace(/\s+/g, "") + "@lid";
  } else if (m.quoted) {
    who = m.quoted.sender;
  }

  if (who) {
    who = getUser(who);
  }

  whoLid = who?.lid;
  whoJid = who?.jid;

  if (!whoJid || !whoLid) return client.sendText(m.chat, txt.parejaDefaultWho(usedPrefix, command), fkontak);

  if (whoLid === client.user.lid) return client.sendText(m.chat, txt.parejaWhoBotNull(usedPrefix, command, whoLid), fkontak);
  if (whoLid === m.sender) return client.sendText(m.chat, txt.parejaWhoSender, fkontak);

  const pacar = who?.couple;

  if (m.senderJid == pacar && user.couple == whoJid) {
    const kz = await client.sendText(m.chat, txt.parejaAlready(whoLid), m);
    client.sendMessage(m.chat, { react: { text: "🥰", key: kz.key } });
    return;
  }
  if (pacar != m.senderJid) {
    return client.sendText(m.chat, txt.parejaNoAccept(whoLid), m);
  } else {
    // si anteriormente fueron pareja, limpiar historial
    const oldHistorySender = Array.isArray(user.couplesHistory) ? user.couplesHistory : [];
    const oldHistoryTarget = Array.isArray(who.couplesHistory) ? who.couplesHistory : [];

    const esParejaAntigua = oldHistorySender.includes(whoJid);
    const newHistorySender = esParejaAntigua ? oldHistorySender.filter((id) => id !== whoJid) : oldHistorySender;
    const newHistoryTarget = esParejaAntigua ? oldHistoryTarget.filter((id) => id !== m.senderJid) : oldHistoryTarget;

    // actualizar ambos usuarios en db
    updateUser(m.sender, { couplesHistory: JSON.stringify(newHistorySender), couple: whoJid, coupleTime: Date.now() });
    updateUser(whoLid, { couplesHistory: JSON.stringify(newHistoryTarget), couple: m.senderJid, coupleTime: Date.now() });

    const kz = await client.sendText(m.chat, txt.parejaAccept(m.sender, whoLid), m);
    client.sendMessage(m.chat, { react: { text: "🥰", key: kz.key } });
  }
};

export default plugin;
