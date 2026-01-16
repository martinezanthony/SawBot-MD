const isLinkTikTok = /tiktok.com/i;
const isLinkTelegram = /telegram.com|t.me/i;
const isLinkInstagram = /instagram.com/i;

let plugin = (m) => m;
plugin.before = async function (m, { client, participants, isAdmin, isBotAdmin, isOwner, chat }) {
  if (!m.isGroup) return;
  if (isAdmin || isOwner) return;
  const groupAdmins = participants.filter((p) => p.admin);

  const instagramLink = isLinkInstagram.exec(m.text);
  const tiktokLink = isLinkTikTok.exec(m.text);
  const telegramLink = isLinkTelegram.exec(m.text);

  if (chat.antiInstagram && instagramLink) {
    if (chat.delete) return client.sendText(m.chat, txt.allAntiLinkDelete, m, { mentions: [m.sender, ...groupAdmins.map((v) => v.id)] });
    if (isBotAdmin) {
      await client.sendText(m.chat, txt.allAntiLinkInstagram(m.sender), null, { mentions: [m.sender, ...groupAdmins.map((v) => v.id)] });
      await m.delete();
    }
  }

  if (chat.antiTiktok && tiktokLink) {
    if (chat.delete) return client.sendText(m.chat, txt.allAntiLinkDelete, m, { mentions: [m.sender, ...groupAdmins.map((v) => v.id)] });
    if (isBotAdmin) {
      await client.sendText(m.chat, txt.allAntiLinkTikTok(m.sender), null, { mentions: [m.sender, ...groupAdmins.map((v) => v.id)] });
      await m.delete();
    }
  }

  if (chat.antiTelegram && telegramLink) {
    if (chat.delete) return client.sendText(m.chat, txt.allAntiLinkDelete, m, { mentions: [m.sender, ...groupAdmins.map((v) => v.id)] });
    if (isBotAdmin) {
      await client.sendText(m.chat, txt.allAntiLinkTelegram(m.sender), null, { mentions: [m.sender, ...groupAdmins.map((v) => v.id)] });
      await m.delete();
    }
  }

  return;
};

export default plugin;
