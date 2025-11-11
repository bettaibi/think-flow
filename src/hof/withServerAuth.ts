import "server-only";

/**
 * Use This to protect server actions
 */
import { Session } from "@/lib/auth";
import { getServerSession } from "@/lib/getServerSession";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function withServerAuth<T extends (...args: any[]) => any>(
  action: (session: Session, ...args: Parameters<T>) => ReturnType<T>
) {
  return async (...args: Parameters<T>) => {
    const session = await getServerSession();
    if (!session) throw new Error("Unauthorized", {cause: 401});

    return action(session, ...args);
  };
}
