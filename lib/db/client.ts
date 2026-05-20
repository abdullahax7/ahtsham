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

function createConnection(): Database.Database {
  const conn = new Database(DB_PATH);
  // WAL mode + sane pragmas for top-end read throughput.
  conn.pragma("journal_mode = WAL");
  conn.pragma("synchronous = NORMAL");
  conn.pragma("temp_store = MEMORY");
  conn.pragma("mmap_size = 268435456"); // 256 MB
  conn.pragma("cache_size = -65536"); // 64 MB
  conn.pragma("busy_timeout = 5000");
  conn.pragma("foreign_keys = ON");
  return conn;
}

export const sqlite: Database.Database = global.__qazi_sqlite__ ?? createConnection();
if (!global.__qazi_sqlite__) global.__qazi_sqlite__ = sqlite;

export const db: BetterSQLite3Database<typeof schema> =
  global.__qazi_drizzle__ ?? drizzle(sqlite, { schema });
if (!global.__qazi_drizzle__) global.__qazi_drizzle__ = db;

export { schema };
