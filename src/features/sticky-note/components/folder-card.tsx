"use client";
import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolder,
  faEdit,
  faTrash,
  faStickyNote,
} from "@fortawesome/free-solid-svg-icons";
import { StickyNoteFolderProps } from "../types";
import { Paper } from "@/components/Paper";
import { Button } from "@/components/Button";

interface Props {
  folder: StickyNoteFolderProps;
  noteCount: number;
  onEdit?: (folder: StickyNoteFolderProps) => void;
  onDelete?: (id: string) => void;
}

export function FolderCard({ folder, noteCount, onEdit, onDelete }: Props) {
  const [showActions, setShowActions] = useState(false);

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

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onEdit?.(folder);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete?.(folder.id);
  };

  return (
    <Link href={`/sticky-note/${folder.id}`}>
      <Paper
        className="group cursor-pointer hover:shadow-lg transition-all duration-300 relative h-full"
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
        onTouchStart={() => setShowActions(true)}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faFolder}
                  className="w-6 h-6 text-primary"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-foreground truncate">
                  {folder.name}
                </h3>
                <div className="text-xs text-muted-foreground">
                  Updated {formatDate(folder.updatedAt)}
                </div>
              </div>
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
              onClick={handleEdit}
              title="Edit folder"
            >
              <FontAwesomeIcon
                icon={faEdit}
                className="w-3.5 h-3.5 sm:w-3 sm:h-3"
              />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-8 h-8 sm:w-7 sm:h-7 p-0 hover:bg-destructive/10 hover:text-destructive touch-manipulation"
              onClick={handleDelete}
              title="Delete folder"
            >
              <FontAwesomeIcon
                icon={faTrash}
                className="w-3.5 h-3.5 sm:w-3 sm:h-3"
              />
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between pt-3 border-t border-border/30">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <FontAwesomeIcon icon={faStickyNote} className="w-4 h-4" />
            <span>
              {noteCount} note{noteCount !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="text-xs text-muted-foreground">
            Created {formatDate(folder.createdAt)}
          </div>
        </div>

        {/* Hover effect accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </Paper>
    </Link>
  );
}
