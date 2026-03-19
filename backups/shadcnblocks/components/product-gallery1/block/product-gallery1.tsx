import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

type ProductImages = {
  srcset: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
}[];

const PRODUCT_IMAGES: ProductImages = [
  {
    srcset:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/pexels-cottonbro-6764033-3.jpg 1920w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/pexels-cottonbro-6764033-2.jpg 1280w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/pexels-cottonbro-6764033-1.jpg 640w",
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/pexels-cottonbro-6764033-3.jpg",
    alt: "",
    width: 1920,
    height: 2880,
    sizes: "(min-width: 1920px) 1920px, (min-width: 1280px) 1280px, 100vw",
  },
  {
    srcset:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/pexels-cottonbro-6764699-3.jpg 1920w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/pexels-cottonbro-6764699-2.jpg 1280w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/pexels-cottonbro-6764699-2.jpg 640w",
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/pexels-cottonbro-6764699-3.jpg",
    alt: "",
    width: 1920,
    height: 2880,
    sizes: "(min-width: 1920px) 1920px, (min-width: 1280px) 1280px, 100vw",
  },
  {
    srcset:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/pexels-cottonbro-6764036-3.jpg 1920w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/pexels-cottonbro-6764036-2.jpg 1280w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/pexels-cottonbro-6764036-1.jpg 640w",
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/pexels-cottonbro-6764036-3.jpg",
    alt: "",
    width: 1920,
    height: 2880,
    sizes: "(min-width: 1920px) 1920px, (min-width: 1280px) 1280px, 100vw",
  },
  {
    srcset:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/pexels-cottonbro-6764040-3.jpg 1920w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/pexels-cottonbro-6764040-2.jpg 1280w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/pexels-cottonbro-6764040-1.jpg 640w",
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/pexels-cottonbro-6764040-3.jpg",
    alt: "",
    width: 1920,
    height: 2880,
    sizes: "(min-width: 1920px) 1920px, (min-width: 1280px) 1280px, 100vw",
  },
];
interface ProductGallery1Props {
  className?: string;
}

const ProductGallery1 = ({ className }: ProductGallery1Props) => {
  return (
    <section className={cn("max-w-160", className)}>
      <Carousel
        opts={{
          breakpoints: {
            "(min-width: 768px)": {
              active: false,
            },
          },
        }}
      >
        <CarouselContent className="gap-4 md:m-0 md:grid md:grid-cols-3 xl:gap-5">
          {PRODUCT_IMAGES.map((img, index) => (
            <CarouselItem
              className="first:col-span-3 md:p-0"
              key={`product-gallery-1-image-${index}`}
            >
              <AspectRatio ratio={1} className="overflow-hidden rounded-lg">
                <img
                  srcSet={img.srcset}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  sizes={img.sizes}
                  className="block size-full object-cover object-center"
                />
              </AspectRatio>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="md:hidden">
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </div>
      </Carousel>
    </section>
  );
};

export { ProductGallery1 };
