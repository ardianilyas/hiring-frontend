import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateDepartment } from "../hooks/useUpdateDepartment";
import type { Department } from "../types";

const formSchema = z.object({
  name: z.string().min(2, "Department name must be at least 2 characters."),
  description: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface EditDepartmentDialogProps {
  department: Department | null;
  onClose: () => void;
}

export function EditDepartmentDialog({ department, onClose }: EditDepartmentDialogProps) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  // Update form default values when the selected department changes
  useEffect(() => {
    if (department) {
      reset({
        name: department.name,
        description: department.description || "",
      });
    }
  }, [department, reset]);

  const { mutate, isPending } = useUpdateDepartment(() => {
    onClose();
  });

  function onSubmit(values: FormValues) {
    if (!department) return;
    mutate({ id: department.id, payload: values });
  }

  const handleOpenChange = (open: boolean) => {
    if (!open && !isPending) {
      onClose();
    }
  };

  return (
    <Dialog open={!!department} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Department</DialogTitle>
          <DialogDescription>
            Make changes to the department details here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="edit-name">Name</Label>
            <Input id="edit-name" placeholder="e.g. Engineering" {...register("name")} />
            {errors.name && (
              <p className="text-sm font-medium text-destructive">{errors.name.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-description">Description (Optional)</Label>
            <Textarea 
              id="edit-description"
              placeholder="Briefly describe the department..." 
              className="resize-none" 
              {...register("description")} 
            />
            {errors.description && (
              <p className="text-sm font-medium text-destructive">{errors.description.message}</p>
            )}
          </div>
          <DialogFooter className="pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
