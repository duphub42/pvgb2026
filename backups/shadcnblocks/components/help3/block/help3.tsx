"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

interface FAQ {
  question: string;
  answer: string;
  category?: string;
}

interface Help3Props {
  title?: string;
  description?: string;
  faqs?: FAQ[];
  formTitle?: string;
  formDescription?: string;
  className?: string;
  onSubmit?: (data: ContactFormData) => Promise<void>;
}

const Help3 = ({
  title = "Help Center",
  description = "Search our knowledge base or submit a request below.",
  faqs = [
    {
      question: "How do I reset my password?",
      answer:
        'Click the "Forgot Password" link on the login page. Enter your email address and we\'ll send you a reset link. The link expires after 24 hours.',
      category: "Account",
    },
    {
      question: "How do I upgrade my plan?",
      answer:
        "Go to Settings > Billing > Change Plan. Select your new plan and confirm. Your card will be charged the prorated difference immediately.",
      category: "Billing",
    },
    {
      question: "Can I export my data?",
      answer:
        "Yes, go to Settings > Data > Export. You can export all your data in CSV or JSON format. Large exports may take a few minutes to process.",
      category: "Account",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for annual plans over $1,000.",
      category: "Billing",
    },
    {
      question: "How do I cancel my subscription?",
      answer:
        "Go to Settings > Billing > Cancel Subscription. Your access continues until the end of your current billing period. You can reactivate anytime.",
      category: "Billing",
    },
    {
      question: "Is my data secure?",
      answer:
        "Yes, we use industry-standard encryption (AES-256) for data at rest and TLS 1.3 for data in transit. We're SOC 2 Type II certified.",
      category: "Security",
    },
  ],
  formTitle = "Can't find what you're looking for?",
  formDescription = "Submit a request and our team will get back to you within 24 hours.",
  className,
  onSubmit,
}: Help3Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const filteredFaqs = useMemo(() => {
    if (!searchQuery.trim()) return faqs;
    const query = searchQuery.toLowerCase();
    return faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query),
    );
  }, [faqs, searchQuery]);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
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
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <h1 className="mb-4 text-4xl font-medium tracking-tight md:text-5xl">
              {title}
            </h1>
            <p className="text-muted-foreground">{description}</p>
          </div>

          <div className="relative mb-8">
            <Search className="absolute top-1/2 left-3 size-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Accordion type="single" collapsible className="mb-16">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-3">
                      {faq.category && (
                        <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                          {faq.category}
                        </span>
                      )}
                      <span>{faq.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))
            ) : (
              <p className="py-8 text-center text-muted-foreground">
                No results found for "{searchQuery}"
              </p>
            )}
          </Accordion>

          <div className="rounded-xl bg-muted/50 p-8">
            <div className="mb-6 text-center">
              <h2 className="mb-2 text-xl font-semibold">{formTitle}</h2>
              <p className="text-sm text-muted-foreground">{formDescription}</p>
            </div>

            {isSubmitted && (
              <div
                className={cn(
                  "mb-6 rounded-lg border border-green-500/20 bg-green-500/10 p-4 text-center transition-opacity duration-500",
                  showSuccess ? "opacity-100" : "opacity-0",
                )}
              >
                <p className="text-sm font-medium text-green-600 dark:text-green-400">
                  Your request has been submitted. We'll be in touch soon!
                </p>
              </div>
            )}

            <form onSubmit={form.handleSubmit(handleFormSubmit)}>
              <FieldGroup>
                <div className="grid gap-4 sm:grid-cols-2">
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

                  <Controller
                    control={form.control}
                    name="subject"
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>
                          Subject <span className="text-destructive">*</span>
                        </FieldLabel>
                        <Input
                          {...field}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          placeholder="Brief summary"
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
                        placeholder="Describe your issue or question in detail..."
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
                      Submitting...
                    </>
                  ) : (
                    "Submit Request"
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

export { Help3 };
