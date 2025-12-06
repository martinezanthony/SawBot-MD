let plugin = {};
plugin.cmd = ["ahorcado"];
plugin.botAdmin = true;

// Lista de palabras para el ahorcado
const palabras = ["solido", "camino", "flores", "arboles", "ciudad", "puente", "montaña", "valle", "playas", "nubes", "viento", "lluvia", "trueno", "rayos", "nieve", "bosque", "selva", "desierto", "oasis", "lunas", "estrellas", "planeta", "galaxia", "cometa", "orbita", "satelite", "cohete", "avion", "barco", "trenes", "carros", "motos", "bicicleta", "camion", "ruedas", "motor", "frenos", "luces", "ventana", "puerta", "techo", "piso", "muros", "ladrillo", "cemento", "arena", "piedra", "madera", "vidrio", "metal", "plata", "oro", "bronce", "hierro", "acero", "cobre", "alambre", "clavos", "tornillo", "martillo", "sierra", "taladro", "pintura", "brocha", "lienzo", "cuadro", "pincel", "colores", "tinta", "papel", "libro", "hojas", "pluma", "lapiz", "borrador", "cuaderno", "escuela", "maestro", "alumnos", "clase", "leccion", "tarea", "examen", "nota", "grado", "titulo", "fiesta", "musica", "baile", "canto", "guitarra", "piano", "tambor", "flauta", "sonido", "ritmo", "melodia", "armonia", "silencio", "fuente", "laguna", "cascada", "cerros", "prados", "campos", "granja", "animal", "perros", "gatos", "peces", "tigre", "leones", "osos", "lobos", "zorros", "ciervo", "caballo", "burro", "vacas", "ovejas", "gallina", "patos", "cerdo", "conejo", "hormiga", "abeja", "mosca", "grillo", "saltamontes", "mariposa", "escarabajo", "araña", "serpiente", "lagarto", "rana", "sapo", "tortuga", "cocodrilo", "ballena", "pulpo", "medusa", "coral", "ostra", "cangrejo", "islas", "costas", "olas", "mareas", "arena", "roca", "faro", "puerto", "nave", "velero", "remo", "ancla", "buzos", "tesoro", "mapas", "reloj", "hora", "minuto", "semana", "meses", "año", "siglo", "pasado", "futuro", "ayer", "hoy", "mañana", "noche", "dawn", "tarde", "sol", "calor", "hielo", "fuego", "ceniza", "humo", "sombra", "luz", "rayo", "tormenta", "niebla", "charco", "pozo", "riego", "cosecha"];

let ahorcado = {};

plugin.run = async (m, { client, chat }) => {
  if (!chat.games) return client.sendText(m.chat, txt.disabledGames, m);
  if (ahorcado[m.sender]) return client.sendText(m.chat, txt.gameAlready, m);

  let palabra = palabras[Math.floor(Math.random() * palabras.length)];
  let oculta = palabra.replace(/./g, "_ ");
  let intentos = 8;

  client.sendText(m.chat, `*[🪢] AHORCADO:*\n* ${oculta}\n\nTienes *${intentos}* intentos. Escribe una letra para adivinar.`, m);

  ahorcado[m.sender] = {
    palabra: palabra,
    oculta: oculta.split(" "),
    intentos: intentos,
    letrasProbadas: [],
    timeout: setTimeout(() => {
      if (ahorcado[m.sender]) {
        client.sendText(m.chat, `*[⏳] ¡Tiempo agotado!*\n\nLa palabra era: *${palabra}*`, m);
        delete ahorcado[m.sender];
      }
    }, 180000), // 3 minutos para completar la palabra
  };
};

plugin.before = async function (m, { client }) {
  if (!ahorcado[m.sender]) return;
  let juego = ahorcado[m.sender];

  let letra = m.text.toLowerCase().trim();
  if (letra.length !== 1 || !/^[a-záéíóúü]$/.test(letra)) return client.sendText(m.chat, txt.ahorcadoLetra, m);
  if (juego.letrasProbadas.includes(letra)) return m.react("❗");

  juego.letrasProbadas.push(letra);
  let encontrada = false;

  for (let i = 0; i < juego.palabra.length; i++) {
    if (juego.palabra[i] === letra) {
      juego.oculta[i] = letra;
      encontrada = true;
    }
  }

  if (!encontrada) juego.intentos--;

  if (juego.intentos <= 0) {
    client.sendText(m.chat, `*[💀] ¡PERDISTE!*\n\nLa palabra era: *${juego.palabra}*`, m);
    clearTimeout(juego.timeout);
    delete ahorcado[m.sender];
    return;
  }

  if (!juego.oculta.includes("_")) {
    client.sendText(m.chat, txt.gameSuccess, m);
    clearTimeout(juego.timeout);
    delete ahorcado[m.sender];
    return;
  }

  client.sendText(m.chat, `*[🪢] AHORCADO:*\n\n${juego.oculta.join(" ")}\n\nIntentos restantes: *${juego.intentos}*\nLetras usadas: ${juego.letrasProbadas.join(", ")}`, m);
};

export default plugin;
