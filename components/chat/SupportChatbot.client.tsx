"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChatMessage, createChatCompletion } from "@/lib/groq";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { FiMessageCircle, FiSend, FiX } from "react-icons/fi";
import { cn } from "@/lib/utils";

type Message = {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
};

const SYSTEM_PROMPT =
  "You are the helpful AI Support Chatbot for GeeksTechServices.com—an AI-powered IoT network health monitoring and management platform. Be concise, friendly, and proactive. If asked about pricing, features, integrations, or troubleshooting, answer clearly and invite users to contact us via the Contact page when appropriate. Keep responses under 120 words, use bullet points sparingly, and avoid making unverifiable claims.";

function useSessionId(key = "gts-chat-session-id") {
  const [id, setId] = useState<string | null>(null);
  useEffect(() => {
    try {
      const existing = sessionStorage.getItem(key);
      if (existing) setId(existing);
      else {
        const next = Math.random().toString(36).slice(2);
        sessionStorage.setItem(key, next);
        setId(next);
      }
    } catch {
      setId(Math.random().toString(36).slice(2));
    }
  }, [key]);
  return id;
}

export default function SupportChatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const listRef = useRef<HTMLDivElement>(null);
  useSessionId();

  const welcomeText = useMemo(
    () =>
      "Hi! I’m your AI support assistant for GeeksTechServices. Ask me about features, pricing, or how our IoT health monitoring works.",
    []
  );

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          role: "assistant",
          content: welcomeText,
        },
      ]);
    }
  }, [open, messages.length, welcomeText]);

  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages]);

  async function handleSend() {
    const text = input.trim();
    if (!text || busy) return;
    setInput("");
    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
    };
    setMessages((m) => [...m, userMsg]);
    setBusy(true);

    // Build conversation for Groq — always include system prompt for consistent behavior
    const history: ChatMessage[] = [{ role: "system", content: SYSTEM_PROMPT }];
    // Include up to last 8 turns (user/assistant only)
    const trimmed = [...messages, userMsg]
      .filter((m) => m.role !== "system")
      .slice(-8)
      .map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      }));
    history.push(...trimmed);

    try {
      const { content } = await createChatCompletion(history, {
        model: "llama-3.1-70b-versatile",
        temperature: 0.3,
        max_tokens: 500,
      });
      setMessages((m) => [
        ...m,
        { id: crypto.randomUUID(), role: "assistant", content: content.trim() },
      ]);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      setMessages((m) => [
        ...m,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            "I ran into a problem contacting the AI service. Please try again in a moment.",
        },
      ]);
      // Optional: console.error for diagnostics
      console.error("Groq chat error:", msg);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      {/* Floating Launcher Button */}
      <motion.button
        aria-label='Open support chat'
        onClick={() => setOpen(true)}
        className={cn(
          "fixed bottom-5 right-5 z-50 rounded-full p-4",
          "bg-[#b32dff] text-white shadow-lg shadow-[#b32dff]/30",
          "hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
        )}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
      >
        <FiMessageCircle className='h-6 w-6' />
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            className='fixed bottom-20 right-5 z-50 w-[min(92vw,360px)]'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 24, stiffness: 260 }}
          >
            <Card
              className={cn(
                "relative overflow-hidden",
                "rounded-2xl border border-white/10",
                "bg-white/5 backdrop-blur-xl",
                "shadow-xl shadow-black/30"
              )}
            >
              {/* Header */}
              <div className='flex items-center justify-between px-4 py-3 border-b border-white/10'>
                <div>
                  <div className='text-sm font-medium'>AI Support</div>
                  <div className='text-xs text-white/60'>GeeksTechServices</div>
                </div>
                <Button
                  variant='ghost'
                  size='icon'
                  aria-label='Close chat'
                  onClick={() => setOpen(false)}
                  className='text-white/80 hover:text-white'
                >
                  <FiX className='h-5 w-5' />
                </Button>
              </div>

              {/* Messages */}
              <div
                ref={listRef}
                className='max-h-[50vh] overflow-y-auto px-3 py-3 space-y-2'
              >
                {messages.map((m) => (
                  <div key={m.id} className='flex'>
                    <div
                      className={cn(
                        "px-3 py-2 rounded-2xl text-sm leading-relaxed",
                        m.role === "user"
                          ? "ml-auto bg-[#b32dff]/90 text-white"
                          : "mr-auto bg-white/10 text-white/90"
                      )}
                    >
                      {m.content}
                    </div>
                  </div>
                ))}
                {busy && (
                  <div className='flex'>
                    <div className='mr-auto bg-white/10 text-white/80 px-3 py-2 rounded-2xl text-sm'>
                      Thinking…
                    </div>
                  </div>
                )}
              </div>

              {/* Composer */}
              <div className='flex items-center gap-2 p-3 border-t border-white/10'>
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSend();
                  }}
                  placeholder='Ask about features, pricing…'
                  aria-label='Type your message'
                  className='bg-white/5 border-white/10 text-white placeholder:text-white/50'
                />
                <Button
                  onClick={handleSend}
                  disabled={busy || !input.trim()}
                  className='bg-[#b32dff] hover:bg-[#a10dfb]'
                >
                  <FiSend className='h-4 w-4' />
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
