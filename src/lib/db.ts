import "server-only";
import { MongoClient, type Db } from "mongodb";

// One client per server instance; reused across hot reloads in dev.
const g = globalThis as unknown as { _mongo?: Promise<MongoClient> };

export async function db(): Promise<Db> {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set");
  g._mongo ??= new MongoClient(uri, { serverSelectionTimeoutMS: 8000 }).connect();
  try {
    const client = await g._mongo;
    return client.db(process.env.MONGODB_DB || "portfolio");
  } catch (e) {
    g._mongo = undefined;
    throw e;
  }
}
