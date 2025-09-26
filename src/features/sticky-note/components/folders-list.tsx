"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faFolder,
  faThumbtack,
} from "@fortawesome/free-solid-svg-icons";
import { StickyNoteFolderProps, StickyNoteProps } from "../types";
import { FolderCard } from "./folder-card";
import { FolderManager } from "./folder-manager";
import { GoogleDocsNoteCard } from "./google-docs-note-card";
import { Button } from "@/components/Button";

interface Props {
  folders: StickyNoteFolderProps[];
  allNotes: StickyNoteProps[];
  onCreateFolder: (name: string) => void;
  onEditFolder: (folder: StickyNoteFolderProps) => void;
  onDeleteFolder: (id: string) => void;
  onEditNote?: (note: StickyNoteProps) => void;
  onDeleteNote?: (id: string) => void;
  onPinNote?: (id: string) => void;
  showPinnedSection?: boolean;
  showHeader?: boolean;
}

export function FoldersList({
  folders,
  allNotes,
  onCreateFolder,
  onEditFolder,
  onDeleteFolder,
  onEditNote,
  onDeleteNote,
  onPinNote,
  showPinnedSection = true,
  showHeader = true,
}: Props) {
  const [isManagerOpen, setIsManagerOpen] = useState(false);
  const [editingFolder, setEditingFolder] =
    useState<StickyNoteFolderProps | null>(null);

  // Get pinned notes across all folders
  const pinnedNotes = allNotes.filter((note) => note.isPinned);

  // Count notes per folder
  const getNotesCountForFolder = (folderId: string) => {
    return allNotes.filter((note) => note.folderId === folderId).length;
  };

  const handleCreateFolder = (name: string) => {
    onCreateFolder(name);
    setIsManagerOpen(false);
  };

  const handleEditFolder = (folder: StickyNoteFolderProps) => {
    setEditingFolder(folder);
    setIsManagerOpen(true);
  };

  const handleUpdateFolder = (folder: StickyNoteFolderProps) => {
    onEditFolder(folder);
    setEditingFolder(null);
    setIsManagerOpen(false);
  };

  const handleDeleteFolder = (id: string) => {
    // In a real implementation, you might want to show a confirmation dialog
    onDeleteFolder(id);
  };

  const handleCloseManager = () => {
    setIsManagerOpen(false);
    setEditingFolder(null);
  };

  // Sort folders by updated date
  const sortedFolders = [...folders].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      {showHeader && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1 sm:mb-2">
              Sticky Notes
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Organize your notes in folders and keep important ones pinned
            </p>
          </div>
          <Button
            onClick={() => setIsManagerOpen(true)}
            className="flex items-center gap-2 w-full sm:w-auto justify-center"
            size="sm"
          >
            <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
            <span>New Folder</span>
          </Button>
        </div>
      )}

      {/* Pinned Notes Section */}
      {showPinnedSection && pinnedNotes.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <FontAwesomeIcon
              icon={faThumbtack}
              className="w-5 h-5 text-primary"
            />
            <h2 className="text-xl font-semibold text-foreground">
              Pinned Notes
            </h2>
            <span className="text-sm text-muted-foreground">
              ({pinnedNotes.length})
            </span>
          </div>
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-3 sm:gap-6 space-y-0">
            {pinnedNotes.map((note) => (
              <GoogleDocsNoteCard
                key={note.id}
                note={note}
                onEdit={onEditNote}
                onDelete={onDeleteNote}
                onPin={onPinNote}
              />
            ))}
          </div>
        </div>
      )}

      {/* Folders Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faFolder} className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">Folders</h2>
            <span className="text-sm text-muted-foreground">
              ({folders.length})
            </span>
          </div>
          {!showHeader && (
            <Button
              onClick={() => setIsManagerOpen(true)}
              className="flex items-center gap-2"
              size="sm"
            >
              <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
              <span className="hidden sm:inline">New Folder</span>
              <span className="sm:hidden">New</span>
            </Button>
          )}
        </div>

        {sortedFolders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 sm:py-16 text-center px-4">
            <div className="text-4xl sm:text-6xl mb-3 sm:mb-4 opacity-50">
              📁
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">
              No folders yet
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 max-w-md">
              Create your first folder to start organizing your sticky notes.
            </p>
            <Button
              onClick={() => setIsManagerOpen(true)}
              className="flex items-center gap-2 w-full sm:w-auto"
              size="sm"
            >
              <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
              Create Your First Folder
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {sortedFolders.map((folder) => (
              <FolderCard
                key={folder.id}
                folder={folder}
                noteCount={getNotesCountForFolder(folder.id)}
                onEdit={handleEditFolder}
                onDelete={handleDeleteFolder}
              />
            ))}
          </div>
        )}
      </div>

      {/* Stats footer */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 text-sm text-muted-foreground border-t border-border pt-3 sm:pt-4">
        <div>
          <span className="font-medium text-foreground">{folders.length}</span>{" "}
          folder{folders.length !== 1 ? "s" : ""} •{" "}
          <span className="font-medium text-foreground">{allNotes.length}</span>{" "}
          total note{allNotes.length !== 1 ? "s" : ""}
          {pinnedNotes.length > 0 && (
            <>
              {" • "}
              <span className="font-medium text-foreground">
                {pinnedNotes.length}
              </span>{" "}
              pinned
            </>
          )}
        </div>
        <div className="text-xs">
          <span className="hidden sm:inline">
            Click folders to view notes • Pinned notes visible across all
            folders
          </span>
          <span className="sm:hidden">Tap folders to view notes</span>
        </div>
      </div>

      {/* Folder Manager Modal */}
      <FolderManager
        isOpen={isManagerOpen}
        onClose={handleCloseManager}
        onCreateFolder={handleCreateFolder}
        onEditFolder={handleUpdateFolder}
        editingFolder={editingFolder}
      />
    </div>
  );
}
