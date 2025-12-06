import Jimp from "jimp-legacy";
import { unlinkSync } from "fs";

let plugin = {};
plugin.cmd = ["carcel", "cárcel", "preso", "presa"];
plugin.botAdmin = true;

plugin.run = async (m, { client, text, usedPrefix, command, chat }) => {
  if (!chat.games) return client.sendText(m.chat, txt.disabledGames, m);
  let who;
  const numberMatches = text.match(/@[0-9\s]+/g);
  const numberMatchesPlus = text.match(/\+[0-9\s]+/g);
  if (numberMatchesPlus && numberMatchesPlus.length > 0) {
    who = numberMatchesPlus[0].replace(/[+\s]/g, "") + "@s.whatsapp.net";
  } else if (numberMatches && numberMatches.length > 0) {
    who = numberMatches[0].replace("@", "").replace(/\s+/g, "") + "@lid";
  } else if (m.quoted) {
    who = m.quoted.sender;
  }
  if (!who) return client.sendText(m.chat, txt.defaultWho(usedPrefix, command), m);
  const pp = await client.profilePictureUrl(who, "image").catch((_) => null);
  if (!pp) return client.sendText(m.chat, txt.defaultNoPP, m);
  m.react("⏳");

  try {
    const years = `${pickRandom(["2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"])}`;
    const razon = `${pickRandom(["SER TAN PUTA", "SER TAN LIND@😍", "SER TAN IMBECIL🙄", "SER TAN PAJER@🤣", "ACOSADOR🤢", "INFIEL", "GAY🏳️‍🌈🌈", "TROLA", "CARGAR TANTA BELLEZA😍", "SER TAN FE@🤮", "COMER TANTAS VERGAS🍆"])}`;

    const randomName = `${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const outputPath = `./tmp/${randomName}.jpg`;

    const ppCarcel = "https://i.ibb.co/1tKmnxRy/5856a83e4f6ae202fedf276d.png";

    const foto1 = await Jimp.read(pp);
    const foto2 = await Jimp.read(ppCarcel);

    foto2.resize(foto1.getWidth(), foto1.getHeight());
    foto2.opacity(0.8);
    foto1.composite(foto2, 0, 0, { mode: Jimp.BLEND_SOURCE_OVER });

    await foto1.writeAsync(outputPath);

    await client.sendFile(m.chat, outputPath, `${randomName}.jpg`, txt.carcelMsg(years, razon), m);
    unlinkSync(outputPath);
  } catch (err) {
    console.error(err);
  }
};

export default plugin;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}
