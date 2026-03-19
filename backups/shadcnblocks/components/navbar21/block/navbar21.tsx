"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import { cn } from "@/lib/utils";

interface MenuItem {
  label: string;
  href: string;
}

const menuItems: MenuItem[] = [
  { label: "Home", href: "#" },
  { label: "Projects", href: "#" },
  { label: "About", href: "#" },
  { label: "Contact", href: "#" },
];

const socialLinks = [
  { label: "X [Twitter]", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "ArtStation", href: "#" },
];

interface Navbar21Props {
  className?: string;
}

const Navbar21 = ({ className }: Navbar21Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <section className={cn("", className)}>
      <div className="flex items-center justify-between px-6 py-6">
        <div className="z-50">
          <div className="flex items-center gap-2">
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-wordmark.svg"
              alt="Logo"
              className="h-9"
            />
          </div>
        </div>

        <div className="z-50">
          <button
            onClick={toggleMenu}
            className="text-lg tracking-wider text-foreground transition-colors hover:text-muted-foreground"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={isOpen ? "close" : "menu"}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                {isOpen ? "CLOSE" : "MENU"}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 overflow-hidden bg-background"
          >
            <div className="flex h-full flex-col items-center justify-center px-6">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="mb-16 text-center"
              >
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
                    className="mb-5"
                  >
                    <a href={item.href} className="group relative inline-block">
                      <motion.span
                        className="relative z-10 text-4xl font-black text-foreground uppercase transition-transform duration-300 md:text-6xl"
                        initial={{ opacity: 1, filter: "blur(0px)" }}
                        whileHover={{ opacity: 0.8, filter: "blur(6px)" }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        {item.label}
                      </motion.span>

                      <motion.div
                        className="absolute bottom-0 left-0 h-1 bg-primary"
                        initial={{ width: 0 }}
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </a>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="flex flex-col gap-8 sm:flex-row sm:gap-12"
              >
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 font-mono text-sm tracking-wider text-muted-foreground transition-colors hover:text-foreground"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.3 }}
                    whileHover={{ x: 5 }}
                  >
                    <span>{link.label}</span>
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export { Navbar21 };
