"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, LoaderIcon, Paperclip, X } from "lucide-react";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const ticketSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),
  category: z.string().min(1, "Please select a category"),
  priority: z.string().min(1, "Please select a priority"),
  subject: z.string().min(1, "Subject is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

type TicketFormData = z.infer<typeof ticketSchema>;

interface Category {
  value: string;
  label: string;
}

interface Help4Props {
  title?: string;
  description?: string;
  categories?: Category[];
  className?: string;
  onSubmit?: (data: TicketFormData & { files: File[] }) => Promise<void>;
}

const Help4 = ({
  title = "Submit a Support Ticket",
  description = "Describe your issue and we'll get back to you as soon as possible.",
  categories = [
    { value: "technical", label: "Technical Issue" },
    { value: "billing", label: "Billing & Payments" },
    { value: "account", label: "Account Access" },
    { value: "feature", label: "Feature Request" },
    { value: "bug", label: "Bug Report" },
    { value: "other", label: "Other" },
  ],
  className,
  onSubmit,
}: Help4Props) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<TicketFormData>({
    resolver: zodResolver(ticketSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      email: "",
      category: "",
      priority: "",
      subject: "",
      description: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const maxSize = 10 * 1024 * 1024; // 10MB
    const validFiles = selectedFiles.filter((file) => file.size <= maxSize);
    setFiles((prev) => [...prev, ...validFiles].slice(0, 5)); // Max 5 files
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFormSubmit = async (data: TicketFormData) => {
    try {
      if (onSubmit) {
        await onSubmit({ ...data, files });
      } else {
        console.log("Ticket submitted:", { ...data, files });
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      setIsSubmitted(true);
      setShowSuccess(true);
      form.reset();
      setFiles([]);
      setTimeout(() => setShowSuccess(false), 4500);
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch {
      form.setError("root", {
        message: "Something went wrong. Please try again.",
      });
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto max-w-2xl">
          <div className="mb-10 text-center">
            <h1 className="mb-4 text-4xl font-medium tracking-tight md:text-5xl">
              {title}
            </h1>
            <p className="text-muted-foreground">{description}</p>
          </div>

          <div className="rounded-xl border bg-background p-8">
            {isSubmitted && (
              <div
                className={cn(
                  "mb-6 rounded-lg border border-green-500/20 bg-green-500/10 p-4 text-center transition-opacity duration-500",
                  showSuccess ? "opacity-100" : "opacity-0",
                )}
              >
                <p className="text-sm font-medium text-green-600 dark:text-green-400">
                  Your ticket has been submitted. Check your email for
                  confirmation.
                </p>
              </div>
            )}

            <form onSubmit={form.handleSubmit(handleFormSubmit)}>
              <FieldGroup>
                <Controller
                  control={form.control}
                  name="email"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>
                        Email Address{" "}
                        <span className="text-destructive">*</span>
                      </FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        type="email"
                        aria-invalid={fieldState.invalid}
                        placeholder="you@example.com"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <Controller
                    control={form.control}
                    name="category"
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>
                          Category <span className="text-destructive">*</span>
                        </FieldLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger id={field.name}>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((cat) => (
                              <SelectItem key={cat.value} value={cat.value}>
                                {cat.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    control={form.control}
                    name="priority"
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>
                          Priority <span className="text-destructive">*</span>
                        </FieldLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger id={field.name}>
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="urgent">
                              <span className="flex items-center gap-2">
                                <AlertCircle className="size-4 text-destructive" />
                                Urgent
                              </span>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </div>

                <Controller
                  control={form.control}
                  name="subject"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>
                        Subject <span className="text-destructive">*</span>
                      </FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="Brief summary of your issue"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  control={form.control}
                  name="description"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>
                        Description <span className="text-destructive">*</span>
                      </FieldLabel>
                      <Textarea
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="Please provide as much detail as possible..."
                        rows={6}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <div>
                  <FieldLabel>Attachments</FieldLabel>
                  <p className="mb-3 text-xs text-muted-foreground">
                    Upload up to 5 files (max 10MB each). Supported: images,
                    PDFs, text files.
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    accept="image/*,.pdf,.txt,.doc,.docx"
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={files.length >= 5}
                  >
                    <Paperclip className="mr-2 size-4" />
                    Attach Files
                  </Button>

                  {files.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {files.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between rounded-lg border bg-muted/50 px-3 py-2"
                        >
                          <div className="flex items-center gap-2 overflow-hidden">
                            <Paperclip className="size-4 shrink-0 text-muted-foreground" />
                            <span className="truncate text-sm">
                              {file.name}
                            </span>
                            <span className="shrink-0 text-xs text-muted-foreground">
                              ({formatFileSize(file.size)})
                            </span>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(index)}
                            className="size-8 p-0"
                          >
                            <X className="size-4" />
                            <span className="sr-only">Remove file</span>
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {form.formState.errors.root && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.root.message}
                  </p>
                )}

                <Button
                  size="lg"
                  className="w-full"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? (
                    <>
                      <LoaderIcon className="mr-2 size-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Ticket"
                  )}
                </Button>
              </FieldGroup>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Help4 };
