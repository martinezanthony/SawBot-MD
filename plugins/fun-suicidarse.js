let plugin = {};
plugin.cmd = ["suicidarse", "matarse", "suicidio", "suicidarme", "matarme", "salir"];
plugin.onlyGroup = true;
plugin.botAdmin = true;

plugin.run = async (m, { client, text, isOwner }) => {
  if (isOwner) return;
  await client.sendMessage(m.chat, { text: `*@${m.lid.split("@")[0]} ACABA DE EJECUTAR SU SUICIDIO😐*`, mentions: [m.sender] }, { quoted: m });
  await delay(1500);
  client.groupParticipantsUpdate(m.chat, [m.sender], "remove");
};

export default plugin;

const delay = (time) => new Promise((res) => setTimeout(res, time));
