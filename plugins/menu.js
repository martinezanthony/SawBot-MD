import { getTotalUsers } from "../databaseFunctions.js";

let plugin = {};
plugin.cmd = ["menu", "menú", "help", "comandos", "ayuda"];
plugin.botAdmin = true;

plugin.run = async (m, { client, usedPrefix }) => {
  const more = String.fromCharCode(8206);
  const readMore = more.repeat(4001);
  const images = ["https://i.postimg.cc/jSQfmpC7/SAWFDSOIJ6597-DSHB8-EWH7.jpg", "https://i.postimg.cc/rFCn6MgS/botmenu-min.jpg"];
  const randomImage = images[Math.floor(Math.random() * images.length)];

  const menuText = `
👋¡🇭 🇴 🇱 🇦  *${m.pushName}*!🫩
*▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔*
ℹ *[ 𝙸𝙽𝙵𝙾 𝙳𝙴𝙻 𝙱𝙾𝚃 ]* ℹ
👤 *𝚄𝚂𝚄𝙰𝚁𝙸𝙾𝚂:* ${getTotalUsers()}
🆙 *𝚅𝙴𝚁𝚂𝙸𝙾́𝙽:* ${globalThis.botVersion}
*▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔*
📌 \`LISTA DE COMANDOS:\`
${readMore}

🛡️ *[ 𝚂𝙾𝙻𝙾 𝙰𝙳𝙼𝙸𝙽𝚂 ]* 🪚
┃🩸 ${usedPrefix}g 🔒 – \`Abre o cierra el chat del grupo.\`
┃🩸 ${usedPrefix}k @mención ❌ – \`Expulsa a un participante.\`
┃🩸 ${usedPrefix}p @mención 🎫 – \`Dar admin al participante.\`
┃🩸 ${usedPrefix}d @mención 🎫 – \`Quitar admin al participante.\`
┃🩸 ${usedPrefix}del 🗑️ – \`Elimina un mensaje.\`
┃🩸 ${usedPrefix}tagall 👈 – \`Mención a todos los participantes.\`
┃🩸 ${usedPrefix}tagall2 👈 – \`Envía el tagall pero x10 veces seguidas.\`
┃🩸 ${usedPrefix}ht 👈 – \`Mención oculta a todos los participantes.\`
┃🩸 ${usedPrefix}ht2 👈 – \`Igual que ".ht" pero x10 veces seguidas.\`
┃🩸 ${usedPrefix}silenciar @mención 🔇 – \`Silencia un participante.\`
┃🩸 ${usedPrefix}desilenciar @mención 🔇 – \`Desilencia un participante.\`
┃🩸 ${usedPrefix}advertir @mención <motivo> 🤚 – \`Advertir a un participante.\`
┃🩸 ${usedPrefix}unwarn @mención 🤚 – \`Quitar advertencia a un participante.\`
┃🩸 ${usedPrefix}setpp 📸 – \`Cambia la foto del grupo.\`
┃🩸 ${usedPrefix}setname <nombre> ✏️ – \`Cambia el nombre del grupo.\`
┃🩸 ${usedPrefix}getpp 📸 – \`Obtiene la foto de perfil actual del grupo.\`
┃🩸 ${usedPrefix}gpu 📸 – \`Obtiene la foto de perfil de un participante.\`
┃🩸 ${usedPrefix}llamar @mención 🤚 – \`Menciona 20 veces a un usuario\`
┃🩸 ${usedPrefix}pin 📌 – \`Fija un mensaje en el chat.\`
┃🩸 ${usedPrefix}rl ♻️ – \`Restaurar enlace del grupo.\`
┃🩸 ${usedPrefix}ap ☑️ – \`Aprobar solicitudes pendientes para unirse.\`
┃🩸 ${usedPrefix}ruletadelban ☠️ – \`Elimina un participante al azar.\`
┃🩸 ${usedPrefix}config ⚙️ – \`Ver la configuración actual del bot en el grupo\`
*▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔*
⚙️ *[ 𝙲𝙾𝙽𝙵𝙸𝙶𝚄𝚁𝙰𝙲𝙸𝙾́𝙽 ]* 🪚
*[ Si está activado, se desactiva, y viceversa ]*

┃🩸 ${usedPrefix}modoadmin 🛡️ – \`Bot unicamente para admins.\`
┃🩸 ${usedPrefix}antigrupos 🔗 – \`Elimina links de grupos de WhatsApp.\`
┃🩸 ${usedPrefix}anticanales 🔗 – \`Elimina links de canales de WhatsApp.\`
┃🩸 ${usedPrefix}antilink2 🔗 – \`Elimina todos los links que envian al chat.\`
┃🩸 ${usedPrefix}antitiktok 🔗 – \`Elimina links de TikTok.\`
┃🩸 ${usedPrefix}antiinstagram 🔗 – \`Elimina links de Instagram.\`
┃🩸 ${usedPrefix}antitelegram 🔗 – \`Elimina links de Telegram.\`
┃🩸 ${usedPrefix}welcome 👋 – \`Da la bienvenida a nuevos participantes.\`
┃🩸 ${usedPrefix}detect 👀 – \`Avisa cuando hay nuevos admins, o se hacen cambios en el grupo.\`
┃🩸 ${usedPrefix}antieliminar 🗑️ – \`Reenvía mensajes eliminados en el chat.\`
┃🩸 ${usedPrefix}18 🔞 – \`Busquedas +18 en comandos.\`
┃🩸 ${usedPrefix}juegos 🎮 – \`Uso de juegos.\`
┃🩸 ${usedPrefix}menciones 👤 – \`Uso de .tagall y .hidetag.\`
┃🩸 ${usedPrefix}audios 🔊 – \`El bot manda audios.\`
┃🩸 ${usedPrefix}reacciones 💚 – \`El bot reacciona a mensajes.\`
*▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔*
⚠️ *[ 𝚁𝙴𝙿𝙾𝚁𝚃𝙴𝚂 𝙰 𝙰𝙳𝙼𝙸𝙽𝚂 ]* 🪚
┃🩸 ${usedPrefix}reportar 🛑 [responde al mensaje que quiere reportar]
┃🩸 ${usedPrefix}admins 🪧 <mensaje para los admins>
*▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔*
🎧 *[ 𝙳𝙴𝚂𝙲𝙰𝚁𝙶𝙰𝚂 𝙼𝚄𝙻𝚃𝙸𝙼𝙴𝙳𝙸𝙰 ]* 🪚
┃🩸 ${usedPrefix}audio <artista y título> 🎵 – \`Reproduce música de YouTube.\`
┃🩸 ${usedPrefix}video <nombre> 🎥 – \`Busca un video de YouTube.\`
┃🩸 ${usedPrefix}imagen <texto> 📷 – \`Busca una imagen en Google.\`
┃🩸 ${usedPrefix}imagen2 <texto> 🖼️ – \`Busca una imagen en Google.\`
┃🩸 ${usedPrefix}igdl <enlaceTikTok> 📷 – \`Descarga video de TikTok.\`
┃🩸 ${usedPrefix}igdl <enlaceInstagram> 📷 – \`Descarga imagen/video de Instagram.\`
*▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔*
🤖 *[ 𝙷𝙰𝙱𝙻𝙰𝚁 𝙲𝙾𝙽 𝙸𝙰 ]* 🪚
┃🩸 @bot <texto> 🤖 – \`Habla con el bot.\`
┃🩸 ${usedPrefix}chatgpt <texto> 🤖 – \`Pregunta a la IA.\`
┃🩸 ${usedPrefix}ia <texto> 🤖 – \`Pregunta a la IA.\`
*▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔*
🪀 *[ 𝙲𝙾𝙽𝚅𝙴𝚁𝚃𝙸𝙳𝙾𝚁𝙴𝚂 ]* 🪚
┃🩸 ${usedPrefix}s 🃏 – \`Convierte una imagen o vídeo en sticker.\`
┃🩸 ${usedPrefix}ttp <texto> ✏️ – \`Convierte texto en sticker.\`
┃🩸 ${usedPrefix}ttp2 <texto> 🔖 – \`Convierte texto en sticker RGB.\`
┃🩸 ${usedPrefix}qc <texto> 🐦 – \`Crea un sticker tipo tweet.\`
┃🩸 ${usedPrefix}wm – \`Cambia el autor de un sticker.\`
┃🩸 ${usedPrefix}img – \`Convierte un sticker en imagen.\`
┃🩸 ${usedPrefix}emojimix <🤣+😍> – \`Fusiona dos emojis y lo devuelve en sticker.\`
┃🩸 ${usedPrefix}tts <texto> 🔖 – \`Convierte texto a audio.\`
┃🩸 ${usedPrefix}tomp3 <texto> 🔖 – \`Convierte video o nota de voz a audio MP3.\`
*▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔*
📷 *[ 𝙲𝙰𝙽𝚅𝙰𝚂 𝙲𝙾𝙽 𝙵𝙾𝚃𝙾𝚂 ]* 🪚
┃🩸 ${usedPrefix}gay 🌈
┃🩸 ${usedPrefix}trans 🏳️‍⚧️
┃🩸 ${usedPrefix}bi 🌈
┃🩸 ${usedPrefix}simp 🙅🏻‍♂️
┃🩸 ${usedPrefix}smeme <texto> ✏️ – \`Añade texto a una imágen.\`
┃🩸 ${usedPrefix}licenciahot 🔥
┃🩸 ${usedPrefix}cárcel 🚓
*▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔*
💤 *[ 𝙴𝚂𝚃𝙰𝙳𝙾 𝙰𝙵𝙺 ]* 🪚
┃🩸 ${usedPrefix}afk <motivo> 💤 – \`Establece un AFK indicando que estarás inactivo.\`
*▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔*
🔮 *[ 𝙷𝙾𝚁𝙾́𝚂𝙲𝙾𝙿𝙾 ]* 🪚
┃🩸 ${usedPrefix}horoscopo <signo> 🔮 – \`Mira tu horoscopo del día.\`
*▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔*
🤳 *[ 𝙲𝙾𝙼𝙿𝙰𝚁𝚃𝙴 𝚃𝚄 𝙸𝙽𝚂𝚃𝙰𝙶𝚁𝙰𝙼 ]* 🪚
┃🩸 ${usedPrefix}ig <tuUsuario> 🤳 – \`Comparte tu instagram con los participantes.\`
*▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔*
❤️ *[ 𝙿𝙰𝚁𝙴𝙹𝙰 𝚈 𝙲𝙰𝚂𝙰𝙼𝙸𝙴𝙽𝚃𝙾]* 🪚
┃🩸 ${usedPrefix}pareja @mención ❤‍🔥 – \`Pídele a un participante que sea tu pareja en el grupo.\`
┃🩸 ${usedPrefix}aceptar @mención ✅ – \`Acepta la petición si te la enviaron.\`
┃🩸 ${usedPrefix}rechazar @mención ❌ – \`Rechaza la petición si te la enviaron.\`
┃🩸 ${usedPrefix}mipareja @mención 👩‍❤️‍💋‍👨 – \`Mira el estado de tu pareja actual.\`
┃🩸 ${usedPrefix}terminar 😔 – \`Termina con tu pareja actual.\`
┃🩸 ${usedPrefix}ex 🔙 – \`Mira tus parejas anteriores.\`
┃🩸 ${usedPrefix}casarse 💍 – \`Pídele a tu pareja para casarse.\`
┃🩸 ${usedPrefix}si ✅ – \`Acepta la petición de casarse si te la enviaron.\`
┃🩸 ${usedPrefix}no ❌ – \`Rechaza la petición de casarse si te la enviaron.\`
*▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔*
🎮 *[ 𝙹𝚄𝙴𝙶𝙾𝚂 𝙴𝚇𝚃𝚁𝙰 ]* 🪚
┃🩸 ${usedPrefix}ttt 🕹️ – \`TaTeTi\`
┃🩸 ${usedPrefix}delttt 🗑️ – \`Elimina sala creada de TaTeTi.\`
┃🩸 ${usedPrefix}ahorcado 💬 – \`Adivina la palabra en 9 intentos.\`
┃🩸 ${usedPrefix}acertijo ❔ – \`Un acertijo y 30 segundos para resolverlo.\`
┃🩸 ${usedPrefix}trivia ❔ – \`¿Cual es la respuesta?\`
┃🩸 ${usedPrefix}ordenar 🔠 – \`Ordenar la palabra.\`
┃🩸 ${usedPrefix}bandera 🌍 – \`¿De que país es la bandera?\`
┃🩸 ${usedPrefix}topgays 🌈
┃🩸 ${usedPrefix}formarpareja 👩‍❤️‍💋‍👨 – \`Forma pareja al azar entre dos participantes.\`
┃🩸 ${usedPrefix}siono <texto> – ✅ | ❌
┃🩸 ${usedPrefix}besar @mención 💋
*▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔*
📖 *[ 𝙱𝙸𝙱𝙻𝙸𝙰 ]* 🪚
\`Acá seguimos al señor\` 🙇‍♂️
┃🩸 ${usedPrefix}versiculo 📖
┃🩸 ${usedPrefix}salmos 📖
*▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔*
🔊 *[ 𝙴𝙵𝙴𝙲𝚃𝙾𝚂 𝙳𝙴 𝙰𝚄𝙳𝙸𝙾 ]* 🪚
┃🩸 ${usedPrefix}robot
┃🩸 ${usedPrefix}tupai
┃🩸 ${usedPrefix}slow
┃🩸 ${usedPrefix}smooth
┃🩸 ${usedPrefix}bass
┃🩸 ${usedPrefix}blown
┃🩸 ${usedPrefix}deep
┃🩸 ${usedPrefix}earrape
┃🩸 ${usedPrefix}fast
┃🩸 ${usedPrefix}fat
┃🩸 ${usedPrefix}nightcore
┃🩸 ${usedPrefix}reverse
*▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔*
🛸 *[ 𝙴𝚇𝚃𝚁𝙰𝚂 ]* 🪚
┃🩸 ${usedPrefix}say 🗣️ <texto>
┃🩸 ${usedPrefix}sortear 🏆 <texto>
┃🩸 ${usedPrefix}hd 📷 – \`Efecto Remini a una foto.\`
┃🩸 ${usedPrefix}clima 🌦️ <pais y/o ciudad>
┃🩸 ${usedPrefix}traducir <texto>
*▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔*
🥷 *[ 𝚂𝙾𝙻𝙾 𝙾𝚆𝙽𝙴𝚁 𝙳𝙴𝙻 𝙱𝙾𝚃 ]* 🪚
┃🩸 ${usedPrefix}banuser 🚫 – \`Banea al participante, no podrá usar el bot.\`
┃🩸 ${usedPrefix}unbanuser ☑️ – \`Desbanea al participante, podrá usar el bot.\`
┃🩸 ${usedPrefix}rd @mención 🔄 – \`Resetea datos de participante.\`
┃🩸 ${usedPrefix}Ln 🚫 – \`Meter un usuario a lista negra para que no entre a tus grupos.\`
┃🩸 ${usedPrefix}Ln2 🚫 – \`Sacar a un usuario de la lista negra.\`
┃🩸 ${usedPrefix}vln 🚫 – \`Ver los usuarios que están en lista negra.\`
┃🩸 ${usedPrefix}setppbot 📷 – \`Establece foto de perfil al bot.\`
┃🩸 ${usedPrefix}setbotname ✏️ – \`Establece nombre al bot [no funciona con WhatsApp Business]\`
┃🩸 ${usedPrefix}leave 👋🏻 – \`El bot se saldrá del grupo.\`
*▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔*
💻 *¿Querés instalar el bot tu mismo?*
Ver mas información con el siguiente comando:
┃🩸 ${usedPrefix}info
`.trim();

  /*const kz = await client.sendFile(m.chat, randomImage, null, null, null, {
    contextInfo: {
      forwardingScore: 1,
      isForwarded: true,
    },
  });*/

  const kz = await client.sendMessage(
    m.chat,
    {
      text: menuText,
      contextInfo: {
        forwardingScore: 1,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: globalThis.newsletterJids[0],
          newsletterName: globalThis.newsletterNames[0],
          serverMessageId: "",
        },
        mentionedJid: [m.sender],
        externalAdReply: { showAdAttribution: false, renderLargerThumbnail: true, thumbnailUrl: randomImage, title: `🩸MΣПЦ́ MΣПЦ́ MΣПЦ́ MΣПЦ́ MΣПЦ́🪚\n🪚MΣПЦ́ MΣПЦ́ MΣПЦ́ MΣПЦ́ MΣПЦ́💉`, containsAutoReply: true, mediaType: 1, mediaUrl: randomImage, sourceUrl: null },
      },
    },
    { quoted: fkontak }
  );
  client.sendMessage(m.chat, { react: { text: "📚", key: kz.key } });
};

export default plugin;
