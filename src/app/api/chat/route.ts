import { NextRequest } from "next/server";
import { buildSystemPrompt } from "@/lib/system-prompt";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = "openai/gpt-oss-120b:free";

type ChatMessage = { role: "user" | "assistant" | "system"; content: string };

function sanitizeMessages(raw: unknown): ChatMessage[] {
  if (!Array.isArray(raw)) return [];
  const out: ChatMessage[] = [];
  for (const m of raw) {
    if (!m || typeof m !== "object") continue;
    const role = (m as { role?: unknown }).role;
    const content = (m as { content?: unknown }).content;
    if (
      (role === "user" || role === "assistant") &&
      typeof content === "string" &&
      content.trim().length > 0
    ) {
      out.push({ role, content: content.slice(0, 4000) });
    }
  }
  return out.slice(-20);
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return new Response("Server is missing OPENROUTER_API_KEY.", {
      status: 500,
    });
  }

  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return new Response("Invalid JSON body.", { status: 400 });
  }

  const messages = sanitizeMessages(
    (payload as { messages?: unknown })?.messages
  );

  if (messages.length === 0) {
    return new Response("No messages provided.", { status: 400 });
  }

  const referer =
    req.headers.get("origin") ||
    req.headers.get("referer") ||
    "http://localhost:3000";

  const upstream = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": referer,
      "X-Title": "Noa Lapidot - Digital Twin",
    },
    body: JSON.stringify({
      model: MODEL,
      stream: true,
      temperature: 0.6,
      max_tokens: 700,
      messages: [
        { role: "system", content: buildSystemPrompt() },
        ...messages,
      ],
    }),
  });

  if (!upstream.ok || !upstream.body) {
    const errText = await upstream.text().catch(() => "");
    return new Response(
      `Upstream error (${upstream.status}): ${errText.slice(0, 500)}`,
      { status: upstream.status || 502 }
    );
  }

  const decoder = new TextDecoder();
  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const reader = upstream.body!.getReader();
      let buffer = "";
      try {
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });

          // SSE events separated by blank line
          const parts = buffer.split("\n\n");
          buffer = parts.pop() ?? "";

          for (const evt of parts) {
            for (const rawLine of evt.split("\n")) {
              const line = rawLine.trimStart();
              if (!line.startsWith("data:")) continue;
              const data = line.slice(5).trim();
              if (!data) continue;
              if (data === "[DONE]") {
                controller.close();
                return;
              }
              try {
                const json = JSON.parse(data) as {
                  choices?: { delta?: { content?: string } }[];
                };
                const delta = json.choices?.[0]?.delta?.content;
                if (typeof delta === "string" && delta.length > 0) {
                  controller.enqueue(encoder.encode(delta));
                }
              } catch {
                /* ignore keep-alives & malformed lines */
              }
            }
          }
        }
        controller.close();
      } catch (err) {
        try {
          controller.error(err);
        } catch {
          /* noop */
        }
      }
    },
    cancel() {
      try {
        upstream.body?.cancel();
      } catch {
        /* noop */
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      "X-Accel-Buffering": "no",
    },
  });
}
