"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import {
  CheckCircle,
  Heart,
  HeartCrack,
  PartyPopper,
  PlusCircle,
  X,
} from "lucide-react";
import { useCallback, useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import z from "zod";

import { Price, PriceValue } from "@/components/shadcnblocks/price";
import QuantityInput from "@/components/shadcnblocks/quantity-input";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Field, FieldError } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface ProductPrice {
  regular: number;
  sale?: number;
  currency: string;
}

type EmptyCartData = {
  title: string;
  description: string;
  cta: {
    link: string;
    text: string;
  };
};

type EmptyCartProps = EmptyCartData;

type CartItem = {
  product_id: string;
  link: string;
  name: string;
  image: string;
  price: ProductPrice;
  details?: {
    label: string;
    value: string;
  }[];
};

interface FullCartProps {
  cartItems: CartItem[];
  formItems: CartFormType["products"];
  form: UseFormReturn<CartFormType>;
}

interface CartItemProps extends CartItem {
  index: number;
  onRemoveClick: () => void;
  onQuantityChange: (newQty: number) => void;
}

const EMPTY_CART_DATA = {
  title: "Empty basket",
  description:
    "Your basket is still empty, discover everything we’ve got for you",
  cta: {
    link: "#",
    text: "Discover",
  },
};

const CART_ITEMS: CartItem[] = [
  {
    product_id: "product-1",
    link: "#",
    name: "LumaGlow Hydrating Cream",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/skin-care-product/point-normal-Xp0bTCLD07k-unsplash-3.jpg",
    price: {
      regular: 49.0,
      currency: "USD",
    },
    details: [
      {
        label: "Size",
        value: "100ml",
      },
    ],
  },
  {
    product_id: "product-2",
    link: "#",
    name: "Radiance Ritual Set",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/skin-care-product/pexels-amelie-chen-243775000-12352170-3.jpg",
    price: {
      regular: 140.0,
      currency: "USD",
    },
  },
  {
    product_id: "product-3",
    link: "#",
    name: "Timeless Renewal Cream",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/skin-care-product/pexels-carlos-diaz-216017-18350286-3.jpg",
    price: {
      regular: 84.0,
      currency: "USD",
    },
    details: [
      {
        label: "Size",
        value: "240ml",
      },
    ],
  },
  {
    product_id: "product-4",
    link: "#",
    name: "Radiant Lock Mist",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/skin-care-product/pexels-rdne-8903695-3.jpg",
    price: {
      regular: 245.0,
      currency: "USD",
    },
    details: [
      {
        label: "Size",
        value: "250ml",
      },
    ],
  },
  {
    product_id: "product-5",
    link: "#",
    name: "HydraBloom Night Cream",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/skin-care-product/pexels-volkerthimm-19049367-3.jpg",
    price: {
      regular: 499.0,
      currency: "USD",
    },
    details: [
      {
        label: "Size",
        value: "200ml",
      },
    ],
  },
];

const cartFormSchema = z.object({
  products: z
    .object({
      product_id: z.string(),
      quantity: z.number(),
      price: z.number(),
    })
    .array(),
});

type CartFormType = z.infer<typeof cartFormSchema>;

