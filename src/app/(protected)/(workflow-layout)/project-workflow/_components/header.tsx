"use client";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  title: string;
  step: 1 | 2 | 3;
}

function Stepper({ step }: { step: 1 | 2 | 3 }) {
  return (
    <div className="flex flex-row items-center justify-start">
      {/* Step 1 - Brainstorming */}
      <div
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-medium transition-colors ${
          step >= 1
            ? "bg-primary text-primary-foreground border-primary"
            : "bg-background text-muted-foreground border-border"
        }`}
      >
        1
      </div>

      {/* Connector 1-2 */}
      <div
        className={`w-12 h-0.5 transition-colors ${
          step >= 2 ? "bg-primary" : "bg-border"
        }`}
      ></div>

      {/* Step 2 - Schedule */}
      <div
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-medium transition-colors ${
          step >= 2
            ? "bg-primary text-primary-foreground border-primary"
            : "bg-background text-muted-foreground border-border"
        }`}
      >
        2
      </div>

      {/* Connector 2-3 */}
      <div
        className={`w-12 h-0.5 transition-colors ${
          step >= 3 ? "bg-primary" : "bg-border"
        }`}
      ></div>

      {/* Step 3 - Board */}
      <div
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-medium transition-colors ${
          step >= 3
            ? "bg-primary text-primary-foreground border-primary"
            : "bg-background text-muted-foreground border-border"
        }`}
      >
        3
      </div>
    </div>
  );
}

export default function Header({ title, step }: Props) {
  const handlePrevious = () => {
    if (step > 1) {
      // Find the scrollable container and scroll left by 100vw
      const scrollContainer = document.querySelector(".layout-scroll-snap");
      if (scrollContainer) {
        scrollContainer.scrollBy({
          left: -window.innerWidth,
          behavior: "smooth",
        });
      } else {
        window.scrollBy({ left: -window.innerWidth, behavior: "smooth" });
      }
    }
  };

  const handleNext = () => {
    if (step < 3) {
      // Find the scrollable container and scroll right by 100vw
      const scrollContainer = document.querySelector(".layout-scroll-snap");
      if (scrollContainer) {
        scrollContainer.scrollBy({
          left: window.innerWidth,
          behavior: "smooth",
        });
      } else {
        window.scrollBy({ left: window.innerWidth, behavior: "smooth" });
      }
    }
  };

  return (
    <div className="w-full py-3 px-5 bg-background border-b border-border flex flex-row items-center justify-between">
      <div className="flex flex-col gap-2">
        <h1 className="text-base tracking-tight text-muted-foreground">
          {title}
        </h1>
        <Stepper step={step} />
      </div>

      <div className="flex flex-row items-center gap-3">
        {step > 1 && (
          <button
            onClick={handlePrevious}
            disabled={step === 1}
            className={`w-8 h-8 cursor-pointer hover:bg-muted rounded-full flex items-center justify-center transition-all duration-200 ${
              step === 1
                ? "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
                : "bg-background hover:bg-muted text-foreground border border-border hover:border-border/80 shadow-sm hover:shadow-md"
            }`}
          >
            <FontAwesomeIcon icon={faChevronLeft} className="text-sm" />
          </button>
        )}

        {step < 3 && (
          <button
            onClick={handleNext}
            disabled={step === 3}
            className={`w-8 h-8 cursor-pointer hover:bg-muted rounded-full flex items-center justify-center transition-all duration-200 ${
              step === 3
                ? "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
                : "bg-background hover:bg-muted text-foreground border border-border hover:border-border/80 shadow-sm hover:shadow-md"
            }`}
          >
            <FontAwesomeIcon icon={faChevronRight} className="text-sm" />
          </button>
        )}
      </div>
    </div>
  );
}
