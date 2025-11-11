import {
  RecentTrainingList,
  TrainingsBacklog,
  TrainingProps,
  TrainingPriority,
  TrainingStatus,
  TrainingType,
} from "@/features/trainings";
import { getServerSession } from "@/lib/getServerSession";

// Mock data for demonstration
const mockRecentTrainings: TrainingProps[] = [
  {
    id: "1",
    title: "Advanced TypeScript Patterns",
    description: "Master advanced TypeScript concepts and design patterns",
    priority: TrainingPriority.HIGH,
    status: TrainingStatus.IN_PROGRESS,
    type: TrainingType.COURSE,
    duration: 25,
    progress: 60,
    tags: ["TypeScript", "Design Patterns", "Advanced"],
    createdAt: "2024-09-01T10:00:00Z",
    updatedAt: "2024-09-25T14:30:00Z",
  },
  {
    id: "2",
    title: "React Performance Workshop",
    description: "Optimize React applications for better performance",
    priority: TrainingPriority.MEDIUM,
    status: TrainingStatus.IN_PROGRESS,
    type: TrainingType.WORKSHOP,
    duration: 8,
    progress: 25,
    tags: ["React", "Performance", "Optimization"],
    createdAt: "2024-09-10T14:00:00Z",
    updatedAt: "2024-09-24T16:45:00Z",
  },
  {
    id: "3",
    title: "AWS Cloud Practitioner",
    description: "Prepare for AWS Cloud Practitioner certification exam",
    priority: TrainingPriority.HIGH,
    status: TrainingStatus.IN_PROGRESS,
    type: TrainingType.CERTIFICATION,
    duration: 40,
    progress: 80,
    tags: ["AWS", "Cloud", "Certification"],
    createdAt: "2024-08-15T16:00:00Z",
    updatedAt: "2024-09-25T09:15:00Z",
  },
];

const mockBacklogTrainings: TrainingProps[] = [
  {
    id: "4",
    title: "Docker & Kubernetes Mastery",
    priority: TrainingPriority.HIGH,
    status: TrainingStatus.PENDING,
    type: TrainingType.BOOTCAMP,
    duration: 50,
    progress: 0,
    createdAt: "2024-09-20T10:00:00Z",
    updatedAt: "2024-09-20T10:00:00Z",
  },
  {
    id: "5",
    title: "UX Design Fundamentals",
    priority: TrainingPriority.MEDIUM,
    status: TrainingStatus.PENDING,
    type: TrainingType.COURSE,
    duration: 20,
    progress: 0,
    createdAt: "2024-09-18T14:00:00Z",
    updatedAt: "2024-09-18T14:00:00Z",
  },
  {
    id: "6",
    title: "Machine Learning Basics",
    priority: TrainingPriority.LOW,
    status: TrainingStatus.PENDING,
    type: TrainingType.SEMINAR,
    duration: 15,
    progress: 0,
    createdAt: "2024-09-16T12:00:00Z",
    updatedAt: "2024-09-16T12:00:00Z",
  },
  {
    id: "7",
    title: "Cybersecurity Awareness",
    priority: TrainingPriority.HIGH,
    status: TrainingStatus.PENDING,
    type: TrainingType.WORKSHOP,
    duration: 6,
    progress: 0,
    createdAt: "2024-09-12T09:00:00Z",
    updatedAt: "2024-09-12T09:00:00Z",
  },
  {
    id: "8",
    title: "Advanced SQL Techniques",
    priority: TrainingPriority.MEDIUM,
    status: TrainingStatus.PENDING,
    type: TrainingType.COURSE,
    duration: 30,
    progress: 0,
    createdAt: "2024-09-08T11:00:00Z",
    updatedAt: "2024-09-08T11:00:00Z",
  },
];

export default async function TrainingsPage() {
  const session = await getServerSession();
  console.log(session);
  return (
    <div className="min-h-screen bg-background p-6 space-y-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Trainings</h1>
          <p className="text-muted-foreground">
            Manage your learning journey and skill development
          </p>
        </div>

        {/* Recent Trainings Section */}
        <RecentTrainingList recentTrainings={mockRecentTrainings} />

        {/* Trainings Backlog Section */}
        <TrainingsBacklog trainings={mockBacklogTrainings} />
      </div>
    </div>
  );
}
