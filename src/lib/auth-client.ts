import { createAuthClient } from "better-auth/react";
import { magicLinkClient } from "better-auth/client/plugins";

const authClient = createAuthClient({
  baseURL: process.env.BASE_URL!,
  trustedOrigins: [process.env.BASE_URL!],
  plugins: [magicLinkClient()],
});

export const { signOut, useSession, signIn } = authClient;
