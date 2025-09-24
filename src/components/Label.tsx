import * as React from "react";

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  error?: boolean;
  size?: "sm" | "md" | "lg";
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  (
    {
      className,
      required = false,
      error = false,
      size = "md",
      children,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    };

    return (
      <label
        ref={ref}
        className={`
          font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70
          ${sizeClasses[size]}
          ${error ? "text-destructive" : "text-foreground"}
          ${className || ""}
        `.trim()}
        {...props}
      >
        {children}
        {required && (
          <span className="ml-1 text-destructive" aria-label="required">
            *
          </span>
        )}
      </label>
    );
  }
);
Label.displayName = "Label";

export { Label };

/*
Usage Examples:

// Basic label
<Label htmlFor="email">Email</Label>

// Required field label
<Label htmlFor="password" required>
  Password
</Label>

// Error state label
<Label htmlFor="username" error>
  Username
</Label>

// Different sizes
<Label size="sm">Small Label</Label>
<Label size="lg">Large Label</Label>

// Complete form field example
<div className="space-y-2">
  <Label htmlFor="email" required>
    Email Address
  </Label>
  <Input 
    id="email" 
    type="email" 
    placeholder="john@example.com" 
  />
</div>

// With error state
<div className="space-y-2">
  <Label htmlFor="password" required error>
    Password
  </Label>
  <Input 
    id="password" 
    type="password" 
    error="Password is required"
  />
</div>

// Custom styling
<Label 
  htmlFor="description" 
  className="text-muted-foreground font-normal"
>
  Optional Description
</Label>

// Form group with label
<div className="grid gap-2">
  <Label htmlFor="bio">Bio</Label>
  <TextArea 
    id="bio" 
    placeholder="Tell us about yourself..."
  />
  <p className="text-xs text-muted-foreground">
    This will be displayed on your profile.
  </p>
</div>
*/
