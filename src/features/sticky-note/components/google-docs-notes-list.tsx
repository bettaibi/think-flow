"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { StickyNoteProps } from "../types";
import { GoogleDocsNoteCard } from "./google-docs-note-card";
import { StickyNotesDropdown } from "./sticky-notes-dropdown";
import { Button } from "@/components/Button";

interface Props {
  notes: StickyNoteProps[];
}

export function GoogleDocsNotesList({ notes: initialNotes }: Props) {
  const [notes, setNotes] = useState<StickyNoteProps[]>(initialNotes);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);

  const handleCloseNote = (noteId: string) => {
    setNotes(notes.filter((note) => note.id !== noteId));
    if (selectedNoteId === noteId) {
      setSelectedNoteId(null);
    }
  };

  const handlePinNote = (noteId: string) => {
    setNotes(
      notes.map((note) =>
        note.id === noteId ? { ...note, isPinned: !note.isPinned } : note
      )
    );
  };

  const handleSelectNote = (noteId: string) => {
    setSelectedNoteId(noteId);
  };

  const handleEditNote = (note: StickyNoteProps) => {
    setSelectedNoteId(note.id);
    // In a real implementation, this would open an edit modal or navigate to edit page
    console.log("Edit note:", note.id);
  };

  const handleCreateNew = () => {
    const newNote: StickyNoteProps = {
      id: Date.now().toString(),
      title: "Untitled Note",
      content:
        "Start writing your note here...\n\nYou can use **markdown** syntax:\n- *Italic text*\n- **Bold text**\n- `Code blocks`\n- [Links](https://example.com)\n- # Headers\n\nAnd much more!",
      createdAt: new Date(),
      updatedAt: new Date(),
      isPinned: false,
      tags: ["new"],
      folderId: "default", // This should be passed as a prop in a real implementation
    };

    setNotes([newNote, ...notes]);
    setSelectedNoteId(newNote.id);
  };

  // Sort notes: pinned first, then by updated date
  const sortedNotes = [...notes].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1 sm:mb-2">
            Notes
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Google Docs-style notes with markdown support
          </p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <div className="hidden sm:block">
            <StickyNotesDropdown
              notes={notes}
              onSelectNote={handleSelectNote}
              onCreateNew={handleCreateNew}
            />
          </div>
          <Button
            onClick={handleCreateNew}
            className="flex items-center gap-2 w-full sm:w-auto justify-center"
            size="sm"
          >
            <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
            <span className="sm:inline">New Note</span>
          </Button>
          <div className="sm:hidden">
            <StickyNotesDropdown
              notes={notes}
              onSelectNote={handleSelectNote}
              onCreateNew={handleCreateNew}
            />
          </div>
        </div>
      </div>

      {/* Notes display area */}
      {sortedNotes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 sm:py-16 text-center px-4">
          <div className="text-4xl sm:text-6xl mb-3 sm:mb-4 opacity-50">📝</div>
          <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">
            No notes yet
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 max-w-md">
            Create your first note to start organizing your thoughts and ideas.
            Supports markdown for rich formatting!
          </p>
          <Button
            onClick={handleCreateNew}
            className="flex items-center gap-2 w-full sm:w-auto"
            size="sm"
          >
            <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
            Create Your First Note
          </Button>
        </div>
      ) : (
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-3 sm:gap-6 space-y-0">
          {sortedNotes.map((note) => (
            <GoogleDocsNoteCard
              key={note.id}
              note={note}
              onEdit={handleEditNote}
              onDelete={handleCloseNote}
              onPin={handlePinNote}
            />
          ))}
        </div>
      )}

      {/* Stats footer */}
      {sortedNotes.length > 0 && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 text-sm text-muted-foreground border-t border-border pt-3 sm:pt-4">
          <div>
            <span className="font-medium text-foreground">
              {sortedNotes.length}
            </span>{" "}
            note{sortedNotes.length !== 1 ? "s" : ""}
            {sortedNotes.filter((n) => n.isPinned).length > 0 && (
              <>
                {" • "}
                <span className="font-medium text-foreground">
                  {sortedNotes.filter((n) => n.isPinned).length}
                </span>{" "}
                pinned
              </>
            )}
          </div>
          <div className="text-xs">
            <span className="hidden sm:inline">
              Click cards to edit • Hover for actions • Markdown supported
            </span>
            <span className="sm:hidden">
              Tap cards to edit • Markdown supported
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
