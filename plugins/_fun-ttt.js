import { format } from "util";

let plugin = (m) => m;
plugin.before = async function (m, { client }) {
  let ok;
  let isWin = !1;
  let isTie = !1;
  let isSurrender = !1;
  client.game = client.game ? client.game : {};
  let room = Object.values(client.game).find((room) => room.id && room.game && room.state && room.id.startsWith("tictactoe") && [room.game.playerX, room.game.playerO].includes(m.sender) && room.state == "PLAYING");
  if (room) {
    if (!/^([1-9]|(me)?nyerah|\rendirse\|rendirse|RENDIRSE|SALIR|salir|Salir|out|OUT|Out|surr?ender)$/i.test(m.text)) return !0;
    isSurrender = !/^[1-9]$/.test(m.text);
    if (m.sender !== room.game.currentTurn) {
      if (!isSurrender) return !0;
    }

    if (!isSurrender && 1 > (ok = room.game.turn(m.sender === room.game.playerO, parseInt(m.text) - 1))) {
      m.reply(
        {
          "-3": "El juego ha terminado",
          "-2": "Inválido",
          "-1": "Posición inválida",
          0: "Posición inválida",
        }[ok]
      );
      return !0;
    }
    if (m.sender === room.game.winner) isWin = true;
    else if (room.game.board === 511) isTie = true;
    let arr = room.game.render().map((v) => {
      return {
        X: "❎",
        O: "⭕",
        1: "1️⃣",
        2: "2️⃣",
        3: "3️⃣",
        4: "4️⃣",
        5: "5️⃣",
        6: "6️⃣",
        7: "7️⃣",
        8: "8️⃣",
        9: "9️⃣",
      }[v];
    });
    if (isSurrender) {
      room.game._currentTurn = m.sender === room.game.playerX;
      isWin = true;
    }

    let str = `
🫂 𝙅𝙐𝙂𝘼𝘿𝙊𝙍𝙀𝙎 *:*
*┈┈┈┈┈┈┈┈┈*
❎ = @${room.game.playerX.split("@")[0]}
⭕ = @${room.game.playerO.split("@")[0]}
*┈┈┈┈┈┈┈┈┈*
     ${arr.slice(0, 3).join("")}
     ${arr.slice(3, 6).join("")}
     ${arr.slice(6).join("")}
*┈┈┈┈┈┈┈┈┈*
${isWin ? `@${(isSurrender ? room.game.currentTurn : room.game.winner).split("@")[0]} 😎🏆 *GANASTE!!*` : isTie ? `*EMPATE!!🙄🤨*` : `🪄 *TURNO DE* @${room.game.currentTurn.split("@")[0]}`}
`.trim();
    if ((room.game._currentTurn ^ isSurrender ? room.x : room.o) !== m.chat) room[room.game._currentTurn ^ isSurrender ? "x" : "o"] = m.chat;
    if (room.x !== room.o) await this.sendMessage(room.x, { text: str, mentions: client.parseMention(str) }, { quoted: fkontak });
    await client.sendMessage(room.o, { text: str, mentions: client.parseMention(str) }, { quoted: fkontak });

    if (isTie || isWin) {
      delete client.game[room.id];
    }
  }
  return;
};
export default plugin;
