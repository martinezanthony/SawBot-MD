import axios from "axios";

let plugin = {};
plugin.cmd = ["instagram", "igdl"];
plugin.botAdmin = true;

plugin.run = async (m, { client, args }) => {
  if (!args[0]) return client.sendText(m.chat, txt.dlInstaNull, m);
  m.react("⌛");
  try {
    const responseIg = await axios.get(`${deliriusApi}/download/instagram?url=${args[0]}`);
    const resultlIg = responseIg.data;
    let linkig = resultlIg.data[0].url;
    await client.sendFile(m.chat, linkig, "error.mp4", txt.dlInstaSuccess, m);
  } catch (e) {
    console.log(e);
  }
};

export default plugin;
