import "server-only";
import { ObjectId } from "mongodb";
import { db } from "./db";

export type ChampionDoc = {
  _id: ObjectId;
  name: string;
  contact: string;
  github: string;
  note: string;
  found: string[];
  createdAt: Date;
};

export type Champion = Omit<ChampionDoc, "_id" | "createdAt"> & { id: string; createdAt: string };

export async function champions() {
  return (await db()).collection<ChampionDoc>("champions");
}

export async function listChampions(): Promise<Champion[]> {
  const docs = await (await champions()).find().sort({ createdAt: -1 }).limit(500).toArray();
  return docs.map(({ _id, createdAt, ...rest }) => ({ ...rest, id: _id.toHexString(), createdAt: createdAt.toISOString() }));
}
