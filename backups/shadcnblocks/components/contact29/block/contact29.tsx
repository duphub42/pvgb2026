"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Building2,
  Check,
  HelpCircle,
  Laptop,
  LoaderIcon,
  Rocket,
  Users,
} from "lucide-react";
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
  serviceType: z.string().min(1, "Please select a service"),
  name: z.string().min(1, "Name is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),
  company: z.string().optional(),
  message: z.string().min(1, "Message is required"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const services = [
  {
    id: "consulting",
    icon: Users,
    title: "Consulting",
    description: "Strategy and advisory services",
  },
  {
    id: "development",
    icon: Laptop,
    title: "Development",
    description: "Custom software solutions",
  },
  {
    id: "enterprise",
    icon: Building2,
    title: "Enterprise",
    description: "Large-scale implementations",
  },
  {
    id: "startup",
    icon: Rocket,
    title: "Startup",
    description: "MVP and launch support",
  },
  {
    id: "other",
    icon: HelpCircle,
    title: "Other",
    description: "Something else entirely",
  },
];

interface Contact29Props {
  title?: string;
  subtitle?: string;
  className?: string;
  onSubmit?: (data: ContactFormData) => Promise<void>;
}

const Contact29 = ({
  title = "Let's Work Together",
  subtitle = "Select the service that best fits your needs and tell us about your project.",
  className,
  onSubmit,
}: Contact29Props) => {
  const [step, setStep] = useState<"select" | "form" | "success">("select");
  const [selectedService, setSelectedService] = useState<string>("");

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      serviceType: "",
      name: "",
      email: "",
      company: "",
      message: "",
    },
  });

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
    form.setValue("serviceType", serviceId);
  };

  const handleContinue = () => {
    if (selectedService) {
      setStep("form");
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
      setStep("success");
    } catch {
      form.setError("root", {
        message: "Something went wrong. Please try again.",
      });
    }
  };

  const resetForm = () => {
    setStep("select");
    setSelectedService("");
    form.reset();
  };

  if (step === "success") {
    return (
      <section className={cn("relative min-h-screen bg-muted/30", className)}>
        <div className="container flex min-h-screen flex-col justify-center py-20">
          <div className="mx-auto max-w-xl text-center">
            <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-green-500/10">
              <Check className="size-10 text-green-600" />
            </div>
            <h2 className="mb-4 text-4xl font-medium">Message Sent!</h2>
            <p className="text-xl text-muted-foreground">
              Thanks for reaching out. We'll review your request and get back to
              you within one business day.
            </p>
            <Button
              className="mt-10"
              size="lg"
              variant="outline"
              onClick={resetForm}
            >
              Send Another Message
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={cn("relative min-h-screen bg-muted/30", className)}>
      <div className="container flex min-h-screen flex-col justify-center py-20">
        {step === "select" && (
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <h1 className="mb-6 text-5xl font-medium tracking-tight md:text-6xl lg:text-7xl">
                {title}
              </h1>
              <p className="text-xl text-muted-foreground md:text-2xl">
                {subtitle}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => {
                const Icon = service.icon;
                const isSelected = selectedService === service.id;
                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => handleServiceSelect(service.id)}
                    className={cn(
                      "relative flex flex-col items-center rounded-2xl p-8 text-center transition-all",
                      isSelected
                        ? "bg-background shadow-lg ring-2 ring-primary"
                        : "bg-background/60 hover:bg-background hover:shadow-md",
                    )}
                  >
                    {isSelected && (
                      <div className="absolute top-4 right-4 flex size-6 items-center justify-center rounded-full bg-primary">
                        <Check className="size-4 text-primary-foreground" />
                      </div>
                    )}
                    <div
                      className={cn(
                        "mb-4 flex size-14 items-center justify-center rounded-xl",
                        isSelected ? "bg-primary/10" : "bg-muted",
                      )}
                    >
                      <Icon
                        className={cn(
                          "size-7",
                          isSelected ? "text-primary" : "text-muted-foreground",
                        )}
                      />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {service.description}
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="mt-12 flex justify-center">
              <Button
                size="lg"
                onClick={handleContinue}
                disabled={!selectedService}
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {step === "form" && (
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            <div className="flex flex-col justify-center">
              <button
                type="button"
                onClick={() => setStep("select")}
                className="mb-8 flex items-center text-muted-foreground hover:text-foreground"
              >
                ← Change selection
              </button>

              <h1 className="mb-6 text-5xl font-medium tracking-tight md:text-6xl lg:text-7xl">
                Tell Us More
              </h1>
              <p className="mb-12 text-xl text-muted-foreground md:text-2xl">
                Share the details of your project and we'll get back to you
                within 24 hours.
              </p>

              <div className="flex items-center gap-4 rounded-xl bg-background p-5 shadow-sm">
                {(() => {
                  const service = services.find(
                    (s) => s.id === selectedService,
                  );
                  if (!service) return null;
                  const Icon = service.icon;
                  return (
                    <>
                      <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10">
                        <Icon className="size-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-lg font-semibold">{service.title}</p>
                        <p className="text-muted-foreground">
                          {service.description}
                        </p>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>

            <div className="flex items-center">
              <form
                onSubmit={form.handleSubmit(handleFormSubmit)}
                className="w-full rounded-2xl bg-background p-8 shadow-lg md:p-10"
              >
                <h2 className="mb-8 text-2xl font-semibold">Your Details</h2>

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
        )}
      </div>
    </section>
  );
};

export { Contact29 };
