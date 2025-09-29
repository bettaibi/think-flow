"use client";
import { ProjectProps, ProjectPriority, ProjectStatus } from "../types";
import { Paper } from "@/components/Paper";
import { Progress } from "@/components/Progress";
import { ItemCarousel } from "@/components/Carousel";

interface Props {
  recentProjects: ProjectProps[];
}

export function RecentProjectsList({ recentProjects }: Props) {
  const getPriorityColor = (priority: ProjectPriority) => {
    switch (priority) {
      case ProjectPriority.HIGH:
        return "bg-destructive/10 text-destructive border-destructive/20";
      case ProjectPriority.MEDIUM:
        return "bg-warning/10 text-warning border-warning/20";
      case ProjectPriority.LOW:
        return "bg-success/10 text-success border-success/20";
      default:
        return "bg-muted/50 text-muted-foreground border-border";
    }
  };

  const getStatusColor = (status: ProjectStatus) => {
    switch (status) {
      case ProjectStatus.IN_PROGRESS:
        return "bg-info/10 text-info border-info/20";
      case ProjectStatus.COMPLETED:
        return "bg-success/10 text-success border-success/20";
      case ProjectStatus.PENDING:
        return "bg-warning/10 text-warning border-warning/20";
      case ProjectStatus.CANCELLED:
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        return "bg-muted/50 text-muted-foreground border-border";
    }
  };

  const formatStatus = (status: ProjectStatus) => {
    return status.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    const diffInWeeks = Math.floor(diffInDays / 7);
    return `${diffInWeeks}w ago`;
  };

  if (recentProjects.length === 0) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-foreground">
          Recent Projects
        </h2>
        <Paper className="text-center py-12">
          <div className="text-muted-foreground">
            <div className="text-4xl mb-4">📋</div>
            <p className="text-lg">No recent projects found</p>
            <p className="text-sm mt-2">
              Start working on a project to see it here
            </p>
          </div>
        </Paper>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-foreground">
          Recent Projects
        </h2>
        <div className="text-sm text-muted-foreground">
          {recentProjects.length} active project
          {recentProjects.length !== 1 ? "s" : ""}
        </div>
      </div>

      <ItemCarousel
        items={recentProjects}
        itemBasis="350px"
        showNavigation={false}
        showDots={false}
        opts={{
          align: "start",
          containScroll: "trimSnaps",
        }}
        renderItem={(project) => (
          <Paper
            variant="elevated"
            className="group hover:shadow-glow transition-all duration-300 cursor-pointer border-border/50 hover:border-primary/30 h-full"
          >
            <div className="space-y-4">
              {/* Header with name and priority */}
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground text-lg truncate group-hover:text-primary transition-colors">
                    {project.name}
                  </h3>
                  {project.description && (
                    <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
                      {project.description}
                    </p>
                  )}
                </div>
                <div
                  className={`
                ml-3 px-2 py-1 rounded-md text-xs font-medium border whitespace-nowrap
                ${getPriorityColor(project.priority)}
              `}
                >
                  {project.priority.toUpperCase()}
                </div>
              </div>

              {/* Status and Progress */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div
                    className={`
                  px-2 py-1 rounded-md text-xs font-medium border
                  ${getStatusColor(project.status)}
                `}
                  >
                    {formatStatus(project.status)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {project.progress}% complete
                  </div>
                </div>

                <Progress
                  value={project.progress}
                  variant={
                    project.progress >= 80
                      ? "success"
                      : project.progress >= 50
                      ? "default"
                      : "warning"
                  }
                  size="sm"
                />
              </div>

              {/* Tags */}
              {project.tags && project.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {project.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-muted/30 text-muted-foreground text-xs rounded-md border border-border/50"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="px-2 py-1 bg-muted/30 text-muted-foreground text-xs rounded-md border border-border/50">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>
              )}

              {/* Footer with time info */}
              <div className="flex items-center justify-between pt-2 border-t border-border/30">
                <div className="text-xs text-muted-foreground">
                  Updated {formatTimeAgo(project.updatedAt)}
                </div>
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <span className="text-primary">⏱</span>
                  {project.estimatedTime}h est.
                </div>
              </div>
            </div>
          </Paper>
        )}
      />
    </div>
  );
}
