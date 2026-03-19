"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, LoaderIcon, Mail, Phone } from "lucide-react";
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
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),
  message: z.string().min(1, "Message is required"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

interface Contact32Props {
  title?: string;
  subtitle?: string;
  description?: string;
  email?: string;
  phone?: string;
  image?: string;
  className?: string;
  onSubmit?: (data: ContactFormData) => Promise<void>;
}

const Contact32 = ({
  title = "Contact Us",
  subtitle = "Let's create something amazing together",
  description = "Fill out the form and our team will get back to you within 24 hours.",
  email = "hello@studio.com",
  phone = "+1 (555) 123-4567",
  image = "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/Modern%20Architectural%20Elegance%20at%20Twilight.png",
  className,
  onSubmit,
}: Contact32Props) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      firstName: "",
      lastName: "",
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
    <section className={cn("relative", className)}>
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Image Side */}
        <div className="relative hidden lg:block">
          <img
            src={image}
            alt=""
            className="absolute inset-0 size-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative flex h-full flex-col justify-end p-12 text-white">
            <p className="mb-2 text-sm tracking-widest uppercase opacity-80">
              Get in touch
            </p>
            <h2 className="text-4xl font-medium">{subtitle}</h2>
          </div>
        </div>

        {/* Form Side */}
        <div className="flex flex-col justify-center px-6 py-16 md:px-12 lg:px-16">
          <div className="mx-auto w-full max-w-md">
            <div className="mb-10">
              <h1 className="mb-4 text-4xl font-medium tracking-tight md:text-5xl">
                {title}
              </h1>
              <p className="text-muted-foreground">{description}</p>
            </div>

            <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:gap-8">
              <a
                href={`mailto:${email}`}
                className="group flex items-center gap-2 text-sm"
              >
                <Mail className="size-4 text-muted-foreground" />
                <span className="group-hover:underline">{email}</span>
              </a>
              <a
                href={`tel:${phone}`}
                className="group flex items-center gap-2 text-sm"
              >
                <Phone className="size-4 text-muted-foreground" />
                <span className="group-hover:underline">{phone}</span>
              </a>
            </div>

            {isSubmitted && (
              <div
                className={cn(
                  "mb-6 rounded-lg border border-green-500/20 bg-green-500/10 p-4 text-center transition-opacity duration-500",
                  showSuccess ? "opacity-100" : "opacity-0",
                )}
              >
                <p className="text-sm font-medium text-green-600 dark:text-green-400">
                  Message sent! We'll be in touch soon.
                </p>
              </div>
            )}

            <form onSubmit={form.handleSubmit(handleFormSubmit)}>
              <FieldGroup>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Controller
                    control={form.control}
                    name="firstName"
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>
                          First Name <span className="text-destructive">*</span>
                        </FieldLabel>
                        <Input
                          {...field}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          placeholder="John"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    control={form.control}
                    name="lastName"
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>
                          Last Name <span className="text-destructive">*</span>
                        </FieldLabel>
                        <Input
                          {...field}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          placeholder="Doe"
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
                        placeholder="john@example.com"
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
                    <>
                      Send Message
                      <ArrowRight className="ml-2 size-4" />
                    </>
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

export { Contact32 };
