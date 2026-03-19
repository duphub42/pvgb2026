"use client";

import { useState } from "react";

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
} from "@/components/kibo-ui/code-block";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface CodeExample5Props {
  className?: string;
}

const CodeExample5 = ({ className }: CodeExample5Props) => {
  const [selectedApi, setSelectedApi] = useState("rest-api");
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");

  const currentApi = apiExamples.find((api) => api.id === selectedApi);

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
            Connect to any API with confidence
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* API Selection Cards */}
          <div className="lg:col-span-1">
            <div className="space-y-2">
              {apiExamples.map((api) => {
                return (
                  <div
                    key={api.id}
                    className={`cursor-pointer rounded-lg p-4 transition-all ${
                      selectedApi === api.id ? "bg-muted" : "hover:bg-muted"
                    }`}
                    onClick={() => setSelectedApi(api.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg p-2">
                        <img
                          src={api.image}
                          alt={api.title}
                          className="size-6"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate font-medium">{api.title}</h3>
                        <p className="line-clamp-2 text-sm text-muted-foreground">
                          {api.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Code Display */}
          <div className="min-w-0 lg:col-span-2">
            <div className="space-y-6">
              {/* API Info Header */}

              {/* Language Selection */}
              <Tabs
                value={selectedLanguage}
                onValueChange={setSelectedLanguage}
              >
                <div className="overflow-x-auto">
                  <TabsList className="grid w-full min-w-max grid-cols-3">
                    {currentApi?.code.map((code) => (
                      <TabsTrigger
                        key={code.language}
                        value={code.language}
                        className="flex items-center gap-2 whitespace-nowrap capitalize"
                      >
                        <img
                          src={code.icon}
                          alt={code.language}
                          className="size-4 flex-shrink-0"
                        />
                        <span className="hidden lg:inline">
                          {code.language}
                        </span>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>
              </Tabs>

              {/* Code Block */}
              <div className="w-full overflow-hidden">
                <CodeBlock
                  data={currentApi?.code || []}
                  value={selectedLanguage}
                  className="w-full"
                >
                  <CodeBlockHeader>
                    <CodeBlockFiles>
                      {(item) => (
                        <CodeBlockFilename
                          key={item.language}
                          value={item.language}
                          className="truncate"
                        >
                          {item.filename}
                        </CodeBlockFilename>
                      )}
                    </CodeBlockFiles>
                    <CodeBlockCopyButton
                      onCopy={() => console.log("Copied code to clipboard")}
                      onError={() =>
                        console.error("Failed to copy code to clipboard")
                      }
                    />
                  </CodeBlockHeader>
                  <ScrollArea className="w-full">
                    <CodeBlockBody>
                      {(item) => (
                        <CodeBlockItem
                          key={item.language}
                          value={item.language}
                          className="max-h-96 w-full overflow-x-auto"
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { CodeExample5 };

const apiExamples = [
  {
    id: "rest-api",
    title: "REST API Integration",
    description: "Standard REST endpoints with authentication",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/symbols/globe.svg",
    code: [
      {
        language: "javascript",
        filename: "api-client.js",
        icon: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/javascript-icon.svg",
        code: `// REST API client with authentication
class ApiClient {
  constructor(baseURL, apiKey) {
    this.baseURL = baseURL;
    this.apiKey = apiKey;
  }

  async request(endpoint, options = {}) {
    const url = \`\${this.baseURL}\${endpoint}\`;
    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': \`Bearer \${this.apiKey}\`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }

    return response.json();
  }

  // GET request
  async getUsers() {
    return this.request('/users');
  }

  // POST request
  async createUser(userData) {
    return this.request('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }
}

// Usage
const client = new ApiClient('https://api.example.com', 'your-api-key');
const users = await client.getUsers();
console.log('Users:', users);`,
      },
      {
        language: "python",
        filename: "api_client.py",
        icon: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/python-icon.svg",
        code: `# REST API client with requests
import requests
from typing import Dict, Any, Optional

class ApiClient:
    def __init__(self, base_url: str, api_key: str):
        self.base_url = base_url
        self.api_key = api_key
        self.session = requests.Session()
        self.session.headers.update({
            'Authorization': f'Bearer {api_key}',
            'Content-Type': 'application/json'
        })
    
    def request(self, endpoint: str, method: str = 'GET', **kwargs) -> Dict[str, Any]:
        url = f"{self.base_url}{endpoint}"
        response = self.session.request(method, url, **kwargs)
        response.raise_for_status()
        return response.json()
    
    def get_users(self) -> Dict[str, Any]:
        return self.request('/users')
    
    def create_user(self, user_data: Dict[str, Any]) -> Dict[str, Any]:
        return self.request('/users', method='POST', json=user_data)

# Usage
client = ApiClient('https://api.example.com', 'your-api-key')
users = client.get_users()
print(f"Users: {users}")`,
      },
      {
        language: "ruby",
        filename: "api_client.rb",
        icon: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/ruby-icon.svg",
        code: `# REST API client with HTTParty
require 'httparty'
require 'json'

class ApiClient
  include HTTParty
  
  def initialize(base_url, api_key)
    @base_url = base_url
    @api_key = api_key
    @headers = {
      'Authorization' => "Bearer #{api_key}",
      'Content-Type' => 'application/json'
    }
  end
  
  def request(endpoint, method: :get, **options)
    url = "#{@base_url}#{endpoint}"
    response = self.class.send(method, url, {
      headers: @headers,
      **options
    })
    
    raise "HTTP error! status: #{response.code}" unless response.success?
    response.parsed_response
  end
  
  def get_users
    request('/users')
  end
  
  def create_user(user_data)
    request('/users', method: :post, body: user_data.to_json)
  end
end

# Usage
client = ApiClient.new('https://api.example.com', 'your-api-key')
users = client.get_users
puts "Users: #{users}"`,
      },
    ],
  },
  {
    id: "graphql",
    title: "GraphQL Integration",
    description: "Type-safe GraphQL queries with fragments",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/graphql-icon-black.svg",
    code: [
      {
        language: "javascript",
        filename: "graphql-client.js",
        icon: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/javascript-icon.svg",
        code: `// GraphQL client with Apollo
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://api.example.com/graphql',
  cache: new InMemoryCache(),
  headers: {
    'Authorization': 'Bearer your-api-key'
  }
});

// User fragment for reusability
const USER_FRAGMENT = gql\`
  fragment UserFragment on User {
    id
    name
    email
    avatar
    createdAt
  }
\`;

// Query with fragments
const GET_USERS = gql\`
  \${USER_FRAGMENT}
  query GetUsers($limit: Int, $offset: Int) {
    users(limit: $limit, offset: $offset) {
      ...UserFragment
      posts {
        id
        title
        publishedAt
      }
    }
  }
\`;

// Mutation
const CREATE_USER = gql\`
  \${USER_FRAGMENT}
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      ...UserFragment
    }
  }
\`;

// Usage
const { data, loading, error } = useQuery(GET_USERS, {
  variables: { limit: 10, offset: 0 }
});

const [createUser] = useMutation(CREATE_USER);`,
      },
      {
        language: "python",
        filename: "graphql_client.py",
        icon: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/python-icon.svg",
        code: `# GraphQL client with gql
from gql import gql, Client
from gql.transport.aiohttp import AIOHTTPTransport

transport = AIOHTTPTransport(
    url="https://api.example.com/graphql",
    headers={"Authorization": "Bearer your-api-key"}
)

client = Client(transport=transport, fetch_schema_from_transport=True)

# User fragment
USER_FRAGMENT = gql("""
  fragment UserFragment on User {
    id
    name
    email
    avatar
    createdAt
  }
""")

# Query with fragments
GET_USERS = gql("""
  query GetUsers($limit: Int, $offset: Int) {
    users(limit: $limit, offset: $offset) {
      ...UserFragment
      posts {
        id
        title
        publishedAt
      }
    }
  }
""")

# Mutation
CREATE_USER = gql("""
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
      email
      createdAt
    }
  }
""")

# Usage
result = client.execute(GET_USERS, variable_values={"limit": 10, "offset": 0})
print(f"Users: {result}")`,
      },
      {
        language: "ruby",
        filename: "graphql_client.rb",
        icon: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/ruby-icon.svg",
        code: `# GraphQL client with graphql-client
require 'graphql/client'
require 'graphql/client/http'

# HTTP adapter
HTTP = GraphQL::Client::HTTP.new("https://api.example.com/graphql") do
  def headers(context)
    { "Authorization" => "Bearer your-api-key" }
  end
end

# Schema
Schema = GraphQL::Client.load_schema(HTTP)

# Client
Client = GraphQL::Client.new(schema: Schema, execute: HTTP)

# User fragment
USER_FRAGMENT = Client.parse <<~GRAPHQL
  fragment UserFragment on User {
    id
    name
    email
    avatar
    createdAt
  }
GRAPHQL

# Query
GET_USERS = Client.parse <<~GRAPHQL
  query GetUsers($limit: Int, $offset: Int) {
    users(limit: $limit, offset: $offset) {
      ...UserFragment
      posts {
        id
        title
        publishedAt
      }
    }
  }
GRAPHQL

# Usage
result = Client.query(GET_USERS, variables: { limit: 10, offset: 0 })
puts "Users: #{result.data.users}"`,
      },
    ],
  },
  {
    id: "websocket",
    title: "WebSocket Integration",
    description: "Real-time communication with WebSockets",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/socketdotio-icon-black.svg",
    code: [
      {
        language: "javascript",
        filename: "websocket-client.js",
        icon: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/javascript-icon.svg",
        code: `// WebSocket client with reconnection
class WebSocketClient {
  constructor(url, options = {}) {
    this.url = url;
    this.options = options;
    this.ws = null;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectDelay = 1000;
    this.listeners = new Map();
  }

  connect() {
    try {
      this.ws = new WebSocket(this.url);
      
      this.ws.onopen = (event) => {
        console.log('WebSocket connected');
        this.reconnectAttempts = 0;
        this.emit('open', event);
      };

      this.ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        this.emit('message', data);
      };

      this.ws.onclose = (event) => {
        console.log('WebSocket disconnected');
        this.emit('close', event);
        this.handleReconnect();
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        this.emit('error', error);
      };
    } catch (error) {
      console.error('Failed to connect:', error);
    }
  }

  send(data) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    }
  }

  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(callback);
  }

  emit(event, data) {
    const callbacks = this.listeners.get(event) || [];
    callbacks.forEach(callback => callback(data));
  }

  handleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      setTimeout(() => {
        console.log(\`Reconnecting... attempt \${this.reconnectAttempts}\`);
        this.connect();
      }, this.reconnectDelay * this.reconnectAttempts);
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
    }
  }
}

// Usage
const ws = new WebSocketClient('wss://api.example.com/ws');
ws.on('message', (data) => console.log('Received:', data));
ws.connect();
ws.send({ type: 'subscribe', channel: 'notifications' });`,
      },
      {
        language: "python",
        filename: "websocket_client.py",
        icon: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/python-icon.svg",
        code: `# WebSocket client with asyncio
import asyncio
import websockets
import json
from typing import Callable, Dict, Any

class WebSocketClient:
    def __init__(self, uri: str):
        self.uri = uri
        self.websocket = None
        self.listeners: Dict[str, list] = {}
        self.reconnect_attempts = 0
        self.max_reconnect_attempts = 5
        
    async def connect(self):
        try:
            self.websocket = await websockets.connect(self.uri)
            print("WebSocket connected")
            self.reconnect_attempts = 0
            await self.emit('open', {})
            
            # Start listening for messages
            await self.listen()
            
        except Exception as e:
            print(f"Connection failed: {e}")
            await self.handle_reconnect()
    
    async def listen(self):
        try:
            async for message in self.websocket:
                data = json.loads(message)
                await self.emit('message', data)
        except websockets.exceptions.ConnectionClosed:
            print("WebSocket connection closed")
            await self.emit('close', {})
            await self.handle_reconnect()
    
    async def send(self, data: Dict[str, Any]):
        if self.websocket and not self.websocket.closed:
            await self.websocket.send(json.dumps(data))
    
    def on(self, event: str, callback: Callable):
        if event not in self.listeners:
            self.listeners[event] = []
        self.listeners[event].append(callback)
    
    async def emit(self, event: str, data: Any):
        callbacks = self.listeners.get(event, [])
        for callback in callbacks:
            if asyncio.iscoroutinefunction(callback):
                await callback(data)
            else:
                callback(data)
    
    async def handle_reconnect(self):
        if self.reconnect_attempts < self.max_reconnect_attempts:
            self.reconnect_attempts += 1
            delay = 2 ** self.reconnect_attempts
            print(f"Reconnecting in {delay} seconds...")
            await asyncio.sleep(delay)
            await self.connect()
    
    async def disconnect(self):
        if self.websocket:
            await self.websocket.close()

# Usage
async def main():
    ws = WebSocketClient('wss://api.example.com/ws')
    
    def on_message(data):
        print(f"Received: {data}")
    
    ws.on('message', on_message)
    await ws.connect()
    await ws.send({"type": "subscribe", "channel": "notifications"})
    
    # Keep the connection alive
    await asyncio.sleep(60)
    await ws.disconnect()

# asyncio.run(main())`,
      },
      {
        language: "ruby",
        filename: "websocket_client.rb",
        icon: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/ruby-icon.svg",
        code: `# WebSocket client with websocket-client-simple
require 'websocket-client-simple'
require 'json'

class WebSocketClient
  def initialize(url)
    @url = url
    @ws = nil
    @reconnect_attempts = 0
    @max_reconnect_attempts = 5
    @listeners = {}
  end
  
  def connect
    begin
      @ws = WebSocket::Client::Simple.connect(@url)
      
      @ws.on :message do |msg|
        data = JSON.parse(msg.data)
        emit('message', data)
      end
      
      @ws.on :open do |event|
        puts "WebSocket connected"
        @reconnect_attempts = 0
        emit('open', event)
      end
      
      @ws.on :close do |event|
        puts "WebSocket disconnected"
        emit('close', event)
        handle_reconnect
      end
      
      @ws.on :error do |error|
        puts "WebSocket error: #{error}"
        emit('error', error)
      end
      
    rescue => e
      puts "Failed to connect: #{e}"
    end
  end
  
  def send(data)
    if @ws && @ws.open?
      @ws.send(JSON.generate(data))
    end
  end
  
  def on(event, &callback)
    @listeners[event] ||= []
    @listeners[event] << callback
  end
  
  def emit(event, data)
    callbacks = @listeners[event] || []
    callbacks.each { |callback| callback.call(data) }
  end
  
  def handle_reconnect
    if @reconnect_attempts < @max_reconnect_attempts
      @reconnect_attempts += 1
      delay = 2 ** @reconnect_attempts
      puts "Reconnecting in #{delay} seconds..."
      sleep(delay)
      connect
    end
  end
  
  def disconnect
    @ws&.close
  end
end

# Usage
ws = WebSocketClient.new('wss://api.example.com/ws')
ws.on('message') { |data| puts "Received: #{data}" }
ws.connect
ws.send({ type: 'subscribe', channel: 'notifications' })`,
      },
    ],
  },
];
