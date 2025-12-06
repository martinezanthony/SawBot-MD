import { addExif } from "../lib/sticker.js";

let plugin = {};
plugin.cmd = ["wm"];
plugin.botAdmin = true;

plugin.run = async (m, { client, text }) => {
  if (!m.quoted) return client.sendText(m.chat, txt.wmNull, m);

  let stiker = false;
  try {
    let [packname, ...author] = text.split("|");
    author = (author || []).join("|");
    const mime = m.quoted.mimetype || "";
    if (!/webp/.test(mime)) return client.sendText(m.chat, txt.wmNull, m);
    const img = await m.quoted.download();
    if (!img) return client.sendText(m.chat, txt.wmNull, m);
    stiker = await addExif(img, packname || "", author || "");
  } catch (e) {
    console.error(e);
    if (Buffer.isBuffer(e)) stiker = e;
  } finally {
    if (stiker) client.sendFile(m.chat, stiker, "sticker.webp", "", m);
    else return client.sendText(m.chat, txt.wmNull, m);
  }
};

export default plugin;
