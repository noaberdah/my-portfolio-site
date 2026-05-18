"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, Send, Sparkles, Square, X } from "lucide-react";

type Role = "user" | "assistant";
type Message = { role: Role; content: string };

const INTRO: Message = {
  role: "assistant",
  content:
    "Hi — I'm Noa's digital twin. Ask me anything about my work, projects, or career path.",
};

const SUGGESTIONS = [
  "What kind of role are you looking for?",
  "Tell me about your IDF experience.",
  "What's your favorite project?",
  "What's your backend stack?",
];

export function DigitalTwin() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INTRO]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const abortRef = useRef<AbortController | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, streaming]);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 250);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || streaming) return;

      setError(null);
      setInput("");

      // optimistic update: user message + empty assistant placeholder
      const baseNext: Message[] = [
        ...messages,
        { role: "user", content: trimmed },
        { role: "assistant", content: "" },
      ];
      setMessages(baseNext);
      setStreaming(true);

      const apiMessages = baseNext.slice(1, -1).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const ctrl = new AbortController();
      abortRef.current = ctrl;

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: apiMessages }),
          signal: ctrl.signal,
        });

        if (!res.ok || !res.body) {
          const errText = await res.text().catch(() => "");
          throw new Error(errText || `Request failed (${res.status}).`);
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let assistantText = "";

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          if (!chunk) continue;
          assistantText += chunk;
          setMessages((prev) => {
            const copy = [...prev];
            copy[copy.length - 1] = {
              role: "assistant",
              content: assistantText,
            };
            return copy;
          });
        }

        if (!assistantText.trim()) {
          setMessages((prev) => prev.slice(0, -1));
          setError("No response from the model. Try again in a moment.");
        }
      } catch (err: unknown) {
        const name = (err as { name?: string })?.name;
        if (name !== "AbortError") {
          const msg =
            err instanceof Error ? err.message : "Something went wrong.";
          setError(msg);
          setMessages((prev) => {
            const last = prev[prev.length - 1];
            if (last?.role === "assistant" && !last.content.trim()) {
              return prev.slice(0, -1);
            }
            return prev;
          });
        }
      } finally {
        setStreaming(false);
        abortRef.current = null;
      }
    },
    [messages, streaming]
  );

  function stop() {
    abortRef.current?.abort();
  }

  function reset() {
    abortRef.current?.abort();
    setMessages([INTRO]);
    setError(null);
    setInput("");
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    send(input);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  }

  const visibleMessages = messages;
  const showSuggestions = messages.length === 1 && !streaming && !error;

  return (
    <>
      {/* Trigger */}
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close digital twin chat" : "Open digital twin chat"}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full border border-[color:var(--border-strong)] bg-[color:var(--background-elev)] text-accent shadow-[0_8px_32px_-8px_rgba(77,163,255,0.55)] transition-colors hover:bg-[color:var(--surface)]"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 45, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="grid place-items-center text-foreground"
            >
              <X className="h-5 w-5" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -45, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="grid place-items-center"
            >
              <Sparkles className="h-5 w-5" />
            </motion.span>
          )}
        </AnimatePresence>
        {!open && (
          <span className="pointer-events-none absolute inset-0 rounded-full">
            <span className="absolute inset-0 rounded-full border border-accent/40 animate-ping" />
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-label="Chat with Noa's digital twin"
            className="fixed bottom-24 right-5 left-5 sm:left-auto z-50 sm:w-[400px] max-h-[min(640px,calc(100vh-7.5rem))] flex flex-col rounded-2xl border border-[color:var(--border)] bg-[color:var(--background-elev)]/95 backdrop-blur-xl shadow-2xl overflow-hidden"
          >
            <div className="absolute inset-0 grid-bg-dense opacity-30 pointer-events-none" />

            {/* Header */}
            <div className="relative flex items-center justify-between gap-3 border-b border-[color:var(--border)] px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="relative grid h-9 w-9 place-items-center rounded-lg border border-[color:var(--border-strong)] bg-[color:var(--surface)] font-display text-sm font-semibold text-accent">
                  NL
                  <span className="absolute -bottom-0.5 -right-0.5 grid h-3 w-3 place-items-center rounded-full bg-[color:var(--background-elev)]">
                    <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_8px_var(--accent)]" />
                  </span>
                </span>
                <div>
                  <div className="font-display text-sm font-semibold tracking-tight">
                    Digital Twin
                  </div>
                  <div className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-muted">
                    AI · Noa Lapidot
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={reset}
                  className="grid h-8 w-8 place-items-center rounded-md text-muted hover:text-accent hover:bg-[color:var(--surface)] transition"
                  aria-label="Reset conversation"
                  title="Reset conversation"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="grid h-8 w-8 place-items-center rounded-md text-muted hover:text-accent hover:bg-[color:var(--surface)] transition"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={listRef}
              className="relative flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3"
            >
              {visibleMessages.map((m, i) => (
                <MessageBubble
                  key={i}
                  message={m}
                  isStreaming={
                    streaming &&
                    m.role === "assistant" &&
                    i === visibleMessages.length - 1
                  }
                />
              ))}

              {error && (
                <div className="rounded-lg border border-red-500/30 bg-red-500/5 px-3 py-2 text-xs text-red-300">
                  {error}
                </div>
              )}

              {showSuggestions && (
                <div className="mt-2 flex flex-col gap-2">
                  <div className="section-label">Try asking</div>
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => send(s)}
                        className="rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-3 py-1.5 text-xs text-muted hover:text-accent hover:border-accent transition"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Composer */}
            <form
              onSubmit={onSubmit}
              className="relative border-t border-[color:var(--border)] bg-[color:var(--background)]/60 backdrop-blur p-3"
            >
              <div className="flex items-end gap-2 rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] focus-within:border-accent transition px-3 py-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  rows={1}
                  placeholder="Ask about my career, projects, stack…"
                  disabled={streaming}
                  className="flex-1 resize-none bg-transparent outline-none placeholder:text-muted-2 text-sm leading-relaxed max-h-32 disabled:opacity-60"
                />
                {streaming ? (
                  <button
                    type="button"
                    onClick={stop}
                    className="grid h-9 w-9 place-items-center rounded-lg border border-[color:var(--border-strong)] bg-[color:var(--background-elev)] text-foreground hover:bg-[color:var(--surface-2)] transition"
                    aria-label="Stop generating"
                    title="Stop"
                  >
                    <Square className="h-3.5 w-3.5 fill-current" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!input.trim()}
                    className="grid h-9 w-9 place-items-center rounded-lg bg-accent text-black transition hover:bg-[color:var(--accent-hover)] disabled:opacity-40 disabled:cursor-not-allowed"
                    aria-label="Send"
                    title="Send (Enter)"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                )}
              </div>
              <div className="mt-2 flex items-center justify-between text-[0.65rem] text-muted-2">
                <span className="font-mono">⏎ send · ⇧⏎ newline</span>
                <span className="font-mono">openai/gpt-oss-120b</span>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MessageBubble({
  message,
  isStreaming,
}: {
  message: Message;
  isStreaming: boolean;
}) {
  const isUser = message.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`flex flex-col gap-1 ${isUser ? "items-end" : "items-start"}`}
    >
      <span className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-muted-2">
        {isUser ? "You" : "Noa"}
      </span>
      <div
        className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap break-words ${
          isUser
            ? "bg-accent text-black"
            : "border border-[color:var(--border)] bg-[color:var(--surface)] text-foreground"
        }`}
      >
        {message.content || (
          <span className="inline-flex items-center gap-1.5 text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse [animation-delay:120ms]" />
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse [animation-delay:240ms]" />
          </span>
        )}
        {isStreaming && message.content && (
          <span className="ml-0.5 inline-block h-3.5 w-1.5 align-[-2px] bg-accent animate-pulse" />
        )}
      </div>
    </motion.div>
  );
}
