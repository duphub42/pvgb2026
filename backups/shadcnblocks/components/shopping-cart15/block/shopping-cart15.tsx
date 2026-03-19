"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, Info } from "lucide-react";
import { useCallback, useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import z from "zod";

import { Price, PriceValue } from "@/components/shadcnblocks/price";
import QuantityInput from "@/components/shadcnblocks/quantity-input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type UsefulLink = {
  text: string;
  link: string;
};

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

type Option = {
  id: string;
  label: string;
  value: string;
  color?: string;
};

interface OptionsProps extends Partial<Variant> {
  currentValue?: string;
}

interface Variant {
  label: string;
  id: string;
  name: string;
  options?: Option[];
  type: "select" | "radio";
}

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
  variants?: Partial<Record<"color" | "size", Variant>>;
  sizeValue?: string;
  colorValue?: string;
};

interface FullCartProps {
  cartItems: CartItem[];
  formItems: CartFormType["products"];
  form: UseFormReturn<CartFormType>;
  usefulLinks: UsefulLink[];
}

interface CartItemProps extends CartItem {
  index: number;
  form: ReturnType<typeof useForm<CartFormType>>;
  onRemoveClick: () => void;
  onQuantityChange: (newQty: number) => void;
}

interface UsefulLinksListProps {
  links: UsefulLink[];
}

interface EditProductProps {
  index: number;
  variants?: Partial<Record<"color" | "size", Variant>>;
  onCancel: () => void;
  currentVariant: {
    color?: string;
    size?: string;
  };
}

const EMPTY_CART_DATA = {
  title: "Your Cart is Empty",
  description:
    "Your cart is still empty, discover everything we’ve got for you",
  cta: {
    link: "#",
    text: "Discover",
  },
};

const CART_ITEMS: CartItem[] = [
  {
    product_id: "product-1",
    link: "#",
    name: "Minimalist Beige Sneakers",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Minimalist-Beige-Sneakers-2.png",
    price: {
      regular: 149.0,
      currency: "USD",
      sale: 120.0,
    },
    details: [
      {
        label: "Size",
        value: "EU 36",
      },
      {
        label: "Color",
        value: "Beige",
      },
    ],
    sizeValue: "EU_36",
    colorValue: "product-1-beige",
    variants: {
      size: {
        label: "Size",
        name: "size",
        id: "size",
        type: "select",
        options: [
          {
            label: "EU 36",
            id: "product-1-EU_36",
            value: "EU_36",
          },
          {
            label: "EU 36.5",
            id: "product-1-EU_36.5",
            value: "EU_36.5",
          },
          {
            label: "EU 37",
            id: "product-1-EU_37",
            value: "EU_37",
          },
          {
            label: "EU 37.5",
            id: "product-1-EU_37.5",
            value: "EU_37.5",
          },
          {
            label: "EU 39",
            id: "product-1-EU_39",
            value: "EU_39",
          },
          {
            label: "EU 39.5",
            id: "product-1-EU_39.5",
            value: "EU_39.5",
          },
          {
            label: "EU 41",
            id: "product-1-EU_41",
            value: "EU_41",
          },
        ],
      },
      color: {
        label: "Color",
        name: "color",
        id: "color",
        type: "radio",
        options: [
          {
            label: "Black",
            id: "product-1-black",
            value: "product-1-black",
            color: "#000000",
          },
          {
            label: "Blue",
            id: "product-1-blue",
            value: "product-1-blue",
            color: "#1581BF",
          },
          {
            label: "Peach",
            id: "product-1-peach",
            value: "product-1-peach",
            color: "#FF5555",
          },
          {
            label: "Beige",
            id: "product-1-beige",
            value: "product-1-beige",
            color: "#D7C097",
          },
        ],
      },
    },
  },
  {
    product_id: "product-2",
    link: "#",
    name: "Embroidered Blue Top",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Woman-in-Embroidered-Blue-Top-2.png",
    price: {
      regular: 140.0,
      currency: "USD",
    },
    details: [
      {
        label: "Size",
        value: "S",
      },
      {
        label: "Color",
        value: "Blue",
      },
    ],
    sizeValue: "S",
    colorValue: "product-2-blue",
    variants: {
      size: {
        label: "Size",
        name: "size",
        id: "size",
        type: "select",
        options: [
          {
            label: "S",
            id: "product-2-S",
            value: "S",
          },
          {
            label: "M",
            id: "product-2-M",
            value: "M",
          },
          {
            label: "XL",
            id: "product-XL",
            value: "XL",
          },
        ],
      },
      color: {
        label: "Color",
        name: "color",
        id: "color",
        type: "radio",
        options: [
          {
            label: "Black",
            id: "product-2-black",
            value: "product-2-black",
            color: "#000000",
          },
          {
            label: "Blue",
            id: "product-2-blue",
            value: "product-2-blue",
            color: "#1581BF",
          },
          {
            label: "peach",
            id: "product-2-peach",
            value: "product-2-peach",
            color: "#FF5555",
          },
        ],
      },
    },
  },
  {
    product_id: "product-3",
    link: "#",
    name: "Classic Fedora Hat",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/accessories/Classic-Fedora-Hat-2.png",
    price: {
      regular: 84.0,
      currency: "USD",
    },
    details: [
      {
        label: "Color",
        value: "Beige",
      },
    ],
    colorValue: "product-1-beige",
    variants: {
      color: {
        label: "Color",
        name: "color",
        id: "color",
        type: "radio",
        options: [
          {
            label: "Black",
            id: "product-3-black",
            value: "product-3-black",
            color: "#000000",
          },
          {
            label: "Blue",
            id: "product-3-blue",
            value: "product-3-blue",
            color: "#1581BF",
          },
          {
            label: "Beige",
            id: "product-1-beige",
            value: "product-1-beige",
            color: "#D7C097",
          },
        ],
      },
    },
  },
];

