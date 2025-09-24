import * as React from "react";

export interface PaperProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline" | "elevated";
  padding?: "none" | "sm" | "md" | "lg";
}

const Paper = React.forwardRef<HTMLDivElement, PaperProps>(
  ({ className, variant = "default", padding = "md", ...props }, ref) => {
    const variantClasses = {
      default: "border bg-card text-card-foreground shadow-sm",
      outline: "border bg-transparent",
      elevated: "bg-card text-card-foreground shadow-lg border-0",
    };

    const paddingClasses = {
      none: "",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    };

    return (
      <div
        ref={ref}
        className={`
          rounded-lg transition-colors
          ${variantClasses[variant]}
          ${paddingClasses[padding]}
          ${className || ""}
        `.trim()}
        {...props}
      />
    );
  }
);
Paper.displayName = "Paper";

export { Paper };

/*
Usage Examples:

// Basic paper/card
<Paper>
  <h3 className="font-semibold">Card Title</h3>
  <p className="text-muted-foreground">Card content goes here</p>
</Paper>

// Elevated card
<Paper variant="elevated" padding="lg">
  <h2>Elevated Card</h2>
  <p>This card has more prominent shadow</p>
</Paper>

// Outline variant
<Paper variant="outline">
  <div>Just an outlined container</div>
</Paper>

// No padding for custom layouts
<Paper padding="none">
  <div className="p-4 border-b">
    <h3>Header</h3>
  </div>
  <div className="p-4">
    <p>Content</p>
  </div>
</Paper>

// Interactive card
<Paper className="hover:shadow-md transition-shadow cursor-pointer">
  <h3>Clickable Card</h3>
  <p>Hover to see the effect</p>
</Paper>
*/
