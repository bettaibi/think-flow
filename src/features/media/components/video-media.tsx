"use client";
import { useState } from "react";
import { MediaProps } from "../types";
import { Paper } from "@/components/Paper";
import { MediaStory } from "./media-story";

interface Props {
  videos: MediaProps[];
}

export function VideoMedia({ videos }: Props) {
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleVideoClick = (index: number) => {
    setCurrentIndex(index);
    setIsStoryOpen(true);
  };

  const formatDuration = (duration?: number) => {
    if (!duration) return "0:00";
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const formatFileSize = (size?: number) => {
    if (!size) return "";
    const mb = size / (1024 * 1024);
    if (mb < 1024) return `${mb.toFixed(1)} MB`;
    return `${(mb / 1024).toFixed(1)} GB`;
  };

  if (videos.length === 0) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-foreground">Videos</h2>
        <Paper className="text-center py-12">
          <div className="text-muted-foreground">
            <div className="text-4xl mb-4">🎬</div>
            <p className="text-lg">No videos found</p>
            <p className="text-sm mt-2">Upload some videos to get started</p>
          </div>
        </Paper>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-foreground">Videos</h2>
        <div className="text-sm text-muted-foreground">
          {videos.length} video{videos.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Album-style grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {videos.map((video, index) => (
          <Paper
            key={video.id}
            padding="none"
            className="group cursor-pointer hover:shadow-glow transition-all duration-300 overflow-hidden"
            onClick={() => handleVideoClick(index)}
          >
            <div className="aspect-video relative bg-muted/20">
              {/* Thumbnail */}
              {video.thumbnailUrl ? (
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted/20 to-muted/40">
                  <span className="text-2xl text-muted-foreground">🎬</span>
                </div>
              )}

              {/* Play overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/80 group-hover:bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                  <span className="text-black text-lg ml-1">▶</span>
                </div>
              </div>

              {/* Duration badge */}
              {video.duration && (
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                  {formatDuration(video.duration)}
                </div>
              )}
            </div>

            {/* Video info */}
            <div className="p-3">
              <h3 className="font-medium text-foreground text-sm truncate group-hover:text-primary transition-colors">
                {video.title}
              </h3>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-muted-foreground">
                  {formatFileSize(video.fileSize)}
                </span>
                {video.tags && video.tags.length > 0 && (
                  <span className="text-xs text-muted-foreground">
                    #{video.tags[0]}
                  </span>
                )}
              </div>
            </div>
          </Paper>
        ))}
      </div>

      {/* Media Story Modal */}
      <MediaStory
        isOpen={isStoryOpen}
        onClose={() => setIsStoryOpen(false)}
        mediaItems={videos}
        currentIndex={currentIndex}
        onIndexChange={setCurrentIndex}
      />
    </div>
  );
}
