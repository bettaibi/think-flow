"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { RecentTrainingList } from "./recent-training-list";
import { TrainingsBacklog } from "./trainings-backlog";
import { createTrainingsQueryHandler } from "../query-handlers/create-trainings-query-handler";

export function TrainingsContainer() {
  const { data: trainings = [] } = useSuspenseQuery(
    createTrainingsQueryHandler()
  );

  const recentTrainings = trainings.slice(0, 3);

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
        <RecentTrainingList recentTrainings={recentTrainings} />

        {/* Trainings Backlog Section */}
        <TrainingsBacklog trainings={trainings} />
      </div>
    </div>
  );
}
