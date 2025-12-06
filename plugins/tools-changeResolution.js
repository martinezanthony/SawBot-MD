import jimp from "jimp-legacy";
import uploadImage from "../lib/uploadImage.js";

let plugin = {};
plugin.cmd = ["res"];
plugin.botAdmin = true;

plugin.run = async (m, { client, text, usedPrefix, command }) => {
  const q = m.quoted ? m.quoted : m;
  const mime = (q.msg || q).mimetype || "";
  if (!/image\/(png|jpe?g)/.test(mime)) return client.sendText(m.chat, txt.defaultImage, m);

  const media = await q.download();
  const link = await uploadImage(media);

  const source = await jimp.read(link);
  const origWidth = source.bitmap.width;
  const origHeight = source.bitmap.height;

  let newWidth, newHeight;

  // solo altura (ej: ".res 500")
  if (!text.includes("x")) {
    newHeight = parseInt(text);
    if (isNaN(newHeight)) return client.sendText(m.chat, txt.changeResolutionNumbers(usedPrefix, command), m);

    // se mantiene la proporcion para evitar deformidad en la imagen
    newWidth = Math.round(origWidth * (newHeight / origHeight));
  }
  // formato ancho por alto (ej: ".res 300x600")
  else {
    [newWidth, newHeight] = text.split("x").map((v) => parseInt(v));
    if (isNaN(newWidth) || isNaN(newHeight)) return client.sendText(m.chat, txt.changeResolutionNumbers(usedPrefix, command), m);
  }

  // redimensionar
  const resizedImage = await source.resize(newWidth, newHeight);
  const buffer = await resizedImage.getBufferAsync(jimp.MIME_PNG);

  const caption = `_*NUEVA RESOLUCIÓN :*_ ${newWidth} x ${newHeight}
> Ancho : ${newWidth}
> Altura : ${newHeight}`;

  client.sendFile(m.chat, buffer, null, caption, m);
};

export default plugin;
