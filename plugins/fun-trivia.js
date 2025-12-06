let plugin = {};
plugin.cmd = ["trivia"];
plugin.botAdmin = true;

// Base de datos de preguntas
const preguntas = [
  {
    pregunta: "¿Cuál es la capital de Japón?",
    opciones: ["A) Osaka", "B) Kioto", "C) Tokio", "D) Hiroshima"],
    respuesta: "c",
  },
  {
    pregunta: "¿Qué animal puede vivir sin agua durante más tiempo?",
    opciones: ["A) Camello", "B) Rata canguro", "C) Tortuga del desierto", "D) Koala"],
    respuesta: "b",
  },
  {
    pregunta: "¿Cuál de las siguientes opciones es un sistema operativo?",
    opciones: ["A) Word", "B) Windows", "C) Chrome", "D) Photoshop"],
    respuesta: "b",
  },
  {
    pregunta: "¿Cuál es la capital de Suiza?",
    opciones: ["A) Zúrich", "B) Ginebra", "C) Basilea", "D) Berna"],
    respuesta: "d",
  },
  {
    pregunta: "¿Qué animal tiene la mordida más fuerte del mundo?",
    opciones: ["A) Tiburón blanco", "B) León", "C) Cocodrilo de agua salada", "D) Hipopótamo"],
    respuesta: "c",
  },
  {
    pregunta: "¿Cuál de las siguientes opciones es un navegador web?",
    opciones: ["A) Excel", "B) Outlook", "C) Firefox", "D) PowerPoint"],
    respuesta: "c",
  },
  {
    pregunta: "¿Cuál es la capital de Egipto?",
    opciones: ["A) El Cairo", "B) Alejandría", "C) Luxor", "D) Asuán"],
    respuesta: "a",
  },
  {
    pregunta: "¿Cuál es el animal terrestre más rápido del mundo?",
    opciones: ["A) León", "B) Guepardo", "C) Tigre", "D) Antílope"],
    respuesta: "b",
  },
  {
    pregunta: "¿En qué año se fundó Google?",
    opciones: ["A) 1996", "B) 1998", "C) 2000", "D) 2002"],
    respuesta: "b",
  },
  {
    pregunta: "¿Cuál es la capital de Brasil?",
    opciones: ["A) Río de Janeiro", "B) São Paulo", "C) Brasilia", "D) Salvador"],
    respuesta: "c",
  },
  {
    pregunta: "¿Qué animal puede regenerar su hígado?",
    opciones: ["A) Lagarto", "B) Humano", "C) Salamandra", "D) Estrella de mar"],
    respuesta: "b",
  },
  {
    pregunta: "¿Cuál de las siguientes redes sociales se centra en compartir fotos?",
    opciones: ["A) Twitter", "B) LinkedIn", "C) Instagram", "D) WhatsApp"],
    respuesta: "c",
  },
  {
    pregunta: "¿Cuál es la capital de Canadá?",
    opciones: ["A) Toronto", "B) Montreal", "C) Ottawa", "D) Vancouver"],
    respuesta: "c",
  },
  {
    pregunta: "¿Cuántos corazones tiene un pulpo?",
    opciones: ["A) 1", "B) 2", "C) 3", "D) 4"],
    respuesta: "c",
  },
  {
    pregunta: "¿Qué empresa desarrolló el sistema operativo Windows?",
    opciones: ["A) Apple", "B) IBM", "C) Microsoft", "D) Google"],
    respuesta: "c",
  },
  {
    pregunta: "¿Cuál es la capital de Turquía?",
    opciones: ["A) Estambul", "B) Ankara", "C) Esmirna", "D) Antalya"],
    respuesta: "b",
  },
  {
    pregunta: "¿Cuál es el único mamífero que puede volar?",
    opciones: ["A) Ardilla voladora", "B) Murciélago", "C) Lémur volador", "D) Colibrí"],
    respuesta: "b",
  },
  {
    pregunta: "¿Cuál de las siguientes opciones es un dispositivo de almacenamiento?",
    opciones: ["A) Teclado", "B) Monitor", "C) Disco duro", "D) Impresora"],
    respuesta: "c",
  },
  {
    pregunta: "¿Cuál es la capital de Nueva Zelanda?",
    opciones: ["A) Auckland", "B) Wellington", "C) Christchurch", "D) Queenstown"],
    respuesta: "b",
  },
  {
    pregunta: "¿Qué animal tiene la lengua más larga en relación a su tamaño?",
    opciones: ["A) Jirafa", "B) Camaleón", "C) Oso hormiguero", "D) Rana"],
    respuesta: "b",
  },
  {
    pregunta: "¿Cuál de las siguientes opciones es una aplicación de mensajería instantánea?",
    opciones: ["A) Excel", "B) WhatsApp", "C) Photoshop", "D) PowerPoint"],
    respuesta: "b",
  },
  {
    pregunta: "¿Cuál es la capital de Marruecos?",
    opciones: ["A) Casablanca", "B) Marrakech", "C) Rabat", "D) Tánger"],
    respuesta: "c",
  },
  {
    pregunta: "¿Qué animal duerme de pie?",
    opciones: ["A) Jirafa", "B) Elefante", "C) Caballo", "D) Flamenco"],
    respuesta: "c",
  },
  {
    pregunta: "¿Qué es Wi-Fi?",
    opciones: ["A) Un tipo de cable de internet", "B) Una tecnología de conexión inalámbrica", "C) Un navegador web", "D) Un tipo de teléfono móvil"],
    respuesta: "b",
  },
  {
    pregunta: "¿Cuál es la capital de Finlandia?",
    opciones: ["A) Oslo", "B) Helsinki", "C) Estocolmo", "D) Copenhague"],
    respuesta: "b",
  },
  {
    pregunta: "¿Cuál es el animal más grande del mundo?",
    opciones: ["A) Elefante africano", "B) Tiburón ballena", "C) Ballena azul", "D) Jirafa"],
    respuesta: "c",
  },
  {
    pregunta: "¿Cuál de las siguientes opciones es un lenguaje de programación?",
    opciones: ["A) HTML", "B) HTTP", "C) WWW", "D) URL"],
    respuesta: "a",
  },
  {
    pregunta: "¿Cuál es la capital de Argentina?",
    opciones: ["A) Buenos Aires", "B) Córdoba", "C) Rosario", "D) Mendoza"],
    respuesta: "a",
  },
  {
    pregunta: "¿Cuál es el animal nacional de Australia?",
    opciones: ["A) Koala", "B) Canguro", "C) Emú", "D) Ornitorrinco"],
    respuesta: "b",
  },
  {
    pregunta: "¿Cuál de las siguientes opciones es un motor de búsqueda?",
    opciones: ["A) Firefox", "B) Google", "C) Windows", "D) Office"],
    respuesta: "b",
  },
  {
    pregunta: "¿Cuál es la capital de Tailandia?",
    opciones: ["A) Phuket", "B) Chiang Mai", "C) Bangkok", "D) Pattaya"],
    respuesta: "c",
  },
  {
    pregunta: "¿Qué animal puede girar su cabeza 270 grados?",
    opciones: ["A) Búho", "B) Camaleón", "C) Halcón", "D) Murciélago"],
    respuesta: "a",
  },
  {
    pregunta: "¿Qué dispositivo se utiliza principalmente para introducir texto en una computadora?",
    opciones: ["A) Mouse", "B) Monitor", "C) Teclado", "D) Impresora"],
    respuesta: "c",
  },
  {
    pregunta: "¿Cuál es la capital de Irlanda?",
    opciones: ["A) Cork", "B) Galway", "C) Belfast", "D) Dublín"],
    respuesta: "d",
  },
  {
    pregunta: "¿Cuál es el único felino que no puede retraer sus garras?",
    opciones: ["A) Tigre", "B) Leopardo", "C) Guepardo", "D) Jaguar"],
    respuesta: "c",
  },
  {
    pregunta: "¿Cuál de las siguientes opciones es una plataforma de videos en línea?",
    opciones: ["A) Instagram", "B) Twitter", "C) YouTube", "D) LinkedIn"],
    respuesta: "c",
  },
  {
    pregunta: "¿Cuál es la capital de Portugal?",
    opciones: ["A) Oporto", "B) Lisboa", "C) Faro", "D) Coímbra"],
    respuesta: "b",
  },
  {
    pregunta: "¿Cuál es el animal más venenoso del mundo?",
    opciones: ["A) Serpiente mamba negra", "B) Araña de rincón", "C) Medusa de caja", "D) Escorpión"],
    respuesta: "c",
  },
  {
    pregunta: "¿Qué tipo de archivo se utiliza comúnmente para las fotos digitales?",
    opciones: ["A) DOC", "B) PDF", "C) JPG", "D) MP3"],
    respuesta: "c",
  },
  {
    pregunta: "¿Cuál es la capital de Grecia?",
    opciones: ["A) Atenas", "B) Tesalónica", "C) Patras", "D) Heraklion"],
    respuesta: "a",
  },
  {
    pregunta: "¿Qué animal puede sobrevivir sin cabeza durante semanas?",
    opciones: ["A) Cucaracha", "B) Araña", "C) Hormiga", "D) Mosca"],
    respuesta: "a",
  },
  {
    pregunta: "¿Cuál de las siguientes opciones es un servicio de correo electrónico?",
    opciones: ["A) WhatsApp", "B) Gmail", "C) Facebook", "D) TikTok"],
    respuesta: "b",
  },
  {
    pregunta: "¿Cuál es la capital de Noruega?",
    opciones: ["A) Bergen", "B) Trondheim", "C) Oslo", "D) Stavanger"],
    respuesta: "c",
  },
  {
    pregunta: "¿Cuál es el único mamífero que no puede saltar?",
    opciones: ["A) Rinoceronte", "B) Elefante", "C) Hipopótamo", "D) Perezoso"],
    respuesta: "b",
  },
  {
    pregunta: "¿Cuál de las siguientes opciones es un sistema operativo para dispositivos móviles?",
    opciones: ["A) Windows", "B) Linux", "C) Android", "D) MacOS"],
    respuesta: "c",
  },
  {
    pregunta: "¿Cuál es la capital de Australia?",
    opciones: ["A) Sydney", "B) Melbourne", "C) Brisbane", "D) Canberra"],
    respuesta: "d",
  },
  {
    pregunta: "¿Qué animal tiene el corazón proporcionalmente más grande?",
    opciones: ["A) Colibrí", "B) Ballena", "C) Elefante", "D) Ratón"],
    respuesta: "a",
  },
  {
    pregunta: "¿Qué dispositivo se utiliza para mostrar información visual en una computadora?",
    opciones: ["A) Teclado", "B) Mouse", "C) Monitor", "D) Impresora"],
    respuesta: "c",
  },
  {
    pregunta: "¿Cuál es la capital de Sudáfrica?",
    opciones: ["A) Johannesburgo", "B) Ciudad del Cabo", "C) Pretoria", "D) Durban"],
    respuesta: "c",
  },
  {
    pregunta: "¿Cuántos años puede vivir una tortuga gigante?",
    opciones: ["A) Hasta 50 años", "B) Hasta 100 años", "C) Hasta 150 años", "D) Más de 200 años"],
    respuesta: "d",
  },
  {
    pregunta: "¿Cuál es la capital de México?",
    opciones: ["A) Guadalajara", "B) Monterrey", "C) Ciudad de México", "D) Cancún"],
    respuesta: "c",
  },
  {
    pregunta: "¿Qué animal es conocido como el 'rey de la selva'?",
    opciones: ["A) Tigre", "B) León", "C) Leopardo", "D) Jaguar"],
    respuesta: "b",
  },
  {
    pregunta: "¿Cuál de las siguientes opciones es un programa de edición de imágenes?",
    opciones: ["A) Excel", "B) Word", "C) Photoshop", "D) PowerPoint"],
    respuesta: "c",
  },
  {
    pregunta: "¿Cuál es la capital de Francia?",
    opciones: ["A) Londres", "B) Berlín", "C) Madrid", "D) París"],
    respuesta: "d",
  },
  {
    pregunta: "¿Qué animal es el más grande de la familia de los felinos?",
    opciones: ["A) León", "B) Leopardo", "C) Tigre", "D) Puma"],
    respuesta: "c",
  },
  {
    pregunta: "¿Cuál de las siguientes opciones es una marca de teléfonos móviles?",
    opciones: ["A) Toyota", "B) Samsung", "C) Nike", "D) Coca-Cola"],
    respuesta: "b",
  },
  {
    pregunta: "¿Cuál es la capital de Italia?",
    opciones: ["A) Milán", "B) Venecia", "C) Roma", "D) Nápoles"],
    respuesta: "c",
  },
  {
    pregunta: "¿Qué animal es conocido por su capacidad de cambiar de color?",
    opciones: ["A) Camaleón", "B) Cebra", "C) Jirafa", "D) Koala"],
    respuesta: "a",
  },
  {
    pregunta: "¿Cuál de las siguientes opciones es una unidad de almacenamiento?",
    opciones: ["A) Megabyte", "B) Kilogramo", "C) Litro", "D) Kilómetro"],
    respuesta: "a",
  },
  {
    pregunta: "¿Cuál es la capital de China?",
    opciones: ["A) Shanghái", "B) Hong Kong", "C) Pekín", "D) Cantón"],
    respuesta: "c",
  },
  {
    pregunta: "¿Qué animal es conocido como el mejor amigo del hombre?",
    opciones: ["A) Gato", "B) Perro", "C) Hámster", "D) Loro"],
    respuesta: "b",
  },
  {
    pregunta: "¿Cuál de las siguientes opciones es un tipo de conexión a internet?",
    opciones: ["A) USB", "B) HDMI", "C) Wi-Fi", "D) Bluetooth"],
    respuesta: "c",
  },
  {
    pregunta: "¿Cuál es la capital de Rusia?",
    opciones: ["A) San Petersburgo", "B) Kiev", "C) Moscú", "D) Vladivostok"],
    respuesta: "c",
  },
  {
    pregunta: "¿Qué animal es conocido por dormir colgado boca abajo?",
    opciones: ["A) Koala", "B) Perezoso", "C) Murciélago", "D) Orangután"],
    respuesta: "c",
  },
  {
    pregunta: "¿Cuál de las siguientes opciones es un tipo de impresora?",
    opciones: ["A) Láser", "B) Microondas", "C) Licuadora", "D) Tostadora"],
    respuesta: "a",
  },
  {
    pregunta: "¿Cuál es la capital de España?",
    opciones: ["A) Barcelona", "B) Sevilla", "C) Valencia", "D) Madrid"],
    respuesta: "d",
  },
  {
    pregunta: "¿Qué animal es conocido por su trompa larga?",
    opciones: ["A) Rinoceronte", "B) Hipopótamo", "C) Elefante", "D) Jirafa"],
    respuesta: "c",
  },
  {
    pregunta: "¿Cuál de las siguientes opciones es un tipo de archivo de video?",
    opciones: ["A) JPG", "B) MP4", "C) PDF", "D) TXT"],
    respuesta: "b",
  },
  {
    pregunta: "¿Cuál es la capital de India?",
    opciones: ["A) Mumbai", "B) Nueva Delhi", "C) Calcuta", "D) Bangalore"],
    respuesta: "b",
  },
  {
    pregunta: "¿Qué animal es conocido por su caparazón?",
    opciones: ["A) Tortuga", "B) Leopardo", "C) Pingüino", "D) Canguro"],
    respuesta: "a",
  },
  {
    pregunta: "¿Cuál de las siguientes opciones es una red social profesional?",
    opciones: ["A) Facebook", "B) Instagram", "C) LinkedIn", "D) TikTok"],
    respuesta: "c",
  },
  {
    pregunta: "¿Cuál es la capital de Alemania?",
    opciones: ["A) Múnich", "B) Hamburgo", "C) Frankfurt", "D) Berlín"],
    respuesta: "d",
  },
  {
    pregunta: "¿Qué animal es conocido por su melena?",
    opciones: ["A) Tigre", "B) León", "C) Leopardo", "D) Guepardo"],
    respuesta: "b",
  },
  {
    pregunta: "¿Cuál de las siguientes opciones es un tipo de pantalla?",
    opciones: ["A) LED", "B) USB", "C) RAM", "D) CPU"],
    respuesta: "a",
  },
  {
    pregunta: "¿Cuál es la capital de Argentina?",
    opciones: ["A) Buenos Aires", "B) Córdoba", "C) Rosario", "D) Mendoza"],
    respuesta: "a",
  },
  {
    pregunta: "¿Qué animal es conocido por su joroba?",
    opciones: ["A) Elefante", "B) Jirafa", "C) Camello", "D) Cebra"],
    respuesta: "c",
  },
  {
    pregunta: "¿Cuál de las siguientes opciones es un sistema de posicionamiento global?",
    opciones: ["A) USB", "B) HDMI", "C) GPS", "D) WIFI"],
    respuesta: "c",
  },
  {
    pregunta: "¿Cuál es la capital de Egipto?",
    opciones: ["A) El Cairo", "B) Alejandría", "C) Luxor", "D) Asuán"],
    respuesta: "a",
  },
  {
    pregunta: "¿Qué animal es conocido por su capacidad de regenerar su cola?",
    opciones: ["A) Iguana", "B) Salamandra", "C) Lagartija", "D) Cocodrilo"],
    respuesta: "c",
  },
  {
    pregunta: "¿Cuál de las siguientes opciones es un tipo de memoria de computadora?",
    opciones: ["A) HDD", "B) RAM", "C) USB", "D) HDMI"],
    respuesta: "b",
  },
  {
    pregunta: "¿Cuál es la capital de Sudáfrica?",
    opciones: ["A) Johannesburgo", "B) Ciudad del Cabo", "C) Pretoria", "D) Durban"],
    respuesta: "c",
  },
  {
    pregunta: "¿Qué animal es conocido por su capacidad de volar hacia atrás?",
    opciones: ["A) Águila", "B) Colibrí", "C) Murciélago", "D) Búho"],
    respuesta: "b",
  },
  {
    pregunta: "¿Cuál de las siguientes opciones es un tipo de conexión para auriculares?",
    opciones: ["A) HDMI", "B) VGA", "C) Jack 3.5mm", "D) USB"],
    respuesta: "c",
  },
  {
    pregunta: "¿Cuál es la capital de Canadá?",
    opciones: ["A) Toronto", "B) Montreal", "C) Vancouver", "D) Ottawa"],
    respuesta: "d",
  },
  {
    pregunta: "¿Qué animal es conocido por su veneno mortal?",
    opciones: ["A) Cobra real", "B) Tortuga", "C) Delfín", "D) Pingüino"],
    respuesta: "a",
  },
  {
    pregunta: "¿Cuál de las siguientes opciones es un programa de hojas de cálculo?",
    opciones: ["A) Word", "B) PowerPoint", "C) Excel", "D) Paint"],
    respuesta: "c",
  },
  {
    pregunta: "¿Cuál es la capital de Australia?",
    opciones: ["A) Sydney", "B) Melbourne", "C) Brisbane", "D) Canberra"],
    respuesta: "d",
  },
  {
    pregunta: "¿Qué animal es conocido por su capacidad de camuflaje?",
    opciones: ["A) León", "B) Elefante", "C) Pulpo", "D) Jirafa"],
    respuesta: "c",
  },
  {
    pregunta: "¿Cuál de las siguientes opciones es un tipo de batería recargable?",
    opciones: ["A) Alcalina", "B) Litio", "C) Zinc-carbono", "D) Mercurio"],
    respuesta: "b",
  },
  {
    pregunta: "¿Cuál es la capital de Brasil?",
    opciones: ["A) Río de Janeiro", "B) São Paulo", "C) Brasilia", "D) Salvador"],
    respuesta: "c",
  },
  {
    pregunta: "¿Qué animal es conocido por su capacidad de producir luz?",
    opciones: ["A) Delfín", "B) Luciérnaga", "C) Cocodrilo", "D) Pingüino"],
    respuesta: "b",
  },
  {
    pregunta: "¿Cuál de las siguientes opciones es un tipo de puerto USB?",
    opciones: ["A) USB-A", "B) USB-Z", "C) USB-X", "D) USB-Y"],
    respuesta: "a",
  },
  {
    pregunta: "¿Cuál es la capital de Japón?",
    opciones: ["A) Osaka", "B) Kioto", "C) Tokio", "D) Yokohama"],
    respuesta: "c",
  },
  {
    pregunta: "¿Qué animal es conocido por su capacidad de saltar muy alto?",
    opciones: ["A) Elefante", "B) Canguro", "C) Hipopótamo", "D) Rinoceronte"],
    respuesta: "b",
  },
  {
    pregunta: "¿Cuál de las siguientes opciones es un tipo de nube de almacenamiento en línea?",
    opciones: ["A) iCloud", "B) Raincloud", "C) Stormcloud", "D) Skycloud"],
    respuesta: "a",
  },
  {
    pregunta: "¿Cuál es la capital de Corea del Sur?",
    opciones: ["A) Busan", "B) Incheon", "C) Daegu", "D) Seúl"],
    respuesta: "d",
  },
  {
    pregunta: "¿Qué animal es conocido por su capacidad de regenerar sus extremidades?",
    opciones: ["A) Estrella de mar", "B) Tiburón", "C) Delfín", "D) Ballena"],
    respuesta: "a",
  },
  {
    pregunta: "¿Cuál de las siguientes opciones es un tipo de tarjeta de memoria?",
    opciones: ["A) SD", "B) HD", "C) CD", "D) MD"],
    respuesta: "a",
  },
  {
    pregunta: "¿Cuál es la capital de Suecia?",
    opciones: ["A) Gotemburgo", "B) Malmö", "C) Estocolmo", "D) Uppsala"],
    respuesta: "c",
  },
  {
    pregunta: "¿Qué animal es conocido por su capacidad de correr sobre el agua?",
    opciones: ["A) Pez volador", "B) Lagarto basilisco", "C) Pingüino", "D) Delfín"],
    respuesta: "b",
  },
  {
    pregunta: "¿Cuál de las siguientes opciones es un tipo de conexión inalámbrica para dispositivos cercanos?",
    opciones: ["A) Wi-Fi", "B) 5G", "C) Bluetooth", "D) NFC"],
    respuesta: "c",
  },
];

