import { sticker } from "../lib/sticker.js";
import fetch from "node-fetch";

let plugin = {};
plugin.cmd = ["emojimix"];
plugin.botAdmin = true;

plugin.run = async (m, { client, text, args, usedPrefix, command }) => {
  if (!args[0]) return client.sendText(m.chat, txt.emojiMixNull(usedPrefix, command), m);
  const [emoji1, emoji2] = text.split`+`;
  let anu = await fetchJson(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1)}_${encodeURIComponent(emoji2)}`);
  for (let res of anu.results) {
    const stiker = await sticker(false, res.url);
    client.sendFile(m.chat, stiker, null, null, m);
  }
};

export default plugin;

const fetchJson = (url, options) =>
  new Promise(async (resolve, reject) => {
    fetch(url, options)
      .then((response) => response.json())
      .then((json) => {
        resolve(json);
      })
      .catch((err) => {
        reject(err);
      });
  });
