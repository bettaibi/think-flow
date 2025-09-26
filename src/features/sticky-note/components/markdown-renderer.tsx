"use client";
import ReactMarkdown from "react-markdown";

interface MarkdownRendererProps {
  content: string;
  variant?: "card" | "dropdown" | "full";
  maxLength?: number;
  className?: string;
}

export function MarkdownRenderer({
  content,
  variant = "card",
  maxLength,
  className = "",
}: MarkdownRendererProps) {
  // Get preview content with character limit
  const getPreviewContent = (text: string, limit?: number) => {
    if (!limit || text.length <= limit) return text;
    return text.slice(0, limit).trim() + "...";
  };

  const processedContent = maxLength
    ? getPreviewContent(content, maxLength)
    : content;

  // Define component variants for different use cases
  const componentVariants = {
    // For note cards - balanced styling with proper spacing
    card: {
      h1: ({ children }: { children: React.ReactNode }) => (
        <h1 className="text-base font-semibold mb-1">{children}</h1>
      ),
      h2: ({ children }: { children: React.ReactNode }) => (
        <h2 className="text-sm font-semibold mb-1">{children}</h2>
      ),
      h3: ({ children }: { children: React.ReactNode }) => (
        <h3 className="text-sm font-medium mb-1">{children}</h3>
      ),
      p: ({ children }: { children: React.ReactNode }) => (
        <p className="text-sm mb-1 last:mb-0">{children}</p>
      ),
      strong: ({ children }: { children: React.ReactNode }) => (
        <strong className="font-semibold">{children}</strong>
      ),
      em: ({ children }: { children: React.ReactNode }) => (
        <em className="italic">{children}</em>
      ),
      code: ({ children }: { children: React.ReactNode }) => (
        <code className="bg-muted/30 px-1 py-0.5 rounded text-xs font-mono">
          {children}
        </code>
      ),
      ul: ({ children }: { children: React.ReactNode }) => (
        <ul className="text-sm mb-1 pl-4">{children}</ul>
      ),
      ol: ({ children }: { children: React.ReactNode }) => (
        <ol className="text-sm mb-1 pl-4 list-decimal">{children}</ol>
      ),
      li: ({ children }: { children: React.ReactNode }) => (
        <li className="mb-0.5">{children}</li>
      ),
      blockquote: ({ children }: { children: React.ReactNode }) => (
        <blockquote className="border-l-2 border-muted pl-2 text-sm italic">
          {children}
        </blockquote>
      ),
    },

    // For dropdown menus - minimal inline styling
    dropdown: {
      h1: ({ children }: { children: React.ReactNode }) => (
        <span className="font-medium">{children}</span>
      ),
      h2: ({ children }: { children: React.ReactNode }) => (
        <span className="font-medium">{children}</span>
      ),
      h3: ({ children }: { children: React.ReactNode }) => (
        <span className="font-medium">{children}</span>
      ),
      p: ({ children }: { children: React.ReactNode }) => (
        <span>{children}</span>
      ),
      strong: ({ children }: { children: React.ReactNode }) => (
        <strong className="font-medium">{children}</strong>
      ),
      em: ({ children }: { children: React.ReactNode }) => <em>{children}</em>,
      code: ({ children }: { children: React.ReactNode }) => (
        <code className="bg-muted/20 px-1 rounded text-xs">{children}</code>
      ),
      ul: ({ children }: { children: React.ReactNode }) => (
        <span>{children}</span>
      ),
      ol: ({ children }: { children: React.ReactNode }) => (
        <span>{children}</span>
      ),
      li: ({ children }: { children: React.ReactNode }) => (
        <span>• {children} </span>
      ),
      blockquote: ({ children }: { children: React.ReactNode }) => (
        <span className="italic">{children}</span>
      ),
    },

    // For full content display - rich styling
    full: {
      h1: ({ children }: { children: React.ReactNode }) => (
        <h1 className="text-2xl font-bold mb-4">{children}</h1>
      ),
      h2: ({ children }: { children: React.ReactNode }) => (
        <h2 className="text-xl font-semibold mb-3">{children}</h2>
      ),
      h3: ({ children }: { children: React.ReactNode }) => (
        <h3 className="text-lg font-semibold mb-2">{children}</h3>
      ),
      p: ({ children }: { children: React.ReactNode }) => (
        <p className="mb-3 leading-relaxed">{children}</p>
      ),
      strong: ({ children }: { children: React.ReactNode }) => (
        <strong className="font-semibold">{children}</strong>
      ),
      em: ({ children }: { children: React.ReactNode }) => (
        <em className="italic">{children}</em>
      ),
      code: ({ children }: { children: React.ReactNode }) => (
        <code className="bg-muted/30 px-1.5 py-0.5 rounded text-sm font-mono">
          {children}
        </code>
      ),
      pre: ({ children }: { children: React.ReactNode }) => (
        <pre className="bg-muted/30 p-4 rounded-md overflow-x-auto mb-4">
          {children}
        </pre>
      ),
      ul: ({ children }: { children: React.ReactNode }) => (
        <ul className="mb-3 pl-6 list-disc">{children}</ul>
      ),
      ol: ({ children }: { children: React.ReactNode }) => (
        <ol className="mb-3 pl-6 list-decimal">{children}</ol>
      ),
      li: ({ children }: { children: React.ReactNode }) => (
        <li className="mb-1">{children}</li>
      ),
      blockquote: ({ children }: { children: React.ReactNode }) => (
        <blockquote className="border-l-4 border-primary pl-4 my-4 italic text-muted-foreground">
          {children}
        </blockquote>
      ),
    },
  };

  return (
    <div className={className}>
      <ReactMarkdown components={componentVariants[variant]}>
        {processedContent}
      </ReactMarkdown>
    </div>
  );
}
