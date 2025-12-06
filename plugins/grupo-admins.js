let plugin = {};
plugin.cmd = ["admins"];
plugin.onlyGroup = true;
plugin.botAdmin = true;
plugin.onlyAdmin = true;

plugin.run = async (m, { client, participants, args, text }) => {
  if (!text) return client.sendText(m.chat, txt.adminsReason, m);
  const groupAdmins = participants.filter((p) => p.admin);
  const listAdmin = groupAdmins.map((v, i) => `*» ${i + 1}. @${v.id.split("@")[0]}*`).join("\n");
  const pesan = args.join` `;
  const oi = `*𝙈𝙀𝙉𝙎𝘼𝙅𝙀:* _${pesan}_`;
  const textoA = `*[⛔]* 𝗣𝗥𝗘𝗦𝗘𝗡𝗖𝗜𝗔 𝗗𝗘 𝗔𝗗𝗠𝗜𝗡𝗦 *[⛔]*\n\n👉🏻 ${oi}\n\n`;
  const textoB = `${listAdmin}\n*⊱──────────────────⊰*`.trim();
  await client.sendText(m.chat, textoA + textoB, m);
};

export default plugin;
