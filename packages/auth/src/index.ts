import { headers } from "next/headers";

import { auth } from "./auth";

export const getSession = async () =>
  auth.api.getSession({
    headers: headers(),
  });

export type AuthSession = Awaited<ReturnType<typeof getSession>>;
export * from "./auth";
