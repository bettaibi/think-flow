export interface StickyNoteProps {
  id: string;
  title: string;
  content: string;
  tags?: string[];
  isPinned: boolean;
  folderId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface StickyNoteFolderProps {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
