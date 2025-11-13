"use client";

import { ProjectsContainer } from "@/features/projects";
import { Suspense } from "react";

export default function ProjectsPage() {
  return (
    <Suspense fallback={<span>Loading...</span>}>
      <ProjectsContainer />
    </Suspense>
  );
}
