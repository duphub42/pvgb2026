"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Mail, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldError } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type FormType = z.infer<typeof formSchema>;

type OfferModalData = {
  overline: string;
  title: string;
  description: string;
};

type Offermodal4Props = OfferModalData;

const OFFER_MODAL = {
  title: "Become a Member & Enjoy 20% Off",
  description:
    "Sign up to receive our latest updates — you can unsubscribe whenever you like.",
};

const OfferModal4 = ({
  title = OFFER_MODAL.title,
  description = OFFER_MODAL.description,
}: Offermodal4Props) => {
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: FormType) {
    console.log(values);
  }

  return (
    <Dialog defaultOpen>
      <DialogContent
        showCloseButton={false}
        className="group max-h-[calc(100dvh-2rem)] max-w-full gap-0 rounded-none border-none p-0 data-[state=closed]:slide-out-to-bottom-30 data-[state=open]:slide-in-from-bottom-30 max-lg:top-auto max-lg:bottom-0 max-lg:translate-y-0 sm:max-w-190 lg:max-w-117.5"
      >
        <div className="absolute -end-px -top-px">
          <DialogClose asChild>
            <Button
              size="icon-sm"
              className="origin-top-right rounded-none transition-all duration-300 lg:scale-50 lg:opacity-0 lg:group-hover:scale-100 lg:group-hover:opacity-100 [@media(hover:none)]:scale-100 [@media(hover:none)]:opacity-100"
            >
              <X />
            </Button>
          </DialogClose>
        </div>
        <div className="h-full max-h-72.5 overflow-hidden max-lg:hidden">
          <img
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/promotional/silhouette-with-headphones-1.png"
            alt="Silhouette with headphones"
            className="block size-full object-cover"
          />
        </div>
        <div className="space-y-5 overflow-y-auto px-9 py-5 lg:px-15 lg:py-7">
          <div className="space-y-2.5">
            <DialogTitle className="text-center text-3xl font-medium">
              {title}
            </DialogTitle>
          </div>
          <form className="space-y-2.5" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex items-center gap-2.5">
              <Controller
                control={form.control}
                name="email"
                render={({ field, fieldState }) => (
                  <Field className="flex-1" data-invalid={fieldState.invalid}>
                    <InputGroup>
                      <InputGroupInput
                        placeholder="Email Address"
                        {...field}
                        aria-invalid={fieldState.invalid}
                      />
                      <InputGroupAddon align="inline-end">
                        <Mail />
                      </InputGroupAddon>
                    </InputGroup>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Button size="icon" type="submit" className="lg:hidden">
                <ArrowRight />
              </Button>
            </div>
            <Button className="w-full max-lg:hidden" type="submit">
              Get Offer
            </Button>
          </form>
          <DialogFooter>
            <DialogDescription className="text-center text-xs leading-relaxed text-muted-foreground">
              {description}
            </DialogDescription>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { OfferModal4 };
