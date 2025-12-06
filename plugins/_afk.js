import { getUser, updateUser } from "../databaseFunctions.js";

let plugin = (m) => m;
plugin.before = async function (m, { client, user }) {
  const who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender;
  const inGroup = user.inGroup[m.chat];
  if (user.banned) return;

  if (inGroup.afk > -1) {
    await client.sendText(m.chat, txt.afkOff(m.sender, inGroup.afkReason, inGroup.afk), null);
    const newInGroup = {
      ...user.inGroup,
      [m.chat]: {
        ...user.inGroup[m.chat],
        afk: -1,
        afkReason: "",
      },
    };

    updateUser(m.sender, { inGroup: JSON.stringify(newInGroup) });
  }

  if (who && who !== m.sender) {
    const hap = getUser(who);
    const whoAfk = hap?.inGroup[m.chat];
    const afkTime = hap?.inGroup[m.chat]?.afk || 0;
    if (afkTime && afkTime > 0) {
      let tiempoInactivo = (new Date() - afkTime) / 1000;
      if (tiempoInactivo < 10) return;
      let reason = whoAfk.afkReason || "";
      await client.sendText(m.chat, txt.afkOn(reason, whoAfk.afk), m);
    }
  }

  return;
};

export default plugin;
