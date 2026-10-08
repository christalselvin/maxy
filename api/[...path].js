import { app, initializeDatabase } from "../Backend/src/server.js";

let databaseReady;

export default async function handler(req, res) {
  databaseReady ??= initializeDatabase();
  await databaseReady;
  return app(req, res);
}
