import * as React from "react";

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  error?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, error, id, ...props }, ref) => {
    const checkboxId = id || React.useId();
    const hasError = !!error;

    return (
      <div className="space-y-2">
        <div className="flex items-start space-x-2">
          <input
            type="checkbox"
            ref={ref}
            id={checkboxId}
            className={`
              peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background 
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring 
              focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 
              data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground
              ${hasError ? "border-destructive" : ""}
              ${className || ""}
            `.trim()}
            {...props}
          />
          {(label || description) && (
            <div className="grid gap-1.5 leading-none">
              {label && (
                <label
                  htmlFor={checkboxId}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {label}
                </label>
              )}
              {description && (
                <p className="text-sm text-muted-foreground">{description}</p>
              )}
            </div>
          )}
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    );
  }
);
Checkbox.displayName = "Checkbox";

export { Checkbox };

/*
Usage Examples:

// Basic checkbox
<Checkbox />

// With label
<Checkbox label="Accept terms and conditions" />

// With label and description
<Checkbox 
  label="Email notifications"
  description="Get notified about new messages and updates"
/>

// With error state
<Checkbox 
  label="I agree to the terms"
  error="You must accept the terms to continue"
/>

// Controlled checkbox
const [checked, setChecked] = useState(false)
<Checkbox 
  checked={checked}
  onCheckedChange={setChecked}
  label="Subscribe to newsletter"
/>

// Disabled state
<Checkbox disabled label="Disabled option" />
*/
