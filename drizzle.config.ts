import "dotenv/config";

import type { Config } from "drizzle-kit";
import fs from "node:fs";
import path from "node:path";

function getLocalD1DB() {
  try {
    const basePath = path.resolve(".wrangler/state/v3/d1");
    const dbFile = fs
      .readdirSync(basePath, { encoding: "utf-8", recursive: true })
      .find((f) => f.endsWith(".sqlite"));

    if (!dbFile) {
      throw new Error(`.sqlite file not found in ${basePath}`);
    }

    const url = path.resolve(basePath, dbFile);
    return url;
  } catch (err) {
    console.error(err)

    return null;
  }
}

const isProduction = process.env.NODE_ENV === "production";

export default {
  schema: "./src/db/schema.ts",
  out: "./migration",
  dialect: "sqlite",
  ...(
    isProduction
      ? {
          driver: "d1-http",
          dbCredentials: {
            databaseId: process.env.D1_DATABASE_ID!,
            token: process.env.CLOUDFLARE_API_TOKEN!,
            accountId:process.env.CLOUDFLARE_ACCOUNT_ID!
          }
        }
      :
        {
          dbCredentials: {
            url: getLocalD1DB()
          }
        }
  )

} satisfies Config;
