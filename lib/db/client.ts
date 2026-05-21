import "server-only";
import path from "node:path";
import fs from "node:fs";
import Database from "better-sqlite3";
import { drizzle, type BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";

const DATA_DIR = process.env.SQLITE_DATA_DIR
  ? path.resolve(process.env.SQLITE_DATA_DIR)
  : path.join(process.cwd(), "data");

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const DB_PATH = path.join(DATA_DIR, "qazi.db");

// Reuse a single connection across HMR reloads in dev to avoid leaking handles.
declare global {
  // eslint-disable-next-line no-var
  var __qazi_sqlite__: Database.Database | undefined;
  // eslint-disable-next-line no-var
  var __qazi_drizzle__: BetterSQLite3Database<typeof schema> | undefined;
}

function setJournalModeWAL(conn: Database.Database): void {
  // `PRAGMA journal_mode = WAL` requires an exclusive lock and races during
  // `next build` (each parallel worker opens its own connection). Retry with
  // small backoff if a sibling worker is mid-switch. Also accept the case
  // where another worker already flipped the mode — checking via a read pragma
  // is lock-free.
  for (let attempt = 0; attempt < 20; attempt++) {
    try {
      const current = (conn.pragma("journal_mode", { simple: true }) as string)?.toLowerCase?.();
      if (current === "wal") return;
      conn.pragma("journal_mode = WAL");
      return;
    } catch (err: any) {
      const msg = String(err?.message ?? err);
      if (!msg.includes("SQLITE_BUSY") && err?.code !== "SQLITE_BUSY") throw err;
      // Linear-ish backoff up to ~2s total. Block synchronously since we are
      // initialising a singleton connection on module load.
      const wait = 50 + attempt * 50;
      const end = Date.now() + wait;
      while (Date.now() < end) {
        // tiny busy-loop; better-sqlite3 has no sleep primitive and we are at
        // module init, before any event loop work needs to happen.
      }
    }
  }
  // Give up gracefully — DELETE mode still works, just slower for writes.
}

function createConnection(): Database.Database {
  const conn = new Database(DB_PATH);
  // busy_timeout MUST come first so the subsequent pragmas wait on locked
  // siblings instead of failing immediately with SQLITE_BUSY.
  conn.pragma("busy_timeout = 10000");
  setJournalModeWAL(conn);
  conn.pragma("synchronous = NORMAL");
  conn.pragma("temp_store = MEMORY");
  conn.pragma("mmap_size = 268435456"); // 256 MB
  conn.pragma("cache_size = -65536"); // 64 MB
  conn.pragma("foreign_keys = ON");
  return conn;
}

export const sqlite: Database.Database = global.__qazi_sqlite__ ?? createConnection();
if (!global.__qazi_sqlite__) global.__qazi_sqlite__ = sqlite;

export const db: BetterSQLite3Database<typeof schema> =
  global.__qazi_drizzle__ ?? drizzle(sqlite, { schema });
if (!global.__qazi_drizzle__) global.__qazi_drizzle__ = db;

export { schema };
