import fetch from "node-fetch";

let plugin = {};
plugin.cmd = ["imagen", "foto", "imágen"];
plugin.onlyGroup = true;
plugin.botAdmin = true;

plugin.run = async (m, { client, text, isOwner, chat }) => {
  if (!text) return client.sendText(m.chat, txt.dlImagenNull, m);
  if (!chat.adultMode && m.isGroup && !isOwner) {
    const prohibited = ["caca", "polla", "gay", "hombres cogiendo", "mía malkova", "mia malkova", "hombres gay", "fisting", "porno", "porn", "gore", "cum", "semen", "puta", "puto", "culo", "putita", "putito", "pussy", "hentai", "pene", "coño", "asesinato", "zoofilia", "mia khalifa", "desnudo", "desnuda", "cuca", "chocha", "muertos", "pornhub", "xnxx", "xvideos", "teta", "vagina", "marsha may", "misha cross", "sexmex", "furry", "furro", "furra", "xxx", "rule34", "panocha", "pedofilia", "necrofilia", "pinga", "horny", "ass", "nude", "popo", "nsfw", "femdom", "futanari", "erofeet", "sexo", "sex", "yuri", "ero", "ecchi", "blowjob", "anal", "ahegao", "pija", "verga", "trasero", "violation", "violacion", "bdsm", "cachonda", "+18", "cp", "mia marin", "lana rhoades", "cepesito", "hot", "buceta", "xxx", "Violet Myllers", "Violet Myllers pussy", "Violet Myllers desnuda", "Violet Myllers sin ropa", "Violet Myllers culo", "Violet Myllers vagina", "Pornografía", "Pornografía infantil", "niña desnuda", "niñas desnudas", "niña pussy", "niña pack", "niña culo", "niña sin ropa", "niña siendo abusada", "niña siendo abusada sexualmente", "niña cogiendo", "niña fototeta", "niña vagina", "hero Boku no pico", "Mia Khalifa cogiendo", "Mia Khalifa sin ropa", "Mia Khalifa comiendo polla", "Mia Khalifa desnuda"];
    const normalizedText = text.replace(/\s+/g, "").toLowerCase();
    if (prohibited.some((word) => normalizedText.includes(word.replace(/\s+/g, "")))) {
      m.react("⚠️");
      m.sendText("*⚠️BUSQUEDA RESTRINGIDA⚠️*");
      return;
    }
  }
  m.react("📷");

  try {
    const query = encodeURIComponent(text);
    const url = `https://www.google.com/search?q=${query}&hl=es&tbm=isch&tbs=isz:lt,islt:qsvga`;

    const HEADERS = {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
      "Accept-Language": "es-ES,es;q=0.9,en;q=0.8",
    };

    const r = await fetch(url, { headers: HEADERS });
    const html = await r.text();

    const patron = /\["(https?:\/\/encrypted-tbn0\.gstatic\.com\/images\?[^"]+?)".*?\["(https?:\/\/[^"]+?)".*?"(.*?)".*?\]/g;

    let match;
    let resultados = [];
    let visto = new Set();

    while ((match = patron.exec(html)) !== null) {
      let original_url = match[2].replace(/\\u003d/g, "=").replace(/\\u0026/g, "&");

      let titulo = match[3]
        .replace(/\\u[\dA-F]{4}/gi, (u) => String.fromCharCode(parseInt(u.replace("\\u", ""), 16)))
        .replace(/<[^>]+>/g, "")
        .trim();

      if (!titulo) titulo = `Imagen ${resultados.length + 1}`;

      if (!visto.has(original_url)) {
        visto.add(original_url);
        resultados.push({
          titulo,
          url: original_url,
        });
      }

      if (resultados.length >= 10) break; // máximo 10 primeros resultados
    }

    if (resultados.length === 0) return client.sendText(m.chat, "No hubo resultados", m);

    // elegir una al azar
    const elegido = resultados[Math.floor(Math.random() * resultados.length)];

    // enviar imagen
    await client.sendFile(m.chat, elegido.url, "img.jpg", `*Resultado de:* ${text}`, m);
  } catch (err) {
    console.error(err);
  }
};

export default plugin;
