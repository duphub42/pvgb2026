"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon } from "lucide-react";
import { useState } from "react";
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

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),
  subject: z.string().optional(),
  message: z.string().min(1, "Message is required"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

interface Contact33Props {
  title?: string;
  description?: string;
  image?: string;
  className?: string;
  onSubmit?: (data: ContactFormData) => Promise<void>;
}

const Contact33 = ({
  title = "Start a Conversation",
  description = "We're here to help bring your ideas to life. Tell us about your project.",
  image = "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/Modern%20Architectural%20Elegance%20at%20Twilight.png",
  className,
  onSubmit,
}: Contact33Props) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const handleFormSubmit = async (data: ContactFormData) => {
    try {
      if (onSubmit) {
        await onSubmit(data);
      } else {
        console.log("Form submitted:", data);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      setIsSubmitted(true);
      setShowSuccess(true);
      form.reset();
      setTimeout(() => setShowSuccess(false), 4500);
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch {
      form.setError("root", {
        message: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Form Side */}
            <div>
              <div className="mb-10">
                <h1 className="mb-4 text-4xl font-medium tracking-tight md:text-5xl">
                  {title}
                </h1>
                <p className="text-lg text-muted-foreground">{description}</p>
              </div>

              {isSubmitted && (
                <div
                  className={cn(
                    "mb-6 rounded-lg border border-green-500/20 bg-green-500/10 p-4 text-center transition-opacity duration-500",
                    showSuccess ? "opacity-100" : "opacity-0",
                  )}
                >
                  <p className="text-sm font-medium text-green-600 dark:text-green-400">
                    Thank you! We'll be in touch soon.
                  </p>
                </div>
              )}

              <form onSubmit={form.handleSubmit(handleFormSubmit)}>
                <FieldGroup>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Controller
                      control={form.control}
                      name="name"
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>
                            Name <span className="text-destructive">*</span>
                          </FieldLabel>
                          <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder="Your name"
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />

                    <Controller
                      control={form.control}
                      name="email"
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>
                            Email <span className="text-destructive">*</span>
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
                  </div>

                  <Controller
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <Field>
                        <FieldLabel htmlFor={field.name}>Subject</FieldLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger id={field.name}>
                            <SelectValue placeholder="What can we help with?" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">
                              General Inquiry
                            </SelectItem>
                            <SelectItem value="project">New Project</SelectItem>
                            <SelectItem value="collaboration">
                              Collaboration
                            </SelectItem>
                            <SelectItem value="press">Press & Media</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </Field>
                    )}
                  />

                  <Controller
                    control={form.control}
                    name="message"
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>
                          Message <span className="text-destructive">*</span>
                        </FieldLabel>
                        <Textarea
                          {...field}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          placeholder="Tell us about your project or inquiry..."
                          rows={6}
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  {form.formState.errors.root && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.root.message}
                    </p>
                  )}

                  <Button
                    size="lg"
                    className="w-full sm:w-auto"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? (
                      <>
                        <LoaderIcon className="mr-2 size-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </FieldGroup>
              </form>
            </div>

            {/* Image Side */}
            <div className="hidden lg:block">
              <div className="h-full overflow-hidden rounded-2xl">
                <img src={image} alt="" className="size-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Contact33 };
