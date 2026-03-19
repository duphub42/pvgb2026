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
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),
  company: z.string().optional(),
  message: z.string().min(1, "Message is required"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

interface Contact31Props {
  title?: string;
  description?: string;
  image?: string;
  className?: string;
  onSubmit?: (data: ContactFormData) => Promise<void>;
}

const Contact31 = ({
  title = "Get in Touch",
  description = "Whether you have a question about our services, pricing, or anything else, our team is ready to answer all your questions.",
  image = "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/Modern%20Architectural%20Elegance%20at%20Twilight.png",
  className,
  onSubmit,
}: Contact31Props) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      name: "",
      email: "",
      company: "",
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
        <div className="mx-auto grid max-w-6xl overflow-hidden rounded-2xl bg-muted/50 lg:grid-cols-2">
          <div className="relative hidden lg:block">
            <img
              src={image}
              alt="Contact"
              className="absolute inset-0 size-full object-cover"
            />
          </div>

          <div className="p-8 md:p-12 lg:p-16">
            <div className="mb-8">
              <h1 className="mb-4 text-3xl font-medium tracking-tight md:text-4xl">
                {title}
              </h1>
              <p className="text-muted-foreground">{description}</p>
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
                          className="bg-background"
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
                          className="bg-background"
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
                  name="company"
                  render={({ field }) => (
                    <Field>
                      <FieldLabel htmlFor={field.name}>Company</FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        placeholder="Your company"
                        className="bg-background"
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
                        placeholder="How can we help?"
                        rows={5}
                        className="bg-background"
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

export { Contact31 };