const USEFUL_LINKS: UsefulLink[] = [
  {
    text: "Returns and exchanges",
    link: "#",
  },
  {
    text: "Home delivery",
    link: "#",
  },
  {
    text: "Guarantee",
    link: "#",
  },
];

const cartFormSchema = z.object({
  products: z
    .object({
      product_id: z.string(),
      quantity: z.number(),
      price: z.number(),
      color: z.string(),
      size: z.string(),
    })
    .array(),
});

type CartFormType = z.infer<typeof cartFormSchema>;

const ShoppingCart15 = ({
  emptyCartData = EMPTY_CART_DATA,
  cartItems = CART_ITEMS,
  usefulLinks = USEFUL_LINKS,
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
    <section className="py-32">
      <div className="container">
        {isEmpty ? (
          <EmptyCart title={title} description={description} cta={cta} />
        ) : (
          <FullCart
            usefulLinks={usefulLinks}
            form={form}
            formItems={formItems}
            cartItems={cartItems}
          />
        )}
      </div>
    </section>
  );
};

const EmptyCart = ({ title, description, cta }: EmptyCartProps) => {
  return (
    <Empty className="gap-8">
      <EmptyHeader className="gap-3">
        <EmptyTitle className="text-2xl">{title}</EmptyTitle>
        <EmptyDescription className="text-lg text-balance">
          {description}
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="gap-3.5">
        <Button asChild size="lg">
          <a href={cta.link}>{cta.text}</a>
        </Button>
      </EmptyContent>
    </Empty>
  );
};

