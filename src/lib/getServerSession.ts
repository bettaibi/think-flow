import "server-only";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { cache } from "react";

export const getServerSession = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session;
});
