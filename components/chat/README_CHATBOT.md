# AI Support Chatbot (Groq)

This site uses a bottom-right floating AI support chatbot powered by Groq's Chat Completions API.

- UI: glassmorphism with Tailwind + shadcn/ui + Framer Motion
- Model: `llama-3.1-70b-versatile` (configurable in `lib/groq.ts` or component props)
- First user turn of the session injects a system prompt so it behaves as GeeksTechServices' assistant
- Client-side only to preserve static export; uses `NEXT_PUBLIC_GORQ_API_KEY`

Environment:

- Add `NEXT_PUBLIC_GORQ_API_KEY` to `.env` (already present). For production, restrict this key by domain or proxy it through a secure backend if stronger protection is required.

Files:

- `lib/groq.ts`: minimal Groq client
- `components/chat/SupportChatbot.client.tsx`: widget implementation
- `app/layout.tsx`: renders the widget site-wide via dynamic import with `ssr: false`

Security Note:
Because this is a fully static site (Next.js export), the Groq key is exposed to the browser. Prefer referrer-restricted API keys or place a thin serverless proxy in front of Groq if you need stricter control.
