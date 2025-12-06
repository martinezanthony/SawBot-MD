import translate from "@vitalets/google-translate-api";

let plugin = {};
plugin.cmd = ["traducir", "translate"];
plugin.botAdmin = true;

plugin.run = async (m, { client, text }) => {
  if (!text) return client.sendText(m.chat, txt.translateNull, m);
  if (!text && m.quoted && m.quoted.text) text = m.quoted.text;
  try {
    const result = await translate(`${text}`, { to: "es", autoCorrect: true });
    await client.sendText(m.chat, result.text, m);
  } catch (e) {
    console.log(e);
  }
};

export default plugin;
