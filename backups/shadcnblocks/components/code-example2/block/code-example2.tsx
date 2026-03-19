"use client";

import type { BundledLanguage } from "@/components/kibo-ui/code-block";
import {
  CodeBlock,
  CodeBlockBody,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockFilename,
  CodeBlockFiles,
  CodeBlockHeader,
  CodeBlockItem,
  CodeBlockSelect,
  CodeBlockSelectContent,
  CodeBlockSelectItem,
  CodeBlockSelectTrigger,
  CodeBlockSelectValue,
} from "@/components/kibo-ui/code-block";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const code = [
  {
    language: "javascript",
    filename: "http-request.js",
    code: `// Node.js HTTP request using fetch (Node 18+)
const response = await fetch('https://api.example.com/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer your-token-here'
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com'
  })
});

const data = await response.json();
console.log('Response:', data);

// Alternative using axios
const axios = require('axios');
const response = await axios.post('https://api.example.com/data', {
  name: 'John Doe',
  email: 'john@example.com'
}, {
  headers: {
    'Authorization': 'Bearer your-token-here'
  }
});`,
  },
  {
    language: "python",
    filename: "http_request.py",
    code: `# Python HTTP request using requests library
import requests

# POST request
response = requests.post(
    'https://api.example.com/data',
    json={
        'name': 'John Doe',
        'email': 'john@example.com'
    },
    headers={
        'Authorization': 'Bearer your-token-here'
    }
)

print(f'Status Code: {response.status_code}')
print(f'Response: {response.json()}')

# Alternative using httpx (async)
import httpx
import asyncio

async def make_request():
    async with httpx.AsyncClient() as client:
        response = await client.post(
            'https://api.example.com/data',
            json={'name': 'John Doe', 'email': 'john@example.com'},
            headers={'Authorization': 'Bearer your-token-here'}
        )
        return response.json()

# Run the async function
# asyncio.run(make_request())`,
  },
  {
    language: "go",
    filename: "http_request.go",
    code: `package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io"
    "net/http"
)

type User struct {
    Name  string \`json:"name"\`
    Email string \`json:"email"\`
}

func main() {
    user := User{
        Name:  "John Doe",
        Email: "john@example.com",
    }
    
    jsonData, _ := json.Marshal(user)
    
    req, _ := http.NewRequest("POST", "https://api.example.com/data", bytes.NewBuffer(jsonData))
    req.Header.Set("Content-Type", "application/json")
    req.Header.Set("Authorization", "Bearer your-token-here")
    
    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        fmt.Printf("Error: %v\\n", err)
        return
    }
    defer resp.Body.Close()
    
    body, _ := io.ReadAll(resp.Body)
    fmt.Printf("Status: %s\\n", resp.Status)
    fmt.Printf("Response: %s\\n", string(body))
}`,
  },
];

interface CodeExample2Props {
  className?: string;
}

const CodeExample2 = ({ className }: CodeExample2Props) => {
  return (
    <section className={cn("overflow-hidden py-32", className)}>
      <div className="container">
        <div className="relative p-6">
          <div className="grid grid-cols-1 place-items-center gap-12 lg:grid-cols-2 lg:gap-6">
            <div className="relative flex flex-col gap-6">
              <h2 className="text-3xl font-semibold tracking-tight lg:text-5xl">
                HTTP Requests in Multiple Languages
              </h2>
              <p className="text-muted-foreground lg:text-lg">
                See how to make HTTP requests across different programming
                languages. From Node.js with fetch and axios, to Python with
                requests and httpx, Go with net/http. Each example shows POST
                requests with JSON payloads and proper headers.
              </p>
              <Button variant="outline" className="w-fit">
                View Documentation
              </Button>
              <div className="absolute -right-6 -bottom-6 -left-6 block h-px bg-border lg:hidden" />
              <div className="absolute -bottom-[27px] -left-[27px] z-10 block size-[7px] rounded-full border border-border bg-background lg:hidden" />
              <div className="absolute -right-[27px] -bottom-[27px] z-10 block size-[7px] rounded-full border border-border bg-background lg:hidden" />
            </div>
            <CodeBlock
              data={code}
              defaultValue={code[0].language}
              className="w-full"
            >
              <CodeBlockHeader>
                <CodeBlockFiles>
                  {(item) => (
                    <CodeBlockFilename
                      key={item.language}
                      value={item.language}
                    >
                      {item.filename}
                    </CodeBlockFilename>
                  )}
                </CodeBlockFiles>
                <CodeBlockSelect>
                  <CodeBlockSelectTrigger className="capitalize">
                    <CodeBlockSelectValue />
                  </CodeBlockSelectTrigger>
                  <CodeBlockSelectContent>
                    {(item) => (
                      <CodeBlockSelectItem
                        key={item.language}
                        value={item.language}
                        className="capitalize"
                      >
                        {item.language}
                      </CodeBlockSelectItem>
                    )}
                  </CodeBlockSelectContent>
                </CodeBlockSelect>
                <CodeBlockCopyButton
                  onCopy={() => console.log("Copied code to clipboard")}
                  onError={() =>
                    console.error("Failed to copy code to clipboard")
                  }
                />
              </CodeBlockHeader>
              <ScrollArea>
                <CodeBlockBody>
                  {(item) => (
                    <CodeBlockItem
                      key={item.language}
                      value={item.language}
                      className="max-h-96"
                    >
                      <CodeBlockContent
                        language={item.language as BundledLanguage}
                      >
                        {item.code}
                      </CodeBlockContent>
                    </CodeBlockItem>
                  )}
                </CodeBlockBody>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </CodeBlock>
          </div>
          <div className="absolute top-0 right-0 left-0 h-px bg-border" />
          <div className="absolute top-0 -right-12 h-px w-12 bg-gradient-to-r from-border to-transparent" />
          <div className="absolute top-0 -left-12 h-px w-12 bg-gradient-to-l from-border to-transparent" />
          <div className="absolute right-0 bottom-0 left-0 h-px bg-border" />
          <div className="absolute -right-12 bottom-0 h-px w-12 bg-gradient-to-r from-border to-transparent" />
          <div className="absolute bottom-0 -left-12 h-px w-12 bg-gradient-to-l from-border to-transparent" />
          <div className="absolute top-0 bottom-0 left-0 w-px bg-border" />
          <div className="absolute -top-12 left-0 h-12 w-px bg-gradient-to-t from-border to-transparent" />
          <div className="absolute -bottom-12 left-0 h-12 w-px bg-gradient-to-b from-border to-transparent" />
          <div className="absolute -top-12 right-0 h-12 w-px bg-gradient-to-t from-border to-transparent" />
          <div className="absolute top-0 right-0 bottom-0 w-px bg-border" />
          <div className="absolute right-0 -bottom-12 h-12 w-px bg-gradient-to-b from-border to-transparent" />
          <div className="absolute -top-[3px] -right-[3px] size-[7px] rounded-full border border-border bg-background" />
          <div className="absolute -right-[3px] -bottom-[3px] size-[7px] rounded-full border border-border bg-background" />
          <div className="absolute -bottom-[3px] -left-[3px] size-[7px] rounded-full border border-border bg-background" />
          <div className="absolute -top-[3px] -left-[3px] size-[7px] rounded-full border border-border bg-background" />
        </div>
      </div>
    </section>
  );
};

export { CodeExample2 };
