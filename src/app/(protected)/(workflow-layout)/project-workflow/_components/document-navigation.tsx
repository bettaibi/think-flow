"use client";

import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function DocumentNavigation() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 py-4 border-t border-border">
      {/* Previous Page Button */}
      {true ? (
        <div className="flex-1">
          <button className="group w-full p-4 rounded-lg border border-border bg-background hover:bg-muted/50 hover:border-border/80 transition-all duration-200 text-left">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center group-hover:bg-muted/80 transition-colors">
                <FontAwesomeIcon
                  icon={faChevronLeft}
                  className="text-sm text-muted-foreground group-hover:text-foreground transition-colors"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                  Previous
                </div>
                <div className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                  Previous document title
                </div>
              </div>
            </div>
          </button>
        </div>
      ) : (
        <div className="flex-1" />
      )}

      {/* Next Page Button */}
      {true ? (
        <div className="flex-1">
          <button className="group w-full p-4 rounded-lg border border-border bg-background hover:bg-muted/50 hover:border-border/80 transition-all duration-200 text-right">
            <div className="flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                  Next
                </div>
                <div className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                  Next document title
                </div>
              </div>
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center group-hover:bg-muted/80 transition-colors">
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className="text-sm text-muted-foreground group-hover:text-foreground transition-colors"
                />
              </div>
            </div>
          </button>
        </div>
      ) : (
        <div className="flex-1" />
      )}
    </div>
  );
}
