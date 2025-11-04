import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { magicLink } from "better-auth/plugins";
import { db } from "./db";
import { application } from "@/config/app-config";
import { Resend } from "resend";
import { cloudflareKVAdapter } from "./kv-adapter";

import * as schema from "../db/schema";

const isProduction = process.env.NODE_ENV === "production";

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: { ...schema },
  }),
  session: {
    expiresIn: 60 * 60 * 24 * 30, // 30 days
    updateAge: 60 * 60 * 24 * 7,
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60 * 24 * 14, // 14 days, set time according to your needs (once expired, revalidate again from KV)
    }
  },
  // Use Secondary storage to read user session from KV
  secondaryStorage: await cloudflareKVAdapter(),
  advanced: {
    cookiePrefix: application.name,
    useSecureCookies: isProduction,
    crossSubDomainCookies: {
      enabled: false,
    },
    defaultCookieAttributes: {
      secure: isProduction,
      sameSite: "Lax",
      httpOnly: true,
    },
  },
  baseURL: process.env.BETTER_AUTH_URL!,
  trustedOrigins: [process.env.BETTER_AUTH_URL!],
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      scope: ["email", "profile"],
    },
  },
  rateLimit: {
    enabled: true,
    window: 60,
    max: 10,
  },

  plugins: [
    // Magic link plugin
    magicLink({
      disableSignUp: false, // Disable using magic link at signup
      sendMagicLink: async ({ email, url }) => {
        await resend.emails.send({
          from: process.env.RESEND_EMAIL!,
          to: email,
          subject: `${application.displayName} - Magic Link`,
          html: `Click the link to login into your account: ${url}`,
        });
      },
    }),

    // ensure nextCookies to be the last plugin in the array
    nextCookies(),
  ],
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
