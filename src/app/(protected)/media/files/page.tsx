import { FileMedia, MediaProps, MediaType } from "@/features/media";

// Mock file data
const mockFiles: MediaProps[] = [
  {
    id: "1",
    title: "Project Proposal",
    description: "Detailed project proposal document for Q4 initiatives",
    type: MediaType.FILE,
    url: "/files/project-proposal.pdf",
    fileName: "project-proposal.pdf",
    mimeType: "application/pdf",
    fileSize: 2.5 * 1024 * 1024,
    tags: ["proposal", "document", "business"],
    createdAt: "2024-09-01T10:00:00Z",
    updatedAt: "2024-09-01T10:00:00Z",
  },
  {
    id: "2",
    title: "Design System Guide",
    description: "Complete design system documentation and guidelines",
    type: MediaType.FILE,
    url: "/files/design-system.docx",
    fileName: "design-system.docx",
    mimeType:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    fileSize: 1.8 * 1024 * 1024,
    tags: ["design", "documentation", "guidelines"],
    createdAt: "2024-09-05T14:30:00Z",
    updatedAt: "2024-09-05T14:30:00Z",
  },
  {
    id: "3",
    title: "Budget Spreadsheet",
    description: "Q4 budget planning and resource allocation",
    type: MediaType.FILE,
    url: "/files/budget-q4.xlsx",
    fileName: "budget-q4.xlsx",
    mimeType:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    fileSize: 3.2 * 1024 * 1024,
    tags: ["budget", "finance", "planning"],
    createdAt: "2024-09-10T09:15:00Z",
    updatedAt: "2024-09-10T09:15:00Z",
  },
  {
    id: "4",
    title: "API Documentation",
    description: "Complete API reference and integration guide",
    type: MediaType.FILE,
    url: "/files/api-docs.md",
    fileName: "api-docs.md",
    mimeType: "text/markdown",
    fileSize: 512 * 1024,
    tags: ["api", "documentation", "development"],
    createdAt: "2024-09-12T16:45:00Z",
    updatedAt: "2024-09-12T16:45:00Z",
  },
  {
    id: "5",
    title: "Presentation Slides",
    description: "Quarterly review presentation for stakeholders",
    type: MediaType.FILE,
    url: "/files/quarterly-review.pptx",
    fileName: "quarterly-review.pptx",
    mimeType:
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    fileSize: 4.1 * 1024 * 1024,
    tags: ["presentation", "review", "quarterly"],
    createdAt: "2024-09-15T11:20:00Z",
    updatedAt: "2024-09-15T11:20:00Z",
  },
  {
    id: "6",
    title: "Code Archive",
    description: "Backup of legacy codebase and configurations",
    type: MediaType.FILE,
    url: "/files/legacy-code.zip",
    fileName: "legacy-code.zip",
    mimeType: "application/zip",
    fileSize: 15.6 * 1024 * 1024,
    tags: ["code", "backup", "archive"],
    createdAt: "2024-09-18T13:30:00Z",
    updatedAt: "2024-09-18T13:30:00Z",
  },
  {
    id: "7",
    title: "Meeting Notes",
    description: "Notes from weekly team sync meetings",
    type: MediaType.FILE,
    url: "/files/meeting-notes.txt",
    fileName: "meeting-notes.txt",
    mimeType: "text/plain",
    fileSize: 156 * 1024,
    tags: ["notes", "meeting", "team"],
    createdAt: "2024-09-20T15:45:00Z",
    updatedAt: "2024-09-20T15:45:00Z",
  },
];

export default function FilesPage() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <FileMedia files={mockFiles} />
      </div>
    </div>
  );
}
