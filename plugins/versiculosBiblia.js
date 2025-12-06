import axios from "axios";

let plugin = {};
plugin.cmd = ["versiculo", "versículo", "biblia", "salmo", "salmos"];
plugin.botAdmin = true;

plugin.run = async (m, { client, command }) => {
  try {
    if (command === "salmo" || command === "salmos") {
      const randomChapter = Math.floor(Math.random() * 150) + 1;
      const url = `https://bible-api.deno.dev/api/read/rv1960/salmos/${randomChapter}`;
      const chapterResponse = await axios.get(url);
      if (chapterResponse.data) {
        const verses = chapterResponse.data.vers;
        const randomVerseIndex = Math.floor(Math.random() * verses.length);
        const randomVerse = verses[randomVerseIndex];
        let message = `*📖 LIBRO DE:* Salmos\n\n*✍️Capitulo:* ${randomChapter}\n\n`;
        message += `*Versiculo: #${randomVerse.number}*\n\n📝 ${randomVerse.verse}\n`;
        client.sendText(m.chat, message, m);
      }
    } else {
      const response = await axios.get("https://bible-api.deno.dev/api/books");
      const books = response.data;
      const spanishBooks = books.filter((book) => book.names.length > 0 && book.names[0] !== "");
      const randomBook = spanishBooks[Math.floor(Math.random() * spanishBooks.length)];
      const bookName = randomBook.names[0];
      const totalChapters = randomBook.chapters;
      const randomChapter = Math.floor(Math.random() * totalChapters) + 1;
      const url = `https://bible-api.deno.dev/api/read/rv1960/${bookName}/${randomChapter}`;
      const chapterResponse = await axios.get(url);
      if (chapterResponse.data) {
        const verses = chapterResponse.data.vers;
        const randomVerseIndex = Math.floor(Math.random() * verses.length);
        const randomVerse = verses[randomVerseIndex];
        let message = `*📖 LIBRO DE:* ${bookName}\n\n*✍️Capitulo:* ${randomChapter}\n\n`;
        message += `*Versiculo: #${randomVerse.number}*\n\n📝 ${randomVerse.verse}\n`;
        client.sendText(m.chat, message, m);
      }
    }
  } catch (error) {
    console.error("Error al obtener los datos:", error);
  }
};

export default plugin;
