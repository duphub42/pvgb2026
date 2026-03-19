"use client";

import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ButtonItem {
  text: string;
  url: string;
}

interface AnimatedButtonProps extends ButtonItem {
  variant?: "outline" | "default";
}

const AnimatedButton = ({ text, url, variant }: AnimatedButtonProps) => {
  return (
    <motion.a
      initial={{
        opacity: 0,
        y: 100,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 1.5,
        ease: [0.16, 1, 0.3, 1],
        delay: variant === "outline" ? 0.4 : 0.7,
      }}
      href={url}
      className={cn(variant === "outline" && "hidden md:block")}
    >
      <Button size="lg" variant={variant} className="group">
        <div className="h-5 overflow-hidden">
          <div className="flex flex-col items-center gap-4 transition-[translate] duration-300 ease-out group-hover:-translate-y-9">
            <span>{text}</span>
            <span>{text}</span>
          </div>
        </div>
      </Button>
    </motion.a>
  );
};

interface Hero247Props {
  avatar: string;
  heading: string;
  secondaryButton: ButtonItem;
  primaryButton: ButtonItem;
  className?: string;
}

const Hero247 = ({
  className,
  avatar = "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar/cool-dude.jpg",
  heading = "Hello, I'm Marcus, a Seattle based visual designer shaping memorable brand identities.",
  secondaryButton = {
    text: "See my work",
    url: "https://www.shadcnblocks.com",
  },
  primaryButton = {
    text: "Let's collaborate",
    url: "https://www.shadcnblocks.com",
  },
}: Hero247Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex flex-col items-center gap-6">
          <motion.img
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 2.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            src={avatar}
            alt="avatar"
            className="size-16 rounded-full lg:size-18"
          />
          <motion.h3
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 1.5,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="max-w-3xl text-center text-4xl font-medium lg:text-5xl"
          >
            {heading}
          </motion.h3>
          <div className="flex items-center gap-2">
            <AnimatedButton
              text={secondaryButton.text}
              url={secondaryButton.url}
              variant="outline"
            />
            <AnimatedButton text={primaryButton.text} url={primaryButton.url} />
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero247 };
