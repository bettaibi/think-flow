"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/utils/cn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTasks,
  faGraduationCap,
  faStickyNote,
  faPhotoFilm,
  faPlus,
  faProjectDiagram,
  faCalendarAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Popover, PopoverTrigger, PopoverContent } from "@/components";
import { signOut } from "@/lib/auth-client";
import { CreateProjectDialog } from "@/features/projects/components/create-project-dialog";
import { CreateTrainingDialog } from "@/features/trainings/components/create-training-dialog";

function CreateNewButton() {
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false);
  const [isTrainingDialogOpen, setIsTrainingDialogOpen] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const router = useRouter();

  const handleCreateProject = (projectData: unknown) => {
    console.log("Creating project:", projectData);
    // In a real implementation, this would call an API to create the project
    setIsPopoverOpen(false);
  };

  const handleCreateTraining = (trainingData: unknown) => {
    console.log("Creating training:", trainingData);
    // In a real implementation, this would call an API to create the training
    setIsPopoverOpen(false);
  };

  const handleLogout = async () => {
    try {
      const { data } = await signOut();
      console.log(data);

      if (data?.success) {
        router.refresh();
      }
    } catch (err) {
      console.error("Failed to Logout", err);
    }
  };

  return (
    <>
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <div className="relative top-[-29px] flex items-center border-t p-4 justify-center h-14 w-14 border-b-0 border-x-0 rounded-full border-border bg-background/95 backdrop-blur-sm transition-colors touch-manipulation">
            <button className="relative  flex items-center p-4 justify-center h-11 w-11 rounded-full  bg-primary shadow-soft cursor-pointer ">
              <FontAwesomeIcon icon={faPlus} className="h-5 w-5" />
            </button>
          </div>
        </PopoverTrigger>
        <PopoverContent
          className="w-52 p-1"
          align="center"
          side="top"
          sideOffset={8}
        >
          <div className="space-y-0.5">
            {/* Create New Project */}
            <button
              onClick={() => {
                setIsProjectDialogOpen(true);
                setIsPopoverOpen(false);
              }}
              className="flex items-center gap-2.5 w-full p-2.5 text-left hover:bg-primary/5 hover:text-foreground rounded-md transition-colors group"
            >
              <div className="w-7 h-7 rounded-full bg-primary/10 group-hover:bg-primary/15 flex items-center justify-center transition-colors">
                <FontAwesomeIcon
                  icon={faProjectDiagram}
                  className="h-3.5 w-3.5 text-primary"
                />
              </div>
              <div className="flex-1">
                <div className="font-medium text-sm">Create New Project</div>
                <div className="text-xs text-muted-foreground group-hover:text-muted-foreground/80">
                  Start a new project
                </div>
              </div>
            </button>

            {/* Create New Training */}
            <button
              onClick={() => {
                setIsTrainingDialogOpen(true);
                setIsPopoverOpen(false);
              }}
              className="flex items-center gap-2.5 w-full p-2.5 text-left hover:bg-primary/5 hover:text-foreground rounded-md transition-colors group"
            >
              <div className="w-7 h-7 rounded-full bg-primary/10 group-hover:bg-primary/15 flex items-center justify-center transition-colors">
                <FontAwesomeIcon
                  icon={faGraduationCap}
                  className="h-3.5 w-3.5 text-primary"
                />
              </div>
              <div className="flex-1">
                <div className="font-medium text-sm">Create New Training</div>
                <div className="text-xs text-muted-foreground group-hover:text-muted-foreground/80">
                  Start learning something new
                </div>
              </div>
            </button>

            {/* View Calendar */}
            <Link
              href="/calendar"
              onClick={() => setIsPopoverOpen(false)}
              className="flex items-center gap-2.5 w-full p-2.5 text-left hover:bg-primary/5 hover:text-foreground rounded-md transition-colors group"
            >
              <div className="w-7 h-7 rounded-full bg-primary/10 group-hover:bg-primary/15 flex items-center justify-center transition-colors">
                <FontAwesomeIcon
                  icon={faCalendarAlt}
                  className="h-3.5 w-3.5 text-primary"
                />
              </div>
              <div className="flex-1">
                <div className="font-medium text-sm">View My Calendar</div>
                <div className="text-xs text-muted-foreground group-hover:text-muted-foreground/80">
                  Check your schedule
                </div>
              </div>
            </Link>

            {/* Create New Training */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2.5 w-full p-2.5 text-left hover:bg-primary/5 hover:text-foreground rounded-md transition-colors group"
            >
              <div className="w-7 h-7 rounded-full bg-primary/10 group-hover:bg-primary/15 flex items-center justify-center transition-colors">
                <FontAwesomeIcon
                  icon={faSignOutAlt}
                  className="h-3.5 w-3.5 text-primary"
                />
              </div>
              <div className="flex-1">
                <div className="font-medium text-sm">Logout</div>
                <div className="text-xs text-muted-foreground group-hover:text-muted-foreground/80">
                  click to log out from the Application
                </div>
              </div>
            </button>
          </div>
        </PopoverContent>
      </Popover>

      {/* Dialog Components */}
      <CreateProjectDialog
        isOpen={isProjectDialogOpen}
        onClose={() => setIsProjectDialogOpen(false)}
        onCreate={handleCreateProject}
      />

      <CreateTrainingDialog
        isOpen={isTrainingDialogOpen}
        onClose={() => setIsTrainingDialogOpen(false)}
        onCreate={handleCreateTraining}
      />
    </>
  );
}

