let plugin = (m) => m;
plugin.before = async function (m, { client, isAdmin, isOwner, chat }) {
  if (!chat.antiStatus) return;
  if (m?.message?.groupStatusMentionMessage?.message?.protocolMessage && !isAdmin && !isOwner) {
    client.sendText(m.chat, "No mencionar al grupo en tus estados!!", m, { mentions: [m.sender, globalThis.owners[0] + "@s.whatsapp.net"] });
    setTimeout(async () => {
      await client.groupParticipantsUpdate(m.chat, [m.sender], "remove");
      await m.delete();
    }, 3000);
  }

  return;
};
export default plugin;
