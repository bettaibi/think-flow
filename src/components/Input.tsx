import * as React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, leftIcon, rightIcon, ...props }, ref) => {
    const hasError = !!error;

    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground">
              {leftIcon}
            </div>
          )}
          <input
            type={type}
            className={`
              flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm 
              ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium 
              placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 
              focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed 
              disabled:opacity-50 transition-colors
              ${leftIcon ? "pl-9" : ""}
              ${rightIcon ? "pr-9" : ""}
              ${
                hasError
                  ? "border-destructive focus-visible:ring-destructive"
                  : ""
              }
              ${className || ""}
            `.trim()}
            ref={ref}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };

/*
Usage Examples:

// Basic input
<Input placeholder="Enter your email" />

// With label
<Input label="Email" placeholder="john@example.com" />

// With error state
<Input 
  label="Password" 
  type="password" 
  error="Password must be at least 8 characters" 
/>

// With icons
<Input 
  placeholder="Search..." 
  leftIcon={<SearchIcon />}
  rightIcon={<XIcon />}
/>

// Controlled input
const [value, setValue] = useState("")
<Input 
  value={value}
  onChange={(e) => setValue(e.target.value)}
  placeholder="Type something..."
/>
*/