export function NavigationMenu() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <div className="h-16 fixed bottom-0 px-4 py-2  bg-background/95 backdrop-blur-sm border-t border-border  flex flex-row items-center w-full justify-around">
      {/* Projects */}
      <Link
        href="/projects"
        className={cn(
          "group flex flex-col items-center gap-1 hover:text-primary p-2 rounded-lg transition-colors w-[60px]",
          isActive("/projects") ? "text-primary" : "text-muted-foreground"
        )}
      >
        <FontAwesomeIcon
          icon={faTasks}
          className={cn(
            "h-5 w-5 transition-transform group-hover:scale-110",
            isActive("/projects") && "text-primary"
          )}
        />
        <span
          className={cn(
            "text-xs font-medium group-hover:text-primary transition-colors",
            isActive("/projects") && "text-primary"
          )}
        >
          Projects
        </span>
      </Link>

      {/* Trainings */}
      <Link
        href="/trainings"
        className={cn(
          "group flex flex-col items-center gap-1 hover:text-primary p-2 rounded-lg transition-colors w-[60px]",
          isActive("/trainings") ? "text-primary" : "text-muted-foreground"
        )}
      >
        <FontAwesomeIcon
          icon={faGraduationCap}
          className={cn(
            "h-5 w-5 transition-transform group-hover:scale-110",
            isActive("/trainings") && "text-primary"
          )}
        />
        <span
          className={cn(
            "text-xs font-medium group-hover:text-primary transition-colors",
            isActive("/trainings") && "text-primary"
          )}
        >
          Trainings
        </span>
      </Link>

      <CreateNewButton />

      {/* Media */}
      <Link
        href="/media"
        className={cn(
          "group flex flex-col items-center gap-1 hover:text-primary p-2 rounded-lg transition-colors w-[60px]",
          isActive("/media") ? "text-primary" : "text-muted-foreground"
        )}
      >
        <FontAwesomeIcon
          icon={faPhotoFilm}
          className={cn(
            "h-5 w-5 transition-transform group-hover:scale-110",
            isActive("/media") && "text-primary"
          )}
        />
        <span
          className={cn(
            "text-xs font-medium group-hover:text-primary transition-colors",
            isActive("/media") && "text-primary"
          )}
        >
          Media
        </span>
      </Link>

      {/* Sticky notes */}
      <Link
        href="/sticky-note"
        className={cn(
          "group flex flex-col items-center gap-1 hover:text-primary p-2 rounded-lg transition-colors w-[60px]",
          isActive("/sticky-note") ? "text-primary" : "text-muted-foreground"
        )}
      >
        <FontAwesomeIcon
          icon={faStickyNote}
          className={cn(
            "h-5 w-5 transition-transform group-hover:scale-110",
            isActive("/sticky-note") && "text-primary"
          )}
        />
        <span
          className={cn(
            "text-xs font-medium group-hover:text-primary transition-colors",
            isActive("/sticky-note") && "text-primary"
          )}
        >
          Notes
        </span>
      </Link>

      {/* Calendar */}
      {/* <Link
        href="/calendar"
        className={cn(
          "group flex flex-col items-center gap-1 hover:text-primary p-2 rounded-lg transition-colors",
          isActive("/calendar") ? "text-primary" : "text-muted-foreground"
        )}
      >
        <FontAwesomeIcon
          icon={faCalendarAlt}
          className={cn(
            "h-5 w-5 transition-transform group-hover:scale-110",
            isActive("/calendar") && "text-primary"
          )}
        />
        <span
          className={cn(
            "text-xs font-medium group-hover:text-primary transition-colors",
            isActive("/calendar") && "text-primary"
          )}
        >
          Calendar
        </span>
      </Link> */}
    </div>
  );
}
