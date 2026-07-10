import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

import { useCreateJobOpening } from "../hooks/useCreateJobOpening";
import { useDepartments } from "@/features/departments/hooks/useDepartments";

const formSchema = z.object({
  departmentId: z.string().min(1, "Please select a department."),
  title: z.string().min(2, "Title must be at least 2 characters."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  location: z.string().min(2, "Location must be at least 2 characters."),
  employmentType: z.enum(["full-time", "part-time", "contract", "internship"]),
  isActive: z.boolean(),
});

type FormValues = z.infer<typeof formSchema>;

export function CreateJobOpeningDialog() {
  const [open, setOpen] = useState(false);
  const { data: departmentsData, isLoading: isLoadingDepartments } = useDepartments();

  const { register, handleSubmit, reset, control, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      departmentId: "",
      title: "",
      description: "",
      location: "",
      employmentType: "full-time",
      isActive: true,
    },
  });

  const { mutate, isPending } = useCreateJobOpening(() => {
    setOpen(false);
    reset();
  });

  function onSubmit(values: FormValues) {
    mutate(values);
  }

  const handleOpenChange = (newOpen: boolean) => {
    if (!isPending) {
      setOpen(newOpen);
      if (!newOpen) {
        reset();
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger render={
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Job
        </Button>
      } />
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Job Opening</DialogTitle>
          <DialogDescription>
            Create a new job posting for your organization.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4 pt-4 pb-6 max-h-[60vh] overflow-y-auto px-1">
          <div className="space-y-2">
            <Label htmlFor="title">Job Title</Label>
            <Input id="title" placeholder="e.g. Senior Frontend Developer" {...register("title")} />
            {errors.title && (
              <p className="text-sm font-medium text-destructive">{errors.title.message}</p>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="departmentId">Department</Label>
              <Controller
                control={control}
                name="departmentId"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger id="departmentId" className="bg-white">
                      <SelectValue placeholder={isLoadingDepartments ? "Loading..." : "Select department"}>
                        {field.value ? departmentsData?.data?.find(d => d.id === field.value)?.name : undefined}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {departmentsData?.data?.map((dept) => (
                        <SelectItem key={dept.id} value={dept.id}>
                          {dept.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.departmentId && (
                <p className="text-sm font-medium text-destructive">{errors.departmentId.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="employmentType">Employment Type</Label>
              <Controller
                control={control}
                name="employmentType"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger id="employmentType" className="bg-white">
                      <SelectValue placeholder="Select type">
                        {field.value ? {
                          "full-time": "Full-time",
                          "part-time": "Part-time",
                          "contract": "Contract",
                          "internship": "Internship"
                        }[field.value] : undefined}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.employmentType && (
                <p className="text-sm font-medium text-destructive">{errors.employmentType.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" placeholder="e.g. Remote, New York, etc." {...register("location")} />
            {errors.location && (
              <p className="text-sm font-medium text-destructive">{errors.location.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Job Description</Label>
            <Textarea 
              id="description"
              placeholder="Describe the responsibilities and requirements..." 
              className="resize-none h-32" 
              {...register("description")} 
            />
            {errors.description && (
              <p className="text-sm font-medium text-destructive">{errors.description.message}</p>
            )}
          </div>

          <div className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm bg-slate-50 dark:bg-slate-900/50">
            <div className="space-y-0.5">
              <Label htmlFor="isActive" className="text-base">
                Active Status
              </Label>
              <p className="text-sm text-muted-foreground">
                Make this job posting visible to candidates.
              </p>
            </div>
            <Controller
              control={control}
              name="isActive"
              render={({ field }) => (
                <Switch
                  id="isActive"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
          </div>

          </div>
          <DialogFooter className="pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => handleOpenChange(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Create Job"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
