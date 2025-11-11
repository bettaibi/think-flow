
// Client handlers

import { fetcher } from "@/lib/fetcher";

// Fetch Project handler
const fetchProject = async () => {
  try {
    const res = await fetcher("/api/projects");
    const data = await res.json();
    console.log(data);
    return data;
    } catch (error) {
        console.log(error);
  }
}


export { fetchProject };