import "server-only";
import { db, sqlite } from "./client";
import { runMigrations } from "./migrate";
import { runSeed } from "./seed";

let booted = false;
function boot() {
  if (booted) return;
  runMigrations();
  runSeed();
  booted = true;
}
boot();

export { db, sqlite };
export * from "./schema";
