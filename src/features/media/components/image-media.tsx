"use client";
import { useState } from "react";
import { MediaProps } from "../types";
import { Paper } from "@/components/Paper";
import { ImageViewer } from "./image-viewer";

interface Props {
  images: MediaProps[];
}

export function ImageMedia({ images }: Props) {
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setCurrentIndex(index);
    setIsViewerOpen(true);
  };

  const formatFileSize = (size?: number) => {
    if (!size) return "";
    const mb = size / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  };

  if (images.length === 0) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-foreground">Images</h2>
        <Paper className="text-center py-12">
          <div className="text-muted-foreground">
            <div className="text-4xl mb-4">🖼️</div>
            <p className="text-lg">No images found</p>
            <p className="text-sm mt-2">Upload some images to get started</p>
          </div>
        </Paper>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-foreground">Images</h2>
        <div className="text-sm text-muted-foreground">
          {images.length} image{images.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Masonry-style grid */}
      <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4">
        {images.map((image, index) => (
          <Paper
            key={image.id}
            padding="none"
            className="group cursor-pointer hover:shadow-glow transition-all duration-300 overflow-hidden break-inside-avoid mb-4"
            onClick={() => handleImageClick(index)}
          >
            <div className="relative">
              {/* Image */}
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/80 group-hover:bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                  <span className="text-black text-lg">🔍</span>
                </div>
              </div>

              {/* Resolution badge */}
              {image.width && image.height && (
                <div className="absolute top-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {image.width} × {image.height}
                </div>
              )}
            </div>

            {/* Image info */}
            <div className="p-3">
              <h3 className="font-medium text-foreground text-sm truncate group-hover:text-primary transition-colors">
                {image.title}
              </h3>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-muted-foreground">
                  {formatFileSize(image.fileSize)}
                </span>
                {image.tags && image.tags.length > 0 && (
                  <span className="text-xs text-muted-foreground">
                    #{image.tags[0]}
                  </span>
                )}
              </div>
            </div>
          </Paper>
        ))}
      </div>

      {/* Image Viewer Modal */}
      <ImageViewer
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        images={images}
        currentIndex={currentIndex}
        onIndexChange={setCurrentIndex}
      />
    </div>
  );
}
