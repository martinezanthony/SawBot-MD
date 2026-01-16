let plugin = {};
const botLid = client.user.lid.split("@")[0];
plugin.cmd = [botLid, "gemini", "ia", "bot"];
plugin.botAdmin = true;

plugin.run = async (m, { client, text }) => {
  if (!text) return client.sendText(m.chat, txt.iaPeticion, m);

  const maxAttempts = 3;
  const retryDelayMs = 500;

  await client.sendPresenceUpdate("composing", m.chat);

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const q = encodeURIComponent(text);
      const res = await fetch(`${globalThis.deliriusApi}/ia/gemini?query=${q}`);

      if (!res.ok) {
        if (attempt === maxAttempts) {
          return client.sendText(m.chat, "Lo siento, no puedo ayudarte con esa petición.", m);
        }
        await new Promise((r) => setTimeout(r, retryDelayMs));
        continue;
      }

      const json = await res.json();

      if (json && json.status === true && json.data && json.data.result) {
        return client.sendText(m.chat, json.data.result, m);
      } else {
        if (attempt === maxAttempts) {
          return client.sendText(m.chat, "Lo siento, no puedo ayudarte con esa petición.", m);
        }
        await new Promise((r) => setTimeout(r, retryDelayMs));
        continue;
      }
    } catch (error) {
      if (attempt === maxAttempts) {
        return client.sendText(m.chat, "Lo siento, no puedo ayudarte con esa petición.", m);
      }
      await new Promise((r) => setTimeout(r, retryDelayMs));
    }
  }
};

export default plugin;
