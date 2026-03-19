import { Sparkle } from "lucide-react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface Testimonial20Props {
  className?: string;
}

const Testimonial20 = ({ className }: Testimonial20Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="relative grid border border-dashed md:grid-cols-2">
          <div className="border-dashed px-6 py-12 md:border-r md:px-12 md:py-16">
            <p className="mb-6 text-center font-medium md:text-xl">
              “The platform has exceeded our expectations in every way. The
              implementation was smooth and
              <strong className="ml-1 font-bold">
                the results are outstanding!”
              </strong>
            </p>
            <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
              <Avatar className="size-14 rounded-full border">
                <AvatarImage src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp" />
              </Avatar>
              <p className="text-center font-medium md:text-left">
                Sarah Mitchell, Director of Operations
              </p>
            </div>
          </div>
          <div className="px-6 py-12 text-center md:px-12 md:py-16">
            <p className="mb-6 text-center font-medium md:text-xl">
              “The team delivered
              <strong className="mx-1 font-bold">exceptional quality</strong>
              throughout the entire process. The support has been remarkable at
              every step.”
            </p>
            <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
              <Avatar className="size-14 rounded-full border">
                <AvatarImage src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp" />
              </Avatar>
              <p className="text-center font-medium md:text-left">
                Michael Chen, Technical Lead
              </p>
            </div>
          </div>
          <Sparkle
            strokeWidth={1}
            className="absolute -top-[9px] -left-[9px] size-4 fill-primary"
          />
          <Sparkle
            strokeWidth={1}
            className="absolute -top-2 -right-2 size-4 fill-primary"
          />
          <Sparkle
            strokeWidth={1}
            className="absolute -right-2 -bottom-2 size-4 fill-primary"
          />
          <Sparkle
            strokeWidth={1}
            className="absolute -bottom-2 -left-2 size-4 fill-primary"
          />
        </div>
      </div>
    </section>
  );
};

export { Testimonial20 };
