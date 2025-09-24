"use client";

import * as React from "react";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, fallback, size = "md", ...props }, ref) => {
    const [imageError, setImageError] = React.useState(false);
    const [imageLoaded, setImageLoaded] = React.useState(false);

    const sizeClasses = {
      sm: "h-8 w-8 text-xs",
      md: "h-10 w-10 text-sm",
      lg: "h-12 w-12 text-base",
      xl: "h-16 w-16 text-lg",
    };

    const displayFallback = !src || imageError || !imageLoaded;
    const initials = fallback || (alt ? alt.slice(0, 2).toUpperCase() : "?");

    return (
      <div
        ref={ref}
        className={`
          relative flex shrink-0 overflow-hidden rounded-full bg-muted
          ${sizeClasses[size]}
          ${className || ""}
        `.trim()}
        {...props}
      >
        {src && !imageError && (
          <img
            src={src}
            alt={alt}
            className={`
              aspect-square h-full w-full object-cover transition-opacity duration-300
              ${imageLoaded ? "opacity-100" : "opacity-0"}
            `}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        )}
        {displayFallback && (
          <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground font-medium">
            {initials}
          </div>
        )}
      </div>
    );
  }
);
Avatar.displayName = "Avatar";

export { Avatar };

/*
Usage Examples:

// Basic avatar with image
<Avatar src="/avatar.jpg" alt="John Doe" />

// Avatar with fallback text
<Avatar fallback="JD" alt="John Doe" />

// Different sizes
<Avatar size="sm" src="/avatar.jpg" alt="Small avatar" />
<Avatar size="lg" src="/avatar.jpg" alt="Large avatar" />
<Avatar size="xl" src="/avatar.jpg" alt="Extra large avatar" />

// Avatar that falls back to initials when image fails
<Avatar 
  src="/broken-image.jpg" 
  alt="Jane Smith" 
  fallback="JS"
/>

// Avatar with custom styling
<Avatar 
  src="/avatar.jpg"
  alt="User"
  className="ring-2 ring-primary ring-offset-2 ring-offset-background"
/>

// Avatar without image (initials only)
<Avatar alt="Admin User" />
*/
