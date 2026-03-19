"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronLeft, ChevronRight, LoaderIcon } from "lucide-react";
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
  inquiryType: z.string().min(1, "Please select an inquiry type"),
  budget: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),
  company: z.string().optional(),
  phone: z.string().optional(),
  message: z.string().min(10, "Please provide more detail"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const steps = [
  { id: 1, name: "Inquiry Type" },
  { id: 2, name: "Your Details" },
  { id: 3, name: "Message" },
];

interface Contact28Props {
  title?: string;
  subtitle?: string;
  className?: string;
  onSubmit?: (data: ContactFormData) => Promise<void>;
}

const Contact28 = ({
  title = "Get Started",
  subtitle = "Tell us about your project and we'll get back to you within 24 hours.",
  className,
  onSubmit,
}: Contact28Props) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      inquiryType: "",
      budget: "",
      name: "",
      email: "",
      company: "",
      phone: "",
      message: "",
    },
  });

  const validateStep = async (step: number): Promise<boolean> => {
    let fieldsToValidate: (keyof ContactFormData)[] = [];

    if (step === 1) {
      fieldsToValidate = ["inquiryType"];
    } else if (step === 2) {
      fieldsToValidate = ["name", "email"];
    } else if (step === 3) {
      fieldsToValidate = ["message"];
    }

    const result = await form.trigger(fieldsToValidate);
    return result;
  };

  const nextStep = async () => {
    const isValid = await validateStep(currentStep);
    if (isValid && currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFormSubmit = async (data: ContactFormData) => {
    try {
      if (onSubmit) {
        await onSubmit(data);
      } else {
        console.log("Form submitted:", data);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      setIsSubmitted(true);
    } catch {
      form.setError("root", {
        message: "Something went wrong. Please try again.",
      });
    }
  };

  if (isSubmitted) {
    return (
      <section className={cn("relative min-h-screen bg-muted/30", className)}>
        <div className="container flex min-h-screen flex-col justify-center py-20">
          <div className="mx-auto max-w-xl text-center">
            <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-green-500/10">
              <Check className="size-10 text-green-600" />
            </div>
            <h2 className="mb-4 text-4xl font-medium">Thank You!</h2>
            <p className="text-xl text-muted-foreground">
              Your message has been received. We'll get back to you within 24
              hours.
            </p>
            <Button
              className="mt-10"
              size="lg"
              variant="outline"
              onClick={() => {
                setIsSubmitted(false);
                setCurrentStep(1);
                form.reset();
              }}
            >
              Submit Another Inquiry
            </Button>
          </div>
        </div>
      </section>
    );
  }

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

            <div className="space-y-4">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className={cn(
                    "flex items-center gap-4 rounded-lg p-4 transition-colors",
                    currentStep === step.id
                      ? "bg-background shadow-sm"
                      : currentStep > step.id
                        ? "text-muted-foreground"
                        : "text-muted-foreground/50",
                  )}
                >
                  <div
                    className={cn(
                      "flex size-10 shrink-0 items-center justify-center rounded-full font-medium transition-colors",
                      currentStep > step.id
                        ? "bg-primary text-primary-foreground"
                        : currentStep === step.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground",
                    )}
                  >
                    {currentStep > step.id ? (
                      <Check className="size-5" />
                    ) : (
                      step.id
                    )}
                  </div>
                  <span className="text-lg font-medium">{step.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center">
            <form
              onSubmit={form.handleSubmit(handleFormSubmit)}
              className="w-full rounded-2xl bg-background p-8 shadow-lg md:p-10"
            >
              <h2 className="mb-8 text-2xl font-semibold">
                {steps[currentStep - 1].name}
              </h2>

              {currentStep === 1 && (
                <FieldGroup>
                  <Controller
                    control={form.control}
                    name="inquiryType"
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>
                          What can we help you with?{" "}
                          <span className="text-destructive">*</span>
                        </FieldLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                          >
                            <SelectValue placeholder="Select inquiry type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">
                              General Inquiry
                            </SelectItem>
                            <SelectItem value="sales">
                              Sales & Pricing
                            </SelectItem>
                            <SelectItem value="support">
                              Technical Support
                            </SelectItem>
                            <SelectItem value="partnership">
                              Partnership
                            </SelectItem>
                            <SelectItem value="demo">Request a Demo</SelectItem>
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
                    name="budget"
                    render={({ field }) => (
                      <Field>
                        <FieldLabel htmlFor={field.name}>
                          Project Budget
                        </FieldLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger id={field.name}>
                            <SelectValue placeholder="Select budget range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="<5k">
                              Less than $5,000
                            </SelectItem>
                            <SelectItem value="5k-15k">
                              $5,000 - $15,000
                            </SelectItem>
                            <SelectItem value="15k-50k">
                              $15,000 - $50,000
                            </SelectItem>
                            <SelectItem value="50k-100k">
                              $50,000 - $100,000
                            </SelectItem>
                            <SelectItem value=">100k">$100,000+</SelectItem>
                          </SelectContent>
                        </Select>
                      </Field>
                    )}
                  />
                </FieldGroup>
              )}

              {currentStep === 2 && (
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
                            placeholder="Your full name"
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

                  <div className="grid gap-4 sm:grid-cols-2">
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
                          />
                        </Field>
                      )}
                    />

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
                  </div>
                </FieldGroup>
              )}

              {currentStep === 3 && (
                <FieldGroup>
                  <Controller
                    control={form.control}
                    name="message"
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>
                          How can we help?{" "}
                          <span className="text-destructive">*</span>
                        </FieldLabel>
                        <Textarea
                          {...field}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          placeholder="Tell us about your project, goals, or questions..."
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
                </FieldGroup>
              )}

              <div className="mt-8 flex items-center justify-between">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                >
                  <ChevronLeft className="mr-1 size-4" />
                  Back
                </Button>

                {currentStep < 3 ? (
                  <Button type="button" size="lg" onClick={nextStep}>
                    Continue
                    <ChevronRight className="ml-1 size-4" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    size="lg"
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
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Contact28 };
