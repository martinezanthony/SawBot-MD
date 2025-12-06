import { sticker } from "../lib/sticker.js";
import axios from "axios";

let plugin = {};
plugin.cmd = ["qc"];
plugin.botAdmin = true;

plugin.run = async (m, { client, text }) => {
  if (!text) return client.sendText(m.chat, txt.stickerQcNull, m);
  if (text.length > 50) return client.sendText(m.chat, txt.stickerQcMaxLetters, m);
  const pp = await client.profilePictureUrl(m.sender, "image").catch((_) => "https://i.ibb.co/dyk5QdQ/1212121212121212.png");

  const obj = {
    type: "quote",
    format: "png",
    backgroundColor: "#000000",
    width: 512,
    height: 768,
    scale: 2,
    messages: [
      {
        entities: [],
        avatar: true,
        from: {
          id: 1,
          name: m.name,
          photo: {
            url: pp,
          },
        },
        text: text,
        replyMessage: {},
      },
    ],
  };

  const json = await axios.post("https://bot.lyo.su/quote/generate", obj, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const buffer = Buffer.from(json.data.result.image, "base64");
  const stiker = await sticker(buffer, false);
  if (stiker) return client.sendFile(m.chat, stiker, "Quotly.webp", "");
};

export default plugin;
