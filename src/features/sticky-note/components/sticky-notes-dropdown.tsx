"use client";
import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faStickyNote,
  faThumbtack,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { StickyNoteProps } from "../types";
import { Button } from "@/components/Button";
import { MarkdownRenderer } from "./markdown-renderer";

interface Props {
  notes: StickyNoteProps[];
  onSelectNote?: (noteId: string) => void;
  onCreateNew?: () => void;
}

export function StickyNotesDropdown({
  notes,
  onSelectNote,
  onCreateNew,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getInitialIndicator = (title: string) => {
    return title.charAt(0).toUpperCase();
  };

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
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  // Sort notes: pinned first, then by updated date
  const sortedNotes = [...notes].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 min-w-32 sm:min-w-48"
        size="sm"
      >
        <FontAwesomeIcon icon={faStickyNote} className="w-4 h-4" />
        <span className="hidden sm:inline">Sticky Notes ({notes.length})</span>
        <span className="sm:hidden">Notes</span>
        <FontAwesomeIcon
          icon={isOpen ? faChevronUp : faChevronDown}
          className="w-3 h-3 ml-auto"
        />
      </Button>

      {isOpen && (
        <div className="absolute top-full right-0 sm:left-0 mt-2 w-72 sm:w-80 bg-popover border border-border rounded-lg shadow-lg z-50 max-h-80 sm:max-h-96 overflow-hidden">
          {/* Header */}
          <div className="p-3 border-b border-border bg-muted/30">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-foreground">Quick Access</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  onCreateNew?.();
                  setIsOpen(false);
                }}
                className="h-7 px-2"
              >
                <FontAwesomeIcon icon={faPlus} className="w-3 h-3 mr-1" />
                New
              </Button>
            </div>
          </div>

          {/* Notes list */}
          <div className="max-h-80 overflow-y-auto">
            {sortedNotes.length === 0 ? (
              <div className="p-6 text-center text-muted-foreground">
                <FontAwesomeIcon
                  icon={faStickyNote}
                  className="w-8 h-8 mb-2 opacity-50"
                />
                <p>No sticky notes yet</p>
                <p className="text-sm mt-1">
                  Create your first note to get started
                </p>
              </div>
            ) : (
              <div className="py-1">
                {sortedNotes.map((note) => (
                  <button
                    key={note.id}
                    onClick={() => {
                      onSelectNote?.(note.id);
                      setIsOpen(false);
                    }}
                    className="w-full px-3 py-2 text-left hover:bg-muted/50 transition-colors border-b border-border/30 last:border-b-0"
                  >
                    <div className="flex items-start gap-3">
                      {/* Initial indicator */}
                      <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                        <span className="text-xs font-medium text-primary">
                          {getInitialIndicator(note.title)}
                        </span>
                      </div>

                      {/* Note content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-foreground text-sm truncate">
                            {note.title}
                          </h4>
                          {note.isPinned && (
                            <FontAwesomeIcon
                              icon={faThumbtack}
                              className="w-3 h-3 text-primary flex-shrink-0"
                            />
                          )}
                        </div>

                        <div className="text-xs text-muted-foreground line-clamp-2 mb-1">
                          <MarkdownRenderer
                            content={note.content}
                            variant="dropdown"
                            maxLength={80}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            {formatDate(note.updatedAt)}
                          </span>
                          {note.tags && note.tags.length > 0 && (
                            <div className="flex gap-1">
                              {note.tags.slice(0, 2).map((tag, index) => (
                                <span
                                  key={index}
                                  className="text-xs bg-muted/50 text-muted-foreground px-1.5 py-0.5 rounded"
                                >
                                  #{tag}
                                </span>
                              ))}
                              {note.tags.length > 2 && (
                                <span className="text-xs text-muted-foreground">
                                  +{note.tags.length - 2}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {sortedNotes.length > 0 && (
            <div className="p-2 border-t border-border bg-muted/30">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>
                  {sortedNotes.filter((n) => n.isPinned).length > 0 && (
                    <>{sortedNotes.filter((n) => n.isPinned).length} pinned •</>
                  )}
                  {sortedNotes.length} total
                </span>
                <span>Click to open note</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
