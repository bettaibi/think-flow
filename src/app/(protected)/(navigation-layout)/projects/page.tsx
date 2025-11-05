"use client";

import {
  RecentProjectsList,
  ProjectsBacklog,
  ProjectProps,
  ProjectPriority,
  ProjectStatus,
  fetchProject,
} from "@/features/projects";
import { useQuery } from "@tanstack/react-query";

// Mock data for demonstration
const mockRecentProjects: ProjectProps[] = [
  {
    id: "1",
    name: "Think Flow Dashboard",
    description: "Modern dashboard for productivity tracking",
    priority: ProjectPriority.HIGH,
    status: ProjectStatus.IN_PROGRESS,
    estimatedTime: 40,
    progress: 75,
    tags: ["React", "TypeScript", "UI/UX"],
    createdAt: "2024-09-01T10:00:00Z",
    updatedAt: "2024-09-25T15:30:00Z",
  },
  {
    id: "2",
    name: "API Integration",
    description: "Connect with external APIs for data sync",
    priority: ProjectPriority.MEDIUM,
    status: ProjectStatus.IN_PROGRESS,
    estimatedTime: 20,
    progress: 45,
    tags: ["API", "Backend", "Integration"],
    createdAt: "2024-09-10T14:00:00Z",
    updatedAt: "2024-09-24T09:15:00Z",
  },
  {
    id: "3",
    name: "Mobile Responsive Design",
    description: "Optimize for mobile and tablet devices",
    priority: ProjectPriority.LOW,
    status: ProjectStatus.IN_PROGRESS,
    estimatedTime: 15,
    progress: 30,
    tags: ["Mobile", "CSS", "Responsive"],
    createdAt: "2024-09-15T16:00:00Z",
    updatedAt: "2024-09-23T11:45:00Z",
  },
];

const mockBacklogProjects: ProjectProps[] = [
  {
    id: "4",
    name: "User Authentication Upgrade",
    priority: ProjectPriority.HIGH,
    status: ProjectStatus.PENDING,
    estimatedTime: 25,
    progress: 0,
    createdAt: "2024-09-20T10:00:00Z",
    updatedAt: "2024-09-20T10:00:00Z",
  },
  {
    id: "5",
    name: "Performance Optimization",
    priority: ProjectPriority.MEDIUM,
    status: ProjectStatus.PENDING,
    estimatedTime: 30,
    progress: 0,
    createdAt: "2024-09-18T14:00:00Z",
    updatedAt: "2024-09-18T14:00:00Z",
  },
  {
    id: "6",
    name: "Documentation Update",
    priority: ProjectPriority.LOW,
    status: ProjectStatus.PENDING,
    estimatedTime: 10,
    progress: 0,
    createdAt: "2024-09-16T12:00:00Z",
    updatedAt: "2024-09-16T12:00:00Z",
  },
  {
    id: "7",
    name: "Testing Suite Enhancement",
    priority: ProjectPriority.MEDIUM,
    status: ProjectStatus.PENDING,
    estimatedTime: 35,
    progress: 0,
    createdAt: "2024-09-12T09:00:00Z",
    updatedAt: "2024-09-12T09:00:00Z",
  },
  {
    id: "8",
    name: "Analytics Dashboard",
    priority: ProjectPriority.HIGH,
    status: ProjectStatus.PENDING,
    estimatedTime: 45,
    progress: 0,
    createdAt: "2024-09-08T11:00:00Z",
    updatedAt: "2024-09-08T11:00:00Z",
  },
];

export default function ProjectsPage() {
  // Fetch the project List
  const {data:projects, isLoading} = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProject,
    staleTime:0,
    refetchOnWindowFocus:false,
    refetchOnMount:false,
    refetchOnReconnect:false,
  });

  console.log(projects);

  if(!projects || isLoading) return <span>Loading...</span>;
  

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
        <RecentProjectsList recentProjects={mockRecentProjects} />

        {/* Projects Backlog Section */}
        <ProjectsBacklog projects={mockBacklogProjects} />
      </div>
    </div>
  );
}
