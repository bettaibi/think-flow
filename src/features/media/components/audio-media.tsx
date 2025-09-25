"use client";
import { useState } from "react";
import { MediaProps } from "../types";
import { Paper } from "@/components/Paper";
import { MediaStory } from "./media-story";

interface Props {
  audios: MediaProps[];
}

export function AudioMedia({ audios }: Props) {
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleAudioClick = (index: number) => {
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
    return `${mb.toFixed(1)} MB`;
  };

  if (audios.length === 0) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-foreground">Audio</h2>
        <Paper className="text-center py-12">
          <div className="text-muted-foreground">
            <div className="text-4xl mb-4">🎵</div>
            <p className="text-lg">No audio files found</p>
            <p className="text-sm mt-2">Upload some audio to get started</p>
          </div>
        </Paper>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-foreground">Audio</h2>
        <div className="text-sm text-muted-foreground">
          {audios.length} track{audios.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Album-style grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {audios.map((audio, index) => (
          <Paper
            key={audio.id}
            padding="none"
            className="group cursor-pointer hover:shadow-glow transition-all duration-300 overflow-hidden"
            onClick={() => handleAudioClick(index)}
          >
            <div className="aspect-square relative bg-gradient-to-br from-primary/10 to-accent/10">
              {/* Album cover or placeholder */}
              {audio.thumbnailUrl ? (
                <img
                  src={audio.thumbnailUrl}
                  alt={audio.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <span className="text-2xl">🎵</span>
                  </div>
                </div>
              )}

              {/* Play overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/80 group-hover:bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                  <span className="text-black text-lg ml-1">▶</span>
                </div>
              </div>

              {/* Duration badge */}
              {audio.duration && (
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                  {formatDuration(audio.duration)}
                </div>
              )}

              {/* Waveform decoration */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-60" />
            </div>

            {/* Audio info */}
            <div className="p-3">
              <h3 className="font-medium text-foreground text-sm truncate group-hover:text-primary transition-colors">
                {audio.title}
              </h3>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-muted-foreground">
                  {formatFileSize(audio.fileSize)}
                </span>
                {audio.tags && audio.tags.length > 0 && (
                  <span className="text-xs text-muted-foreground">
                    #{audio.tags[0]}
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
        mediaItems={audios}
        currentIndex={currentIndex}
        onIndexChange={setCurrentIndex}
      />
    </div>
  );
}
