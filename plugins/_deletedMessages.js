let { downloadContentFromMessage } = await import(baileys);

let plugin = (m) => m;
plugin.before = async function (m, { client, chat }) {
  if (!chat.antiDelete) return;
  try {
    if (m.message?.protocolMessage?.type === 0) {
      let msg = client.serializeM(client.loadMessage(m.message.protocolMessage.key.id));
      if (!msg) return;
      if (msg.key.fromMe || msg.key.participant == client.user.lid) return;
      if (msg.message.reactionMessage) return;
      const gN = msg.key.remoteJid.endsWith("@g.us") ? await client.groupMetadata(msg.key.remoteJid) : null;
      const participant = msg.key?.participant || msg.key?.remoteJid;
      const { imageMessage, videoMessage, stickerMessage, audioMessage, extendedTextMessage, conversation } = msg.message;

      let isOnce = msg.mtype == "viewOnceMessageV2" || msg.mtype == "viewOnceMessageV2Extension";
      if (isOnce) {
        let media;
        let msgg = msg.mtype == "viewOnceMessageV2" ? msg.message.viewOnceMessageV2.message : msg.message.viewOnceMessageV2Extension.message;
        const type = Object.keys(msgg)[0];
        if (msg.mtype == "viewOnceMessageV2") {
          media = await downloadContentFromMessage(msgg[type], type == "imageMessage" ? "image" : "videoMessage" ? "video" : "audio");
        } else {
          media = await downloadContentFromMessage(msgg[type], "audio");
        }
        let buffer = Buffer.from([]);
        for await (const chunk of media) {
          buffer = Buffer.concat([buffer, chunk]);
        }
        if (/image|video/.test(type)) {
          const caption = `*━━━ \`𝘼𝙉𝙏𝙄 𝙀𝙇𝙄𝙈𝙄𝙉𝘼𝙍\` ━━━*
*┃ ViewOnce (eliminado)*
- *Nombre:* @${participant.split`@`[0]}
${msgg[type].caption ? `- *Caption:* ${msgg[type].caption}` : "- *Caption:* _sin_caption_"}`;
          return await client.sendFile(m.chat, buffer, type == "imageMessage" ? "error.jpg" : "error.mp4", caption, msg);
        } else if (/audio/.test(type)) {
          const audiox = `*━━━ \`𝘼𝙉𝙏𝙄 𝙀𝙇𝙄𝙈𝙄𝙉𝘼𝙍\` ━━━*
*┃ ViewOnce (eliminado)*
- *Nombre:* @${participant.split`@`[0]}
- *Tipo:* Nota de voz🔊`;
          await client.sendText(m.chat, audiox, msg);
          await client.sendMessage(m.chat, { audio: buffer, fileName: "error.mp3", mimetype: "audio/mpeg", ptt: true }, { quoted: msg });
          return;
        }
      }

      if (imageMessage) {
        const media = await downloadContentFromMessage(imageMessage, "image");
        let buffer = Buffer.from([]);
        for await (const chunk of media) {
          buffer = Buffer.concat([buffer, chunk]);
        }
        const caption = `*━━━ \`𝘼𝙉𝙏𝙄 𝙀𝙇𝙄𝙈𝙄𝙉𝘼𝙍\` ━━━*
*┃ Nombre:* @${participant.split`@`[0]}
${msg.key.remoteJid.endsWith("@g.us") ? `*┃ Grupo:* ${gN.subject}` : "*┃ Chat privado*"}
${imageMessage.caption ? `- *Texto:* ${imageMessage.caption}` : "- *Texto:* _sin_texto_"}`;
        await client.sendMessage(m.chat, { image: buffer, caption: caption, mentions: client.parseMention(caption) }, { quoted: msg });
        return;
      } else if (videoMessage) {
        const media = await downloadContentFromMessage(videoMessage, "video");
        let buffer = Buffer.from([]);
        for await (const chunk of media) {
          buffer = Buffer.concat([buffer, chunk]);
        }
        const caption = `*━━━ \`𝘼𝙉𝙏𝙄 𝙀𝙇𝙄𝙈𝙄𝙉𝘼𝙍\` ━━━*
*┃ Nombre:* @${participant.split`@`[0]}
${msg.key.remoteJid.endsWith("@g.us") ? `*┃ Grupo:* ${gN.subject}` : "*┃ Chat privado*"}
${videoMessage.caption ? `- *Texto:* ${videoMessage.caption}` : "- *Texto:* _sin_texto_"}`;
        await client.sendMessage(m.chat, { video: buffer, caption: caption, mentions: client.parseMention(caption) }, { quoted: msg });
        return;
      } else if (stickerMessage) {
        if (!msg.message.stickerMessage?.height) {
          msg.message.stickerMessage.height = 64;
          msg.message.stickerMessage.width = 64;
        }
        const caption = `*━━━ \`𝘼𝙉𝙏𝙄 𝙀𝙇𝙄𝙈𝙄𝙉𝘼𝙍\` ━━━*
*┃ Nombre:* @${participant.split`@`[0]}
${msg.key.remoteJid.endsWith("@g.us") ? `*┃ Grupo:* ${gN.subject}` : "*┃ Chat privado*"}
*┃ Reenviando sticker...*
*━━━ 👇🏻👇🏻👇🏻👇🏻👇🏻 ━━━*`;
        await client.sendMessage(m.chat, { text: caption, mentions: [participant] }, { quoted: msg });
        await client.sendMessage(m.chat, { forward: msg });
        return;
      } else if (audioMessage) {
        const media = await downloadContentFromMessage(audioMessage, "audio");
        let buffer = Buffer.from([]);
        for await (const chunk of media) {
          buffer = Buffer.concat([buffer, chunk]);
        }
        const caption = `*━━━ \`𝘼𝙉𝙏𝙄 𝙀𝙇𝙄𝙈𝙄𝙉𝘼𝙍\` ━━━*
*┃ Nombre:* @${participant.split`@`[0]}
${msg.key.remoteJid.endsWith("@g.us") ? `*┃ Grupo:* ${gN.subject}` : "*┃ Chat privado*"}
*┃🔊 Reenviando audio...*
*━━━ 👇🏻👇🏻👇🏻👇🏻👇🏻 ━━━*`;
        await client.sendMessage(m.chat, { text: caption, mentions: client.parseMention(caption) }, { quoted: msg });
        await client.sendMessage(m.chat, { audio: buffer, ptt: true }, { quoted: msg });
        return;
      } else if (extendedTextMessage || conversation) {
        const msgText = msg.message?.extendedTextMessage?.text || msg.message?.conversation;
        const caption = `*━━━ \`𝘼𝙉𝙏𝙄 𝙀𝙇𝙄𝙈𝙄𝙉𝘼𝙍\` ━━━*
*┃ Nombre:* @${participant.split`@`[0]}
${msg.key.remoteJid.endsWith("@g.us") ? `*┃ Grupo:* ${gN.subject}` : "*┃ Chat privado*"}
- *📝Mensaje:* ${msgText}
*━━━ \`𝘼𝙉𝙏𝙄 𝙀𝙇𝙄𝙈𝙄𝙉𝘼𝙍\` ━━━*`;
        await client.sendMessage(m.chat, { text: caption, mentions: client.parseMention(caption) }, { quoted: msg });
        return;
      } else {
        const caption = `*━━━ \`𝘼𝙉𝙏𝙄 𝙀𝙇𝙄𝙈𝙄𝙉𝘼𝙍\` ━━━*
*┃ Nombre:* @${participant.split`@`[0]}
${msg.key.remoteJid.endsWith("@g.us") ? `*┃ Grupo:* ${gN.subject}` : "*┃ Chat privado*"}
*┃ Reenviando contenido borrado..*
*━━━ 👇🏻👇🏻👇🏻👇🏻👇🏻 ━━━*`;
        await client.sendMessage(m.chat, { text: caption, mentions: [participant] }, { quoted: msg });
        await client.sendMessage(m.chat, { forward: msg });
        return;
      }
    }

    return;
  } catch (e) {
    console.log(e);
  }
};

export default plugin;
