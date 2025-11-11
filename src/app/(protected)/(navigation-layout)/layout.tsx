import React from "react";
import { NavigationMenu } from "./_components/navigation-menu";

export default async function NavigationLayout({
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
