import {
  GoogleDocsNotesList,
  StickyNoteProps,
  StickyNoteFolderProps,
} from "@/features/sticky-note";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faFolder } from "@fortawesome/free-solid-svg-icons";

// Mock folders for folder name lookup
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

// Mock sticky notes data with folder assignments
const mockStickyNotes: StickyNoteProps[] = [
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
    id: "6",
    title: "Daily Affirmations",
    content:
      "Positive thoughts for today:\n\n✨ I am capable of achieving my goals\n✨ Every challenge is an opportunity to grow\n✨ I attract positive energy\n✨ I am grateful for what I have\n✨ Today will be a great day!",
    createdAt: "2024-09-25T07:00:00Z",
    updatedAt: "2024-09-25T07:00:00Z",
    tags: ["motivation", "positivity", "daily"],
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
  {
    id: "9",
    title: "Gift Ideas",
    content:
      "Birthday presents for Sarah:\n\n• Art supplies (watercolors)\n• Coffee table book on photography\n• Subscription to meditation app\n• Plants for her apartment\n• Cooking class voucher\n\nBudget: $100-150",
    createdAt: "2024-09-05T13:15:00Z",
    updatedAt: "2024-09-19T11:30:00Z",
    tags: ["gifts", "birthday", "sarah"],
    isPinned: false,
    folderId: "personal",
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
    id: "11",
    title: "Quick Reminders",
    content:
      "Don't forget:\n• Call dentist for appointment\n• Pay electricity bill\n• Water plants\n• Submit expense report\n• Reply to mom's email\n• Pick up dry cleaning",
    createdAt: "2024-09-24T14:00:00Z",
    updatedAt: "2024-09-24T14:00:00Z",
    tags: ["reminders", "tasks"],
    isPinned: false,
    folderId: "personal",
  },
  {
    id: "12",
    title: "Recipe: Pasta Salad",
    content:
      "Ingredients:\n• 1 lb pasta\n• Cherry tomatoes\n• Mozzarella balls\n• Fresh basil\n• Olive oil\n• Balsamic vinegar\n• Salt & pepper\n\nCook pasta, cool, mix with other ingredients. Perfect for summer!",
    createdAt: "2024-09-16T17:30:00Z",
    updatedAt: "2024-09-17T12:00:00Z",
    tags: ["recipe", "cooking", "pasta"],
    isPinned: false,
    folderId: "personal",
  },
];

interface Props {
  params: {
    folderId: string;
  };
}

export default async function StickyNotePage({ params }: Props) {
  const { folderId } = await params;

  // Find the current folder
  const currentFolder = mockFolders.find((folder) => folder.id === folderId);

  // Filter notes for this folder
  const folderNotes = mockStickyNotes.filter(
    (note) => note.folderId === folderId
  );

  if (!currentFolder) {
    return (
      <div className="min-h-screen bg-background p-3 sm:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Folder Not Found
            </h1>
            <p className="text-muted-foreground mb-4">
              The requested folder could not be found.
            </p>
            <Link href="/sticky-note" className="text-primary hover:underline">
              Return to Folders
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-3 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link
            href="/sticky-note"
            className="hover:text-foreground transition-colors"
          >
            Sticky Notes
          </Link>
          <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3" />
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faFolder} className="w-4 h-4 text-primary" />
            <span className="text-foreground font-medium">
              {currentFolder.name}
            </span>
          </div>
        </nav>

        <GoogleDocsNotesList notes={folderNotes} />
      </div>
    </div>
  );
}
