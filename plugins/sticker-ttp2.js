import Jimp from "jimp-legacy";
import { sticker } from "../lib/sticker.js";
import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs";

const execAsync = promisify(exec);

let plugin = {};
plugin.cmd = ["ttp2", "attp2"];
plugin.botAdmin = true;

plugin.run = async (m, { client, text }) => {
  if (!text && !m.quoted) return client.sendText(m.chat, "Ingresa un texto.", m);

  m.react("⏳");

  const raw = text || m.quoted?.text || "";
  const teks = raw.toUpperCase().trim();

  const words = teks.split(" ");
  let lines = [];
  if (words.length <= 6) {
    const rows = Math.ceil(Math.sqrt(words.length));
    const perRow = Math.ceil(words.length / rows);
    for (let i = 0; i < words.length; i += perRow) lines.push(words.slice(i, i + perRow).join(" "));
  } else {
    const idealCharPerLine = Math.floor(Math.sqrt(teks.length * 1.3)) + 5;
    const wrapLength = Math.max(10, idealCharPerLine);
    let current = "";
    for (const word of words) {
      if ((current + " " + word).trim().length > wrapLength) {
        lines.push(current.trim());
        current = word;
      } else current += " " + word;
    }
    if (current) lines.push(current.trim());
  }

  const font = await Jimp.loadFont("./resources/BebasNeue.fnt");
  const canvasWidth = 500;
  const canvasHeight = 500;

  const coloresUnicos = 16;
  const duracionPorColorMs = 100;

  const tmp = "./tmp";
  if (!fs.existsSync(tmp)) fs.mkdirSync(tmp);

  try {
    for (let i = 0; i < coloresUnicos; i++) {
      const hue = (i / coloresUnicos) * 360;
      const color = Jimp.cssColorToHex(`hsl(${hue}, 100%, 50%)`);

      const bg = new Jimp(canvasWidth, canvasHeight, 0x00000000);

      let maxWidth = 0;
      let totalHeight = 0;
      const lineHeights = [];
      for (const line of lines) {
        const w = Jimp.measureText(font, line);
        const h = Jimp.measureTextHeight(font, line, 1000);
        maxWidth = Math.max(maxWidth, w);
        totalHeight += h;
        lineHeights.push(h);
      }

      const textImg = new Jimp(maxWidth + 20, totalHeight + 20, 0x00000000);
      let y = 0;
      for (let j = 0; j < lines.length; j++) {
        const x = (textImg.bitmap.width - Jimp.measureText(font, lines[j])) / 2;
        textImg.print(font, x, y, lines[j]);
        y += lineHeights[j];
      }

      textImg.autocrop();
      textImg.scaleToFit(canvasWidth - 40, canvasHeight - 40);
      bg.composite(textImg, (canvasWidth - textImg.bitmap.width) / 2, (canvasHeight - textImg.bitmap.height) / 2);

      bg.scan(0, 0, bg.bitmap.width, bg.bitmap.height, function (x, y, idx) {
        if (this.bitmap.data[idx + 3] > 10) {
          this.bitmap.data[idx] = (color >> 16) & 255;
          this.bitmap.data[idx + 1] = (color >> 8) & 255;
          this.bitmap.data[idx + 2] = color & 255;
        }
      });

      await bg.writeAsync(`${tmp}/rgb_${i.toString().padStart(3, "0")}.png`);
    }

    const output = `${tmp}/rgb_final.webp`;

    await execAsync(`ffmpeg -y -r ${1000 / duracionPorColorMs} -i "${tmp}/rgb_%03d.png" ` + `-vf "fps=${1000 / duracionPorColorMs}" -c:v libwebp -lossless 0 -quality 85 -loop 0 -preset picture -an "${output}"`);

    for (let i = 0; i < coloresUnicos; i++) {
      try {
        fs.unlinkSync(`${tmp}/rgb_${i.toString().padStart(3, "0")}.png`);
      } catch {}
    }

    const buffer = fs.readFileSync(output);
    fs.unlinkSync(output);

    const stiker = await sticker(buffer);
    await client.sendFile(m.chat, stiker, null, null, m);
  } catch (err) {
    console.error("Error ttp2:", err);
    await client.sendText(m.chat, "Error creando sticker RGB", m);
  }
};

export default plugin;
