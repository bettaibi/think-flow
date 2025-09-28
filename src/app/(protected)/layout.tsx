import { NavigationMenu } from "@/components/layout/navigation-menu";
import { auth } from "@/lib/auth";
import React from "react";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // AUth Session

  const session = await auth();
  console.log("session ************", session);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="pb-16 min-h-screen overflow-y-auto">{children}</div>

      <NavigationMenu />
    </div>
  );
}
