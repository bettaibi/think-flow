"use client";
import { ProjectProps, ProjectPriority, ProjectStatus } from "../types";
import { Paper } from "@/components/Paper";
import { Button } from "@/components/Button";

interface Props {
  projects: ProjectProps[];
}

export function ProjectsBacklog({ projects }: Props) {
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

  const getPriorityIcon = (priority: ProjectPriority) => {
    switch (priority) {
      case ProjectPriority.HIGH:
        return "🔴";
      case ProjectPriority.MEDIUM:
        return "🟡";
      case ProjectPriority.LOW:
        return "🟢";
      default:
        return "⚪";
    }
  };

  const getStatusColor = (status: ProjectStatus) => {
    switch (status) {
      case ProjectStatus.IN_PROGRESS:
        return "bg-info/10 text-info border-info/20";
      case ProjectStatus.COMPLETED:
        return "bg-success/10 text-success border-success/20";
      case ProjectStatus.PENDING:
        return "bg-muted/30 text-muted-foreground border-border";
      case ProjectStatus.CANCELLED:
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        return "bg-muted/30 text-muted-foreground border-border";
    }
  };

  const formatStatus = (status: ProjectStatus) => {
    return status.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  // Sort projects by priority (HIGH first) then by estimated time
  const sortedProjects = [...projects].sort((a, b) => {
    const priorityOrder = {
      [ProjectPriority.HIGH]: 0,
      [ProjectPriority.MEDIUM]: 1,
      [ProjectPriority.LOW]: 2,
    };
    const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
    if (priorityDiff !== 0) return priorityDiff;
    return a.estimatedTime - b.estimatedTime;
  });

  if (projects.length === 0) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-foreground">
          Project Backlog
        </h2>
        <Paper className="text-center py-12">
          <div className="text-muted-foreground">
            <div className="text-4xl mb-4">📚</div>
            <p className="text-lg">No projects in backlog</p>
            <p className="text-sm mt-2">
              All caught up! Time to plan new projects
            </p>
          </div>
        </Paper>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pt-6">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">
            Project Backlog
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            Planned projects waiting to be started
          </p>
        </div>
        <div className="text-sm text-muted-foreground">
          {projects.length} project{projects.length !== 1 ? "s" : ""} queued
        </div>
      </div>

      {/* Unified card layout */}
      <Paper padding="none" className="overflow-hidden">
        <div className="divide-y divide-border/30">
          {sortedProjects.map((project, index) => (
            <div
              key={project.id}
              className="group hover:bg-muted/10 transition-all duration-200 cursor-pointer p-4"
            >
              <div className="space-y-2">
                {/* Header: Queue number, name, and priority */}
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-2 flex-1 min-w-0">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-muted/40 flex items-center justify-center text-xs font-medium text-muted-foreground">
                      {index + 1}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-medium text-foreground text-sm truncate group-hover:text-primary transition-colors">
                        {project.name}
                      </h3>
                      {project.description && (
                        <p className="text-muted-foreground text-xs mt-0.5 line-clamp-1">
                          {project.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <div
                    className={`
                    ml-2 px-1.5 py-0.5 rounded text-xs font-medium border whitespace-nowrap flex items-center space-x-1
                    ${getPriorityColor(project.priority)}
                  `}
                  >
                    <span className="text-xs">
                      {getPriorityIcon(project.priority)}
                    </span>
                    <span className="text-xs">
                      {project.priority.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Status and estimated time row */}
                <div className="flex items-center justify-between">
                  <div
                    className={`
                    px-1.5 py-0.5 rounded text-xs font-medium border
                    ${getStatusColor(project.status)}
                  `}
                  >
                    {formatStatus(project.status)}
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-xs text-muted-foreground flex items-center space-x-1">
                      <span className="text-primary">⏱</span>
                      <span>{project.estimatedTime}h</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-xs h-6 px-2"
                    >
                      Start
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Paper>

      {/* Footer Summary */}
      <Paper className="mt-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-muted-foreground text-sm">
            Total estimated time:{" "}
            <span className="font-medium text-foreground">
              {projects.reduce(
                (total, project) => total + project.estimatedTime,
                0
              )}{" "}
              hours
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center space-x-1">
              <span className="text-destructive">🔴</span>
              <span className="text-muted-foreground">
                {
                  projects.filter((p) => p.priority === ProjectPriority.HIGH)
                    .length
                }{" "}
                High
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-warning">🟡</span>
              <span className="text-muted-foreground">
                {
                  projects.filter((p) => p.priority === ProjectPriority.MEDIUM)
                    .length
                }{" "}
                Medium
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-success">🟢</span>
              <span className="text-muted-foreground">
                {
                  projects.filter((p) => p.priority === ProjectPriority.LOW)
                    .length
                }{" "}
                Low
              </span>
            </div>
          </div>
        </div>
      </Paper>
    </div>
  );
}
