export enum TrainingPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}

export enum TrainingStatus {
  PENDING = "pending",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

export enum TrainingType {
  COURSE = "course",
  WORKSHOP = "workshop",
  CERTIFICATION = "certification",
  SEMINAR = "seminar",
  BOOTCAMP = "bootcamp",
}

export interface TrainingProps {
  id: string;
  title: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  tags?: string;
  duration: number; // in hours
  progress: number; // percentage
  status: `${TrainingStatus}`;
  priority: `${TrainingPriority}`;
  type: `${TrainingType}`;
}
