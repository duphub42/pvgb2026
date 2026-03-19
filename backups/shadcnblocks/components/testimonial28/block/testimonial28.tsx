"use client";

import * as React from "react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

const Testimonial28 = () => {
  const testimonials = [
    {
      name: "John Doe",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig doloremque mollitiafugiat omnis! Porro facilis quo animi consequatur. Explicabo.Lorem ipsum dolor sit amet!Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig doloremque mollitiaf.",
      avatar:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
    },
    {
      name: "Jane Smith",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig doloremque mollitiafugiat omnis! Porro facilis quo animi consequatur. Explicabo.Lorem ipsum dolor sit amet!Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig doloremque mollitiaf.",
      avatar:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
    },
    {
      name: "Alex Johnson",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig doloremque mollitiafugiat omnis! Porro facilis quo animi consequatur. Explicabo.Lorem ipsum dolor sit amet!Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig doloremque mollitiaf.",
      avatar:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
    },
    {
      name: "John Doe",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig doloremque mollitiafugiat omnis! Porro facilis quo animi consequatur. Explicabo.Lorem ipsum dolor sit amet!Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig doloremque mollitiaf.",
      avatar:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp",
    },
    {
      name: "Jane Smith",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig doloremque mollitiafugiat omnis! Porro facilis quo animi consequatur. Explicabo.Lorem ipsum dolor sit amet!Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig doloremque mollitiaf.",
      avatar:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-5.webp",
    },
    {
      name: "Alex Johnson",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig doloremque mollitiafugiat omnis! Porro facilis quo animi consequatur. Explicabo.Lorem ipsum dolor sit amet!Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig doloremque mollitiaf.",
      avatar:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-6.webp",
    },
  ];

  return (
    <section className="bg-background py-32">
      <div className="container">
        <h1 className="mb-10 text-center text-3xl font-bold tracking-tighter text-foreground lg:text-6xl">
          Testimonials
        </h1>

        <Carousel className="mx-auto w-full md:max-w-5xl lg:mt-30">
          <CarouselContent>
            {testimonials.map((currentTestimonial, index) => (
              <CarouselItem key={index}>
                <DashedCard>
                  <div className="px-5 py-10 lg:p-20">
                    <div className="flex items-center justify-center gap-3">
                      <Avatar className="relative size-12 rounded-full">
                        <AvatarImage
                          src={currentTestimonial.avatar}
                          alt={currentTestimonial.name}
                        />
                      </Avatar>
                      <h2 className="text-2xl font-bold tracking-tight text-foreground">
                        {currentTestimonial.name}
                      </h2>
                    </div>
                    <p className="mt-5 text-center text-lg tracking-tight">
                      {currentTestimonial.content}
                    </p>
                  </div>
                </DashedCard>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-6 flex items-center justify-center gap-3 lg:mt-24">
            <CarouselPrevious className="relative top-0 left-0 translate-y-0 lg:p-6" />
            <div className="relative flex h-10 w-[50px] items-center justify-center overflow-hidden lg:w-[200px]">
              <LineHorizontal className="absolute left-0 clear-both" />
            </div>
            <CarouselNext
              variant="default"
              className="relative top-0 left-0 translate-y-0 lg:p-6"
            />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

const LineHorizontal = ({ className = "" }) => (
  <svg
    height="1"
    className={cn("absolute h-1 w-full", className)}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.63721 1.62573H1125.26"
      stroke="#2C2D30"
      strokeOpacity="0.1"
      strokeWidth="1.40102"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray="5.6 8.41"
    />
  </svg>
);

const LineVertical = ({ className = "" }) => (
  <svg
    className={cn("absolute h-full w-1", className)}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.93457 0.886963V910.841"
      stroke="#2C2D30"
      strokeOpacity="0.1"
      strokeWidth="1.40102"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray="5.6 8.41"
    />
  </svg>
);

const DashedCard = ({ children }: { children: React.ReactNode }) => (
  <div className="group relative items-center justify-center overflow-hidden p-4">
    <LineHorizontal className="top-4 left-0" />
    <LineHorizontal className="bottom-4 left-0" />
    <LineVertical className="top-0 left-4" />
    <LineVertical className="top-0 right-4" />
    <IconSvgs.Plus className="absolute top-1.5 left-1.5" />
    <IconSvgs.Plus className="absolute top-1.5 right-[7px]" />
    <IconSvgs.Plus className="absolute bottom-[7px] left-1.5" />
    <IconSvgs.Plus className="absolute right-[7px] bottom-[7px]" />
    <div>{children}</div>
  </div>
);

const IconSvgs = {
  SvgBorder1: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      {...props}
      width="78"
      height="73"
      viewBox="0 0 68 67"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M34.0021 5.5111C31.6361 5.5181 27.1901 4.5351 25.3921 3.9141C19.1911 1.7761 9.96914 -0.7129 4.61214 5.7881C0.595138 10.6571 0.538138 15.5941 4.04314 25.5591C4.71314 27.4591 5.59914 31.0741 5.54114 33.5811C5.59514 36.0881 4.71314 39.7031 4.04314 41.6031C0.534138 51.5681 0.595137 56.5051 4.60814 61.3731C9.96914 67.8751 19.1911 65.3861 25.3881 63.2481C27.1861 62.6271 31.6361 61.6451 33.9981 61.6521C36.3641 61.6451 40.8111 62.6271 42.6081 63.2481C48.8101 65.3861 58.0311 67.8751 63.3891 61.3741C67.4051 56.5041 67.4631 51.5681 63.9571 41.6031C63.2871 39.7031 62.4021 36.0881 62.4591 33.5811C62.4011 31.0741 63.2881 27.4591 63.9571 25.5591C67.4671 15.5941 67.4051 10.6611 63.3891 5.7891C58.0281 -0.7129 48.8091 1.7761 42.6091 3.9141C40.8111 4.5351 36.3611 5.5181 33.9991 5.5101H34.0021V5.5111Z"
        stroke="#2C2D30"
        strokeOpacity="0.1"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
  SvgBorder2: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      {...props}
      width="78"
      height="73"
      viewBox="0 0 78 73"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M75.6648 29.841C75.5905 29.4622 75.435 29.104 75.2088 28.791C74.9841 28.4768 74.6942 28.2149 74.3588 28.023L65.6588 23.053C65.2554 22.822 64.9196 22.489 64.6852 22.0875C64.4507 21.686 64.3258 21.23 64.3228 20.765L64.2888 10.972C64.2887 10.5834 64.2038 10.1994 64.0401 9.84692C63.8764 9.49442 63.6377 9.18187 63.3408 8.93105C59.7093 5.84379 55.5254 3.47294 51.0108 1.94405C50.7323 1.85062 50.4406 1.80268 50.1468 1.80205C49.6882 1.79933 49.2366 1.91506 48.8358 2.13805L39.9958 7.07605C39.6003 7.29665 39.1548 7.41221 38.7019 7.41168C38.249 7.41116 37.8038 7.29457 37.4088 7.07305L28.5748 2.11105C28.2467 1.92714 27.8836 1.81429 27.5091 1.77983C27.1346 1.74538 26.757 1.79008 26.4008 1.91105C21.8794 3.42193 17.6863 5.77842 14.0448 8.85505C13.748 9.10691 13.5092 9.41998 13.3447 9.77278C13.1802 10.1256 13.0939 10.5098 13.0918 10.899L13.0478 20.681C13.0458 21.1465 12.921 21.6033 12.6861 22.0051C12.4512 22.407 12.1144 22.7399 11.7098 22.97L3.00483 27.923C2.66872 28.1135 2.37768 28.3742 2.15159 28.6875C1.92551 29.0007 1.76971 29.3591 1.69483 29.7381C0.772786 34.353 0.768369 39.1044 1.68183 43.7211C1.75583 44.1011 1.91183 44.459 2.13783 44.772C2.36283 45.086 2.65283 45.3481 2.98783 45.5391L11.6878 50.5091C12.0917 50.7399 12.4276 51.0729 12.662 51.4747C12.8963 51.8765 13.0208 52.3329 13.0228 52.798L13.0578 62.59C13.058 62.9787 13.1428 63.3627 13.3066 63.7152C13.4703 64.0677 13.7089 64.3802 14.0058 64.6311C17.6352 67.722 21.8192 70.0948 26.3348 71.623C26.6916 71.7424 27.0694 71.7862 27.444 71.7516C27.8186 71.717 28.1819 71.6048 28.5108 71.4221L37.3528 66.484C37.7479 66.2635 38.1929 66.1478 38.6453 66.1478C39.0978 66.1478 39.5427 66.2635 39.9378 66.484L48.7598 71.427C49.0879 71.6111 49.451 71.724 49.8255 71.7585C50.2001 71.7929 50.5777 71.7481 50.9338 71.6271C55.4549 70.1161 59.6477 67.7596 63.2888 64.6831C63.5867 64.4316 63.8263 64.1183 63.991 63.7651C64.1558 63.4118 64.2417 63.0269 64.2428 62.637L64.2868 52.8571C64.2889 52.3916 64.4137 51.9348 64.6486 51.533C64.8835 51.1311 65.2202 50.7982 65.6248 50.5681L74.3288 45.6151C74.6651 45.4247 74.9564 45.164 75.1826 44.8508C75.4089 44.5375 75.5648 44.1791 75.6398 43.8C76.5638 39.19 76.5708 34.443 75.6618 29.83L75.6648 29.841Z"
        stroke="#2C2D30"
        strokeOpacity="0.1"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
  Plus: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      {...props}
      width="23"
      height="23"
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M11.1301 0.868652V22.9502" stroke="black" />
      <path d="M22.1709 11.9097H0.0893555" stroke="black" />
    </svg>
  ),
};

export { Testimonial28 };
