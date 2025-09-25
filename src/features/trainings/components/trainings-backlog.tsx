"use client";
import {
  TrainingProps,
  TrainingPriority,
  TrainingStatus,
  TrainingType,
} from "../types";
import { Paper } from "@/components/Paper";
import { Button } from "@/components/Button";

interface Props {
  trainings: TrainingProps[];
}

export function TrainingsBacklog({ trainings }: Props) {
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

  const getPriorityIcon = (priority: TrainingPriority) => {
    switch (priority) {
      case TrainingPriority.HIGH:
        return "🔴";
      case TrainingPriority.MEDIUM:
        return "🟡";
      case TrainingPriority.LOW:
        return "🟢";
      default:
        return "⚪";
    }
  };

  const getStatusColor = (status: TrainingStatus) => {
    switch (status) {
      case TrainingStatus.IN_PROGRESS:
        return "bg-info/10 text-info border-info/20";
      case TrainingStatus.COMPLETED:
        return "bg-success/10 text-success border-success/20";
      case TrainingStatus.PENDING:
        return "bg-muted/30 text-muted-foreground border-border";
      case TrainingStatus.CANCELLED:
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        return "bg-muted/30 text-muted-foreground border-border";
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

  // Sort trainings by priority (HIGH first) then by duration
  const sortedTrainings = [...trainings].sort((a, b) => {
    const priorityOrder = {
      [TrainingPriority.HIGH]: 0,
      [TrainingPriority.MEDIUM]: 1,
      [TrainingPriority.LOW]: 2,
    };
    const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
    if (priorityDiff !== 0) return priorityDiff;
    return a.duration - b.duration;
  });

  if (trainings.length === 0) {
    return (
      <div className="space-y-6 pt-6">
        <h2 className="text-2xl font-semibold text-foreground">
          Training Backlog
        </h2>
        <Paper className="text-center py-12">
          <div className="text-muted-foreground">
            <div className="text-4xl mb-4">📚</div>
            <p className="text-lg">No trainings in backlog</p>
            <p className="text-sm mt-2">
              All caught up! Time to plan new learning goals
            </p>
          </div>
        </Paper>
      </div>
    );
  }

  return (
    <div className="space-y-6 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">
            Training Backlog
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            Planned trainings waiting to be started
          </p>
        </div>
        <div className="text-sm text-muted-foreground">
          {trainings.length} training{trainings.length !== 1 ? "s" : ""} queued
        </div>
      </div>

      {/* Unified card layout */}
      <Paper padding="none" className="overflow-hidden">
        <div className="divide-y divide-border/30">
          {sortedTrainings.map((training, index) => (
            <div
              key={training.id}
              className="group hover:bg-muted/10 transition-all duration-200 cursor-pointer p-4"
            >
              <div className="space-y-2">
                {/* Header: Queue number, title, type, and priority */}
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-2 flex-1 min-w-0">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-muted/40 flex items-center justify-center text-xs font-medium text-muted-foreground">
                      {index + 1}
                    </div>
                    <div className="flex items-center space-x-1 flex-shrink-0">
                      <span className="text-sm">
                        {getTypeIcon(training.type)}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-medium text-foreground text-sm truncate group-hover:text-primary transition-colors">
                        {training.title}
                      </h3>
                    </div>
                  </div>
                  <div
                    className={`
                    ml-2 px-1.5 py-0.5 rounded text-xs font-medium border whitespace-nowrap flex items-center space-x-1
                    ${getPriorityColor(training.priority)}
                  `}
                  >
                    <span className="text-xs">
                      {getPriorityIcon(training.priority)}
                    </span>
                    <span className="text-xs">
                      {training.priority.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Status and duration row */}
                <div className="flex items-center justify-between">
                  <div
                    className={`
                    px-1.5 py-0.5 rounded text-xs font-medium border
                    ${getStatusColor(training.status)}
                  `}
                  >
                    {formatStatus(training.status)}
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-xs text-muted-foreground flex items-center space-x-1">
                      <span className="text-primary">⏱</span>
                      <span>{training.duration}h</span>
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
            Total learning time:{" "}
            <span className="font-medium text-foreground">
              {trainings.reduce(
                (total, training) => total + training.duration,
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
                  trainings.filter((t) => t.priority === TrainingPriority.HIGH)
                    .length
                }{" "}
                High
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-warning">🟡</span>
              <span className="text-muted-foreground">
                {
                  trainings.filter(
                    (t) => t.priority === TrainingPriority.MEDIUM
                  ).length
                }{" "}
                Medium
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-success">🟢</span>
              <span className="text-muted-foreground">
                {
                  trainings.filter((t) => t.priority === TrainingPriority.LOW)
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
