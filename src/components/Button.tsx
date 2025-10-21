import * as React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      loading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseClasses = `
      inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium cursor-pointer
      ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 
      focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50
    `.trim();

    const variantClasses = {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      destructive:
        "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      outline:
        "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline",
    };

    const sizeClasses = {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
      icon: "h-10 w-10",
    };

    const isDisabled = disabled || loading;

    return (
      <button
        className={`
          ${baseClasses}
          ${variantClasses[variant]}
          ${sizeClasses[size]}
          ${className || ""}
        `.trim()}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {loading && (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };

/*
Usage Examples:

// Basic button
<Button>Click me</Button>

// Different variants
<Button variant="destructive">Delete</Button>
<Button variant="outline">Cancel</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Different sizes
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon">⚙️</Button>

// Loading state
<Button loading>Loading...</Button>

// Disabled
<Button disabled>Disabled</Button>

// With click handler
<Button onClick={() => console.log('Clicked!')}>
  Click me
</Button>
*/
