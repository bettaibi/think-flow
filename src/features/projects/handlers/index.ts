
// Client handlers

// Fetch Project handler
const fetchProject = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/projects");
    const data = await res.json();
    console.log(data);
    return data;
    } catch (error) {
        console.log(error);
  }
}


export { fetchProject };