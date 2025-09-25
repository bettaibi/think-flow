export enum MediaType {
  VIDEO = "video",
  AUDIO = "audio",
  IMAGE = "image",
  FILE = "file",
}

export interface MediaProps {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  tags?: string[];
  type: MediaType;
  url: string;
  thumbnailUrl?: string;
  duration?: number; // in seconds for video/audio
  fileSize?: number; // in bytes
  fileName?: string;
  mimeType?: string;
  width?: number; // for images/videos
  height?: number; // for images/videos
}

export interface MediaStoryProps {
  isOpen: boolean;
  onClose: () => void;
  mediaItems: MediaProps[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
}

export interface ImageViewerProps {
  isOpen: boolean;
  onClose: () => void;
  images: MediaProps[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
}
