import * as React from "react";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "text" | "circular" | "rectangular";
  width?: string | number;
  height?: string | number;
  lines?: number;
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      className,
      variant = "default",
      width,
      height,
      lines = 1,
      style,
      ...props
    },
    ref
  ) => {
    const variantClasses = {
      default: "rounded-md",
      text: "rounded h-4",
      circular: "rounded-full",
      rectangular: "rounded-none",
    };

    if (variant === "text" && lines > 1) {
      return (
        <div className="space-y-2" ref={ref} {...props}>
          {Array.from({ length: lines }).map((_, index) => (
            <div
              key={index}
              className={`
                animate-pulse bg-muted h-4 rounded
                ${index === lines - 1 ? "w-3/4" : "w-full"}
                ${className || ""}
              `.trim()}
              style={{
                width: index === lines - 1 ? "75%" : width,
                ...style,
              }}
            />
          ))}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={`
          animate-pulse bg-muted
          ${variantClasses[variant]}
          ${className || ""}
        `.trim()}
        style={{
          width: width,
          height: height,
          ...style,
        }}
        {...props}
      />
    );
  }
);
Skeleton.displayName = "Skeleton";

export { Skeleton };

/*
Usage Examples:

// Basic skeleton
<Skeleton className="w-full h-4" />

// Text skeleton with multiple lines
<Skeleton variant="text" lines={3} />

// Circular skeleton (for avatars)
<Skeleton variant="circular" width={40} height={40} />

// Rectangular skeleton
<Skeleton variant="rectangular" width="100%" height={200} />

// Card skeleton layout
<div className="space-y-3">
  <Skeleton variant="circular" width={40} height={40} />
  <div className="space-y-2">
    <Skeleton variant="text" />
    <Skeleton variant="text" className="w-4/5" />
  </div>
</div>

// Custom dimensions
<Skeleton width={300} height={20} />

// Loading card example
<div className="border rounded-lg p-4 space-y-3">
  <div className="flex items-center space-x-3">
    <Skeleton variant="circular" width={32} height={32} />
    <div className="space-y-1 flex-1">
      <Skeleton variant="text" />
      <Skeleton variant="text" className="w-3/4" />
    </div>
  </div>
  <Skeleton variant="rectangular" height={120} />
</div>
*/
