/**
 * Simple markdown parser for basic formatting
 * Supports: headers, bold, italic, lists, links, and code blocks
 */
export function parseMarkdown(content: string): string {
  if (!content) return "";

  let html = content;

  // Escape HTML tags first
  html = html.replace(/</g, "&lt;").replace(/>/g, "&gt;");

  // Headers (### ## #)
  html = html.replace(
    /^### (.*$)/gim,
    '<h3 class="text-lg font-semibold mb-2">$1</h3>'
  );
  html = html.replace(
    /^## (.*$)/gim,
    '<h2 class="text-xl font-semibold mb-3">$1</h2>'
  );
  html = html.replace(
    /^# (.*$)/gim,
    '<h1 class="text-2xl font-bold mb-4">$1</h1>'
  );

  // Bold **text** or __text__
  html = html.replace(
    /\*\*(.*?)\*\*/g,
    '<strong class="font-semibold">$1</strong>'
  );
  html = html.replace(
    /__(.*?)__/g,
    '<strong class="font-semibold">$1</strong>'
  );

  // Italic *text* or _text_
  html = html.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
  html = html.replace(/_(.*?)_/g, '<em class="italic">$1</em>');

  // Inline code `code`
  html = html.replace(
    /`([^`]+)`/g,
    '<code class="bg-muted/30 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>'
  );

  // Links [text](url)
  html = html.replace(
    /\[([^\]]+)\]\(([^\)]+)\)/g,
    '<a href="$2" class="text-primary hover:underline" target="_blank" rel="noopener noreferrer">$1</a>'
  );

  // Code blocks ```code```
  html = html.replace(
    /```([\s\S]*?)```/g,
    '<pre class="bg-muted/30 p-3 rounded-md overflow-x-auto"><code class="text-sm font-mono">$1</code></pre>'
  );

  // Unordered lists (- or * at start of line)
  html = html.replace(/^[\s]*[-*]\s+(.*$)/gim, '<li class="ml-4">• $1</li>');
  html = html.replace(/(<li.*<\/li>)/s, '<ul class="mb-2">$1</ul>');

  // Numbered lists (1. at start of line)
  html = html.replace(
    /^[\s]*\d+\.\s+(.*$)/gim,
    '<li class="ml-4 list-decimal">$1</li>'
  );

  // Line breaks
  html = html.replace(/\n\n/g, '</p><p class="mb-2">');
  html = html.replace(/\n/g, "<br>");

  // Wrap in paragraph if not starting with a heading or list
  if (
    !html.startsWith("<h") &&
    !html.startsWith("<ul") &&
    !html.startsWith("<pre")
  ) {
    html = `<p class="mb-2">${html}</p>`;
  }

  return html;
}

/**
 * Extract plain text preview from markdown content
 */
export function getMarkdownPreview(
  content: string,
  maxLength: number = 150
): string {
  if (!content) return "";

  // Remove markdown syntax
  let preview = content
    .replace(/#{1,6}\s+/g, "") // Headers
    .replace(/\*\*(.*?)\*\*/g, "$1") // Bold
    .replace(/\*(.*?)\*/g, "$1") // Italic
    .replace(/__(.*?)__/g, "$1") // Bold
    .replace(/_(.*?)_/g, "$1") // Italic
    .replace(/`([^`]+)`/g, "$1") // Inline code
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1") // Links
    .replace(/```[\s\S]*?```/g, "[code block]") // Code blocks
    .replace(/^[\s]*[-*]\s+/gm, "• ") // Unordered lists
    .replace(/^[\s]*\d+\.\s+/gm, "• ") // Numbered lists
    .replace(/\n+/g, " ") // Multiple newlines to space
    .trim();

  // Truncate if too long
  if (preview.length > maxLength) {
    preview = preview.substring(0, maxLength).trim() + "...";
  }

  return preview;
}

/**
 * Check if content contains markdown syntax
 */
export function hasMarkdownSyntax(content: string): boolean {
  if (!content) return false;

  const markdownPatterns = [
    /#{1,6}\s+/, // Headers
    /\*\*.*?\*\*/, // Bold
    /\*.*?\*/, // Italic
    /__.*?__/, // Bold
    /_.*?_/, // Italic
    /`[^`]+`/, // Inline code
    /\[.*?\]\(.*?\)/, // Links
    /```[\s\S]*?```/, // Code blocks
    /^[\s]*[-*]\s+/m, // Unordered lists
    /^[\s]*\d+\.\s+/m, // Numbered lists
  ];

  return markdownPatterns.some((pattern) => pattern.test(content));
}
