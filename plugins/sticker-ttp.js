import Jimp from "jimp-legacy";
import { sticker } from "../lib/sticker.js";

let plugin = {};
plugin.cmd = ["ttp"];
plugin.botAdmin = true;

plugin.run = async (m, { client, text }) => {
  if (!text && !m.quoted) return client.sendText(m.chat, "Ingresa un texto.", m);

  m.react("⏳");

  let raw = text || m.quoted.text || "";
  let teks = raw.toUpperCase().trim();

  const words = teks.split(" ");
  let lines = [];

  if (words.length <= 6) {
    const rows = Math.ceil(Math.sqrt(words.length));
    const perRow = Math.ceil(words.length / rows);

    for (let i = 0; i < words.length; i += perRow) {
      lines.push(words.slice(i, i + perRow).join(" "));
    }
  } else {
    const idealCharPerLine = Math.floor(Math.sqrt(teks.length * 1.3)) + 5;
    const wrapLength = Math.max(10, idealCharPerLine);

    let current = "";
    for (let word of words) {
      if ((current + " " + word).trim().length > wrapLength) {
        lines.push(current.trim());
        current = word;
      } else {
        current += " " + word;
      }
    }
    if (current) lines.push(current.trim());
  }

  const canvasWidth = 500;
  const canvasHeight = 500;
  const bg = new Jimp(canvasWidth, canvasHeight, 0x00000000);
  const font = await Jimp.loadFont("./resources/BebasNeue.fnt");

  let maxWidth = 0;
  let totalHeight = 0;
  const lineHeights = [];

  for (let line of lines) {
    const w = Jimp.measureText(font, line);
    const h = Jimp.measureTextHeight(font, line, 1000);
    maxWidth = Math.max(maxWidth, w);
    totalHeight += h;
    lineHeights.push(h);
  }

  const textImg = new Jimp(maxWidth + 20, totalHeight + 20, 0x00000000);
  let currentY = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const x = (textImg.getWidth() - Jimp.measureText(font, line)) / 2;
    textImg.print(font, x, currentY, line);
    currentY += lineHeights[i];
  }

  textImg.autocrop();
  const maxContentWidth = canvasWidth - 40;
  const maxContentHeight = canvasHeight - 40;
  textImg.scaleToFit(maxContentWidth, maxContentHeight);

  const xCenter = (canvasWidth - textImg.getWidth()) / 2;
  const yCenter = (canvasHeight - textImg.getHeight()) / 2;
  bg.composite(textImg, xCenter, yCenter);

  const buffer = await bg.getBufferAsync(Jimp.MIME_PNG);
  const stik = await sticker(buffer, false);
  await client.sendFile(m.chat, stik, null, null);
};

export default plugin;
