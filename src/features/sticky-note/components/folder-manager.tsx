"use client";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faPlus } from "@fortawesome/free-solid-svg-icons";
import { StickyNoteFolderProps } from "../types";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/Dialog";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCreateFolder: (name: string) => void;
  onEditFolder?: (folder: StickyNoteFolderProps) => void;
  editingFolder?: StickyNoteFolderProps | null;
}

export function FolderManager({
  isOpen,
  onClose,
  onCreateFolder,
  onEditFolder,
  editingFolder,
}: Props) {
  const [folderName, setFolderName] = useState(editingFolder?.name || "");
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingFolder) {
      setFolderName(editingFolder.name);
    } else {
      setFolderName("");
    }
    setError("");
  }, [editingFolder]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!folderName.trim()) {
      setError("Folder name is required");
      return;
    }

    if (folderName.trim().length < 2) {
      setError("Folder name must be at least 2 characters");
      return;
    }

    if (editingFolder && onEditFolder) {
      onEditFolder({
        ...editingFolder,
        name: folderName.trim(),
        updatedAt: new Date().toISOString(),
      });
    } else {
      onCreateFolder(folderName.trim());
    }

    setFolderName("");
    setError("");
    onClose();
  };

  const handleClose = () => {
    setFolderName("");
    setError("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <FontAwesomeIcon
                icon={faFolder}
                className="w-5 h-5 text-primary"
              />
            </div>
            {editingFolder ? "Edit Folder" : "Create New Folder"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="folderName"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Folder Name
            </label>
            <Input
              id="folderName"
              type="text"
              value={folderName}
              onChange={(e) => {
                setFolderName(e.target.value);
                setError("");
              }}
              placeholder="Enter folder name..."
              className="w-full"
              autoFocus
            />
            {error && <p className="text-destructive text-sm mt-1">{error}</p>}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" className="flex items-center gap-2">
              <FontAwesomeIcon
                icon={editingFolder ? faFolder : faPlus}
                className="w-4 h-4"
              />
              {editingFolder ? "Update Folder" : "Create Folder"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
