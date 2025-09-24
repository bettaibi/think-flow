import * as React from "react";

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  resize?: "none" | "vertical" | "horizontal" | "both";
  autoResize?: boolean;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      className,
      label,
      error,
      resize = "vertical",
      autoResize = false,
      onChange,
      ...props
    },
    ref
  ) => {
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    const hasError = !!error;

    // Auto-resize functionality
    const adjustHeight = React.useCallback(() => {
      const textarea = textareaRef.current;
      if (textarea && autoResize) {
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    }, [autoResize]);

    React.useEffect(() => {
      if (autoResize) {
        adjustHeight();
      }
    }, [adjustHeight, props.value]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (autoResize) {
        adjustHeight();
      }
      onChange?.(e);
    };

    React.useImperativeHandle(ref, () => textareaRef.current!);

    const resizeClasses = {
      none: "resize-none",
      vertical: "resize-y",
      horizontal: "resize-x",
      both: "resize",
    };

    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label}
          </label>
        )}
        <textarea
          ref={textareaRef}
          className={`
            flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm 
            ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none 
            focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
            disabled:cursor-not-allowed disabled:opacity-50 transition-colors
            ${resizeClasses[resize]}
            ${
              hasError
                ? "border-destructive focus-visible:ring-destructive"
                : ""
            }
            ${className || ""}
          `.trim()}
          onChange={handleChange}
          {...props}
        />
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    );
  }
);
TextArea.displayName = "TextArea";

export { TextArea };

/*
Usage Examples:

// Basic textarea
<TextArea placeholder="Enter your message..." />

// With label
<TextArea label="Description" placeholder="Tell us about yourself" />

// With error state
<TextArea 
  label="Comments"
  error="Message is required"
  placeholder="Your comments..."
/>

// Auto-resizing textarea
<TextArea 
  autoResize 
  placeholder="This textarea will grow as you type..."
  label="Auto-resize example"
/>

// Different resize options
<TextArea resize="none" placeholder="No resize" />
<TextArea resize="horizontal" placeholder="Horizontal resize only" />
<TextArea resize="both" placeholder="Resize both directions" />

// Controlled textarea
const [value, setValue] = useState("")
<TextArea 
  value={value}
  onChange={(e) => setValue(e.target.value)}
  label="Controlled textarea"
  placeholder="Type something..."
/>

// Custom height
<TextArea 
  className="min-h-[120px]"
  placeholder="Taller textarea"
  label="Custom height"
/>
*/
