import gtts from "node-gtts";
import { readFileSync, unlinkSync } from "fs";
import { join } from "path";

let plugin = {};
plugin.cmd = ["tts"];
plugin.botAdmin = true;

plugin.run = async (m, { client, args }) => {
  const defaultLang = "es";
  let lang = args[0];
  let text = args.slice(1).join(" ");
  if ((args[0] || "").length !== 2) {
    lang = defaultLang;
    text = args.join(" ");
  }
  if (!text && m.quoted?.text) text = m.quoted.text;
  let res;
  try {
    res = await tts(text, lang);
  } catch (e) {
    text = args.join(" ");
    if (!text) return client.sendText(m.chat, txt.textToPTTNull, m);
    await client.sendPresenceUpdate("recording", m.chat);
    res = await tts(text, defaultLang);
  } finally {
    if (res) await client.sendFile(m.chat, res, `textToPTT.mp3`, null, m, true, { seconds: "9999999999999" });
  }
};

export default plugin;

function tts(text, lang = "es") {
  return new Promise((resolve, reject) => {
    try {
      let tts = gtts(lang);
      let filePath = join("./tmp", Date.now() + ".wav");
      tts.save(filePath, text, () => {
        resolve(readFileSync(filePath));
        unlinkSync(filePath);
      });
    } catch (e) {
      reject(e);
    }
  });
}
