"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbtack, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import {
  FoldersList,
  StickyNoteFolderProps,
  StickyNoteProps,
  MarkdownRenderer,
} from "../index";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components";
import { Button } from "@/components/Button";

interface Props {
  folders: StickyNoteFolderProps[];
  notes: StickyNoteProps[];
}

export function FoldersPageClient({ folders, notes }: Props) {
  const handleCreateFolder = (name: string) => {
    console.log("Create folder:", name);
    // In a real implementation, this would create a new folder
  };

  const handleEditFolder = (folder: StickyNoteFolderProps) => {
    console.log("Edit folder:", folder);
    // In a real implementation, this would update the folder
  };

  const handleDeleteFolder = (id: string) => {
    console.log("Delete folder:", id);
    // In a real implementation, this would delete the folder
  };

  const handleEditNote = (note: StickyNoteProps) => {
    console.log("Edit note:", note.id);
    // In a real implementation, this would open note editor
  };

  const handleDeleteNote = (id: string) => {
    console.log("Delete note:", id);
    // In a real implementation, this would delete the note
  };

  const handlePinNote = (id: string) => {
    console.log("Toggle pin note:", id);
    // In a real implementation, this would toggle note pin status
  };

  // Filter pinned notes
  const pinnedNotes = notes.filter((note) => note.isPinned);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) return `${diffInWeeks}w ago`;
    const diffInMonths = Math.floor(diffInWeeks / 4);
    return `${diffInMonths}mo ago`;
  };

  return (
    <div className="space-y-6">
      {/* Header with Pinned Notes Dropdown */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Sticky Notes</h1>
          <p className="text-muted-foreground mt-1">
            Organize your notes in folders
          </p>
        </div>

        {/* Pinned Notes Dropdown */}
        {pinnedNotes.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <FontAwesomeIcon icon={faThumbtack} className="w-4 h-4" />
                <span className="hidden sm:inline">Pinned Notes</span>
                <span className="sm:hidden">Pinned</span>
                <span className="bg-primary/10 text-primary text-xs px-1.5 py-0.5 rounded-full">
                  {pinnedNotes.length}
                </span>
                <FontAwesomeIcon icon={faChevronDown} className="w-3 h-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel className="flex items-center gap-2">
                <FontAwesomeIcon
                  icon={faThumbtack}
                  className="w-4 h-4 text-primary"
                />
                Pinned Notes ({pinnedNotes.length})
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {pinnedNotes.map((note) => (
                <DropdownMenuItem
                  key={note.id}
                  className="flex flex-col items-start gap-1 p-3 cursor-pointer"
                  onClick={() => handleEditNote(note)}
                >
                  <div className="font-medium text-foreground truncate w-full">
                    {note.title}
                  </div>
                  <div className="text-xs text-muted-foreground line-clamp-2 w-full">
                    <MarkdownRenderer
                      content={note.content}
                      variant="dropdown"
                      maxLength={100}
                    />
                  </div>
                  <div className="flex items-center justify-between w-full mt-1">
                    <span className="text-xs text-muted-foreground">
                      {formatDate(note.updatedAt)}
                    </span>
                    {note.tags && note.tags.length > 0 && (
                      <span className="text-xs text-primary">
                        #{note.tags[0]}
                        {note.tags.length > 1 && ` +${note.tags.length - 1}`}
                      </span>
                    )}
                  </div>
                </DropdownMenuItem>
              ))}
              {pinnedNotes.length === 0 && (
                <DropdownMenuItem disabled>
                  No pinned notes found
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {/* Folders List */}
      <FoldersList
        folders={folders}
        allNotes={notes}
        onCreateFolder={handleCreateFolder}
        onEditFolder={handleEditFolder}
        onDeleteFolder={handleDeleteFolder}
        onEditNote={handleEditNote}
        onDeleteNote={handleDeleteNote}
        onPinNote={handlePinNote}
        showPinnedSection={false} // Hide pinned section since we have dropdown
        showHeader={false} // Hide header since we provide our own
      />
    </div>
  );
}
