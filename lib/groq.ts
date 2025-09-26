"use client";

// Lightweight Groq Chat Completions client for browser-only usage.
// NOTE: This uses NEXT_PUBLIC_GORQ_API_KEY, which will be exposed to the client bundle.
// Ensure your Groq key is restricted appropriately (HTTP referrer/domain) or use a proxy if needed.

export type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export type ChatCompletionOptions = {
  model?: string;
  temperature?: number;
  max_tokens?: number;
  // When true, will request SSE stream. Our UI uses non-streaming by default.
  stream?: boolean;
};

const API_URL = "https://api.groq.com/openai/v1/chat/completions";

export async function createChatCompletion(
  messages: ChatMessage[],
  opts: ChatCompletionOptions = {}
) {
  const apiKey = process.env.NEXT_PUBLIC_GORQ_API_KEY;
  if (!apiKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_GORQ_API_KEY. Add it to your .env and restart dev server."
    );
  }

  const body = {
    model: opts.model ?? "llama-3.1-70b-versatile",
    temperature: opts.temperature ?? 0.4,
    max_tokens: opts.max_tokens ?? 800,
    messages,
    stream: Boolean(opts.stream),
  } as const;

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Groq API error ${res.status}: ${text}`);
  }

  // Non-streaming path returns JSON
  type GroqMessage = { role?: string; content?: string };
  type GroqChoice = {
    index?: number;
    message?: GroqMessage;
    delta?: { content?: string };
  };
  type GroqResponse = { id?: string; choices?: GroqChoice[] };
  const data: GroqResponse = await res.json();
  const content: string =
    data?.choices?.[0]?.message?.content ??
    data?.choices?.[0]?.delta?.content ??
    "Sorry, I couldn't generate a response.";
  return { content, raw: data };
}
