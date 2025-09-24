import * as React from "react";

export interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export interface DialogTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

export interface DialogContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  showClose?: boolean;
  onClose?: () => void;
}

export interface DialogHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export interface DialogTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export interface DialogDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export interface DialogFooterProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const DialogContext = React.createContext<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
}>({
  open: false,
  onOpenChange: () => {},
});

const Dialog: React.FC<DialogProps> = ({
  open = false,
  onOpenChange = () => {},
  children,
}) => {
  return (
    <DialogContext.Provider value={{ open, onOpenChange }}>
      {children}
    </DialogContext.Provider>
  );
};

const DialogTrigger: React.FC<DialogTriggerProps> = ({
  children,
  asChild = false,
}) => {
  const { onOpenChange } = React.useContext(DialogContext);

  if (asChild) {
    return React.cloneElement(children as React.ReactElement, {
      onClick: () => onOpenChange(true),
    });
  }

  return <div onClick={() => onOpenChange(true)}>{children}</div>;
};

const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, children, showClose = true, onClose, ...props }, ref) => {
    const { open, onOpenChange } = React.useContext(DialogContext);
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
      setMounted(true);
    }, []);

    React.useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onOpenChange(false);
          onClose?.();
        }
      };

      if (open) {
        document.addEventListener("keydown", handleEscape);
        document.body.style.overflow = "hidden";
      }

      return () => {
        document.removeEventListener("keydown", handleEscape);
        document.body.style.overflow = "unset";
      };
    }, [open, onOpenChange, onClose]);

    if (!mounted || !open) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm"
          onClick={() => {
            onOpenChange(false);
            onClose?.();
          }}
        />

        {/* Content */}
        <div
          ref={ref}
          className={`
            relative z-50 grid w-full max-w-lg gap-4 border bg-background p-6 shadow-lg 
            duration-200 sm:rounded-lg animate-in fade-in-0 zoom-in-95
            ${className || ""}
          `.trim()}
          {...props}
        >
          {children}
          {showClose && (
            <button
              className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
              onClick={() => {
                onOpenChange(false);
                onClose?.();
              }}
            >
              <span className="sr-only">Close</span>
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    );
  }
);
DialogContent.displayName = "DialogContent";

const DialogHeader = React.forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={`flex flex-col space-y-1.5 text-center sm:text-left ${
        className || ""
      }`}
      {...props}
    >
      {children}
    </div>
  )
);
DialogHeader.displayName = "DialogHeader";

const DialogTitle = React.forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ className, children, ...props }, ref) => (
    <h3
      ref={ref}
      className={`text-lg font-semibold leading-none tracking-tight ${
        className || ""
      }`}
      {...props}
    >
      {children}
    </h3>
  )
);
DialogTitle.displayName = "DialogTitle";

const DialogDescription = React.forwardRef<
  HTMLParagraphElement,
  DialogDescriptionProps
>(({ className, children, ...props }, ref) => (
  <p
    ref={ref}
    className={`text-sm text-muted-foreground ${className || ""}`}
    {...props}
  >
    {children}
  </p>
));
DialogDescription.displayName = "DialogDescription";

const DialogFooter = React.forwardRef<HTMLDivElement, DialogFooterProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={`flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 ${
        className || ""
      }`}
      {...props}
    >
      {children}
    </div>
  )
);
DialogFooter.displayName = "DialogFooter";

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
};

/*
Usage Examples:

// Basic dialog
const [open, setOpen] = useState(false)

<Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Confirm Action</DialogTitle>
      <DialogDescription>
        Are you sure you want to continue? This action cannot be undone.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="outline" onClick={() => setOpen(false)}>
        Cancel
      </Button>
      <Button onClick={() => setOpen(false)}>
        Confirm
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

// Form dialog
<Dialog open={formOpen} onOpenChange={setFormOpen}>
  <DialogTrigger asChild>
    <Button>Add Item</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Add New Item</DialogTitle>
      <DialogDescription>
        Fill in the details below to create a new item.
      </DialogDescription>
    </DialogHeader>
    <div className="space-y-4">
      <Input label="Name" placeholder="Enter item name" />
      <TextArea label="Description" placeholder="Enter description" />
    </div>
    <DialogFooter>
      <Button variant="outline" onClick={() => setFormOpen(false)}>
        Cancel
      </Button>
      <Button type="submit">
        Save Item
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

// Alert dialog
<Dialog open={alertOpen} onOpenChange={setAlertOpen}>
  <DialogTrigger asChild>
    <Button variant="destructive">Delete</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Delete Item</DialogTitle>
      <DialogDescription>
        This will permanently delete the item. This action cannot be undone.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="outline" onClick={() => setAlertOpen(false)}>
        Cancel
      </Button>
      <Button variant="destructive" onClick={handleDelete}>
        Delete
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
*/
