import { project } from "@/db/schema";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const data = await db.select().from(project);

    if (!data)
      return new Response(JSON.stringify({ error: "No data found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });

    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      //  "Cache-Control": "public, s-maxage=300", // cache 5m at CDN edge
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ err }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// import { NextRequest, NextResponse } from "next/server";
// import { db } from "@/lib/db";
// import { project } from "@/db/schema";
// import { withAuth } from "@/lib/withAuth";

// export const GET = withAuth(async (_req: NextRequest, session) => {
//   try {
//     // Optional: restrict based on session.user info
//     console.log("User session:", session.user?.email);

//     const data = await db.select().from(project);

//     if (!data || data.length === 0) {
//       return NextResponse.json({ error: "No data found" }, { status: 404 });
//     }

//     return NextResponse.json(
//       { data },
//       {
//         status: 200,
//         headers: {
//           "Cache-Control": "public, s-maxage=300", // Cache 5 min at edge
//         },
//       }
//     );
//   } catch (err) {
//     console.error("DB error:", err);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// });
