let plugin = {};
plugin.cmd = ["formarpareja"];
plugin.onlyGroup = true;
plugin.botAdmin = true;

plugin.run = async (m, { client, groupMetadata, chat }) => {
  if (!chat.games) return client.sendText(m.chat, txt.disabledGames, m);
  const ps = groupMetadata.participants.map((v) => v.id);
  const a = ps.getRandom();
  const b = ps.getRandom();
  client.sendText(m.chat, txt.formarParejaMsg(a, b), m);
};

export default plugin;
