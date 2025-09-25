"use client";
import Link from "next/link";
import { Paper } from "@/components/Paper";

interface MediaFolder {
  id: string;
  name: string;
  icon: string;
  path: string;
  count: number;
  size: string;
  description: string;
}

const mediaFolders: MediaFolder[] = [
  {
    id: "search",
    name: "Search",
    icon: "🔍",
    path: "/media/search",
    count: 336,
    size: "4.8 GB",
    description: "Search across all media types",
  },
  {
    id: "videos",
    name: "Videos",
    icon: "🎬",
    path: "/media/videos",
    count: 24,
    size: "2.4 GB",
    description: "Movie clips, tutorials, and recordings",
  },
  {
    id: "images",
    name: "Images",
    icon: "🖼️",
    path: "/media/images",
    count: 156,
    size: "845 MB",
    description: "Photos, screenshots, and graphics",
  },
  {
    id: "audio",
    name: "Audio",
    icon: "🎵",
    path: "/media/audio",
    count: 89,
    size: "1.2 GB",
    description: "Music, podcasts, and sound effects",
  },
  {
    id: "files",
    name: "Files",
    icon: "📁",
    path: "/media/files",
    count: 67,
    size: "324 MB",
    description: "Documents, archives, and other files",
  },
];

export function MediaFolders() {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Media Library
        </h1>
        <p className="text-muted-foreground">
          Organize and access your media files across different categories
        </p>
      </div>

      {/* Folder grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {mediaFolders.map((folder) => (
          <Link key={folder.id} href={folder.path}>
            <Paper className="group cursor-pointer hover:shadow-glow transition-all duration-300 h-full">
              <div className="text-center space-y-4">
                {/* Icon */}
                <div className="text-6xl group-hover:scale-110 transition-transform duration-300">
                  {folder.icon}
                </div>

                {/* Folder info */}
                <div>
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {folder.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    {folder.description}
                  </p>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between pt-4 border-t border-border/30">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-foreground">
                      {folder.count}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {folder.count === 1 ? "item" : "items"}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-foreground">
                      {folder.size}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      total size
                    </div>
                  </div>
                </div>
              </div>
            </Paper>
          </Link>
        ))}
      </div>

      {/* Quick stats */}
      <Paper>
        <div className="flex items-center justify-between">
          <div className="text-muted-foreground">
            Total media files:{" "}
            <span className="font-semibold text-foreground">
              {mediaFolders.reduce((total, folder) => total + folder.count, 0)}
            </span>
          </div>
          <div className="text-muted-foreground">
            Total storage used:{" "}
            <span className="font-semibold text-foreground">4.8 GB</span>
          </div>
        </div>
      </Paper>
    </div>
  );
}
