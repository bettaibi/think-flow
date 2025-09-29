"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType } from "embla-carousel";
import { cn } from "@/utils/cn";
import { Button } from "./Button";

// Types
export type CarouselApi = ReturnType<typeof useEmblaCarousel>[1];

interface CarouselProps {
  children: React.ReactNode;
  className?: string;
  opts?: EmblaOptionsType;
  orientation?: "horizontal" | "vertical";
  showNavigation?: boolean;
  showDots?: boolean;
}

interface CarouselContextType {
  emblaRef: ReturnType<typeof useEmblaCarousel>[0];
  api: CarouselApi;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  scrollPrev: () => void;
  scrollNext: () => void;
  scrollTo: (index: number) => void;
  selectedIndex: number;
  scrollSnaps: number[];
}

const CarouselContext = React.createContext<CarouselContextType | null>(null);

function useCarouselContext() {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error("Carousel components must be used within a Carousel");
  }
  return context;
}

// Arrow Icons (simple SVG components to avoid external dependencies)
function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

// Main Carousel Component
export function Carousel({
  children,
  className,
  opts,
  orientation = "horizontal",
  showNavigation = true,
  showDots = false,
}: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    axis: orientation === "horizontal" ? "x" : "y",
    align: "start",
    containScroll: "trimSnaps",
    ...opts,
  });

  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = React.useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;

    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;

    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const contextValue: CarouselContextType = {
    emblaRef,
    api: emblaApi,
    canScrollPrev,
    canScrollNext,
    scrollPrev,
    scrollNext,
    scrollTo,
    selectedIndex,
    scrollSnaps,
  };

  return (
    <CarouselContext.Provider value={contextValue}>
      <div className={cn("relative", className)}>
        <div className="overflow-hidden" ref={emblaRef}>
          <div
            className={cn(
              "flex",
              orientation === "horizontal" ? "" : "flex-col"
            )}
          >
            {children}
          </div>
        </div>

        {showNavigation && (
          <>
            <CarouselPrevious />
            <CarouselNext />
          </>
        )}

        {showDots && scrollSnaps.length > 1 && <CarouselDots />}
      </div>
    </CarouselContext.Provider>
  );
}

// Carousel Item Component
interface CarouselItemProps {
  children: React.ReactNode;
  className?: string;
  basis?: string;
}

export function CarouselItem({
  children,
  className,
  basis = "100%",
}: CarouselItemProps) {
  return (
    <div
      className={cn("min-w-0 shrink-0 grow-0", className)}
      style={{ flexBasis: basis }}
    >
      {children}
    </div>
  );
}

// Navigation Components
function CarouselPrevious() {
  const { canScrollPrev, scrollPrev } = useCarouselContext();

  return (
    <Button
      variant="outline"
      size="icon"
      className="absolute left-2 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full border shadow-sm"
      onClick={scrollPrev}
      disabled={!canScrollPrev}
    >
      <ChevronLeftIcon className="h-4 w-4" />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
}

function CarouselNext() {
  const { canScrollNext, scrollNext } = useCarouselContext();

  return (
    <Button
      variant="outline"
      size="icon"
      className="absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full border shadow-sm"
      onClick={scrollNext}
      disabled={!canScrollNext}
    >
      <ChevronRightIcon className="h-4 w-4" />
      <span className="sr-only">Next slide</span>
    </Button>
  );
}

// Dots Component
function CarouselDots() {
  const { scrollSnaps, selectedIndex, scrollTo } = useCarouselContext();

  return (
    <div className="flex justify-center space-x-2 mt-4">
      {scrollSnaps.map((_, index) => (
        <button
          key={index}
          className={cn(
            "h-2 w-2 rounded-full transition-colors",
            index === selectedIndex
              ? "bg-primary"
              : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
          )}
          onClick={() => scrollTo(index)}
        />
      ))}
    </div>
  );
}

// Specialized carousel for items/cards
interface ItemCarouselProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
  itemClassName?: string;
  itemBasis?: string;
  showNavigation?: boolean;
  showDots?: boolean;
  opts?: EmblaOptionsType;
  emptyState?: React.ReactNode;
}

export function ItemCarousel<T>({
  items,
  renderItem,
  className,
  itemClassName,
  itemBasis = "350px",
  showNavigation = true,
  showDots = false,
  opts,
  emptyState,
}: ItemCarouselProps<T>) {
  if (items.length === 0 && emptyState) {
    return <>{emptyState}</>;
  }

  return (
    <Carousel
      className={className}
      opts={opts}
      showNavigation={showNavigation}
      showDots={showDots}
    >
      {items.map((item, index) => (
        <CarouselItem
          key={index}
          className={cn("pl-4", itemClassName)}
          basis={itemBasis}
        >
          {renderItem(item, index)}
        </CarouselItem>
      ))}
    </Carousel>
  );
}
