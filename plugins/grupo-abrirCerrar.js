let plugin = {};
plugin.cmd = ["g"];
plugin.onlyGroup = true;
plugin.botAdmin = true;
plugin.onlyAdmin = true;

plugin.run = async (m, { client, groupMetadata }) => {
  let isClosed = groupMetadata.announce;
  let newState = isClosed ? "not_announcement" : "announcement";
  let reaction = isClosed ? "🔓" : "🔒";
  setTimeout(() => {
    m.react(reaction);
  }, 500);
  await client.groupSettingUpdate(m.chat, newState);
};

export default plugin;
