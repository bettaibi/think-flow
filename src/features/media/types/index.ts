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
}
