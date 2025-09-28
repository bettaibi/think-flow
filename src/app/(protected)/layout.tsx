import { NavigationMenu } from "@/components/layout/navigation-menu";
import React from "react";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="pb-16 min-h-screen overflow-y-auto">{children}</div>

      <NavigationMenu />
    </div>
  );
}
