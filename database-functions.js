import { existsSync, mkdirSync } from "fs";
import Database from "better-sqlite3";

// Cargar base de datos SQLite
export function loadDatabase() {
  // Si la carpeta "databases" no existe, se crea.
  if (!existsSync("./database")) mkdirSync("./database");

  // Cargar db (better-sqlite3 es síncrono)
  const db = new Database("./database/database.db");
  console.log("🟢 Base de datos SQLite (better-sqlite3) conectada");

  // Crear tabla users
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      lid TEXT PRIMARY KEY,
      jid TEXT,
      pushName TEXT,
      banned BOOLEAN DEFAULT 0,
      couple TEXT DEFAULT "",
      coupleTime INTEGER DEFAULT -1,
      couplesHistory TEXT DEFAULT "[]",
      commandAttempts INTEGER DEFAULT 0,
      inGroup TEXT DEFAULT "{}",
      lastmining INTEGER DEFAULT 0,
      married TEXT DEFAULT "",
      marriedTime INTEGER DEFAULT -1,
      mute BOOLEAN DEFAULT 0,
      warn INTEGER DEFAULT 0,
      timestamp INTEGER
    )
  `);

  // Crear tabla chats
  db.exec(`
    CREATE TABLE IF NOT EXISTS chats (
      remoteJid TEXT PRIMARY KEY,
      adminMode BOOLEAN DEFAULT 0,
      adultMode BOOLEAN DEFAULT 0,
      antiGroups BOOLEAN DEFAULT 1,
      antiChannels BOOLEAN DEFAULT 1,
      antiInstagram BOOLEAN DEFAULT 0,
      antiTiktok BOOLEAN DEFAULT 0,
      antiTelegram BOOLEAN DEFAULT 0,
      allAntiLinks BOOLEAN DEFAULT 0,
      audios BOOLEAN DEFAULT 0,
      detect BOOLEAN DEFAULT 1,
      antiDelete BOOLEAN DEFAULT 0,
      games BOOLEAN DEFAULT 1,
      isBanned BOOLEAN DEFAULT 0,
      mentions BOOLEAN DEFAULT 1,
      reactions BOOLEAN DEFAULT 0,
      welcome BOOLEAN DEFAULT 0
    )
  `);

  // Crear tabla settings
  db.exec(`
    CREATE TABLE IF NOT EXISTS settings (
      botJid TEXT PRIMARY KEY,
      autoRead BOOLEAN DEFAULT 1,
      antiPrivate BOOLEAN DEFAULT 0,
      antiCall BOOLEAN DEFAULT 1,
      spamTime INTEGER DEFAULT -1
    )
  `);

  // Crear tabla de usuarios en lista negra
  db.exec(`
    CREATE TABLE IF NOT EXISTS blacklist (
      jid TEXT PRIMARY KEY,
      reason TEXT,
      dateAdded INTEGER,
      addedBy TEXT
    )
  `);

  return db;
}

// Función que se llama en cada mensaje
export function initDataDB(m) {
  const chatJid = m.chat;
  const botJid = client?.user?.lid;
  const pushName = m?.pushName || "";

  // Asegurar datos defaults de usuario
  db.prepare(`INSERT OR IGNORE INTO users (lid, jid, pushName) VALUES (?, ?, ?)`).run(m.sender, m.senderJid, pushName);

  // Asegurar datos defaults del chat
  db.prepare(`INSERT OR IGNORE INTO chats (remoteJid) VALUES (?)`).run(chatJid);

  // Asegurar settings defaults del bot
  db.prepare(`INSERT OR IGNORE INTO settings (botJid) VALUES (?)`).run(botJid);
}

// Obtener datos de usuario
export function getUser(userId, chatJid = null) {
  let lidJid;
  if (userId.endsWith("@lid")) {
    lidJid = "lid";
  } else {
    lidJid = "jid";
  }
  const row = db.prepare(`SELECT * FROM users WHERE ${lidJid} = ?`).get(userId);
  if (!row) return null;

  // Parsear JSON
  try {
    row.inGroup = JSON.parse(row.inGroup || "{}");
  } catch {
    row.inGroup = {};
  }

  try {
    row.couplesHistory = JSON.parse(row.couplesHistory || "[]");
  } catch {
    row.couplesHistory = [];
  }

  // Si es necesario inicializar inGroup[m.chat]
  if (chatJid) {
    if (!row.inGroup[chatJid]) {
      row.inGroup[chatJid] = {
        afk: -1,
        afkReason: "",
        mute: false,
        messageCount: 0,
      };

      updateUser(userId, {
        inGroup: JSON.stringify(row.inGroup),
      });
    }
  }

  return row;
}

// Obtener datos de chat
export function getChat(jid) {
  return db.prepare(`SELECT * FROM chats WHERE remoteJid = ?`).get(jid) || null;
}

// Obtener datos de configuración del bot
export function getBotSettings(botJid) {
  return db.prepare(`SELECT * FROM settings WHERE botJid = ?`).get(botJid) || null;
}

// Actualizar pushName, jid, timestamp en la entrada del usuario.
export function syncUserInfo(m) {
  const lid = m.sender;
  const newJid = m.senderJid;
  const newPush = m.pushName || (m.fromMe ? client.user.name : null);
  const timestamp = Date.now();

  if (!lid) return;

  const user = getUser(lid);

  let finalJid = user?.jid;
  const isRegularJid = finalJid?.endsWith?.("@s.whatsapp.net");

  if (!finalJid || !isRegularJid) finalJid = newJid;

  updateUser(lid, {
    pushName: newPush,
    jid: finalJid,
    timestamp: timestamp,
  });
}

// actualizar datos en db
function updateRow(table, primaryKey, primaryValue, data) {
  if (!data || Object.keys(data).length === 0) return true;

  const keys = Object.keys(data);
  const setClause = keys.map((k) => `${k} = ?`).join(", ");
  const values = Object.values(data);

  // normalizar booleanos para better-sqlite3: convertir true/false en 1/0
  for (let i = 0; i < values.length; i++) {
    const v = values[i];
    if (typeof v === "boolean") {
      values[i] = v ? 1 : 0;
    }
  }

  const sql = `UPDATE ${table} SET ${setClause} WHERE ${primaryKey} = ?`;

  db.prepare(sql).run(...values, primaryValue);

  return true;
}

// actualizar datos de un usuario
export function updateUser(lid, data) {
  return updateRow("users", "lid", lid, data);
}

// actualizar datos de chat
export function updateChat(remoteJid, data) {
  return updateRow("chats", "remoteJid", remoteJid, data);
}

// actualizar configuración del bot
export function updateSettings(botJid, data) {
  return updateRow("settings", "botJid", botJid, data);
}

// añadir usuario a lista negra
export function addToBlacklist(jid, reason, addedBy) {
  const exists = isBlacklisted(jid);
  if (exists) {
    // Solo actualiza la razón (mantiene el addedBy y dateAdded originales)
    db.prepare(`UPDATE blacklist SET reason = ? WHERE jid = ?`).run(reason, jid);
  } else {
    const dateAdded = Date.now();
    db.prepare(
      `INSERT INTO blacklist (jid, reason, dateAdded, addedBy)
      VALUES (?, ?, ?, ?)`
    ).run(jid, reason, dateAdded, addedBy);
  }
}

// eliminar usuario de lista negra
export function removeFromBlacklist(jid) {
  db.prepare(`DELETE FROM blacklist WHERE jid = ?`).run(jid);
}

export function isBlacklisted(jid) {
  return db.prepare(`SELECT * FROM blacklist WHERE jid = ?`).get(jid) || null;
}

// obtener usuarios en lista negra
export function getBlacklist() {
  return db.prepare(`SELECT * FROM blacklist`).all();
}

// obtener numero total de usuarios en db tabla users
export function getTotalUsers() {
  const row = db.prepare("SELECT COUNT(*) AS total FROM users").get();
  return row?.total || 0;
}

// función para obtener todos los usuarios de tabla users en db
export function getAllUsers() {
  const rows = db.prepare(`SELECT * FROM users`).all();

  // Parsear JSON por cada usuario
  for (const row of rows) {
    try {
      row.inGroup = JSON.parse(row.inGroup || "{}");
    } catch {
      row.inGroup = {};
    }

    try {
      row.couplesHistory = JSON.parse(row.couplesHistory || "[]");
    } catch {
      row.couplesHistory = [];
    }
  }

  return rows;
}

// eliminar usuario completo de tabla users
export function deleteUser(lid) {
  return db.prepare(`DELETE FROM users WHERE lid = ?`).run(lid);
}
