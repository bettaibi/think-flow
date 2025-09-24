import * as React from "react";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  label?: string;
  error?: string;
  placeholder?: string;
  options: SelectOption[];
  size?: "sm" | "md" | "lg";
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      label,
      error,
      placeholder = "Select an option...",
      options,
      size = "md",
      disabled,
      ...props
    },
    ref
  ) => {
    const hasError = !!error;

    const sizeClasses = {
      sm: "h-8 px-2 text-xs",
      md: "h-10 px-3 text-sm",
      lg: "h-12 px-4 text-base",
    };

    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            disabled={disabled}
            className={`
              flex w-full rounded-md border border-input bg-background text-sm ring-offset-background
              focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 
              disabled:cursor-not-allowed disabled:opacity-50 transition-colors
              appearance-none cursor-pointer
              ${sizeClasses[size]}
              ${hasError ? "border-destructive focus:ring-destructive" : ""}
              ${className || ""}
            `.trim()}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>

          {/* Custom dropdown arrow */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              className="h-4 w-4 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    );
  }
);
Select.displayName = "Select";

// Advanced Select with search functionality
export interface AdvancedSelectProps extends Omit<SelectProps, "options"> {
  options: SelectOption[];
  searchable?: boolean;
  multiple?: boolean;
  onValueChange?: (value: string | string[]) => void;
  value?: string | string[];
}

const AdvancedSelect: React.FC<AdvancedSelectProps> = ({
  label,
  error,
  placeholder = "Select an option...",
  options,
  searchable = false,
  multiple = false,
  onValueChange,
  value,
  disabled,
  className,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedValues, setSelectedValues] = React.useState<string[]>(
    Array.isArray(value) ? value : value ? [value] : []
  );

  const filteredOptions = React.useMemo(() => {
    if (!searchTerm) return options;
    return options.filter((option) =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [options, searchTerm]);

  const handleOptionClick = (optionValue: string) => {
    let newValues: string[];

    if (multiple) {
      newValues = selectedValues.includes(optionValue)
        ? selectedValues.filter((v) => v !== optionValue)
        : [...selectedValues, optionValue];
    } else {
      newValues = [optionValue];
      setIsOpen(false);
    }

    setSelectedValues(newValues);
    onValueChange?.(multiple ? newValues : newValues[0] || "");
  };

  const displayValue = React.useMemo(() => {
    if (selectedValues.length === 0) return placeholder;
    if (multiple) {
      return `${selectedValues.length} selected`;
    }
    const option = options.find((opt) => opt.value === selectedValues[0]);
    return option?.label || "";
  }, [selectedValues, options, placeholder, multiple]);

  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium leading-none">{label}</label>
      )}
      <div className="relative">
        <button
          type="button"
          disabled={disabled}
          onClick={() => setIsOpen(!isOpen)}
          className={`
            flex h-10 w-full items-center justify-between rounded-md border border-input
            bg-background px-3 py-2 text-sm ring-offset-background
            focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
            disabled:cursor-not-allowed disabled:opacity-50
            ${error ? "border-destructive" : ""}
            ${className || ""}
          `.trim()}
        >
          <span
            className={
              selectedValues.length === 0 ? "text-muted-foreground" : ""
            }
          >
            {displayValue}
          </span>
          <svg
            className={`h-4 w-4 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute z-50 mt-1 w-full rounded-md border bg-popover shadow-lg">
            {searchable && (
              <div className="p-2 border-b">
                <input
                  type="text"
                  placeholder="Search options..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-2 py-1 text-sm bg-background border rounded focus:outline-none focus:ring-1 focus:ring-ring"
                />
              </div>
            )}
            <div className="max-h-60 overflow-auto p-1">
              {filteredOptions.length === 0 ? (
                <div className="px-2 py-1.5 text-sm text-muted-foreground">
                  No options found
                </div>
              ) : (
                filteredOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    disabled={option.disabled}
                    onClick={() => handleOptionClick(option.value)}
                    className={`
                      w-full text-left px-2 py-1.5 text-sm rounded hover:bg-accent
                      disabled:opacity-50 disabled:cursor-not-allowed
                      ${
                        selectedValues.includes(option.value)
                          ? "bg-accent font-medium"
                          : ""
                      }
                    `}
                  >
                    {multiple && (
                      <span className="mr-2">
                        {selectedValues.includes(option.value) ? "✓" : ""}
                      </span>
                    )}
                    {option.label}
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
};

export { Select, AdvancedSelect };

/*
Usage Examples:

// Basic select
const countryOptions = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "uk", label: "United Kingdom" },
]

<Select 
  label="Country"
  options={countryOptions}
  placeholder="Choose a country"
/>

// With error state
<Select 
  label="Category"
  options={categoryOptions}
  error="Please select a category"
/>

// Different sizes
<Select size="sm" options={options} />
<Select size="lg" options={options} />

// Controlled select
const [selectedCountry, setSelectedCountry] = useState("")

<Select 
  options={countryOptions}
  value={selectedCountry}
  onChange={(e) => setSelectedCountry(e.target.value)}
/>

// Advanced select with search
<AdvancedSelect
  label="Framework"
  searchable
  options={frameworkOptions}
  onValueChange={(value) => console.log(value)}
  placeholder="Search frameworks..."
/>

// Multi-select
<AdvancedSelect
  label="Skills"
  multiple
  searchable
  options={skillOptions}
  onValueChange={(values) => setSelectedSkills(values)}
  placeholder="Select your skills"
/>

// Disabled options
const statusOptions = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "pending", label: "Pending", disabled: true },
]

<Select options={statusOptions} />
*/
