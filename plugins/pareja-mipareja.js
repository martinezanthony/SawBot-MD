import { getUser, updateUser } from "../databaseFunctions.js";

let plugin = {};
plugin.cmd = ["mipareja"];
plugin.onlyGroup = true;
plugin.botAdmin = true;

plugin.run = async (m, { client, user }) => {
  let totalParejas = user.couplesHistory.length;

  if (user.couple == "") {
    const kz = await client.sendText(m.chat, txt.parejaNoTiene(m.sender, totalParejas), fkontak);
    client.sendMessage(m.chat, { react: { text: "🤣", key: kz.key } });
    return;
  }

  let persona = user.couple;
  const parejaData = getUser(persona);
  const parejaLid = parejaData?.lid;

  if (!parejaLid || !parejaData) {
    updateUser(m.sender, { couple: "" });
    return client.sendText(m.chat, "Tu pareja ya no existe en la base de datos.", m);
  }

  if (parejaData.couple === m.senderJid) {
    setTimeout(() => {
      m.react("❤️");
    }, 700);
    const marriedMessage = user.married && parejaData.married ? `*💍Casados:* ✅\n*⏳Tiempo casados:*\n${timeSince(user.marriedTime)}` : `*💍Casados:* ❌`;
    const kz = await client.sendText(m.chat, txt.parejaMiPareja(m.sender, parejaLid, timeSince(user.coupleTime), marriedMessage, totalParejas), fkontak);
    client.sendMessage(m.chat, { react: { text: "❤️", key: kz.key } });
    return;
  }

  await client.sendText(m.chat, txt.parejaMiParejaSinRespuesta(parejaLid), fkontak);
  updateUser(m.sender, { couple: "" });
};

export default plugin;

function timeSince(time) {
  let seconds = Math.floor((new Date() - time) / 1000);
  let interval;
  const timeUnits = [];

  // Calcular años
  interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    timeUnits.push(interval + ` año${interval !== 1 ? "s" : ""}`);
    seconds -= interval * 31536000;
  }

  // Calcular meses
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    timeUnits.push(interval + ` mes${interval !== 1 ? "es" : ""}`);
    seconds -= interval * 2592000;
  }

  // Calcular días
  interval = Math.floor(seconds / 86400);
  const daysPassed = interval >= 1; // Guardar si ha pasado al menos un día
  if (interval >= 1) {
    timeUnits.push(interval + ` día${interval !== 1 ? "s" : ""}`);
    seconds -= interval * 86400;
  }

  // Calcular horas
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    timeUnits.push(interval + ` hora${interval !== 1 ? "s" : ""}`);
    seconds -= interval * 3600;
  }

  // Calcular minutos
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    timeUnits.push(interval + ` minuto${interval !== 1 ? "s" : ""}`);
    seconds -= interval * 60;
  }

  // Calcular segundos solo si ha pasado menos de un día
  if (!daysPassed && seconds >= 1) {
    timeUnits.push(seconds + ` segundo${seconds !== 1 ? "s" : ""}`);
  }

  return timeUnits.join(", ");
}
