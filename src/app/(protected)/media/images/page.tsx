import { ImageMedia, MediaProps, MediaType } from "@/features/media";

// Mock image data
const mockImages: MediaProps[] = [
  {
    id: "1",
    title: "Sunset Landscape",
    description: "Beautiful sunset over mountain landscape",
    type: MediaType.IMAGE,
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    fileSize: 2.5 * 1024 * 1024,
    width: 1920,
    height: 1080,
    tags: ["landscape", "sunset", "nature"],
    createdAt: "2024-09-01T10:00:00Z",
    updatedAt: "2024-09-01T10:00:00Z",
  },
  {
    id: "2",
    title: "Modern Architecture",
    description: "Contemporary building design with clean lines",
    type: MediaType.IMAGE,
    url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=1200&fit=crop",
    fileSize: 3.2 * 1024 * 1024,
    width: 1080,
    height: 1920,
    tags: ["architecture", "modern", "building"],
    createdAt: "2024-09-05T14:30:00Z",
    updatedAt: "2024-09-05T14:30:00Z",
  },
  {
    id: "3",
    title: "Coffee and Code",
    description: "Perfect workspace setup with coffee and laptop",
    type: MediaType.IMAGE,
    url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop",
    fileSize: 1.8 * 1024 * 1024,
    width: 1920,
    height: 1080,
    tags: ["workspace", "coffee", "coding"],
    createdAt: "2024-09-10T09:15:00Z",
    updatedAt: "2024-09-10T09:15:00Z",
  },
  {
    id: "4",
    title: "Abstract Art",
    description: "Colorful abstract digital artwork",
    type: MediaType.IMAGE,
    url: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=800&fit=crop",
    fileSize: 4.1 * 1024 * 1024,
    width: 1080,
    height: 1350,
    tags: ["abstract", "art", "colorful"],
    createdAt: "2024-09-12T16:45:00Z",
    updatedAt: "2024-09-12T16:45:00Z",
  },
  {
    id: "5",
    title: "Ocean Waves",
    description: "Peaceful ocean waves hitting the shore",
    type: MediaType.IMAGE,
    url: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&h=600&fit=crop",
    fileSize: 2.1 * 1024 * 1024,
    width: 1920,
    height: 1280,
    tags: ["ocean", "waves", "peaceful"],
    createdAt: "2024-09-15T11:20:00Z",
    updatedAt: "2024-09-15T11:20:00Z",
  },
  {
    id: "6",
    title: "City Skyline",
    description: "Urban skyline during golden hour",
    type: MediaType.IMAGE,
    url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",
    fileSize: 3.5 * 1024 * 1024,
    width: 1920,
    height: 1080,
    tags: ["city", "skyline", "urban"],
    createdAt: "2024-09-18T18:30:00Z",
    updatedAt: "2024-09-18T18:30:00Z",
  },
  {
    id: "7",
    title: "Minimalist Design",
    description: "Clean and simple design concept",
    type: MediaType.IMAGE,
    url: "https://images.unsplash.com/photo-1586236949714-7a0b28c6f18b?w=600&h=900&fit=crop",
    fileSize: 1.2 * 1024 * 1024,
    width: 1080,
    height: 1620,
    tags: ["minimalist", "design", "clean"],
    createdAt: "2024-09-20T13:45:00Z",
    updatedAt: "2024-09-20T13:45:00Z",
  },
  {
    id: "8",
    title: "Forest Path",
    description: "Winding path through a dense forest",
    type: MediaType.IMAGE,
    url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=1000&fit=crop",
    fileSize: 2.8 * 1024 * 1024,
    width: 1080,
    height: 1350,
    tags: ["forest", "path", "nature"],
    createdAt: "2024-09-22T08:10:00Z",
    updatedAt: "2024-09-22T08:10:00Z",
  },
];

export default function ImagesPage() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <ImageMedia images={mockImages} />
      </div>
    </div>
  );
}
