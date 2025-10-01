import { StickyNoteFolderProps, StickyNoteProps } from "@/features/sticky-note";
import { FoldersPageClient } from "@/features/sticky-note/components/folders-page-client";

// Mock folders data
const mockFolders: StickyNoteFolderProps[] = [
  {
    id: "work",
    name: "Work & Projects",
    createdAt: "2024-09-01T10:00:00Z",
    updatedAt: "2024-09-25T15:30:00Z",
  },
  {
    id: "personal",
    name: "Personal Life",
    createdAt: "2024-09-01T10:00:00Z",
    updatedAt: "2024-09-24T12:00:00Z",
  },
  {
    id: "learning",
    name: "Learning & Development",
    createdAt: "2024-09-01T10:00:00Z",
    updatedAt: "2024-09-23T16:45:00Z",
  },
  {
    id: "health",
    name: "Health & Fitness",
    createdAt: "2024-09-01T10:00:00Z",
    updatedAt: "2024-09-20T18:00:00Z",
  },
];

// Mock notes data with folder assignments
const mockNotes: StickyNoteProps[] = [
  {
    id: "1",
    title: "Meeting Notes - Q4 Planning",
    content:
      "Key points from today's meeting:\n• Review budget allocations\n• Set team goals for Q4\n• Plan holiday schedule\n• Discuss new project proposals\n\nNext meeting: Friday 2pm",
    createdAt: "2024-09-20T10:00:00Z",
    updatedAt: "2024-09-25T15:30:00Z",
    tags: ["meeting", "planning", "Q4"],
    isPinned: true,
    folderId: "work",
  },
  {
    id: "3",
    title: "Book Recommendations",
    content:
      '# Must Read Books\n\n## Technical Books\n- **Atomic Habits** by *James Clear*\n- **Deep Work** by *Cal Newport*\n- **The Lean Startup** by *Eric Ries*\n\n## Psychology\n- **Thinking, Fast and Slow** by *Daniel Kahneman*\n\n> All available at [local library](https://library.example.com)!\n\n```bash\n# Reserve books online\nlibrary reserve --book "Atomic Habits"\n```',
    createdAt: "2024-09-18T19:30:00Z",
    updatedAt: "2024-09-23T16:45:00Z",
    tags: ["books", "reading", "recommendations"],
    isPinned: true,
    folderId: "learning",
  },
  {
    id: "5",
    title: "Project Ideas",
    content:
      "Potential side projects:\n\n• Personal finance tracker\n• Recipe organizer app\n• Habit tracking system\n• Photo gallery website\n• Learning platform\n\nStart with the simplest one first.",
    createdAt: "2024-09-10T11:00:00Z",
    updatedAt: "2024-09-22T20:30:00Z",
    tags: ["projects", "ideas", "coding"],
    isPinned: true,
    folderId: "work",
  },
  {
    id: "10",
    title: "Learning Goals",
    content:
      "Skills to develop this year:\n\n📚 TypeScript advanced patterns\n📚 System design principles\n📚 UI/UX design fundamentals\n📚 Data structures & algorithms\n📚 Cloud architecture\n\nDedicate 1 hour daily to learning.",
    createdAt: "2024-09-01T09:00:00Z",
    updatedAt: "2024-09-18T22:15:00Z",
    tags: ["learning", "skills", "development"],
    isPinned: true,
    folderId: "learning",
  },
  {
    id: "2",
    title: "Shopping List",
    content:
      "Groceries to buy:\n• Milk\n• Bread\n• Eggs\n• Vegetables\n• Coffee\n• Pasta\n• Chicken\n\nDon't forget organic options!",
    createdAt: "2024-09-22T08:00:00Z",
    updatedAt: "2024-09-24T12:00:00Z",
    tags: ["shopping", "groceries"],
    isPinned: false,
    folderId: "personal",
  },
  {
    id: "4",
    title: "Weekend Trip Ideas",
    content:
      "Places to visit this weekend:\n\n🏔️ Mountain hiking trail\n🏖️ Beach day with friends\n🏛️ Museum exhibitions\n🍽️ Try new restaurant downtown\n\nCheck weather forecast first!",
    createdAt: "2024-09-15T14:20:00Z",
    updatedAt: "2024-09-23T09:15:00Z",
    tags: ["travel", "weekend", "activities"],
    isPinned: false,
    folderId: "personal",
  },
  {
    id: "7",
    title: "Code Snippets",
    content:
      "## Useful Code Patterns\n\n### React Hooks\n```javascript\n// useState hook\nconst [count, setCount] = useState(0);\n\n// useEffect hook\nuseEffect(() => {\n  fetchData();\n}, [dependency]);\n```\n\n### Array Operations\n```javascript\n// Mapping with JSX\nconst items = data.map(item => (\n  <div key={item.id}>{item.name}</div>\n));\n\n// Filter and sort\nconst filtered = items\n  .filter(item => item.active)\n  .sort((a, b) => a.name.localeCompare(b.name));\n```\n\n### Async/Await\n```javascript\ntry {\n  const result = await fetchData();\n  console.log('Success:', result);\n} catch (error) {\n  console.error('Error:', error);\n}\n```\n\n*Note: Always handle errors properly!*",
    createdAt: "2024-09-12T16:45:00Z",
    updatedAt: "2024-09-21T14:20:00Z",
    tags: ["code", "javascript", "react", "snippets"],
    isPinned: false,
    folderId: "work",
  },
  {
    id: "8",
    title: "Workout Routine",
    content:
      "Weekly exercise plan:\n\nMonday: Cardio (30 min)\nTuesday: Upper body strength\nWednesday: Yoga/stretching\nThursday: Lower body strength\nFriday: Cardio (45 min)\nWeekend: Outdoor activities\n\nStay consistent!",
    createdAt: "2024-09-08T06:30:00Z",
    updatedAt: "2024-09-20T18:00:00Z",
    tags: ["fitness", "workout", "health"],
    isPinned: false,
    folderId: "health",
  },
];

export default function StickyNoteFoldersPage() {
  return (
    <div className="min-h-screen bg-background p-3 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <FoldersPageClient folders={mockFolders} notes={mockNotes} />
      </div>
    </div>
  );
}
