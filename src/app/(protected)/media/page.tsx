import { MediaFolders } from "@/features/media";

export default async function MediaPage() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <MediaFolders />
      </div>
    </div>
  );
}
