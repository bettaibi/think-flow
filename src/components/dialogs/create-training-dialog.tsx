"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
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

const trainingSchema = z.object({
  title: z
    .string()
    .min(1, "Training title is required")
    .min(3, "Training title must be at least 3 characters")
    .max(100, "Training title must be less than 100 characters"),
  description: z
    .string()
    .max(500, "Description must be less than 500 characters")
    .optional(),
  type: z.enum(["course", "workshop", "certification", "self-study"]),
  priority: z.enum(["low", "medium", "high"]),
  estimatedDuration: z
    .string()
    .max(50, "Estimated duration must be less than 50 characters")
    .optional(),
  tags: z.string().max(200, "Tags must be less than 200 characters").optional(),
});

type TrainingFormData = z.infer<typeof trainingSchema>;

interface CreateTrainingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate?: (trainingData: TrainingFormData) => void;
}

export function CreateTrainingDialog({
  isOpen,
  onClose,
  onCreate,
}: CreateTrainingDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TrainingFormData>({
    resolver: zodResolver(trainingSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "course",
      priority: "medium",
      estimatedDuration: "",
      tags: "",
    },
  });

  const onSubmit = async (data: TrainingFormData) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      onCreate?.(data);

      // Reset form and close dialog
      reset();
      onClose();
    } catch (error) {
      console.error("Failed to create training:", error);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      reset();
      onClose();
    }
  };

  const typeOptions = [
    { value: "course", label: "Online Course" },
    { value: "workshop", label: "Workshop" },
    { value: "certification", label: "Certification" },
    { value: "self-study", label: "Self Study" },
  ];

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
                icon={faGraduationCap}
                className="w-5 h-5 text-primary"
              />
            </div>
            Create New Training
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input
              label="Training Title"
              placeholder="Enter training title..."
              {...register("title")}
              error={errors.title?.message}
              disabled={isSubmitting}
            />
          </div>

          <div>
            <TextArea
              label="Description"
              placeholder="Describe what you'll learn..."
              {...register("description")}
              error={errors.description?.message}
              rows={3}
              disabled={isSubmitting}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Select
                label="Training Type"
                {...register("type")}
                options={typeOptions}
                disabled={isSubmitting}
              />
              {errors.type && (
                <p className="text-destructive text-sm mt-1">
                  {errors.type.message}
                </p>
              )}
            </div>
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
          </div>

          <div>
            <Input
              label="Estimated Duration"
              placeholder="e.g., 4 hours, 2 weeks"
              {...register("estimatedDuration")}
              error={errors.estimatedDuration?.message}
              disabled={isSubmitting}
            />
          </div>

          <div>
            <Input
              label="Tags"
              placeholder="javascript, react, frontend (comma separated)"
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
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-current border-t-transparent animate-spin rounded-full" />
                  Creating...
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faGraduationCap} className="w-4 h-4" />
                  Create Training
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
