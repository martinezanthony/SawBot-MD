let plugin = {};
plugin.cmd = ["ig"];
plugin.botAdmin = true;

plugin.run = async (m, { client, text }) => {
  if (!text) return client.sendText(m.chat, txt.instaUsuarioNull, m);
  if (text.startsWith("@")) {
    text = text.slice(1);
  }
  m.react("🤳");

  const image = "https://telegra.ph/file/1af5d76a06d74180fac0d.jpg";
  const instagramUrl = `https://instagram.com/${text}`;
  const str = `
*[🤳🏻] 𝙸𝙽𝚂𝚃𝙰𝙶𝚁𝙰𝙼 𝙳𝙴:* @${m.sender.split("@")[0]}

*[👤] 𝚄𝚂𝚄𝙰𝚁𝙸𝙾:* @${text}

*[📌] 𝙴𝙽𝙻𝙰𝙲𝙴:* ${instagramUrl}`.trim();

  await client.sendFile(m.chat, image, null, str, fkontak);
};

export default plugin;
