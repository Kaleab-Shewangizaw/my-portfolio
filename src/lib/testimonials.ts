import "server-only";
import { ObjectId, type Binary } from "mongodb";
import { db } from "./db";

export type Status = "pending" | "approved" | "rejected";
export const RELATIONS = ["Client", "Colleague", "Manager", "Collaborator"] as const;

export type TestimonialDoc = {
  _id: ObjectId;
  name: string;
  role: string;
  company: string;
  relation: (typeof RELATIONS)[number];
  project: string;
  message: string;
  rating: number | null;
  link: string;
  avatar: { data: Binary; type: string } | null;
  status: Status;
  createdAt: Date;
  reviewedAt: Date | null;
};

/** What pages and the admin UI receive: plain JSON, no binary. */
export type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  relation: string;
  project: string;
  message: string;
  rating: number | null;
  link: string;
  hasAvatar: boolean;
  status: Status;
  createdAt: string;
};

export async function collection() {
  return (await db()).collection<TestimonialDoc>("testimonials");
}

export function toPublic(d: TestimonialDoc): Testimonial {
  return {
    id: d._id.toHexString(),
    name: d.name,
    role: d.role,
    company: d.company,
    relation: d.relation,
    project: d.project,
    message: d.message,
    rating: d.rating,
    link: d.link,
    hasAvatar: !!d.avatar,
    status: d.status,
    createdAt: d.createdAt.toISOString(),
  };
}

/** Approved testimonials for the public site. Never throws: no DB, no section. */
export async function getApproved(limit = 50): Promise<Testimonial[]> {
  try {
    const c = await collection();
    const docs = await c.find({ status: "approved" }, { projection: { "avatar.data": 0 } }).sort({ reviewedAt: -1 }).limit(limit).toArray();
    return docs.map(toPublic);
  } catch (e) {
    console.error("testimonials: could not load", e);
    return [];
  }
}

export async function listAll(): Promise<Testimonial[]> {
  const c = await collection();
  const docs = await c.find({}, { projection: { "avatar.data": 0 } }).sort({ createdAt: -1 }).limit(500).toArray();
  return docs.map(toPublic);
}

export function parseId(id: string) {
  return ObjectId.isValid(id) ? new ObjectId(id) : null;
}