const ShoppingCart17 = ({
  emptyCartData = EMPTY_CART_DATA,
  cartItems = CART_ITEMS,
}) => {
  const { title, description, cta } = emptyCartData;

  const defaultProducts = cartItems.map((item) => ({
    product_id: item.product_id,
    quantity: 1,
    price: item.price.sale ?? item.price.regular,
  }));

  const form = useForm<CartFormType>({
    resolver: zodResolver(cartFormSchema),
    defaultValues: {
      products: defaultProducts,
    },
  });

  const formItems = form.watch("products");

  const isEmpty = formItems.length === 0;

  return (
    <Sheet defaultOpen>
      <SheetContent className="block w-[92dvw] [&>button]:hidden">
        <div className="h-full">
          <div className="absolute inset-x-0">
            <div className="flex justify-end px-5 py-2">
              <SheetClose asChild>
                <Button
                  size="icon-sm"
                  variant="secondary"
                  className="rounded-full"
                >
                  <X />
                </Button>
              </SheetClose>
            </div>
          </div>
          <div
            style={
              {
                "--header-height": "7rem",
                "--footer-height": "6.5rem",
              } as React.CSSProperties
            }
            className="h-full pt-12"
          >
            {isEmpty ? (
              <div className="mx-auto w-fit py-4">
                <EmptyCart title={title} description={description} cta={cta} />
              </div>
            ) : (
              <FullCart
                form={form}
                formItems={formItems}
                cartItems={cartItems}
              />
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const EmptyCart = ({ title, description, cta }: EmptyCartProps) => {
  return (
    <Empty className="w-full max-w-70 !p-0">
      <EmptyHeader>
        <EmptyMedia>
          <HeartCrack className="size-10 fill-rose-500 stroke-foreground stroke-2" />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription className="font-light">
          {description}
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="gap-3.5">
        <Button asChild size="lg" className="uppercase">
          <a href={cta.link}>{cta.text}</a>
        </Button>
      </EmptyContent>
    </Empty>
  );
};

const FullCart = ({ cartItems, form, formItems }: FullCartProps) => {
  const itemsCount = formItems && formItems.length ? formItems.length : 0;

  const totalPrice = formItems?.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0,
  );

  const onSubmit = (data: CartFormType) => {
    console.log(data);
  };

  const { fields, remove, update } = useFieldArray({
    control: form.control,
    name: "products",
  });

  const handleQuantityChange = useCallback(
    (index: number) => (newQty: number) =>
      update(index, { ...fields[index], quantity: newQty }),
    [update, fields],
  );

  const handleRemove = useCallback(
    (index: number) => () => {
      remove(index);
    },
    [remove],
  );

  return (
    <div className="flex h-full flex-col">
      <div className="space-y-4 px-5 py-4">
        <SheetHeader className="p-0">
          <div className="flex items-center justify-between gap-4">
            <SheetTitle className="text-xl font-bold">
              Basket
              <span className="ml-1 text-sm font-bold">({itemsCount})</span>
            </SheetTitle>
            <Button variant="outline" size="sm" className="rounded-full">
              <Heart />
              Favourites
            </Button>
          </div>
        </SheetHeader>
      </div>
      <div className="flex-1">
        <div className="hide-scrollbar h-[calc(100dvh-calc(var(--header-height)+var(--footer-height)))] space-y-5 overflow-auto px-5 pb-5">
          <Alert className="items-center border-none bg-emerald-50 dark:bg-emerald-800/60">
            <CheckCircle className="stroke-emerald-500 stroke-2" />
            <AlertTitle className="line-clamp-none text-xs font-normal">
              You’ve got free standard delivery to your home
            </AlertTitle>
          </Alert>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-5">
                {fields.map((field, index) => (
                  <CartItem
                    key={field.id}
                    index={index}
                    onRemoveClick={() => handleRemove(index)()}
                    onQuantityChange={(newQty: number) =>
                      handleQuantityChange(index)(newQty)
                    }
                    {...(cartItems.find(
                      (p) => p.product_id === field.product_id,
                    ) as CartItem)}
                  />
                ))}
              </div>
            </form>
          </FormProvider>
          <PromoCode />
        </div>
      </div>
      <SheetFooter className="p-5">
        <div className="flex w-full items-center justify-between gap-3.5">
          <p className="text-sm font-bold">Total</p>
          <Price className="text-sm font-bold">
            <PriceValue
              price={totalPrice}
              currency={cartItems[0].price.currency}
              variant="regular"
            />
          </Price>
        </div>
        <Button>Checkout</Button>
      </SheetFooter>
    </div>
  );
};

const CartItem = ({
  image,
  name,
  details,
  index,
  onQuantityChange,
  onRemoveClick,
  price,
}: CartItemProps) => {
  const { regular, currency } = price;

  return (
    <Card className="group relative border-none bg-transparent p-0 shadow-none">
      <CardContent className="flex h-full gap-4 p-0">
        <div className="shrink-0 grow-0 basis-20 sm:basis-36">
          <div className="relative">
            <AspectRatio ratio={0.8} className="overflow-hidden rounded-sm">
              <img
                src={image}
                alt={name}
                className="block size-full object-cover object-center"
              />
            </AspectRatio>
            <div className="absolute start-1 top-1 z-10 transition-opacity duration-300 group-hover:opacity-100 md:opacity-0">
              <Button
                type="button"
                size="icon-sm"
                variant="secondary"
                className="size-5.5 rounded-full"
                onClick={onRemoveClick}
              >
                <X className="size-3 stroke-2" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col items-start justify-between gap-3">
          <div className="space-y-3">
            <div className="space-y-1.5">
              <CardTitle className="text-xs leading-snug font-medium">
                {name}
              </CardTitle>
              <Price className="gap-x-1 text-xs font-bold">
                <PriceValue
                  price={regular}
                  currency={currency}
                  variant="regular"
                />
              </Price>
            </div>
            {details && (
              <ul>
                {details?.map((item, index) => {
                  const isLast = index === details.length - 1;
                  return (
                    <li className="inline" key={`product-details-${index}`}>
                      <dl className="inline text-xs font-medium">
                        <dt className="sr-only inline">{item.label}: </dt>
                        <dd className="inline text-muted-foreground">
                          {item.value}
                        </dd>
                        {!isLast && (
                          <span className="mx-1 text-muted-foreground">/</span>
                        )}
                      </dl>
                    </li>
                  );
                })}
              </ul>
            )}
            <QuantityField index={index} onQuantityChange={onQuantityChange} />
          </div>
          <Button variant="link" className="h-fit p-0 text-xs">
            Add to Favourites
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const QuantityField = ({
  index,
  onQuantityChange,
}: {
  index: number;
  onQuantityChange: (n: number) => void;
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={`products.${index}.quantity`}
      control={control}
      render={({ field }) => {
        return (
          <Field className="w-full max-w-28">
            <QuantityInput
              inputProps={field}
              onValueChange={(newQty) => {
                field.onChange(newQty);
                onQuantityChange(newQty);
              }}
              className="rounded-none"
            />
          </Field>
        );
      }}
    />
  );
};

const promoCodeFormSchema = z.object({
  promoCode: z.string().trim().min(3),
});

type promoCodeFormType = z.infer<typeof promoCodeFormSchema>;

const PromoCode = () => {
  const [showPromoInput, setShowPromoInput] = useState(false);
  const promoForm = useForm<promoCodeFormType>({
    resolver: zodResolver(promoCodeFormSchema),
    defaultValues: {
      promoCode: "",
    },
  });

  const onSubmit = (data: promoCodeFormType) => {
    console.log(data);
  };

  const handlePromoCodeForm = (checked: boolean) => {
    setShowPromoInput(checked);
  };

  return (
    <div className="space-y-5 py-5">
      <div className="flex items-center gap-3">
        <Checkbox onCheckedChange={handlePromoCodeForm} id="terms" />
        <Label htmlFor="terms">Add promotional code</Label>
      </div>
      <form
        className={clsx(!showPromoInput && "sr-only")}
        onSubmit={promoForm.handleSubmit(onSubmit)}
      >
        <Controller
          name="promoCode"
          control={promoForm.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <InputGroup>
                <InputGroupAddon>
                  <PartyPopper />
                </InputGroupAddon>
                <InputGroupInput
                  {...field}
                  id="promo-code"
                  placeholder="Promotional code"
                  aria-invalid={fieldState.invalid}
                />
                <InputGroupButton asChild>
                  <Button variant="ghost" type="submit">
                    <PlusCircle />
                  </Button>
                </InputGroupButton>
              </InputGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </form>
    </div>
  );
};

export { ShoppingCart17 };
