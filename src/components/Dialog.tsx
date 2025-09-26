"use client";

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
    const child = children as React.ReactElement<{
      onClick?: (e: React.MouseEvent) => void;
    }>;
    return React.cloneElement(child, {
      onClick: (e: React.MouseEvent) => {
        child.props.onClick?.(e);
        onOpenChange(true);
      },
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
        // Prevent body scroll and improve mobile experience
        document.body.style.overflow = "hidden";
        document.body.style.position = "fixed";
        document.body.style.width = "100%";
        document.body.style.top = `-${window.scrollY}px`;
      }

      return () => {
        document.removeEventListener("keydown", handleEscape);
        // Restore body scroll
        const scrollY = document.body.style.top;
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.width = "";
        document.body.style.top = "";
        if (scrollY) {
          window.scrollTo(0, parseInt(scrollY || "0") * -1);
        }
      };
    }, [open, onOpenChange, onClose]);

    if (!mounted || !open) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
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
            relative z-50 grid w-full max-w-lg gap-4 border bg-background shadow-lg 
            duration-200 animate-in fade-in-0 
            m-0 rounded-t-lg sm:rounded-lg sm:m-4
            max-h-[95vh] sm:max-h-[85vh] overflow-y-auto
            slide-in-from-bottom-2 sm:zoom-in-95
            p-4 sm:p-6
            ${className || ""}
          `.trim()}
          {...props}
        >
          {children}
          {showClose && (
            <button
              className="absolute right-2 top-2 sm:right-4 sm:top-4 rounded-full p-2 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none touch-manipulation"
              onClick={() => {
                onOpenChange(false);
                onClose?.();
              }}
            >
              <span className="sr-only">Close</span>
              <svg
                className="h-5 w-5 sm:h-4 sm:w-4"
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
      className={`flex flex-col space-y-2 sm:space-y-1.5 text-left pr-8 sm:pr-0 ${
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
      className={`text-xl sm:text-lg font-semibold leading-tight sm:leading-none tracking-tight ${
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
    className={`text-base sm:text-sm text-muted-foreground leading-relaxed ${
      className || ""
    }`}
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
      className={`flex flex-col-reverse gap-3 sm:flex-row sm:justify-end sm:gap-2 sm:space-x-0 pt-2 ${
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
