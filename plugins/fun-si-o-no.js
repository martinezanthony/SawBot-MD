let plugin = {};
plugin.cmd = ["siono"];
plugin.botAdmin = true;

plugin.run = async (m, { client, text }) => {
  if (!text) return client.sendText(m.chat, txt.sionoNull, m);
  const emoji = `${pickRandom(["✅", "❌"])}`;
  m.react(emoji);
};

export default plugin;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}
