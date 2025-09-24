import * as React from "react";

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  variant?: "default" | "destructive" | "success" | "warning";
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  indeterminate?: boolean;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      className,
      value = 0,
      max = 100,
      variant = "default",
      size = "md",
      showValue = false,
      indeterminate = false,
      ...props
    },
    ref
  ) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    const variantClasses = {
      default: "bg-primary",
      destructive: "bg-destructive",
      success: "bg-success",
      warning: "bg-warning",
    };

    const sizeClasses = {
      sm: "h-1",
      md: "h-2",
      lg: "h-3",
    };

    return (
      <div className="w-full space-y-2">
        {showValue && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="text-foreground font-medium">
              {indeterminate ? "Loading..." : `${Math.round(percentage)}%`}
            </span>
          </div>
        )}
        <div
          ref={ref}
          className={`
            relative overflow-hidden rounded-full bg-secondary
            ${sizeClasses[size]}
            ${className || ""}
          `.trim()}
          {...props}
        >
          <div
            className={`
              h-full transition-all duration-500 ease-out
              ${variantClasses[variant]}
              ${
                indeterminate
                  ? "animate-pulse w-full"
                  : "transition-transform duration-500"
              }
            `.trim()}
            style={{
              width: indeterminate ? "100%" : `${percentage}%`,
              transform: indeterminate ? "translateX(-100%)" : "translateX(0)",
              animation: indeterminate
                ? "progress-slide 2s infinite"
                : undefined,
            }}
          />
        </div>
      </div>
    );
  }
);
Progress.displayName = "Progress";

// Add keyframes for indeterminate animation
const style = document.createElement("style");
style.textContent = `
  @keyframes progress-slide {
    0% { transform: translateX(-100%); }
    50% { transform: translateX(0%); }
    100% { transform: translateX(100%); }
  }
`;
document.head.appendChild(style);

export { Progress };

/*
Usage Examples:

// Basic progress bar
<Progress value={60} />

// With percentage display
<Progress value={75} showValue />

// Different variants
<Progress value={30} variant="destructive" />
<Progress value={80} variant="success" />
<Progress value={50} variant="warning" />

// Different sizes
<Progress value={40} size="sm" />
<Progress value={60} size="lg" />

// Indeterminate loading
<Progress indeterminate />
<Progress indeterminate showValue />

// Custom max value
<Progress value={150} max={200} showValue />

// File upload progress example
const [uploadProgress, setUploadProgress] = useState(0)

<div className="space-y-2">
  <div className="flex justify-between text-sm">
    <span>Uploading file.pdf</span>
    <span>{uploadProgress}%</span>
  </div>
  <Progress value={uploadProgress} variant="success" />
</div>

// Loading states
<Progress indeterminate size="sm" className="w-48" />

// Form validation progress
<Progress 
  value={completedFields} 
  max={totalFields} 
  showValue 
  variant="success"
/>
*/
