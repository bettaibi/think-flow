"use client";
import { useState, useMemo } from "react";
import { MediaProps, MediaType } from "../types";
import { Paper } from "@/components/Paper";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { MediaStory } from "./media-story";
import { ImageViewer } from "./image-viewer";

interface Props {
  allMedia: MediaProps[];
}

export function MediaSearch({ allMedia }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<MediaType | "all">("all");
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter and search media
  const filteredMedia = useMemo(() => {
    let filtered = allMedia;

    // Filter by type
    if (selectedType !== "all") {
      filtered = filtered.filter((media) => media.type === selectedType);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (media) =>
          media.title.toLowerCase().includes(query) ||
          media.description?.toLowerCase().includes(query) ||
          media.tags?.some((tag) => tag.toLowerCase().includes(query)) ||
          media.fileName?.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [allMedia, searchQuery, selectedType]);

  // Group results by type for display
  const groupedResults = useMemo(() => {
    const groups: Record<MediaType, MediaProps[]> = {
      [MediaType.VIDEO]: [],
      [MediaType.AUDIO]: [],
      [MediaType.IMAGE]: [],
      [MediaType.FILE]: [],
    };

    filteredMedia.forEach((media) => {
      groups[media.type].push(media);
    });

    return groups;
  }, [filteredMedia]);

  const handleMediaClick = (media: MediaProps, index: number) => {
    const mediaList = filteredMedia.filter((m) => m.type === media.type);
    const mediaIndex = mediaList.findIndex((m) => m.id === media.id);

    if (media.type === MediaType.IMAGE) {
      setCurrentIndex(mediaIndex);
      setIsImageViewerOpen(true);
    } else if (
      media.type === MediaType.VIDEO ||
      media.type === MediaType.AUDIO
    ) {
      setCurrentIndex(mediaIndex);
      setIsStoryOpen(true);
    } else {
      // Handle file download
      console.log("Download file:", media.fileName || media.title);
    }
  };

  const getTypeIcon = (type: MediaType) => {
    switch (type) {
      case MediaType.VIDEO:
        return "🎬";
      case MediaType.AUDIO:
        return "🎵";
      case MediaType.IMAGE:
        return "🖼️";
      case MediaType.FILE:
        return "📁";
      default:
        return "📄";
    }
  };

  const getTypeName = (type: MediaType) => {
    switch (type) {
      case MediaType.VIDEO:
        return "Videos";
      case MediaType.AUDIO:
        return "Audio";
      case MediaType.IMAGE:
        return "Images";
      case MediaType.FILE:
        return "Files";
      default:
        return "Unknown";
    }
  };

  const formatFileSize = (size?: number) => {
    if (!size) return "";
    const mb = size / (1024 * 1024);
    if (mb < 1024) return `${mb.toFixed(1)} MB`;
    return `${(mb / 1024).toFixed(1)} GB`;
  };

  const formatDuration = (duration?: number) => {
    if (!duration) return "";
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
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

  const currentStoryMedia = useMemo(() => {
    return filteredMedia.filter(
      (m) => m.type === MediaType.VIDEO || m.type === MediaType.AUDIO
    );
  }, [filteredMedia]);

  const currentImageMedia = useMemo(() => {
    return filteredMedia.filter((m) => m.type === MediaType.IMAGE);
  }, [filteredMedia]);

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <div className="space-y-4">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            Search Media
          </h2>
          <p className="text-muted-foreground">
            Find videos, audio, images, and files across your library
          </p>
        </div>

        {/* Search Controls */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1">
            <Input
              placeholder="Search by title, description, tags, or filename..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Type Filter */}
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={selectedType === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedType("all")}
            >
              All ({allMedia.length})
            </Button>
            {Object.values(MediaType).map((type) => (
              <Button
                key={type}
                variant={selectedType === type ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType(type)}
              >
                {getTypeIcon(type)} {getTypeName(type)} (
                {allMedia.filter((m) => m.type === type).length})
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Search Results */}
      {searchQuery.trim() || selectedType !== "all" ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">
              Search Results
            </h3>
            <div className="text-sm text-muted-foreground">
              {filteredMedia.length} result
              {filteredMedia.length !== 1 ? "s" : ""}
            </div>
          </div>

          {filteredMedia.length === 0 ? (
            <Paper className="text-center py-12">
              <div className="text-muted-foreground">
                <div className="text-4xl mb-4">🔍</div>
                <p className="text-lg">No results found</p>
                <p className="text-sm mt-2">
                  Try adjusting your search terms or filters
                </p>
              </div>
            </Paper>
          ) : (
            <div className="space-y-8">
              {Object.entries(groupedResults).map(([type, items]) => {
                if (items.length === 0) return null;

                return (
                  <div key={type} className="space-y-4">
                    <h4 className="text-md font-medium text-foreground flex items-center gap-2">
                      <span>{getTypeIcon(type as MediaType)}</span>
                      {getTypeName(type as MediaType)} ({items.length})
                    </h4>

                    {/* Results Grid/List */}
                    {type === MediaType.IMAGE ? (
                      // Images: Masonry grid
                      <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4">
                        {items.map((media, index) => (
                          <Paper
                            key={media.id}
                            padding="none"
                            className="group cursor-pointer hover:shadow-glow transition-all duration-300 overflow-hidden break-inside-avoid mb-4"
                            onClick={() => handleMediaClick(media, index)}
                          >
                            <div className="relative">
                              <img
                                src={media.url}
                                alt={media.title}
                                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                                loading="lazy"
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                <div className="w-8 h-8 rounded-full bg-white/80 group-hover:bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                                  <span className="text-black text-sm">🔍</span>
                                </div>
                              </div>
                            </div>
                            <div className="p-3">
                              <h5 className="font-medium text-foreground text-sm truncate">
                                {media.title}
                              </h5>
                              <div className="flex items-center justify-between mt-1">
                                <span className="text-xs text-muted-foreground">
                                  {formatFileSize(media.fileSize)}
                                </span>
                                {media.tags && media.tags.length > 0 && (
                                  <span className="text-xs text-muted-foreground">
                                    #{media.tags[0]}
                                  </span>
                                )}
                              </div>
                            </div>
                          </Paper>
                        ))}
                      </div>
                    ) : type === MediaType.VIDEO || type === MediaType.AUDIO ? (
                      // Videos/Audio: Album grid
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {items.map((media, index) => (
                          <Paper
                            key={media.id}
                            padding="none"
                            className="group cursor-pointer hover:shadow-glow transition-all duration-300 overflow-hidden"
                            onClick={() => handleMediaClick(media, index)}
                          >
                            <div
                              className={`relative bg-muted/20 ${
                                type === MediaType.VIDEO
                                  ? "aspect-video"
                                  : "aspect-square bg-gradient-to-br from-primary/10 to-accent/10"
                              }`}
                            >
                              {media.thumbnailUrl ? (
                                <img
                                  src={media.thumbnailUrl}
                                  alt={media.title}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <span className="text-2xl text-muted-foreground">
                                    {getTypeIcon(type as MediaType)}
                                  </span>
                                </div>
                              )}
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                <div className="w-8 h-8 rounded-full bg-white/80 group-hover:bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                                  <span className="text-black text-sm ml-0.5">
                                    ▶
                                  </span>
                                </div>
                              </div>
                              {media.duration && (
                                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                                  {formatDuration(media.duration)}
                                </div>
                              )}
                            </div>
                            <div className="p-3">
                              <h5 className="font-medium text-foreground text-sm truncate">
                                {media.title}
                              </h5>
                              <div className="flex items-center justify-between mt-1">
                                <span className="text-xs text-muted-foreground">
                                  {formatFileSize(media.fileSize)}
                                </span>
                                {media.tags && media.tags.length > 0 && (
                                  <span className="text-xs text-muted-foreground">
                                    #{media.tags[0]}
                                  </span>
                                )}
                              </div>
                            </div>
                          </Paper>
                        ))}
                      </div>
                    ) : (
                      // Files: List view
                      <Paper padding="none" className="overflow-hidden">
                        <div className="divide-y divide-border/30">
                          {items.map((media, index) => (
                            <div
                              key={media.id}
                              className="group hover:bg-muted/10 transition-colors p-4 cursor-pointer"
                              onClick={() => handleMediaClick(media, index)}
                            >
                              <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-muted/30 flex items-center justify-center text-lg">
                                  {getFileIcon(media.mimeType, media.fileName)}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h5 className="font-medium text-foreground truncate">
                                    {media.fileName || media.title}
                                  </h5>
                                  {media.description && (
                                    <p className="text-sm text-muted-foreground truncate mt-0.5">
                                      {media.description}
                                    </p>
                                  )}
                                  <div className="flex items-center space-x-4 mt-1 text-xs text-muted-foreground">
                                    <span>
                                      {formatFileSize(media.fileSize)}
                                    </span>
                                    {media.tags && media.tags.length > 0 && (
                                      <>
                                        <span>•</span>
                                        <span>#{media.tags[0]}</span>
                                      </>
                                    )}
                                  </div>
                                </div>
                                <div className="flex-shrink-0">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                    ⬇
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </Paper>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        // No search active - show getting started
        <Paper className="text-center py-16">
          <div className="text-muted-foreground">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Search Your Media
            </h3>
            <p className="text-lg mb-4">
              Find any video, audio, image, or file in your library
            </p>
            <div className="text-sm space-y-2 max-w-md mx-auto">
              <p>• Search by title, description, or tags</p>
              <p>• Filter by media type</p>
              <p>• Find files by filename</p>
            </div>
          </div>
        </Paper>
      )}

      {/* Media Story Modal */}
      <MediaStory
        isOpen={isStoryOpen}
        onClose={() => setIsStoryOpen(false)}
        mediaItems={currentStoryMedia}
        currentIndex={currentIndex}
        onIndexChange={setCurrentIndex}
      />

      {/* Image Viewer Modal */}
      <ImageViewer
        isOpen={isImageViewerOpen}
        onClose={() => setIsImageViewerOpen(false)}
        images={currentImageMedia}
        currentIndex={currentIndex}
        onIndexChange={setCurrentIndex}
      />
    </div>
  );
}
