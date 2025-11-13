"use client";
import { RecentProjectsList } from "./recent-projects-list";
import { ProjectsBacklog } from "./projects-backlog";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createProjectsQueryHandler } from "../query-handlers/create-projects-query-handler";

export function ProjectsContainer() {
  // Fetch the project List
  const { data: projects = [] } = useSuspenseQuery(
    createProjectsQueryHandler()
  );

  console.log(projects);

  const recentProject = [...projects]
    ?.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
    ?.slice(0, 3);

  return (
    <div className="min-h-screen bg-background p-6 space-y-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Projects</h1>
          <p className="text-muted-foreground">
            Manage and track your project progress
          </p>
        </div>

        {/* Recent Projects Section */}
        <RecentProjectsList recentProjects={recentProject} />

        {/* Projects Backlog Section */}
        <ProjectsBacklog projects={projects} />
      </div>
    </div>
  );
}
