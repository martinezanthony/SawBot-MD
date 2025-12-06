import { getAllUsers } from "../databaseFunctions.js";

let plugin = {};
plugin.cmd = ["listaparejas", "listadeparejas"];
plugin.botAdmin = true;

plugin.run = async (m, { client }) => {
  const users = getAllUsers();

  const parejas = [];
  const vistos = new Set();

  for (const u1 of users) {
    if (!u1.couple) continue; // si no tiene pareja registrada

    const u2 = users.find((x) => x.jid === u1.couple);
    if (!u2) continue;

    // deben ser pareja mutua
    if (u2.couple !== u1.jid) continue;

    // evitar duplicados
    const key = [u1.lid, u2.lid].sort().join("-");
    if (vistos.has(key)) continue;
    vistos.add(key);

    // tiempo juntos
    const coupleTime = Math.min(u1.coupleTime || 0, u2.coupleTime || 0);

    // ¿están casados mutuamente?
    const casados = u1.married && u2.married && u1.married === u2.jid && u2.married === u1.jid;

    const tiempoCasados = casados ? Math.min(u1.marriedTime || Date.now(), u2.marriedTime || Date.now()) : null;

    parejas.push({
      user1: u1.lid,
      user2: u2.lid,
      coupleTime,
      casadosMessage: casados ? `*Casados:* Sí 💍\n*Tiempo casados:* ${timeSince(tiempoCasados)}` : `*Casados:* No ❌`,
    });
  }

  // ordenar por antigüedad
  parejas.sort((a, b) => a.coupleTime - b.coupleTime);

  const caption = `❤️ 𝙇𝙄𝙎𝙏𝘼 𝘿𝙀 𝙋𝘼𝙍𝙀𝙅𝘼𝙎 ❤️
╭•·━━━━━━━━━━━━━━━━━━━━
│ *Total: ${parejas.length} Pareja${parejas.length !== 1 ? "s" : ""}* ${
    parejas.length > 0
      ? "\n│━━━━━━━━━━━━━━━━━━━━━\n" +
        parejas
          .map(
            (r) => `
│ @${r.user1.split("@")[0]} 💞 @${r.user2.split("@")[0]}
⏳ ${timeSince(r.coupleTime)}
${r.casadosMessage}
│━━━━━━━━━━━━━━━━━━━━━`
          )
          .join("\n")
      : ""
  }
╰•·━━━━━━━━━━━━━━━━━━━━`;

  const mentions = parejas.flatMap((p) => [p.user1, p.user2]);

  await client.sendMessage(m.chat, { text: caption, mentions }, { quoted: m });
};

export default plugin;

// Formato de tiempo
function timeSince(time) {
  if (!time || time <= 0) return "recién";
  let seconds = Math.floor((new Date() - time) / 1000);
  const timeUnits = [];

  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    timeUnits.push(interval + ` año${interval !== 1 ? "s" : ""}`);
    seconds -= interval * 31536000;
  }

  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    timeUnits.push(interval + ` mes${interval !== 1 ? "es" : ""}`);
    seconds -= interval * 2592000;
  }

  interval = Math.floor(seconds / 86400);
  const daysPassed = interval >= 1;
  if (interval >= 1) {
    timeUnits.push(interval + ` día${interval !== 1 ? "s" : ""}`);
    seconds -= interval * 86400;
  }

  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    timeUnits.push(interval + ` hora${interval !== 1 ? "s" : ""}`);
    seconds -= interval * 3600;
  }

  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    timeUnits.push(interval + ` minuto${interval !== 1 ? "s" : ""}`);
    seconds -= interval * 60;
  }

  if (!daysPassed && seconds >= 1) {
    timeUnits.push(seconds + ` segundo${seconds !== 1 ? "s" : ""}`);
  }

  return timeUnits.length > 0 ? timeUnits.join(", ") : "0 segundos";
}
