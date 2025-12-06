let plugin = {};
plugin.cmd = ["rl", "resetlink", "restaurarenlace"];
plugin.onlyGroup = true;
plugin.botAdmin = true;
plugin.onlyAdmin = true;

plugin.run = async (m, { client }) => {
  const res = await client.groupRevokeInvite(m.chat);
};

export default plugin;
