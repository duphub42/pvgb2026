"use client";

import { ArrowRightIcon } from "lucide-react";
import * as React from "react";

import {
  CodeBlock,
  CodeBlockBody,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockFilename,
  CodeBlockHeader,
  CodeBlockItem,
} from "@/components/kibo-ui/code-block";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const code1Data = [
  {
    language: "typescript",
    filename: "use-theme.ts",
    code: `import { useState, useEffect } from 'react';

const useTheme = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);
  
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark');
  };
  
  return { theme, toggleTheme };
};`,
  },
];

const code2Data = [
  {
    language: "typescript",
    filename: "theme-toggle.tsx",
    code: `import { useTheme } from './useTheme';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (

    <div className={cn("flex items-center gap-4", className)}>
      <span className="text-sm font-medium">
        Current theme: {theme}
      </span>
      
      <button
        onClick={toggleTheme}
        className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
      >
        Switch to {theme === 'light' ? 'Dark' : 'Light'}
      </button>
      
      <div className={\`w-8 h-8 rounded-full border-2 \${theme === 'light' ? 'bg-yellow-400 border-gray-300' : 'bg-gray-800 border-gray-600'}\`}>
        {theme === 'light' ? '☀️' : '🌙'}
      </div>
    </div>
  );
}`,
  },
];

interface CodeExample3Props {
  className?: string;
}

const CodeExample3 = ({ className }: CodeExample3Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid place-items-center gap-10 lg:grid-cols-2">
          <div className="lg:pr-10">
            <span className="mb-6 text-xs text-muted-foreground uppercase">
              Hooks
            </span>
            <h2 className="mb-4 text-4xl">Custom hooks for common patterns</h2>
            <p className="text-lg text-muted-foreground">
              Create reusable custom hooks to encapsulate complex logic and
              state management. The useTheme hook demonstrates how to manage
              theme state, persist preferences to localStorage, and apply CSS
              classes dynamically. Perfect for sharing functionality across
              components.
            </p>
            <Button variant="outline" className="mt-4">
              Learn more <ArrowRightIcon className="h-4 w-4" />
            </Button>
          </div>
          <CodeBlock
            data={code1Data}
            defaultValue="typescript"
            className="w-full"
          >
            <CodeBlockHeader className="justify-between">
              <CodeBlockFilename value="typescript">
                use-theme.ts
              </CodeBlockFilename>
              <CodeBlockCopyButton />
            </CodeBlockHeader>
            <ScrollArea>
              <CodeBlockBody>
                {(item) => (
                  <CodeBlockItem
                    key={item.language}
                    value={item.language}
                    className="max-h-96"
                  >
                    <CodeBlockContent language="typescript">
                      {item.code}
                    </CodeBlockContent>
                  </CodeBlockItem>
                )}
              </CodeBlockBody>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </CodeBlock>
        </div>
        <div className="mt-20 grid place-items-center gap-10 lg:grid-cols-2">
          <CodeBlock
            data={code2Data}
            defaultValue="typescript"
            className="order-2 w-full lg:order-none"
          >
            <CodeBlockHeader className="justify-between">
              <CodeBlockFilename value="typescript">
                theme-toggle.tsx
              </CodeBlockFilename>
              <CodeBlockCopyButton />
            </CodeBlockHeader>
            <ScrollArea>
              <CodeBlockBody>
                {(item) => (
                  <CodeBlockItem
                    key={item.language}
                    value={item.language}
                    className="max-h-96"
                  >
                    <CodeBlockContent language="typescript">
                      {item.code}
                    </CodeBlockContent>
                  </CodeBlockItem>
                )}
              </CodeBlockBody>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </CodeBlock>
          <div className="order-1 lg:order-none lg:pl-10">
            <span className="mb-6 text-xs text-muted-foreground uppercase">
              Implementation
            </span>
            <h2 className="mb-4 text-4xl">Consume the hook</h2>
            <p className="text-lg text-muted-foreground">
              Use your custom hook in any component to add theme switching
              functionality. The ThemeToggle component shows how to display the
              current theme, provide a toggle button, and render visual
              indicators. Clean separation between logic and presentation makes
              testing easier.
            </p>
            <Button variant="outline" className="mt-4">
              Learn more <ArrowRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export { CodeExample3 };
