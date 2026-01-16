import fetch from "node-fetch";

let plugin = {};
plugin.cmd = ["serie", "pelicula", "película"];
plugin.botAdmin = true;

const generosDisponibles = ["acción", "accion", "comedia", "comedy", "aventura", "adventure", "animación", "animacion", "kids", "ciencia ficción", "ciencia ficcion", "sci-fi", "misterio", "terror", "drama", "romance", "bélica", "belica", "crimen", "familia", "family", "suspenso", "suspense", "documental", "historia", "history", "horror"];

plugin.run = async (m, { client, text, usedPrefix, command }) => {
  if (!text) return client.sendText(m.chat, txt.queVerNull(usedPrefix, command), m);

  let genero = text.toLowerCase();

  if (genero === "random") {
    genero = generosDisponibles[Math.floor(Math.random() * generosDisponibles.length)];
  }

  if (!generosDisponibles.includes(genero)) {
    return client.sendText(m.chat, "[❗] Categoría no válida", m);
  }

  const esSerie = command === "serie";

  const endpoint = esSerie ? `https://streaming-recommendation-api.vercel.app/api/serie?genre=${genero}` : `https://streaming-recommendation-api.vercel.app/api/movie?genre=${genero}`;

  m.react("🍿");

  let data;
  try {
    const res = await fetch(endpoint);
    data = await res.json();
  } catch (e) {
    console.error(e);
    return client.sendText(m.chat, "[❗] Error al conectar con la API.", m);
  }

  if (!data?.success || !data?.recommendation) return client.sendText(m.chat, "[❗] No se encontró recomendación.", m);

  const reco = data.recommendation;

  const poster = `https://image.tmdb.org/t/p/w500${reco.urlImage}`;

  let caption = `🍿 \`${reco.name}\` 🍿

📌 Género: ${reco.genres}
⭐ Puntuación: ${reco.vote}
📆 Estreno: ${reco.date}

📝 Sinopsis: ${reco.overview}`;

  if (esSerie) {
    caption = `🍿 \`${reco.name}\` 🍿

📌 Género: ${reco.genres}
⭐ Puntuación: ${reco.vote}
📆 Estreno: ${reco.date}

Total de episodios: ${reco.number_of_episodes}
Total de temporadas: ${reco.number_of_seasons}

📝 Sinopsis: ${reco.overview}`;
  }

  client.sendFile(m.chat, poster, "", caption, fkontak);
};

export default plugin;
