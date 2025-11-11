/**
 * Use This to protect route handlers
 */
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "@/lib/getServerSession";
import { Session } from "@/lib/auth";

type Handler = (req: NextRequest, session: Session) => Promise<Response>;

export function withAuth(handler: Handler) {
  return async (req: NextRequest) => {
    /** Check for a Protected session */
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return handler(req, session);
  };
}
