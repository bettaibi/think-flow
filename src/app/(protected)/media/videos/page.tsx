import { VideoMedia, MediaProps, MediaType } from "@/features/media";

// Mock video data
const mockVideos: MediaProps[] = [
  {
    id: "1",
    title: "Product Demo Video",
    description: "Demonstrating the key features of our latest product",
    type: MediaType.VIDEO,
    url: "/videos/demo.mp4",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1536431311719-398b6704d4cc?w=400&h=225&fit=crop",
    duration: 180,
    fileSize: 45 * 1024 * 1024,
    width: 1920,
    height: 1080,
    tags: ["demo", "product", "tutorial"],
    createdAt: "2024-09-01T10:00:00Z",
    updatedAt: "2024-09-01T10:00:00Z",
  },
  {
    id: "2",
    title: "Team Meeting Recording",
    description: "Weekly team sync meeting discussion",
    type: MediaType.VIDEO,
    url: "/videos/meeting.mp4",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1560472355-536de3962603?w=400&h=225&fit=crop",
    duration: 3600,
    fileSize: 120 * 1024 * 1024,
    width: 1280,
    height: 720,
    tags: ["meeting", "team", "work"],
    createdAt: "2024-09-15T14:00:00Z",
    updatedAt: "2024-09-15T14:00:00Z",
  },
  {
    id: "3",
    title: "UI Animation Showcase",
    description: "Collection of smooth UI animations and transitions",
    type: MediaType.VIDEO,
    url: "/videos/ui-animation.mp4",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=225&fit=crop",
    duration: 60,
    fileSize: 15 * 1024 * 1024,
    width: 1920,
    height: 1080,
    tags: ["ui", "animation", "design"],
    createdAt: "2024-09-20T16:30:00Z",
    updatedAt: "2024-09-20T16:30:00Z",
  },
  {
    id: "4",
    title: "Code Review Session",
    description: "Going through recent code changes and improvements",
    type: MediaType.VIDEO,
    url: "/videos/code-review.mp4",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=225&fit=crop",
    duration: 2400,
    fileSize: 80 * 1024 * 1024,
    width: 1920,
    height: 1080,
    tags: ["code", "review", "development"],
    createdAt: "2024-09-22T11:15:00Z",
    updatedAt: "2024-09-22T11:15:00Z",
  },
];

export default async function VideosPage() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <VideoMedia videos={mockVideos} />
      </div>
    </div>
  );
}
