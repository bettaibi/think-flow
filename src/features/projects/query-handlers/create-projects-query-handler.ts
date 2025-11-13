import { fetcher } from "@/lib/fetcher";
import { queryOptions } from "@tanstack/react-query";
import { ProjectProps } from "../types";

// Fetch Project handler
const fetchProjects = async () => {
  try {
    const res = await fetcher("/api/projects");
    const data = await res.json<Promise<ProjectProps[]>>();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export function createProjectsQueryHandler() {
  return queryOptions({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });
}
