import { AudioMedia, MediaProps, MediaType } from "@/features/media";

// Mock audio data
const mockAudios: MediaProps[] = [
  {
    id: "1",
    title: "Focus Background Music",
    description: "Ambient music for concentration and productivity",
    type: MediaType.AUDIO,
    url: "/audio/focus-music.mp3",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
    duration: 1800,
    fileSize: 8 * 1024 * 1024,
    tags: ["ambient", "focus", "instrumental"],
    createdAt: "2024-09-01T10:00:00Z",
    updatedAt: "2024-09-01T10:00:00Z",
  },
  {
    id: "2",
    title: "Podcast Episode #12",
    description: "Discussion about modern web development trends",
    type: MediaType.AUDIO,
    url: "/audio/podcast-12.mp3",
    duration: 3600,
    fileSize: 15 * 1024 * 1024,
    tags: ["podcast", "development", "tech"],
    createdAt: "2024-09-10T14:00:00Z",
    updatedAt: "2024-09-10T14:00:00Z",
  },
  {
    id: "3",
    title: "Nature Sounds - Rain",
    description: "Relaxing rain sounds for meditation and sleep",
    type: MediaType.AUDIO,
    url: "/audio/rain-sounds.mp3",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1519692933481-e162a57d6721?w=400&h=400&fit=crop",
    duration: 3600,
    fileSize: 12 * 1024 * 1024,
    tags: ["nature", "rain", "relaxation"],
    createdAt: "2024-09-15T09:30:00Z",
    updatedAt: "2024-09-15T09:30:00Z",
  },
  {
    id: "4",
    title: "Voice Memo - Project Ideas",
    description: "Quick voice notes about upcoming project concepts",
    type: MediaType.AUDIO,
    url: "/audio/voice-memo.mp3",
    duration: 300,
    fileSize: 2 * 1024 * 1024,
    tags: ["voice-memo", "ideas", "brainstorm"],
    createdAt: "2024-09-20T16:45:00Z",
    updatedAt: "2024-09-20T16:45:00Z",
  },
  {
    id: "5",
    title: "Jazz Piano Session",
    description: "Smooth jazz piano for background ambiance",
    type: MediaType.AUDIO,
    url: "/audio/jazz-piano.mp3",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=400&h=400&fit=crop",
    duration: 2400,
    fileSize: 10 * 1024 * 1024,
    tags: ["jazz", "piano", "music"],
    createdAt: "2024-09-22T13:20:00Z",
    updatedAt: "2024-09-22T13:20:00Z",
  },
];

export default function AudioPage() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <AudioMedia audios={mockAudios} />
      </div>
    </div>
  );
}
