let plugin = {};
plugin.cmd = ["del"];
plugin.onlyGroup = true;
plugin.botAdmin = true;

plugin.run = async (m, { client, isAdmin, isOwner }) => {
  if (!m.quoted) return client.sendText(m.chat, txt.deleteMessageNull, m);
  if (m.quoted.sender !== m.senderJid && !isAdmin && !isOwner) return client.sendText(m.chat, txt.deleteMessageOnlyMe, m);
  if (!m.quoted) return client.sendText(m.chat, txt.delMsgNull, m);

  m.quoted.delete();
};

export default plugin;
