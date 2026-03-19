"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, LoaderIcon } from "lucide-react";
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
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),
  companySize: z.string().optional(),
  message: z.string().min(1, "Message is required"),
  referrer: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

interface Contact17Props {
  className?: string;
  onSubmit?: (data: ContactFormData) => Promise<void>;
}

const Contact17 = ({ className, onSubmit }: Contact17Props) => {
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
      companySize: "",
      message: "",
      referrer: "",
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
    <section className={cn("bg-muted/50 py-32", className)}>
      <div className="container">
        <span className="text-xs text-muted-foreground">GET STARTED /</span>
        <div className="mt-8 grid grid-cols-1 gap-8 md:gap-10 lg:grid-cols-2 lg:grid-rows-[min-content_1fr]">
          <h2 className="order-1 text-4xl font-medium tracking-tight md:order-none md:text-5xl">
            Get in touch
          </h2>
          <div className="order-2 md:order-none md:row-span-2">
            <div className="rounded-lg border border-border bg-background p-6">
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
                <FieldGroup className="grid gap-6 sm:grid-cols-2">
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
                          placeholder="Alex"
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
                          placeholder="Smith"
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
                          placeholder="alex.smith@example.com"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    control={form.control}
                    name="companySize"
                    render={({ field }) => (
                      <Field>
                        <FieldLabel htmlFor={field.name}>
                          Project Budget
                        </FieldLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger id={field.name} className="w-full">
                            <SelectValue placeholder="Select budget range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="5k-15k">$5K - $15K</SelectItem>
                            <SelectItem value="15k-30k">$15K - $30K</SelectItem>
                            <SelectItem value="30k-50k">$30K - $50K</SelectItem>
                            <SelectItem value="50k-100k">
                              $50K - $100K
                            </SelectItem>
                            <SelectItem value="100k-250k">
                              $100K - $250K
                            </SelectItem>
                            <SelectItem value="250k+">$250K+</SelectItem>
                          </SelectContent>
                        </Select>
                      </Field>
                    )}
                  />

                  <Controller
                    control={form.control}
                    name="message"
                    render={({ field, fieldState }) => (
                      <Field
                        data-invalid={fieldState.invalid}
                        className="sm:col-span-2"
                      >
                        <FieldLabel htmlFor={field.name}>
                          Message <span className="text-destructive">*</span>
                        </FieldLabel>
                        <Textarea
                          {...field}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          placeholder="Tell us about your project..."
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    control={form.control}
                    name="referrer"
                    render={({ field }) => (
                      <Field className="sm:col-span-2">
                        <FieldLabel htmlFor={field.name}>
                          How did you find us?
                        </FieldLabel>
                        <Input
                          {...field}
                          id={field.name}
                          placeholder="Google / Referral"
                        />
                      </Field>
                    )}
                  />

                  {form.formState.errors.root && (
                    <p className="text-sm text-destructive sm:col-span-2">
                      {form.formState.errors.root.message}
                    </p>
                  )}

                  <Button
                    type="submit"
                    className="sm:col-span-2"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? (
                      <>
                        <LoaderIcon className="mr-2 size-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit"
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground sm:col-span-2">
                    You acknowledge that you've reviewed and agreed to our{" "}
                    <a href="#" className="text-primary hover:underline">
                      Privacy Policy
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-primary hover:underline">
                      Terms of Service
                    </a>
                  </p>
                </FieldGroup>
              </form>
            </div>
          </div>
          <div className="order-3 my-6 md:order-none">
            <ul className="space-y-2 font-medium">
              <li className="flex items-center gap-2">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-background">
                  <Check className="size-4" />
                </span>
                Share your project goals and requirements
              </li>
              <li className="flex items-center gap-2">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-background">
                  <Check className="size-4" />
                </span>
                Receive a tailored proposal
              </li>
              <li className="flex items-center gap-2">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-background">
                  <Check className="size-4" />
                </span>
                Schedule a strategy consultation
              </li>
            </ul>
            <p className="my-6 font-bold">
              Trusted by +3000 businesses worldwide
            </p>
            <div className="grid grid-cols-2 place-items-center gap-8 md:grid-cols-4">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-1.svg"
                alt="placeholder"
                className="max-w-24 dark:invert"
              />
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-2.svg"
                alt="placeholder"
                className="max-w-24 dark:invert"
              />
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-3.svg"
                alt="placeholder"
                className="max-w-24 dark:invert"
              />
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-4.svg"
                alt="placeholder"
                className="max-w-24 dark:invert"
              />
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-5.svg"
                alt="placeholder"
                className="max-w-24 dark:invert"
              />
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-6.svg"
                alt="placeholder"
                className="max-w-24 dark:invert"
              />
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-7.svg"
                alt="placeholder"
                className="max-w-24 dark:invert"
              />
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-8.svg"
                alt="placeholder"
                className="max-w-24 dark:invert"
              />
            </div>
          </div>
        </div>
        <div className="mt-16 grid gap-8 md:gap-12 lg:w-1/2 lg:grid-cols-2">
          <div>
            <h3 className="mb-1.5 font-bold">FAQ</h3>
            <p className="text-sm text-muted-foreground">
              Browse our collection of{" "}
              <a href="#" className="text-primary underline hover:underline">
                Frequently Asked Questions
              </a>{" "}
              about our process and project delivery.
            </p>
          </div>
          <div>
            <h3 className="mb-1.5 font-bold">Resources</h3>
            <p className="text-sm text-muted-foreground">
              Access our library and connect with designers in our{" "}
              <a href="#" className="text-primary underline hover:underline">
                resource center
              </a>{" "}
              filled with whitepapers and tutorials.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Contact17 };
