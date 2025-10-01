"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { MediaStoryProps, MediaType } from "../types";
import { Button, Dialog, DialogContent, Paper } from "@/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";

export function MediaStory({
  isOpen,
  onClose,
  mediaItems,
  currentIndex,
  onIndexChange,
}: MediaStoryProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentMedia = mediaItems[currentIndex];

  const handleNext = useCallback(() => {
    if (currentIndex < mediaItems.length - 1) {
      onIndexChange(currentIndex + 1);
      setProgress(0);
      setCurrentTime(0);
    }
  }, [currentIndex, mediaItems.length, onIndexChange]);

  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      onIndexChange(currentIndex - 1);
      setProgress(0);
      setCurrentTime(0);
    }
  }, [currentIndex, onIndexChange]);

  const togglePlayPause = useCallback(() => {
    const media =
      currentMedia.type === MediaType.VIDEO
        ? videoRef.current
        : audioRef.current;
    if (!media) return;

    if (isPlaying) {
      media.pause();
    } else {
      media.play();
    }
    setIsPlaying(!isPlaying);
  }, [currentMedia.type, isPlaying]);

  useEffect(() => {
    if (!isOpen) {
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowUp":
          e.preventDefault();
          handlePrevious();
          break;
        case "ArrowDown":
          e.preventDefault();
          handleNext();
          break;
        case " ":
          e.preventDefault();
          togglePlayPause();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [
    isOpen,
    currentIndex,
    onClose,
    handlePrevious,
    handleNext,
    togglePlayPause,
  ]);

  const handleTimeUpdate = () => {
    const media =
      currentMedia.type === MediaType.VIDEO
        ? videoRef.current
        : audioRef.current;
    if (!media) return;

    const current = media.currentTime;
    const total = media.duration;
    setCurrentTime(current);
    setDuration(total);
    setProgress((current / total) * 100);
  };

  const handleSeek = (percentage: number) => {
    const media =
      currentMedia.type === MediaType.VIDEO
        ? videoRef.current
        : audioRef.current;
    if (!media || !duration) return;

    const newTime = (percentage / 100) * duration;
    media.currentTime = newTime;
    setCurrentTime(newTime);
    setProgress(percentage);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleWheelScroll = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY > 0) {
      handleNext();
    } else {
      handlePrevious();
    }
  };

  if (!isOpen) return null;

  return (
    // <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
    //   {/* Close button */}
    //   <Button
    //     variant="ghost"
    //     size="icon"
    //     className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
    //     onClick={onClose}
    //   >
    //     <FontAwesomeIcon icon={faTimes} className="h-5 w-5" />
    //   </Button>

    //   {/* Navigation buttons */}
    //   {currentIndex > 0 && (
    //     <Button
    //       variant="ghost"
    //       size="icon"
    //       className="absolute top-6 left-1/2 -translate-x-1/2 z-10 text-white hover:bg-white/20 h-12 w-12 rounded-full bg-black/30 border border-white/20"
    //       onClick={handlePrevious}
    //     >
    //       <FontAwesomeIcon icon={faChevronUp} className="h-6 w-6" />
    //     </Button>
    //   )}

    //   {currentIndex < mediaItems.length - 1 && (
    //     <Button
    //       variant="ghost"
    //       size="icon"
    //       className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-white hover:bg-white/20 h-12 w-12 rounded-full bg-black/30 border border-white/20"
    //       onClick={handleNext}
    //     >
    //       <FontAwesomeIcon icon={faChevronDown} className="h-6 w-6" />
    //     </Button>
    //   )}

    //   {/* Media content */}
    //   <div
    //     className="w-full h-full flex flex-col items-center justify-center relative"
    //     onWheel={handleWheelScroll}
    //   >
    //     {currentMedia.type === MediaType.VIDEO ? (
    //       <video
    //         ref={videoRef}
    //         src={currentMedia.url}
    //         className="max-w-full max-h-[80vh] object-contain"
    //         onTimeUpdate={handleTimeUpdate}
    //         onLoadedMetadata={handleTimeUpdate}
    //         onPlay={() => setIsPlaying(true)}
    //         onPause={() => setIsPlaying(false)}
    //         onEnded={handleNext}
    //         poster={currentMedia.thumbnailUrl}
    //       />
    //     ) : (
    //       <div className="flex flex-col items-center justify-center space-y-8">
    //         <audio
    //           ref={audioRef}
    //           src={currentMedia.url}
    //           onTimeUpdate={handleTimeUpdate}
    //           onLoadedMetadata={handleTimeUpdate}
    //           onPlay={() => setIsPlaying(true)}
    //           onPause={() => setIsPlaying(false)}
    //           onEnded={handleNext}
    //         />
    //         {/* Audio visualization */}
    //         <div className="w-80 h-80 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
    //           <div
    //             className={`w-32 h-32 rounded-full bg-primary/40 flex items-center justify-center transition-transform duration-300 ${
    //               isPlaying ? "scale-110" : ""
    //             }`}
    //           >
    //             <span className="text-4xl">🎵</span>
    //           </div>
    //         </div>
    //       </div>
    //     )}

    //     {/* Media info overlay */}
    //     <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
    //       {/* Title and description */}
    //       <div className="mb-4">
    //         <h3 className="text-xl font-semibold mb-1">{currentMedia.title}</h3>
    //         {currentMedia.description && (
    //           <p className="text-white/80 text-sm">
    //             {currentMedia.description}
    //           </p>
    //         )}
    //       </div>

    //       {/* Progress bar */}
    //       <div className="mb-4">
    //         <div
    //           className="w-full h-1 bg-white/30 rounded-full cursor-pointer"
    //           onClick={(e) => {
    //             const rect = e.currentTarget.getBoundingClientRect();
    //             const percentage = ((e.clientX - rect.left) / rect.width) * 100;
    //             handleSeek(percentage);
    //           }}
    //         >
    //           <div
    //             className="h-full bg-white rounded-full transition-all duration-100"
    //             style={{ width: `${progress}%` }}
    //           />
    //         </div>
    //         <div className="flex justify-between text-xs text-white/80 mt-1">
    //           <span>{formatTime(currentTime)}</span>
    //           <span>{formatTime(duration)}</span>
    //         </div>
    //       </div>

    //       {/* Controls */}
    //       <div className="flex items-center justify-between">
    //         <div className="flex items-center space-x-4">
    //           <Button
    //             variant="ghost"
    //             size="sm"
    //             className="text-white hover:bg-white/20"
    //             onClick={togglePlayPause}
    //           >
    //             <FontAwesomeIcon
    //               icon={isPlaying ? faPause : faPlay}
    //               className="h-4 w-4"
    //             />
    //           </Button>
    //           <span className="text-sm text-white/80">
    //             {currentIndex + 1} / {mediaItems.length}
    //           </span>
    //         </div>

    //         {/* Tags */}
    //         {currentMedia.tags && currentMedia.tags.length > 0 && (
    //           <div className="flex gap-2">
    //             {currentMedia.tags.slice(0, 3).map((tag, index) => (
    //               <span
    //                 key={index}
    //                 className="px-2 py-1 bg-white/20 text-white text-xs rounded-md"
    //               >
    //                 #{tag}
    //               </span>
    //             ))}
    //           </div>
    //         )}
    //       </div>
    //     </div>
    //   </div>

    //   {/* Scroll hint */}
    //   <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-xs">
    //     Scroll or use ↑↓ arrows to navigate • Space to play/pause • ESC to close
    //   </div>
    // </div>

    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className=" m-0 p-0 sm:p-0 max-h-full border-0 w-full flex flex-col  overflow-y-scroll snap-y snap-mandatory">
        {mediaItems.map((item) => (
          <Paper
            key={item.id}
            className="h-screen border-0 snap-start bg-transparent flex items-center justify-center "
          >
            {/* Media content */}
            <div
              className="w-full h-full flex flex-col"
              onWheel={handleWheelScroll}
            >
              {currentMedia.type === MediaType.VIDEO ? (
                <video
                  ref={videoRef}
                  src={currentMedia.url}
                  className="max-w-full max-h-[80vh] object-contain"
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleTimeUpdate}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onEnded={handleNext}
                  poster={currentMedia.thumbnailUrl}
                />
              ) : (
                <div className="flex flex-col items-center justify-center space-y-8">
                  <audio
                    ref={audioRef}
                    src={currentMedia.url}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleTimeUpdate}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onEnded={handleNext}
                  />
                  {/* Audio visualization */}
                  <div className="w-80 h-80 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <div
                      className={`w-32 h-32 rounded-full bg-primary/40 flex items-center justify-center transition-transform duration-300 ${
                        isPlaying ? "scale-110" : ""
                      }`}
                    >
                      <span className="text-4xl">🎵</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Media info overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                {/* Title and description */}
                <div className="mb-4">
                  <h3 className="text-xl font-semibold mb-1">
                    {currentMedia.title}
                  </h3>
                  {currentMedia.description && (
                    <p className="text-white/80 text-sm">
                      {currentMedia.description}
                    </p>
                  )}
                </div>

                {/* Progress bar */}
                <div className="mb-4">
                  <div
                    className="w-full h-1 bg-white/30 rounded-full cursor-pointer"
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const percentage =
                        ((e.clientX - rect.left) / rect.width) * 100;
                      handleSeek(percentage);
                    }}
                  >
                    <div
                      className="h-full bg-white rounded-full transition-all duration-100"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-white/80 mt-1">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/20"
                      onClick={togglePlayPause}
                    >
                      <FontAwesomeIcon
                        icon={isPlaying ? faPause : faPlay}
                        className="h-4 w-4"
                      />
                    </Button>
                    <span className="text-sm text-white/80">
                      {currentIndex + 1} / {mediaItems.length}
                    </span>
                  </div>

                  {/* Tags */}
                  {currentMedia.tags && currentMedia.tags.length > 0 && (
                    <div className="flex gap-2">
                      {currentMedia.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-white/20 text-white text-xs rounded-md"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Paper>
        ))}
      </DialogContent>
    </Dialog>
  );
}