const FullCart = ({
  cartItems,
  form,
  formItems,
  usefulLinks,
}: FullCartProps) => {
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
    <div className="space-y-4">
      <div className="space-y-1 xl:px-16">
        <h1 className="text-4xl font-semibold">Your Cart</h1>
        <p className="font-medium text-muted-foreground">
          {itemsCount} Articles
        </p>
      </div>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="col-span-2">
          <div className="xl:px-16">
            <div className="flex flex-col gap-6">
              <Alert className="bg-muted">
                <Info className="stroke-muted-foreground" />
                <AlertDescription className="text-muted-foreground">
                  Don't wait too long before placing your order. The products
                  will only be secured for you once the purchase is complete.
                </AlertDescription>
              </Alert>
              <div>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="space-y-5">
                    {fields.map((field, index) => (
                      <CartItem
                        key={field.id}
                        index={index}
                        form={form}
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
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="space-y-5 xl:px-16">
            <PromoCode />
            <div className="">
              <dl className="flex items-center justify-between gap-2 pb-4 not-first:pt-4 not-last:border-b">
                <dt className="text-sm">Subtotal</dt>
                <dd>
                  <Price className="text-sm">
                    <PriceValue
                      price={totalPrice}
                      currency={cartItems[0].price.currency}
                      variant="regular"
                    />
                  </Price>
                </dd>
              </dl>
              <dl className="flex items-center justify-between gap-2 pb-4 not-first:pt-4 not-last:border-b">
                <dt className="text-sm">Delivery</dt>
                <dd>
                  <Price className="text-sm">
                    <PriceValue
                      price={30.0}
                      currency={cartItems[0].price.currency}
                      variant="regular"
                    />
                  </Price>
                </dd>
              </dl>
              <dl className="flex items-center justify-between gap-2 pb-4 not-first:pt-4 not-last:border-b">
                <dt className="text-sm">Total</dt>
                <dd>
                  <Price className="text-2xl font-bold">
                    <PriceValue
                      price={totalPrice}
                      currency={cartItems[0].price.currency}
                      variant="regular"
                    />
                  </Price>
                </dd>
              </dl>
            </div>
            <div className="max-lg:fixed max-lg:inset-x-0 max-lg:bottom-0 max-lg:mb-0">
              <div className="max-lg:space-y-3 max-lg:border-t max-lg:bg-background max-lg:px-6 max-lg:py-4">
                <div className="flex items-center justify-between gap-2 lg:hidden">
                  <p>Subtotal {itemsCount} Aroducts</p>
                  <Price className="text-base font-bold">
                    <PriceValue
                      price={totalPrice}
                      currency={cartItems[0].price.currency}
                      variant="regular"
                    />
                  </Price>
                </div>
                <Button size="lg" className="w-full">
                  Checkout
                </Button>
              </div>
            </div>
            <UsefulLinksList links={usefulLinks} />
          </div>
        </div>
      </div>
    </div>
  );
};

const CartItem = ({
  image,
  name,
  details,
  index,
  form,
  onQuantityChange,
  onRemoveClick,
  price,
  link,
  variants,
  sizeValue,
  colorValue,
}: CartItemProps) => {
  const [openEdit, setOpenEdit] = useState(false);
  const { regular, currency, sale } = price;

  return (
    <div>
      <Card className="group relative border-none bg-transparent p-0 shadow-none">
        <CardContent className="flex h-full gap-6 p-0 max-sm:flex-col">
          <div className="shrink-0 grow-0 basis-53">
            <AspectRatio ratio={1} className="overflow-hidden rounded-sm">
              <img
                src={image}
                alt={name}
                className="block size-full object-cover object-center"
              />
            </AspectRatio>
          </div>

          <div className="flex flex-1 flex-col items-start justify-between gap-3 pt-4 md:pt-6">
            <div className="flex w-full justify-between gap-2 max-sm:flex-col">
              <div className="flex-1">
                <div className="space-y-2">
                  <CardTitle className="text-sm leading-snug font-medium transition-colors duration-300 hover:text-primary">
                    <a href={link}>{name}</a>
                  </CardTitle>
                  <ProductDetails details={details} />
                </div>
              </div>
              <div>
                <Price onSale={sale != null} className="text-lg font-semibold">
                  <PriceValue
                    price={sale}
                    currency={currency}
                    variant="sale"
                    className="text-rose-600"
                  />
                  <PriceValue
                    price={regular}
                    currency={currency}
                    variant="regular"
                  />
                </Price>
              </div>
            </div>
            <QuantityField
              form={form}
              index={index}
              onQuantityChange={onQuantityChange}
            />
            <CardFooter className="gap-4 p-0">
              <Button
                variant="link"
                className="h-fit p-0 text-xs text-muted-foreground underline"
                onClick={onRemoveClick}
              >
                Remove
              </Button>
              <Button
                variant="link"
                type="button"
                onClick={() => {
                  setOpenEdit((prev) => !prev);
                }}
                className="h-fit p-0 text-xs text-muted-foreground underline"
              >
                Edit
              </Button>
            </CardFooter>
          </div>
        </CardContent>
      </Card>
      <Collapsible open={openEdit}>
        <CollapsibleContent>
          <EditProduct
            onCancel={() => setOpenEdit(false)}
            variants={variants}
            index={index}
            currentVariant={{
              size: sizeValue,
              color: colorValue,
            }}
          />
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

const promoCodeFormSchema = z.object({
  promoCode: z.string().trim().min(3),
});

type promoCodeFormType = z.infer<typeof promoCodeFormSchema>;

const PromoCode = () => {
  const [showCodeForm, setShowCodeForm] = useState(false);

  const promoForm = useForm<promoCodeFormType>({
    resolver: zodResolver(promoCodeFormSchema),
    defaultValues: {
      promoCode: "",
    },
  });

  const onSubmit = (data: promoCodeFormType) => {
    console.log(data);
  };

  const onCancel = () => {
    setShowCodeForm(false);
  };

  return (
    <Collapsible open={showCodeForm} onOpenChange={setShowCodeForm}>
      <CollapsibleTrigger asChild>
        <Button variant="link" className="h-fit p-0 text-primary underline">
          Add Promotional Code
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-3 overflow-hidden data-[state=closed]:animate-slide-up data-[state=open]:animate-slide-down">
        <form onSubmit={promoForm.handleSubmit(onSubmit)}>
          <Controller
            name="promoCode"
            control={promoForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Input
                  {...field}
                  id="promo-code"
                  placeholder="Promotional code"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <div className="flex items-center gap-4 pt-3">
            <Button
              onClick={onCancel}
              type="button"
              variant="outline"
              className="flex-1"
            >
              Cancel
            </Button>
            <Button className="flex-1">Add</Button>
          </div>
        </form>
      </CollapsibleContent>
    </Collapsible>
  );
};

const UsefulLinksList = ({ links }: UsefulLinksListProps) => {
  if (!links) return;

  return (
    <ul className="space-y-3 py-5">
      {links.map(({ link, text }) => (
        <li key={crypto.randomUUID()}>
          <Button
            asChild
            variant="link"
            className="h-fit !p-0 text-muted-foreground underline"
          >
            <a href={link}>
              <CheckCircle />
              {text}
            </a>
          </Button>
        </li>
      ))}
    </ul>
  );
};

const ProductDetails = ({
  details,
}: {
  details?: {
    label: string;
    value: string;
  }[];
}) => {
  if (!details) return;
  return (
    <ul className="flex flex-col gap-0.5">
      {details?.map((item, index) => (
        <li key={`product-details-${index}`}>
          <dl className="text-xs text-muted-foreground">
            <dt className="inline">{item.label}: </dt>
            <dd className="inline">{item.value}</dd>
          </dl>
        </li>
      ))}
    </ul>
  );
};

const QuantityField = ({
  form,
  index,
  onQuantityChange,
}: {
  form: ReturnType<typeof useForm<CartFormType>>;
  index: number;
  onQuantityChange: (n: number) => void;
}) => {
  return (
    <Controller
      control={form.control}
      name={`products.${index}.quantity`}
      render={({ field }) => (
        <Field className="gap-3">
          <div className="w-full max-w-28">
            <QuantityInput
              inputProps={field}
              onValueChange={(newQty) => {
                field.onChange(newQty);
                onQuantityChange(newQty);
              }}
            />
          </div>
        </Field>
      )}
    />
  );
};

const EditProduct = ({
  variants,
  onCancel,
  currentVariant,
}: EditProductProps) => {
  const [variant, setVariant] = useState({
    size: currentVariant.size,
    color: currentVariant.color,
  });

  if (!variants) return;

  return (
    <div className="py-4">
      <div className="space-y-6 border-y px-4 py-6">
        <div className="flex w-full gap-6 max-sm:flex-col">
          <ColorOptions currentValue={variant.color} {...variants.color} />
          <SizeOptions currentValue={variant.size} {...variants.size} />
        </div>
        <div className="flex gap-3 max-sm:flex-col">
          <Button
            onClick={onCancel}
            type="button"
            variant="outline"
            className="flex-1"
          >
            Cancel
          </Button>
          <Button type="button" className="flex-1">
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

const ColorOptions = ({ options, label, currentValue, name }: OptionsProps) => {
  if (!options) return;

  return (
    <div className="space-y-3">
      <Label className="text-sm font-bold">{label}</Label>
      <RadioGroup name={name} className="flex flex-wrap gap-3">
        {options.map((option) => (
          <Label
            key={option.id}
            className="block size-9 cursor-pointer has-checked:ring-2"
            style={{
              backgroundColor: option.color,
            }}
          >
            <RadioGroupItem
              className="sr-only"
              value={option.value}
              id={option.id}
              defaultChecked={currentValue === option.value}
            />
          </Label>
        ))}
      </RadioGroup>
    </div>
  );
};

const SizeOptions = ({ options, label, currentValue, name }: OptionsProps) => {
  if (!options) return;

  const currentSizeLabel = options?.filter(
    (item) => item.value === currentValue,
  )[0]?.label;

  return (
    <div className="space-y-3">
      <Label className="text-sm font-bold">{label}</Label>
      <Select name={name}>
        <SelectTrigger className="w-60">
          <SelectValue placeholder={currentSizeLabel} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.id} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export { ShoppingCart15 };
