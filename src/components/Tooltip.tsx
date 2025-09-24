import * as React from "react";

export interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  delayDuration?: number;
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  side = "top",
  align = "center",
  delayDuration = 700,
  className = "",
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [timeoutId, setTimeoutId] = React.useState<NodeJS.Timeout | null>(null);
  const triggerRef = React.useRef<HTMLDivElement>(null);
  const tooltipRef = React.useRef<HTMLDivElement>(null);

  const showTooltip = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const id = setTimeout(() => {
      setIsVisible(true);
    }, delayDuration);
    setTimeoutId(id);
  };

  const hideTooltip = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setIsVisible(false);
  };

  React.useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  const sideClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  const alignClasses = {
    start:
      side === "top" || side === "bottom"
        ? "left-0 translate-x-0"
        : "top-0 translate-y-0",
    center: "",
    end:
      side === "top" || side === "bottom"
        ? "right-0 translate-x-0"
        : "bottom-0 translate-y-0",
  };

  const arrowClasses = {
    top: "top-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-popover",
    bottom:
      "bottom-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-popover",
    left: "left-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-popover",
    right:
      "right-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-popover",
  };

  return (
    <div
      ref={triggerRef}
      className="relative inline-block"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}
      {isVisible && (
        <div
          ref={tooltipRef}
          className={`
            absolute z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm 
            text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95
            ${sideClasses[side]}
            ${align !== "center" ? alignClasses[align] : ""}
            ${className}
          `.trim()}
          role="tooltip"
        >
          {content}
          <div
            className={`
              absolute border-4
              ${arrowClasses[side]}
            `}
          />
        </div>
      )}
    </div>
  );
};

export { Tooltip };

/*
Usage Examples:

// Basic tooltip
<Tooltip content="This is a tooltip">
  <Button>Hover me</Button>
</Tooltip>

// Different positions
<Tooltip content="Top tooltip" side="top">
  <Button>Top</Button>
</Tooltip>

<Tooltip content="Right tooltip" side="right">
  <Button>Right</Button>
</Tooltip>

<Tooltip content="Bottom tooltip" side="bottom">
  <Button>Bottom</Button>
</Tooltip>

<Tooltip content="Left tooltip" side="left">
  <Button>Left</Button>
</Tooltip>

// Different alignments
<Tooltip content="Start aligned" side="bottom" align="start">
  <Button>Start</Button>
</Tooltip>

<Tooltip content="End aligned" side="bottom" align="end">
  <Button>End</Button>
</Tooltip>

// Custom delay
<Tooltip content="Quick tooltip" delayDuration={200}>
  <Button>Quick</Button>
</Tooltip>

// Rich content tooltip
<Tooltip 
  content={
    <div>
      <div className="font-semibold">Rich Tooltip</div>
      <div className="text-xs">With multiple lines</div>
    </div>
  }
>
  <Button>Rich content</Button>
</Tooltip>

// With icon
<Tooltip content="Help information">
  <Button variant="ghost" size="icon">?</Button>
</Tooltip>
*/
