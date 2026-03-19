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
  name: z.string().min(1, "Name is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),
  phone: z.string().min(1, "Phone is required"),
  service: z.string().optional(),
  message: z.string().min(1, "Message is required"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

interface Contact20Props {
  className?: string;
  onSubmit?: (data: ContactFormData) => Promise<void>;
}

const Contact20 = ({ className, onSubmit }: Contact20Props) => {
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
      service: "",
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
          <div className="flex w-full max-w-xs flex-col gap-5 lg:gap-12">
            <h1 className="text-5xl font-semibold tracking-tight lg:text-6xl">
              Contact us
            </h1>
            <p className="text-sm text-foreground/50 uppercase">
              Leave your message and we will get back to you ASAP
            </p>
          </div>
          <div className="grid w-full gap-12 lg:grid-cols-3 lg:gap-2 lg:pl-10">
            <div>
              <p className="text-sm text-foreground/40 uppercase">Address</p>
              <p className="mt-1 max-w-50 text-lg leading-snug font-semibold">
                {" "}
                123 Design Street, Chicago, USA
              </p>
            </div>
            <div className="lg:col-span-2">
              <p className="text-sm text-foreground/40 uppercase">
                (403) 123 4123
              </p>
              <p className="mt-2 text-4xl font-semibold tracking-tight">
                hi@shadcnblocks.com
              </p>
            </div>

            {isSubmitted && (
              <div
                className={cn(
                  "mt-10 rounded-lg border border-green-500/20 bg-green-500/10 p-4 text-center transition-opacity duration-500 lg:col-span-3",
                  showSuccess ? "opacity-100" : "opacity-0",
                )}
              >
                <p className="text-sm font-medium text-green-600 dark:text-green-400">
                  Thank you! We'll be in touch soon.
                </p>
              </div>
            )}

            <form
              onSubmit={form.handleSubmit(handleFormSubmit)}
              className="mt-10 grid grid-cols-2 gap-5 lg:col-span-3 lg:grid-cols-3"
            >
              <FieldGroup className="contents">
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
                        className="mt-10 rounded-none border-0 border-b border-b-foreground/10 !bg-transparent p-0 uppercase shadow-none placeholder:text-foreground/20 focus-visible:ring-0 lg:text-base"
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
                        className="mt-10 rounded-none border-0 border-b border-b-foreground/10 !bg-transparent p-0 uppercase shadow-none placeholder:text-foreground/20 focus-visible:ring-0 lg:text-base"
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
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name} className="sr-only">
                        Phone
                      </FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        type="tel"
                        aria-invalid={fieldState.invalid}
                        placeholder="Phone*"
                        className="mt-10 rounded-none border-0 border-b border-b-foreground/10 !bg-transparent p-0 uppercase shadow-none placeholder:text-foreground/20 focus-visible:ring-0 lg:text-base"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  control={form.control}
                  name="service"
                  render={({ field }) => (
                    <Field>
                      <FieldLabel htmlFor={field.name} className="sr-only">
                        Service interested in
                      </FieldLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger
                          id={field.name}
                          className="mt-10 w-full rounded-none border-0 border-b border-b-foreground/10 !bg-transparent p-0 uppercase shadow-none focus-visible:ring-0 data-[placeholder]:text-foreground/20 lg:text-base"
                        >
                          <SelectValue
                            placeholder="Service interested in"
                            className="text-foreground/20"
                          />
                        </SelectTrigger>
                        <SelectContent className="rounded-none uppercase shadow-none">
                          <SelectItem
                            className="rounded-none py-4"
                            value="general"
                          >
                            General Inquiry
                          </SelectItem>
                          <SelectItem
                            className="rounded-none py-4"
                            value="support"
                          >
                            Support
                          </SelectItem>
                          <SelectItem
                            className="rounded-none py-4"
                            value="sales"
                          >
                            Sales
                          </SelectItem>
                          <SelectItem
                            className="rounded-none py-4"
                            value="partnership"
                          >
                            Partnership
                          </SelectItem>
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
                      className="col-span-2 lg:col-span-3"
                    >
                      <FieldLabel htmlFor={field.name} className="sr-only">
                        Message
                      </FieldLabel>
                      <Textarea
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="Describe your requirements*"
                        className="col-span-2 mt-10 min-h-42 rounded-none border-0 border-b border-b-foreground/10 !bg-transparent p-0 uppercase shadow-none placeholder:text-foreground/20 focus-visible:ring-0 lg:col-span-3 lg:text-base"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {form.formState.errors.root && (
                  <p className="col-span-2 text-sm text-destructive lg:col-span-3">
                    {form.formState.errors.root.message}
                  </p>
                )}

                <Button
                  variant="ghost"
                  className="w-fit rounded-none uppercase"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? (
                    <>
                      <LoaderIcon className="size-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <CornerDownRight className="size-5" />
                      Submit now
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

export { Contact20 };
