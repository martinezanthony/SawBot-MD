import strings from "./lib/strings.js";

// Session Name
globalThis.authFile = `botSession`;

// Numero del bot sin "+" ni espacios ni guiones. Dejar vacío para vincular con codigo QR.
globalThis.numberBot = "";

// Numeros de owners del bot sin "+" ni espacios ni guiones
globalThis.owners = ["", ""];

// Prefijos de comandos
globalThis.prefix = [".", "/", "#", "@"];

// Versión del bot
globalThis.botVersion = "v0.5";

// Baileys
globalThis.baileys = "@whiskeysockets/baileys";

// Strings // Texts
globalThis.txt = strings;

// Newsletters IDs
globalThis.newsletterJids = ["120363386229166956@newsletter"];
// Newsletters names
globalThis.newsletterNames = ["HOLAAAAAA🫩"];

// Jid grupo URU
globalThis.jidUru = "120363404278828828@g.us";

// Fake quoted fkontak
globalThis.fkontak = { key: { participants: "0@s.whatsapp.net", remoteJid: "status@broadcast", fromMe: false, id: "Halo" }, message: { contactMessage: { vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=\${m.sender.split("@")[0]}:\${m.sender.split("@")[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` } }, participant: "0@s.whatsapp.net" };

// delirius api
globalThis.deliriusApi = "https://delirius-apiofc.vercel.app/";
