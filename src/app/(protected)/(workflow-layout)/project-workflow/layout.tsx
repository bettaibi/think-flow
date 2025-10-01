import React from "react";

export default async function ProjectWorkflowLayout({
  projectSchedule,
  projectBrainstorming,
  projectBoard,
}: {
  projectSchedule: React.ReactNode;
  projectBrainstorming: React.ReactNode;
  projectBoard: React.ReactNode;
}) {
  return (
    <div className="min-h-screen min-w-screen bg-background flex flex-row overflow-x-scroll snap-x snap-mandatory scrollbar-hide touch-enabled">
      {projectBrainstorming}
      {projectSchedule}
      {projectBoard}
    </div>
  );
}
