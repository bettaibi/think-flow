"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbtack,
  faTrash,
  faCode,
} from "@fortawesome/free-solid-svg-icons";
import { StickyNoteProps } from "../types";
import { Paper } from "@/components/Paper";
import { Button } from "@/components/Button";
import { MarkdownRenderer } from "./markdown-renderer";
import { formatTimeAgo } from "@/utils/format-time-ago";

interface Props {
  note: StickyNoteProps;
  onEdit?: (note: StickyNoteProps) => void;
  onDelete?: (id: string) => void;
  onPin?: (id: string) => void;
}

export function GoogleDocsNoteCard({ note, onEdit, onDelete, onPin }: Props) {
  const [showActions, setShowActions] = useState(false);

  const handleEdit = () => {
    onEdit?.(note);
  };

  const handleDelete = () => {
    onDelete?.(note.id);
  };

  const handlePin = () => {
    onPin?.(note.id);
  };

  // All sticky notes are markdown-based, so we always show the code indicator if content has markdown syntax
  const hasMarkdownIndicators = /[*_`#\[\]>-]/.test(note.content);

  return (
    <Paper
      className="group cursor-pointer hover:shadow-lg transition-all duration-300 relative break-inside-avoid mb-3 sm:mb-4"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
      onTouchStart={() => setShowActions(true)}
      onClick={handleEdit}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-2 sm:mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {note.isPinned && (
              <FontAwesomeIcon
                icon={faThumbtack}
                className="w-3 h-3 text-primary flex-shrink-0"
              />
            )}
            <h3 className="text-base font-semibold text-foreground truncate">
              {note.title}
            </h3>
            {hasMarkdownIndicators && (
              <FontAwesomeIcon
                icon={faCode}
                className="w-3 h-3 text-muted-foreground flex-shrink-0"
                title="Contains Markdown"
              />
            )}
          </div>
          <div className="text-xs text-muted-foreground">
            Updated {formatTimeAgo(note.updatedAt)}
          </div>
        </div>

        {/* Actions menu */}
        <div
          className={`
            flex items-center transition-opacity duration-200 gap-1
            opacity-100 sm:opacity-0 sm:group-hover:opacity-100
            ${showActions ? "sm:opacity-100" : ""}
          `}
        >
          <Button
            variant="ghost"
            size="sm"
            className="w-8 h-8 sm:w-7 sm:h-7 p-0 hover:bg-muted/50 touch-manipulation"
            onClick={(e) => {
              e.stopPropagation();
              handlePin();
            }}
            title={note.isPinned ? "Unpin note" : "Pin note"}
          >
            <FontAwesomeIcon
              icon={faThumbtack}
              className={`w-3.5 h-3.5 sm:w-3 sm:h-3 ${
                note.isPinned ? "text-primary" : "text-muted-foreground"
              }`}
            />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-8 h-8 sm:w-7 sm:h-7 p-0 hover:bg-destructive/10 hover:text-destructive touch-manipulation"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
            title="Delete note"
          >
            <FontAwesomeIcon
              icon={faTrash}
              className="w-3.5 h-3.5 sm:w-3 sm:h-3"
            />
          </Button>
        </div>
      </div>

      {/* Content preview */}
      <div className="mb-3 sm:mb-4 max-h-32 overflow-hidden">
        <MarkdownRenderer
          content={note.content}
          variant="card"
          maxLength={150}
          className="prose prose-sm max-w-none text-foreground/80 leading-relaxed line-clamp-6"
        />
      </div>

      {/* Tags */}
      {note.tags && note.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2 sm:mb-3">
          {note.tags.slice(0, 4).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium"
            >
              #{tag}
            </span>
          ))}
          {note.tags.length > 4 && (
            <span className="px-2 py-1 bg-muted/30 text-muted-foreground text-xs rounded-full">
              +{note.tags.length - 4} more
            </span>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-border/30">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
            <span className="text-xs font-medium text-primary">
              {note.title.charAt(0).toUpperCase()}
            </span>
          </div>
          <span className="text-xs text-muted-foreground">
            {note.content.length} chars
          </span>
        </div>

        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          {hasMarkdownIndicators && (
            <>
              <FontAwesomeIcon icon={faCode} className="w-3 h-3" />
              <span className="hidden sm:inline">Markdown</span>
              <span className="sm:hidden">MD</span>
            </>
          )}
        </div>
      </div>

      {/* Google Docs-style bottom shadow accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </Paper>
  );
}
