import Header from "../../_components/header";

export default async function ProjectBoardPage() {
  return (
    <div className="min-h-screen min-w-screen flex flex-col snap-start">
      <Header title="Kanban Board" step={3} />

      <div className="w-full flex-grow">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
      </div>
    </div>
  );
}
