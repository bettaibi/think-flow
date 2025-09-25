"use client";
import { MediaProps } from "../types";
import { Paper } from "@/components/Paper";
import { Button } from "@/components/Button";

interface Props {
  files: MediaProps[];
}

export function FileMedia({ files }: Props) {
  const formatFileSize = (size?: number) => {
    if (!size) return "";
    const kb = size / 1024;
    const mb = kb / 1024;
    const gb = mb / 1024;

    if (gb >= 1) return `${gb.toFixed(1)} GB`;
    if (mb >= 1) return `${mb.toFixed(1)} MB`;
    return `${kb.toFixed(1)} KB`;
  };

  const getFileIcon = (mimeType?: string, fileName?: string) => {
    if (!mimeType && !fileName) return "📄";

    const type = mimeType || "";
    const ext = fileName?.split(".").pop()?.toLowerCase() || "";

    if (type.includes("pdf") || ext === "pdf") return "📕";
    if (type.includes("word") || ["doc", "docx"].includes(ext)) return "📘";
    if (type.includes("sheet") || ["xls", "xlsx", "csv"].includes(ext))
      return "📗";
    if (type.includes("presentation") || ["ppt", "pptx"].includes(ext))
      return "📙";
    if (type.includes("text") || ["txt", "md"].includes(ext)) return "📝";
    if (type.includes("zip") || ["zip", "rar", "7z"].includes(ext)) return "🗜️";
    if (["exe", "dmg", "pkg"].includes(ext)) return "⚙️";

    return "📄";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleDownload = (file: MediaProps) => {
    // In a real implementation, this would trigger a download
    console.log("Download:", file.fileName || file.title);
  };

  if (files.length === 0) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-foreground">Files</h2>
        <Paper className="text-center py-12">
          <div className="text-muted-foreground">
            <div className="text-4xl mb-4">📁</div>
            <p className="text-lg">No files found</p>
            <p className="text-sm mt-2">Upload some files to get started</p>
          </div>
        </Paper>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-foreground">Files</h2>
        <div className="text-sm text-muted-foreground">
          {files.length} file{files.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* File list */}
      <Paper padding="none" className="overflow-hidden">
        <div className="divide-y divide-border/30">
          {files.map((file) => (
            <div
              key={file.id}
              className="group hover:bg-muted/10 transition-colors p-4"
            >
              <div className="flex items-center space-x-4">
                {/* File icon */}
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-muted/30 flex items-center justify-center text-xl">
                  {getFileIcon(file.mimeType, file.fileName)}
                </div>

                {/* File info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground truncate group-hover:text-primary transition-colors">
                    {file.fileName || file.title}
                  </h3>
                  {file.description && (
                    <p className="text-sm text-muted-foreground truncate mt-0.5">
                      {file.description}
                    </p>
                  )}
                  <div className="flex items-center space-x-4 mt-1 text-xs text-muted-foreground">
                    <span>{formatFileSize(file.fileSize)}</span>
                    <span>•</span>
                    <span>Modified {formatDate(file.updatedAt)}</span>
                    {file.tags && file.tags.length > 0 && (
                      <>
                        <span>•</span>
                        <span>#{file.tags[0]}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Action button */}
                <div className="flex-shrink-0">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleDownload(file)}
                  >
                    ⬇
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Paper>

      {/* Files summary */}
      <Paper>
        <div className="flex items-center justify-between text-sm">
          <div className="text-muted-foreground">
            Total size:{" "}
            <span className="font-medium text-foreground">
              {formatFileSize(
                files.reduce((total, file) => total + (file.fileSize || 0), 0)
              )}
            </span>
          </div>
          <div className="text-muted-foreground">
            {files.filter((f) => f.tags && f.tags.length > 0).length} tagged
            files
          </div>
        </div>
      </Paper>
    </div>
  );
}
