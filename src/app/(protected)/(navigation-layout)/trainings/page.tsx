"use client";

import { Suspense } from "react";
import { TrainingsContainer } from "@/features/trainings";

export default function TrainingsPage() {
  return (
    <Suspense fallback={<span>Training Loading...</span>}>
      <TrainingsContainer />
    </Suspense>
  );
}
