import axios from "axios";

let plugin = {};
plugin.cmd = ["horoscopo", "horóscopo"];
plugin.botAdmin = true;

plugin.run = async (m, { client, text }) => {
  const caption = `🌠 \`INGRESE SU SIGNO\` 🌠

♈ .horoscopo aries
♉ .horoscopo tauro
♊ .horoscopo geminis
♋ .horoscopo cancer
♌ .horoscopo leo
♍ .horoscopo virgo
♎ .horoscopo libra
♏ .horoscopo escorpio
♐ .horoscopo sagitario
♑ .horoscopo capricornio
♒ .horoscopo acuario
♓ .horoscopo piscis`;
  if (!text) return client.sendText(m.chat, caption, m);
  const signosZodiacales = ["aries", "tauro", "geminis", "cancer", "leo", "virgo", "libra", "escorpio", "sagitario", "capricornio", "acuario", "piscis"];
  if (!signosZodiacales.some((signo) => text.toLowerCase().includes(signo.toLowerCase()))) return client.sendText(m.chat, `Signo inválido.`, fkontak);
  let sign = text.trim().toLowerCase();
  if (sign === "escorpio") {
    sign = "escorpion";
  }
  try {
    let response = await axios.get(`https://www.horoscopo.com/horoscopos/general-diaria-${sign}`);
    let html = response.data;
    let startIndex = html.indexOf("<p>") + "<p>".length;
    let endIndex = html.indexOf("</p>", startIndex);
    let horoscope = html.substring(startIndex, endIndex);
    let tes1 = horoscope.split`-`[0];
    let tes2 = horoscope.split`-`[1];

    let emoji = "";
    switch (text.toLowerCase()) {
      case "aries":
        emoji = "♈";
        break;
      case "tauro":
        emoji = "♉";
        break;
      case "geminis":
        emoji = "♊";
        break;
      case "cancer":
        emoji = "♋";
        break;
      case "leo":
        emoji = "♌";
        break;
      case "virgo":
        emoji = "♍";
        break;
      case "libra":
        emoji = "♎";
        break;
      case "escorpio":
        emoji = "♏";
        break;
      case "sagitario":
        emoji = "♐";
        break;
      case "capricornio":
        emoji = "♑";
        break;
      case "acuario":
        emoji = "♒";
        break;
      case "piscis":
        emoji = "♓";
        break;
      default:
        break;
    }
    m.react(emoji);
    let teks = `*${emoji}${text.toUpperCase()}${emoji}*\n\n*📅 FECHA:*\n* ${tes1}\n\n${tes2}`;
    let link = "https://telegra.ph/file/cd132232c09831825aed2.jpg";
    let kz = await client.sendFile(m.chat, link, null, teks, fkontak);
    client.sendMessage(m.chat, { react: { text: "🌠", key: kz.key } });
  } catch (error) {
    client.sendText(m.chat, `Hubo un error al obtener la predicción para ${sign}.`, m);
    console.error("Error al obtener la predicción:", error);
  }
};

export default plugin;
