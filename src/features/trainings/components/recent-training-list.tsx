"use client";
import {
  TrainingProps,
  TrainingPriority,
  TrainingStatus,
  TrainingType,
} from "../types";
import { Paper } from "@/components/Paper";
import { Progress } from "@/components/Progress";

interface Props {
  recentTrainings: TrainingProps[];
}

export function RecentTrainingList({ recentTrainings }: Props) {
  const getPriorityColor = (priority: TrainingPriority) => {
    switch (priority) {
      case TrainingPriority.HIGH:
        return "bg-destructive/10 text-destructive border-destructive/20";
      case TrainingPriority.MEDIUM:
        return "bg-warning/10 text-warning border-warning/20";
      case TrainingPriority.LOW:
        return "bg-success/10 text-success border-success/20";
      default:
        return "bg-muted/50 text-muted-foreground border-border";
    }
  };

  const getStatusColor = (status: TrainingStatus) => {
    switch (status) {
      case TrainingStatus.IN_PROGRESS:
        return "bg-info/10 text-info border-info/20";
      case TrainingStatus.COMPLETED:
        return "bg-success/10 text-success border-success/20";
      case TrainingStatus.PENDING:
        return "bg-warning/10 text-warning border-warning/20";
      case TrainingStatus.CANCELLED:
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        return "bg-muted/50 text-muted-foreground border-border";
    }
  };

  const getTypeIcon = (type: TrainingType) => {
    switch (type) {
      case TrainingType.COURSE:
        return "📚";
      case TrainingType.WORKSHOP:
        return "🔨";
      case TrainingType.CERTIFICATION:
        return "🏆";
      case TrainingType.SEMINAR:
        return "🎓";
      case TrainingType.BOOTCAMP:
        return "⚡";
      default:
        return "📖";
    }
  };

  const formatStatus = (status: TrainingStatus) => {
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

  if (recentTrainings.length === 0) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-foreground">
          Recent Trainings
        </h2>
        <Paper className="text-center py-12">
          <div className="text-muted-foreground">
            <div className="text-4xl mb-4">🎓</div>
            <p className="text-lg">No recent trainings found</p>
            <p className="text-sm mt-2">Start a training to see it here</p>
          </div>
        </Paper>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-foreground">
          Recent Trainings
        </h2>
        <div className="text-sm text-muted-foreground">
          {recentTrainings.length} active training
          {recentTrainings.length !== 1 ? "s" : ""}
        </div>
      </div>

      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-4 pb-4">
          {recentTrainings.map((training) => (
            <Paper
              key={training.id}
              variant="elevated"
              className="group hover:shadow-glow transition-all duration-300 cursor-pointer border-border/50 hover:border-primary/30 flex-shrink-0"
              style={{ width: "350px" }}
            >
              <div className="space-y-4">
                {/* Header with title, type icon, and priority */}
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-2 flex-1 min-w-0">
                    <span className="text-lg flex-shrink-0 mt-0.5">
                      {getTypeIcon(training.type)}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-foreground text-lg truncate group-hover:text-primary transition-colors">
                        {training.title}
                      </h3>
                      {training.description && (
                        <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
                          {training.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <div
                    className={`
                    ml-3 px-2 py-1 rounded-md text-xs font-medium border whitespace-nowrap
                    ${getPriorityColor(training.priority)}
                  `}
                  >
                    {training.priority.toUpperCase()}
                  </div>
                </div>

                {/* Status and Progress */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div
                      className={`
                      px-2 py-1 rounded-md text-xs font-medium border
                      ${getStatusColor(training.status)}
                    `}
                    >
                      {formatStatus(training.status)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {training.progress}% complete
                    </div>
                  </div>

                  <Progress
                    value={training.progress}
                    variant={
                      training.progress >= 80
                        ? "success"
                        : training.progress >= 50
                        ? "default"
                        : "warning"
                    }
                    size="sm"
                  />
                </div>

                {/* Tags */}
                {training.tags && training.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {training.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-muted/30 text-muted-foreground text-xs rounded-md border border-border/50"
                      >
                        {tag}
                      </span>
                    ))}
                    {training.tags.length > 3 && (
                      <span className="px-2 py-1 bg-muted/30 text-muted-foreground text-xs rounded-md border border-border/50">
                        +{training.tags.length - 3}
                      </span>
                    )}
                  </div>
                )}

                {/* Footer with time info */}
                <div className="flex items-center justify-between pt-2 border-t border-border/30">
                  <div className="text-xs text-muted-foreground">
                    Updated {formatTimeAgo(training.updatedAt)}
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <span className="text-primary">⏱</span>
                    {training.duration}h
                  </div>
                </div>
              </div>
            </Paper>
          ))}
        </div>
      </div>
    </div>
  );
}
