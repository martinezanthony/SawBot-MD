let plugin = {};
plugin.cmd = ["love", "gay2", "lesbiana", "zorra", "zorro", "pajero", "pajera", "puto", "puta", "infiel", "cornudo", "cornuda"];
plugin.botAdmin = true;

plugin.run = async (m, { client, command, chat }) => {
  if (!chat.games) return client.sendText(m.chat, txt.disabledGames, m);
  const who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender;
  if (command !== "love" && who === client.user.jid) return client.sendText(m.chat, `Yo no soy ${command} como vos🤨🤨🤨`, m);
  if (command !== "love" && who == owners[1] + "@lid") return client.sendText(m.chat, `0% @${who.split("@")[0]} es un santo 😇`, m);

  let porcentaje = Math.floor(Math.random() * 101);

  if (command == "gay2") {
    const juego = `_*@${who.split("@")[0]}* *ES* *${porcentaje}%* *GAY*_ 🏳️‍🌈`.trim();
    const kz = await client.sendText(m.chat, juego, m);
    client.sendMessage(m.chat, { react: { text: "🏳️‍🌈", key: kz.key } });
  }

  if (command == "zorro") {
    const veces = porcentaje <= 30 ? "🙄" : "ES UN FÁCIL🤨🦊";
    const zorro = porcentaje <= 30 ? "ZORRO." : "ZORRO😈";
    const juego = `*🤨𝙼𝙴𝙳𝙸𝙳𝙾𝚁 𝙳𝙴 𝚉𝙾𝚁𝚁𝙴𝚁𝙸́𝙰🦊*\n\n*@${who.split("@")[0]}* ES *${porcentaje}%* ${zorro}\n\n${veces}`.trim();
    const kz = await client.sendText(m.chat, juego, m);
    client.sendMessage(m.chat, { react: { text: "🦊", key: kz.key } });
  }

  if (command == "zorra") {
    const veces = porcentaje <= 30 ? "🙄" : "ES UNA FÁCIL🤨🦊";
    const zorra = porcentaje <= 30 ? "ZORRA." : "ZORRA😈";
    const juego = `*🤨𝙼𝙴𝙳𝙸𝙳𝙾𝚁 𝙳𝙴 𝚉𝙾𝚁𝚁𝙴𝚁𝙸́𝙰🦊*\n\n*@${who.split("@")[0]}* ES *${porcentaje}%* ${zorra}\n\n${veces}`.trim();
    const kz = await client.sendText(m.chat, juego, m);
    client.sendMessage(m.chat, { react: { text: "🦊", key: kz.key } });
  }

  if (command == "lesbiana") {
    const juego = `_*@${who.split("@")[0]}* *ES* *${porcentaje}%* *${command.replace("how", "").toUpperCase()}*_ 🏳️‍🌈`.trim();
    const kz = await client.sendText(m.chat, juego, m);
  }

  if (command == "pajero") {
    let juego = `_*@${who.split("@")[0]}* *ES* *${porcentaje}%* *${command.replace("how", "").toUpperCase()}*_ 😏💦`.trim();
    const kz = await client.sendText(m.chat, juego, m);
    client.sendMessage(m.chat, { react: { text: "💦", key: kz.key } });
  }

  if (command == "pajera") {
    const juego = `_*@${who.split("@")[0]}* *ES* *${porcentaje}%* *${command.replace("how", "").toUpperCase()}*_ 😏💦`.trim();
    const kz = await client.sendText(m.chat, juego, m);
    client.sendMessage(m.chat, { react: { text: "💦", key: kz.key } });
  }

  if (command == "puto") {
    const juego = `_*@${who.split("@")[0]}* *ES* *${porcentaje}%* *${command.replace("how", "").toUpperCase()},* *MÁS INFORMACIÓN A SU PRIVADO 🔥🥵*_`.trim();
    await client.sendText(m.chat, juego, m);
  }

  if (command == "puta") {
    const juego = `_*@${who.split("@")[0]}* *ES* *${porcentaje}%* *${command.replace("how", "").toUpperCase()},* *MÁS INFORMACIÓN A SU PRIVADO 🔥🥵*_`.trim();
    await client.sendText(m.chat, juego, m);
  }

  if (command == "infiel") {
    const veces = porcentaje === 0 ? "ES UN ANGEL😇" : porcentaje <= 30 ? "🙄" : "🦊🦊🦊🦊🦊🦊🦊🦊";
    const infiel = porcentaje === 0 ? "INFIEL." : "INFIEL😈";
    const juego = `*@${who.split("@")[0]}* ES *${porcentaje}%* ${infiel}\n\n${veces}`.trim();
    const kz = await client.sendText(m.chat, juego, m);
    let react;
    if (juego.includes("ANGEL")) {
      react = "😇";
    } else if (juego.includes("TENTACIONES")) {
      react = "🤨";
    } else {
      react = "😮";
    }
    client.sendMessage(m.chat, { react: { text: react, key: kz.key } });
  }

  if (command == "cornuda") {
    const getR = Math.floor(Math.random() * 11);
    const pregunta = getR <= 4 ? "Podría haber sido peor😐" : "POBRE CORNUDA😔";
    const veces = getR === 1 ? "VEZ" : "VECES";
    const juego = `*A @${who.split("@")[0]} LE METIERON LOS CUERNOS ${getR} ${veces}*\n\n*_${pregunta}_*`.trim();
    const kz = await client.sendText(m.chat, juego, m);
    client.sendMessage(m.chat, { react: { text: "🫎", key: kz.key } });
  }

  if (command == "cornudo") {
    const getR = Math.floor(Math.random() * 11);
    const pregunta = getR <= 4 ? "Podría haber sido peor😐" : "POBRE CORNUDO😔";
    const veces = getR === 1 ? "VEZ" : "VECES";
    const juego = `*A @${who.split("@")[0]} LE METIERON LOS CUERNOS ${getR} ${veces}*\n\n*_${pregunta}_*`.trim();
    const kz = await client.sendText(m.chat, juego, m);
    client.sendMessage(m.chat, { react: { text: "🫎", key: kz.key } });
  }

  if (command == "love") {
    const getR = Math.floor(Math.random() * 101);
    const pregunta = getR <= 50 ? "Resultado un poco bajo😔" : "¿Deberías pedirle que sea tu novia/o?😍";
    const juego = `*❤️MEDIDOR DE AMOR❤️*\n\n*_El amor de @${who.split("@")[0]} ES DE ${getR}%_*\n\n*_${pregunta}_*`.trim();
    const kz = await client.sendText(m.chat, juego, m);
    client.sendMessage(m.chat, { react: { text: "❤️", key: kz.key } });
  }
};

export default plugin;
