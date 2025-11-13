import { training } from "@/db/schema";
import { getDbAsync } from "@/lib/db";

export async function GET() {
  try {
    const db = await getDbAsync();
    const data = await db.select().from(training);

    if (!data)
      return new Response(JSON.stringify({ error: "No data found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });

    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ err }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
