"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faProjectDiagram } from "@fortawesome/free-solid-svg-icons";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/Dialog";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { TextArea } from "@/components/TextArea";
import { Select } from "@/components/Select";
import { createProject } from "../actions";
import { useAction } from "@/hooks/useAction";

const projectSchema = z.object({
  name: z
    .string()
    .min(1, "Project name is required")
    .min(3, "Project name must be at least 3 characters")
    .max(100, "Project name must be less than 100 characters"),
  description: z
    .string()
    .max(500, "Description must be less than 500 characters")
    .optional(),
  priority: z.enum(["low", "medium", "high"]),
  estimatedTime: z
    .string()
    .max(50, "Estimated time must be less than 50 characters"),
  tags: z.string().max(200, "Tags must be less than 200 characters").optional(),
});

type ProjectFormData = z.infer<typeof projectSchema>;

interface CreateProjectDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate?: (projectData: ProjectFormData) => void;
}

export function CreateProjectDialog({
  isOpen,
  onClose,
}: CreateProjectDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      description: "",
      priority: "medium",
      estimatedTime: "",
      tags: "",
    },
  });

  const {execute, loading: isLoading} = useAction(createProject, {
    onSuccess: (result) => {
      console.log(result);
      // Reset form and close dialog
      handleClose();
    },
    onError: (err) => {
      console.log("Erooooooor: ", err);
    }
  });


  const onSubmit = async (data: ProjectFormData) => {
    try {
      // API call
      const payload= {
        ...data,
        progres: 0,
        status: "pending",
      }
      
      await execute(payload);
    } catch (error) {
      console.error("Failed to create project:", error);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      reset();
      onClose();
    }
  };

  const priorityOptions = [
    { value: "low", label: "Low Priority" },
    { value: "medium", label: "Medium Priority" },
    { value: "high", label: "High Priority" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <FontAwesomeIcon
                icon={faProjectDiagram}
                className="w-5 h-5 text-primary"
              />
            </div>
            Create New Project
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" autoComplete="off">
          <div>
            <Input
              label="Project Name"
              placeholder="Enter project name..."
              {...register("name")}
              error={errors.name?.message}
              disabled={isSubmitting}
            />
          </div>

          <div>
            <TextArea
              label="Description"
              placeholder="Describe your project..."
              {...register("description")}
              error={errors.description?.message}
              rows={3}
              disabled={isSubmitting}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Select
                label="Priority"
                {...register("priority")}
                options={priorityOptions}
                disabled={isSubmitting}
              />
              {errors.priority && (
                <p className="text-destructive text-sm mt-1">
                  {errors.priority.message}
                </p>
              )}
            </div>
            <div>
              <Input
                label="Estimated Time"
                placeholder="e.g., 2 weeks"
                {...register("estimatedTime")}
                error={errors.estimatedTime?.message}
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div>
            <Input
              label="Tags"
              placeholder="web, frontend, react (comma separated)"
              {...register("tags")}
              error={errors.tags?.message}
              disabled={isSubmitting}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2"
            >
              {isSubmitting || isLoading? (
                <>
                  <div className="w-4 h-4 border-2 border-current border-t-transparent animate-spin rounded-full" />
                  Creating...
                </>
              ) : (
                <>
                  <FontAwesomeIcon
                    icon={faProjectDiagram}
                    className="w-4 h-4"
                  />
                  Create Project
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
