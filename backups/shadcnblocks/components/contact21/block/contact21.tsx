"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CornerDownRight, LoaderIcon } from "lucide-react";
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

interface Contact21Props {
  className?: string;
  onSubmit?: (data: ContactFormData) => Promise<void>;
}

const Contact21 = ({ className, onSubmit }: Contact21Props) => {
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
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mt-20 flex flex-col justify-between gap-15 md:gap-10 lg:flex-row">
          <div className="flex w-full max-w-lg flex-col justify-between gap-10">
            <p className="indent-[22%] text-3xl font-medium tracking-tight text-muted-foreground/50 lg:text-4xl">
              We are a team of creators, thinkers, and builders who believe in
              crafting experiences that truly connect.{" "}
              <span className="text-foreground">We're here to help</span>
            </p>
            <div className="mt-5 flex items-center gap-4 lg:mt-20">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/avatar3.png"
                className="size-12"
                alt="avatar"
              />
              <div>
                <h3 className="text-lg font-medium tracking-tight">John Doe</h3>
                <p className="text-sm text-foreground/40">Creative Director</p>
              </div>
            </div>
          </div>
          <div className="col-span-4 flex w-full flex-col gap-2 lg:pl-10">
            <h1 className="mb-7 text-6xl font-semibold tracking-tight lg:text-5xl">
              Get in Touch
            </h1>

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

            <form onSubmit={form.handleSubmit(handleFormSubmit)}>
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
                        className="h-15 rounded-none border-0 border-b border-b-foreground/25 !bg-transparent shadow-none placeholder:text-foreground/20 focus-visible:ring-0 lg:text-base"
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
                        className="h-15 rounded-none border-0 border-b border-b-foreground/25 !bg-transparent shadow-none placeholder:text-foreground/20 focus-visible:ring-0 lg:text-base"
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
                        className="h-15 rounded-none border-0 border-b border-b-foreground/25 !bg-transparent shadow-none placeholder:text-foreground/20 focus-visible:ring-0 lg:text-base"
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
                  className="mt-15 flex items-center justify-start gap-2 rounded-none !px-8 lg:h-12 lg:text-base"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? (
                    <>
                      <LoaderIcon className="size-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <CornerDownRight className="size-5" />
                      Get in touch
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

export { Contact21 };
