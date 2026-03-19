"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronsUp, LoaderIcon } from "lucide-react";
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
  phone: z.string().optional(),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),
  message: z.string().min(1, "Message is required"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

interface Contact18Props {
  className?: string;
  onSubmit?: (data: ContactFormData) => Promise<void>;
}

const Contact18 = ({ className, onSubmit }: Contact18Props) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const supportFeatures = [
    { text: "24/7 Full time support" },
    { text: "Quick response within 2 hours" },
    { text: "Expert consultation available" },
    { text: "Free project assessment" },
  ];

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      name: "",
      phone: "",
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
        <div className="mt-20 flex max-h-120 flex-col justify-between gap-15 md:gap-10 lg:flex-row">
          <div className="flex w-full max-w-lg flex-col justify-between gap-15">
            <div className="relative w-fit">
              <h1 className="text-6xl font-semibold tracking-tight lg:text-7xl">
                Get in Touch
              </h1>
              <Illustration className="absolute -top-2 -right-5 size-5 text-red-500 md:size-6" />
              <Illustration className="absolute -bottom-2 -left-5 size-5 rotate-180 text-red-500 md:size-6" />
            </div>
            <ul className="space-y-6">
              {supportFeatures.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center gap-8 text-base text-foreground/50"
                >
                  <div className="flex size-6 items-center justify-center bg-red-100 text-red-500">
                    <ChevronsUp className="size-5" />
                  </div>
                  {feature.text}
                </li>
              ))}
            </ul>
            <a
              href=""
              className="flex items-center gap-4 text-4xl font-medium tracking-tighter"
            >
              hi@shadcnblocks.com
            </a>
          </div>
          <div className="col-span-4 flex w-full flex-col gap-2 lg:pl-10">
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
              <FieldGroup className="gap-2">
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
                        placeholder="NAME"
                        className="h-15 rounded-xl border-0 border-b-foreground/25 bg-muted shadow-none placeholder:text-foreground/20 placeholder:uppercase focus-visible:ring-0"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <Field>
                      <FieldLabel htmlFor={field.name} className="sr-only">
                        Phone
                      </FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        type="tel"
                        placeholder="PHONE (OPTIONAL)"
                        className="h-15 rounded-xl border-0 border-b-foreground/25 bg-muted shadow-none placeholder:text-foreground/20 placeholder:uppercase focus-visible:ring-0"
                      />
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
                        placeholder="EMAIL"
                        className="h-15 rounded-xl border-0 border-b-foreground/25 bg-muted shadow-none placeholder:text-foreground/20 placeholder:uppercase focus-visible:ring-0"
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
                      <Textarea
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="MESSAGE (TELL US ABOUT YOUR PROJECT)"
                        className="min-h-52 rounded-xl border-0 border-b-foreground/25 bg-muted shadow-none placeholder:text-foreground/20 placeholder:uppercase focus-visible:ring-0"
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
                  className="h-15 w-full rounded-xl uppercase"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? (
                    <>
                      <LoaderIcon className="mr-2 size-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit now"
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

export { Contact18 };

const Illustration = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="22"
      height="20"
      viewBox="0 0 22 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M-0.0078125 0.867188H21.1133V4.89062H2.00391C0.892865 4.89062 -0.0078125 3.98995 -0.0078125 2.87891V0.867188Z"
        fill="currentColor"
      />
      <path
        d="M16.9316 0.867188H21.1133V19.9404H19.0225C17.8677 19.9404 16.9316 19.0043 16.9316 17.8496V0.867188Z"
        fill="currentColor"
      />
    </svg>
  );
};
