let plugin = {};
plugin.cmd = ["config"];
plugin.onlyGroup = true;
plugin.botAdmin = true;
plugin.onlyAdmin = true;

plugin.run = async (m, { client, groupMetadata, chat }) => {
  const { isBanned, adminMode, adultMode, antiGroups, antiChannels, allAntiLinks, antiInstagram, antiTiktok, antiTelegram, games, welcome, detect, delete: del, reactions, mentions } = chat;

  const text = `
[⚙️] 𝙲𝙾𝙽𝙵𝙸𝙶 𝙳𝙴 𝙶𝚁𝚄𝙿𝙾 [⚙️]
  
*Nombre:* ${groupMetadata.subject}
  
${groupMetadata.id}
  
*Configuración de grupo:*
${isBanned ? "✅" : "❌"} BanChat
${adminMode ? "✅" : "❌"} Solo admins
${adultMode ? "✅" : "❌"} Modo adulto
${antiGroups ? "✅" : "❌"} AntiLinks grupos WhatsApp
${antiChannels ? "✅" : "❌"} AntiLinks canales WhatsApp
${allAntiLinks ? "✅" : "❌"} Anti cualquier link
${antiInstagram ? "✅" : "❌"} Anti links Instagram
${antiTiktok ? "✅" : "❌"} Anti links TikTok
${antiTelegram ? "✅" : "❌"} Anti links Telegram
${games ? "✅" : "❌"} Uso de juegos
${welcome ? "✅" : "❌"} Welcome - Bye
${detect ? "✅" : "❌"} Alertas de grupo
${mentions ? "✅" : "❌"} Uso de .tagall y ht
${del ? "✅" : "❌"} Anti Eliminar Mensajes
${reactions ? "✅" : "❌"} Bot reacciona`.trim();

  await client.sendText(m.chat, text, m);
};

export default plugin;
