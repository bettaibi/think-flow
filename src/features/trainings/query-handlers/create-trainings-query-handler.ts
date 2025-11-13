import { fetcher } from "@/lib/fetcher";
import { queryOptions } from "@tanstack/react-query";
import { TrainingProps } from "../types";
import { queryKey } from "@/utils/query-key";

const fetchTrainings = async () => {
  try {
    const res = await fetcher("/api/trainings");
    const data = await res.json<Promise<TrainingProps[]>>();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export function createTrainingsQueryHandler() {
  return queryOptions({
    queryKey: queryKey.GET_TRAININGS_KEY,
    queryFn: fetchTrainings,
  });
}
