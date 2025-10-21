import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";
import * as schema from "../db/schema";

const isProduction = process.env.NODE_ENV === "production";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: { ...schema },
  }),
  advanced: {
    useSecureCookies: isProduction,
    crossSubDomainCookies: {
      enabled: isProduction,
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

  plugins: [nextCookies()],
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
