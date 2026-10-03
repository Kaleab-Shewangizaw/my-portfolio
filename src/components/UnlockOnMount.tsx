"use client";

import { useEffect } from "react";
import { unlock, type SecretId } from "@/lib/secrets";

export function UnlockOnMount({ id }: { id: SecretId }) {
  useEffect(() => unlock(id), [id]);
  return null;
}
