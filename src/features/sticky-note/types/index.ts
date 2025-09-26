export interface StickyNoteProps {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tags?: string[];
  isPinned: boolean;
  folderId: string;
}

export interface StickyNoteFolderProps {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}
