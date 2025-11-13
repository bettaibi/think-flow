"use server";

import { training } from "@/db/schema";
import { withServerAuth } from "@/hof/withServerAuth";
import { getDbAsync } from "@/lib/db";

const createTraining = withServerAuth(async (session, payload) => {
  try {
    const db = await getDbAsync();
    const data = await db.insert(training).values(payload);

    if (data?.error) {
      throw new Error(`Error creating a new training: ${data.error}`, {
        cause: 403,
      });
    }

    return data;
  } catch (error) {
    throw error;
  }
});

export { createTraining };
