export enum ProjectPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}

export enum ProjectStatus {
  PENDING = "pending",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

export interface ProjectProps {
  id: string;
  name: string;
  description?: string;
  priority: `${ProjectPriority}`;
  status: `${ProjectStatus}`;
  estimatedTime: number;
  progress: number;
  tags?: string;
  createdAt: string;
  updatedAt: string;
}
