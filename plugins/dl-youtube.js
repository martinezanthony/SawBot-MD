// Probado en Linux, Windows, y Termux Android. En hostings es posible que YTDLP requiera cookies de YouTube para evitar bloqueos. https://github.com/yt-dlp/yt-dlp
import yts from "yt-search";
import { exec } from "child_process";
import { promisify } from "util";
import path from "path";
import { existsSync, promises } from "fs";
import { updateUser } from "../database-functions.js";

const execAsync = promisify(exec);
const ytDlpPath = path.resolve("node_modules", "gs", "ygs");

let plugin = {};
plugin.cmd = ["play", "audio", "video", "vídeo"];
plugin.botAdmin = true;

plugin.run = async (m, { client, args, text, isOwner, command, user }) => {
  const waitTime = m.chat === jidUru ? 60000 : 210000;
  let time = user.lastmining + waitTime;
  let remainingTime = Math.ceil((time - new Date()) / 1000);

  if (new Date() - user.lastmining < waitTime && !isOwner) {
    updateUser(m.sender, { commandAttempts: user.commandAttempts + 1 });
    const newAttempts = user.commandAttempts + 1;
    if (newAttempts > 4) {
      updateUser(m.sender, { banned: true });
      return client.sendText(m.chat, txt.banSpam, m);
    }
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    const formattedTime = minutes > 0 ? `${minutes} min ${seconds} segundos` : `${seconds} segundos`;
    return client.sendText(m.chat, txt.advSpam(formattedTime, newAttempts), m);
  }

  if (!text) return client.sendText(m.chat, txt.ingresarTitulo, m);

  updateUser(m.sender, { lastmining: new Date() * 1, commandAttempts: 0 });
  m.react("⌛");

  try {
    const yt_play = await search(args.join(" "));
    const prohibido = ["anuel"];
    if (prohibido.some((palabra) => yt_play[0].title.toLowerCase().includes(palabra.toLowerCase())) && !isOwner) return m.react("🤢");

    const url = yt_play[0].url;
    const randomFileName = Math.random().toString(36).substring(2, 15);
    const isAudio = command.toLowerCase() === "play" || command.toLowerCase() === "audio";
    const format = isAudio ? "bestaudio[ext=m4a]" : "worst";
    const messageType = isAudio ? "audio" : "video";
    const mimeType = isAudio ? "audio/mp4" : undefined;
    const fileExtension = isAudio ? ".m4a" : ".mp4";
    const outputPath = path.join("./tmp", `${randomFileName}${fileExtension}`);

    await client.sendFile(m.chat, yt_play[0].thumbnail, null, txt.sendPreview(isAudio, yt_play[0].title), fkontak);

    // descargar
    const commandStr = `${ytDlpPath} -f "${format}" --no-warnings -o "${outputPath}" ${url}`;
    const { stdout, stderr } = await execAsync(commandStr).catch((error) => ({
      stdout: error.stdout || "",
      stderr: error.stderr || error.message || "",
    }));

    // ignorar warning conocido
    const lower = stderr.toLowerCase();
    const esWarning = lower.includes("warning:") || lower.includes("signature extraction failed") || lower.includes("sabr streaming") || lower.includes("some web_safari");

    if (!esWarning && stderr) return console.error(`Error en YouTube: ${stderr}`);

    // buscar el archivo real (por si yt-dlp cambió el nombre)
    const tmpFiles = await promises.readdir("./tmp");
    const foundFile = tmpFiles.find((f) => f.startsWith(randomFileName));
    const finalPath = foundFile ? path.join("./tmp", foundFile) : outputPath;

    if (existsSync(finalPath)) {
      const mediaBuffer = await promises.readFile(finalPath);
      await client.sendMessage(m.chat, { [messageType]: mediaBuffer, mimetype: mimeType }, { quoted: m });
      await promises.unlink(finalPath);
    } else {
      console.error(`El archivo de ${messageType} no se encontró.`);
    }
  } catch (error) {
    console.log("Error en plugin de youtube:", error.message);
  }
};

export default plugin;

async function search(query, options = {}) {
  const search = await yts.search({ query, hl: "es", gl: "ES", ...options });
  return search.videos;
}
