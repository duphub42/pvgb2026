"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CornerDownRight, LoaderIcon, Mail, Smartphone } from "lucide-react";
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
import { cn } from "@/lib/utils";

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),
  message: z.string().min(1, "Message is required"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

interface Contact16Props {
  className?: string;
  onSubmit?: (data: ContactFormData) => Promise<void>;
}

const Contact16 = ({ className, onSubmit }: Contact16Props) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      name: "",
      email: "",
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
    <section
      className={cn("dark bg-background py-32 text-foreground", className)}
    >
      <div className="container">
        <h1 className="text-5xl font-semibold tracking-tight lg:text-8xl">
          Get in Touch
          <sup>*</sup>
        </h1>
        <div className="mt-20 flex flex-col justify-between gap-10 lg:flex-row">
          <div className="w-full max-w-md">
            <p className="tracking-tight text-muted-foreground/50">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              vel ratione natus nihil harum, perferendis sint facilis possimus
              reprehenderit optio!
            </p>
            <div className="mt-10 flex justify-between">
              <a
                className="flex items-center gap-1 text-foreground/40 hover:text-foreground"
                href="tel:+1020020023"
              >
                {" "}
                <Smartphone className="h-4 w-4" /> +102 002 0023
              </a>
              <a
                className="flex items-center gap-1 text-foreground/40 hover:text-foreground"
                href="mailto:hello@company.com"
              >
                {" "}
                <Mail className="h-4 w-4" /> hello@company.com
              </a>
            </div>
          </div>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="col-span-4 flex w-full flex-col gap-2 lg:pl-30"
          >
            {isSubmitted && (
              <div
                className={cn(
                  "mb-4 rounded-lg border border-green-500/20 bg-green-500/10 p-4 text-center transition-opacity duration-500",
                  showSuccess ? "opacity-100" : "opacity-0",
                )}
              >
                <p className="text-sm font-medium text-green-600 dark:text-green-400">
                  Thank you! We'll be in touch soon.
                </p>
              </div>
            )}

            <FieldGroup className="gap-0">
              <Controller
                control={form.control}
                name="name"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name} className="sr-only">
                      Name
                    </FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Name*"
                      className="h-19 rounded-none border-0 border-b border-b-foreground/15 !bg-transparent placeholder:text-foreground/20 focus-visible:ring-0"
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
                    <FieldLabel htmlFor={field.name} className="sr-only">
                      Email
                    </FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      type="email"
                      aria-invalid={fieldState.invalid}
                      placeholder="Email*"
                      className="h-19 rounded-none border-0 border-b border-b-foreground/15 !bg-transparent placeholder:text-foreground/20 focus-visible:ring-0"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name="message"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name} className="sr-only">
                      Message
                    </FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Message (Tell us about your project)"
                      className="h-19 rounded-none border-0 border-b border-b-foreground/15 !bg-transparent placeholder:text-foreground/20 focus-visible:ring-0"
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
                type="submit"
                variant="ghost"
                className="mt-15 flex h-15 items-center justify-start gap-2 text-base"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <>
                    <LoaderIcon className="size-6 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <CornerDownRight className="size-6" />
                    Get in touch
                  </>
                )}
              </Button>
            </FieldGroup>
          </form>
        </div>
      </div>
    </section>
  );
};

export { Contact16 };
