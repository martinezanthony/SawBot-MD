import { addToBlacklist, removeFromBlacklist, getBlacklist, isBlacklisted, getUser } from "../database-functions.js";

let plugin = {};
plugin.cmd = ["ln", "ln2", "vln"];
plugin.onlyOwner = true;

plugin.run = async (m, { client, text, usedPrefix, command, participants }) => {
  // Mostrar todos los usuarios en blacklist
  if (command === "vln") {
    const entries = getBlacklist();

    if (entries.length === 0) return client.sendText(m.chat, "No hay usuarios en lista negra.", m);

    let msg = entries
      .map((entry, i) => {
        const num = `+${entry.jid.split("@")[0]}`;

        // formatear la fecha
        let fechaTexto = "Desconocida";
        if (entry.dateAdded) {
          const d = new Date(entry.dateAdded);
          fechaTexto = d
            .toLocaleString("es-ES", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })
            .replace(",", " -");
        }

        const razon = entry.reason || "Sin razón";
        const añadidoPor = entry.addedBy ? `+${entry.addedBy.split("@")[0]}` : "Desconocido";

        return `${i + 1}. ${num}\n📝 Razón: ${razon}\n👤 Añadido por: ${añadidoPor}\n📆 Fecha: ${fechaTexto}\n`;
      })
      .join("\n");

    const jids = entries.map((e) => e.jid);
    return client.sendMessage(m.chat, { text: msg, mentions: jids }, { quoted: m });
  }

  // obtener usuario destinatario y la razón de estar en blacklist
  let who, reason;
  const phoneMatches = text.match(/\+\d[\d\s]*/g);
  if (phoneMatches && phoneMatches.length > 0) {
    who = phoneMatches[0].replace(/\+|\s+/g, "") + "@s.whatsapp.net";
    reason = text.replace(phoneMatches[0], "").trim();
  } else {
    who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : null;
    reason = who ? text.replace(`@${who.replace("@lid", "")}`, "").trim() : null;
  }

  // si who es LID, obtener su JID desde la db.
  if (who && who.endsWith("@lid")) {
    const whoData = getUser(who);
    who = whoData?.jid;
  }

  // si no hay jid valido, retornar
  if (!who) return client.sendText(m.chat, txt.defaultWhoBlackList(usedPrefix, command), m);
  if (who === client.user.jid) return m.react("❌");
  if (who === m.senderJid) return m.react("❌");
  if (command == "ln" && !reason) return client.sendText(m.chat, txt.blistRejectNullReason, m);

  // no afectar a owners del bot
  const ownerJids = globalThis.owners.map((owner) => owner + "@s.whatsapp.net");
  for (const ownerJid of ownerJids) {
    if (who == ownerJid) return m.react("❌");
  }

  const exists = isBlacklisted(who);
  if (command === "ln") {
    // verificar si el usuario ya está en blacklist
    if (exists) {
      // Si ya está, actualizar la razón
      addToBlacklist(who, reason, m.senderJid);
      client.sendText(m.chat, "El usuario ya estaba en blacklist. Se actualizó el motivo de estarlo.", m);
      return;
    }

    // añadir usuario a blacklist
    addToBlacklist(who, reason, m.senderJid);
    m.react("✅");

    // expulsar si el comando se ejecutó en un grupo, y el usuario está en él.
    if (m.isGroup) {
      const isInGroup = participants.some((p) => p.phoneNumber === who);
      if (isInGroup) await client.groupParticipantsUpdate(m.chat, [who], "remove");
    }

    // Comprobar en todos los otros grupos si el usuario es participante, y expulsar si hay coincidencia
    const groupChats = Object.keys(client.chats).filter((key) => key.endsWith("@g.us"));
    for (const chatId of groupChats) {
      if (m.isGroup && chatId === m.chat) continue;
      const metadata = client.chats[chatId]?.metadata;
      if (metadata && metadata.participants) {
        const groupParticipants = metadata.participants;
        const isInGroup = groupParticipants.some((p) => p.phoneNumber === who);
        if (isInGroup) await client.groupParticipantsUpdate(chatId, [who], "remove");
      }
    }

    return;
  } else if (command === "ln2") {
    if (!exists) return client.sendText(m.chat, "Ese usuario no estaba en la lista negra.", m);

    // quitar al usuario de la blacklist
    removeFromBlacklist(who);
    m.react("☑️");
    return;
  }
};

export default plugin;
