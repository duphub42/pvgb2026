"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon, Mail, MapPin, Phone } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),
  phone: z.string().optional(),
  message: z.string().min(1, "Message is required"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

interface Contact30Props {
  title?: string;
  subtitle?: string;
  email?: string;
  phone?: string;
  address?: string;
  className?: string;
  onSubmit?: (data: ContactFormData) => Promise<void>;
}

const Contact30 = ({
  title = "Let's Talk",
  subtitle = "Have a project in mind? We would love to hear from you.",
  email = "hello@company.com",
  phone = "+1 (555) 123-4567",
  address = "123 Innovation Drive, San Francisco, CA 94102",
  className,
  onSubmit,
}: Contact30Props) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
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
    <section className={cn("relative min-h-screen bg-muted/30", className)}>
      <div className="container flex min-h-screen flex-col justify-center py-20">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div className="flex flex-col justify-center">
            <h1 className="mb-6 text-5xl font-medium tracking-tight md:text-6xl lg:text-7xl">
              {title}
            </h1>
            <p className="mb-12 text-xl text-muted-foreground md:text-2xl">
              {subtitle}
            </p>

            <div className="space-y-6">
              <a
                href={`mailto:${email}`}
                className="group flex items-center gap-4 text-lg"
              >
                <div className="flex size-12 items-center justify-center rounded-full bg-background shadow-sm">
                  <Mail className="size-5 text-muted-foreground" />
                </div>
                <span className="group-hover:underline">{email}</span>
              </a>
              <a
                href={`tel:${phone}`}
                className="group flex items-center gap-4 text-lg"
              >
                <div className="flex size-12 items-center justify-center rounded-full bg-background shadow-sm">
                  <Phone className="size-5 text-muted-foreground" />
                </div>
                <span className="group-hover:underline">{phone}</span>
              </a>
              <div className="flex items-center gap-4 text-lg">
                <div className="flex size-12 items-center justify-center rounded-full bg-background shadow-sm">
                  <MapPin className="size-5 text-muted-foreground" />
                </div>
                <span className="text-muted-foreground">{address}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <form
              onSubmit={form.handleSubmit(handleFormSubmit)}
              className="w-full rounded-2xl bg-background p-8 shadow-lg md:p-10"
            >
              <h2 className="mb-8 text-2xl font-semibold">Send a Message</h2>

              {isSubmitted && (
                <div
                  className={cn(
                    "mb-6 rounded-lg border border-green-500/20 bg-green-500/10 p-4 text-center transition-opacity duration-500",
                    showSuccess ? "opacity-100" : "opacity-0",
                  )}
                >
                  <p className="text-sm font-medium text-green-600 dark:text-green-400">
                    Thank you! Your message has been sent.
                  </p>
                </div>
              )}

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
                  name="phone"
                  render={({ field }) => (
                    <Field>
                      <FieldLabel htmlFor={field.name}>Phone</FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                      />
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
                        placeholder="Tell us about your project..."
                        rows={5}
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
                  className="w-full"
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
        </div>
      </div>
    </section>
  );
};

export { Contact30 };