let trivias = {};

plugin.run = async (m, { client, chat }) => {
  if (!chat.games) return client.sendText(m.chat, txt.disabledGames, m);
  if (trivias[m.chat]) return client.sendText(m.chat, txt.gameAlready, m);

  const trivia = preguntas[Math.floor(Math.random() * preguntas.length)];
  const triviaMsg = await client.sendText(m.chat, `*[🎓] Pregunta de Trivia:*\n* ${trivia.pregunta}\n\n${trivia.opciones.join("\n")}\n\n*[❗] RESPONDE A ESTE MENSAJE* con la letra correcta (A, B, C o D).\n*[⏱️]* 30 segundos para responder.`, m);

  trivias[m.chat] = {
    respuesta: trivia.respuesta.toLowerCase(),
    mensajeId: triviaMsg.key.id,
    timeout: setTimeout(() => {
      if (trivias[m.chat]) {
        client.sendText(m.chat, `*[⏳] ¡TIEMPO!*\n\nLa respuesta era: *${trivia.respuesta.toUpperCase()}*`, m);
        delete trivias[m.chat];
      }
    }, 30000),
  };
};

plugin.before = async function (m, { client }) {
  if (!trivias[m.chat]) return;
  const juego = trivias[m.chat];
  if (!m.quoted || m.quoted.id !== juego.mensajeId) return;

  const respuestaUsuario = m.text.toLowerCase().trim();

  if (respuestaUsuario === juego.respuesta) {
    client.sendText(m.chat, txt.gameSuccess, m);
    clearTimeout(trivias[m.chat].timeout);
    delete trivias[m.chat];
  } else {
    m.react("❌");
  }
};

export default plugin;
