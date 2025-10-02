import DocumentNavigation from "../../_components/document-navigation";
import Header from "../../_components/header";

export default async function ProjectBrainstormingPage({
  params,
}: {
  params: { projectId: string };
}) {
  const { projectId } = await params;

  console.log(projectId);

  return (
    <div className="min-h-screen min-w-screen flex flex-col snap-start">
      <Header title="Brainstorming" step={1} />

      <div className="w-full flex-grow">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
      </div>

      <DocumentNavigation />
    </div>
  );
}
