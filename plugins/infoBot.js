let plugin = {};
plugin.cmd = ["info", "infobot", "botinfo"];

plugin.run = async (m, { client }) => {
  const textMsg = "💻 *Revisa el repositorio del bot:*\n\n🔗 *Repositorio:* https://github.com/martinezanthony/SawBot-MD\n\nPodrás instalar el bot tu mismo en tu WhatsApp!";

  client.sendText(m.chat, textMsg, m);
};

export default plugin;
