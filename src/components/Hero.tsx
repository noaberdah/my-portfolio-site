"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowDownRight, ArrowUpRight, Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/Brand";
import { profile } from "@/lib/content";

const SCRAMBLE_CHARS = "!<>-_\\/[]{}—=+*^?#________";

function useScrambledText(target: string, trigger: boolean) {
  const [text, setText] = useState(target);
  const frameRef = useRef(0);
  const queueRef = useRef<{ from: string; to: string; start: number; end: number; char?: string }[]>([]);

  useEffect(() => {
    if (!trigger) return;
    const old = text;
    const length = Math.max(old.length, target.length);
    const queue: { from: string; to: string; start: number; end: number; char?: string }[] = [];
    for (let i = 0; i < length; i++) {
      const from = old[i] || "";
      const to = target[i] || "";
      const start = Math.floor(Math.random() * 30);
      const end = start + Math.floor(Math.random() * 30);
      queue.push({ from, to, start, end });
    }
    queueRef.current = queue;
    let frame = 0;
    let complete = 0;
    const update = () => {
      let output = "";
      complete = 0;
      for (let i = 0; i < queueRef.current.length; i++) {
        const item = queueRef.current[i];
        if (frame >= item.end) {
          complete++;
          output += item.to;
        } else if (frame >= item.start) {
          if (!item.char || Math.random() < 0.28) {
            item.char = SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          }
          output += `<span class="text-accent/80">${item.char}</span>`;
        } else {
          output += item.from;
        }
      }
      setText(output);
      if (complete !== queueRef.current.length) {
        frame++;
        frameRef.current = requestAnimationFrame(update);
      }
    };
    frameRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  return text;
}

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [time, setTime] = useState<string>("");
  useEffect(() => {
    const tick = () => {
      try {
        const formatter = new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: "Asia/Jerusalem",
        });
        setTime(formatter.format(new Date()) + " TLV");
      } catch {
        setTime(new Date().toLocaleTimeString());
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const [scrambleReady, setScrambleReady] = useState(false);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const t = setTimeout(() => setScrambleReady(true), 350);
    return () => clearTimeout(t);
  }, []);
  const scrambled = useScrambledText(profile.role.toUpperCase(), scrambleReady);

  return (
    <section
      ref={containerRef}
      id="top"
      className="relative isolate min-h-[100svh] overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24"
    >
      <div className="aurora" aria-hidden />
      <div className="absolute inset-0 grid-bg" aria-hidden />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 container-x flex flex-col gap-12"
      >
        {/* Top meta */}
        <div className="flex items-center justify-between font-mono text-xs text-muted">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-2 w-2 rounded-full bg-accent shadow-[0_0_12px_2px_var(--accent)]" />
            <span className="tracking-[0.18em] uppercase">Portfolio · v1.0</span>
          </div>
          <div className="hidden sm:flex items-center gap-6">
            <span>{profile.location}</span>
            <span className="tabular-nums" suppressHydrationWarning>{time}</span>
          </div>
        </div>

        {/* Headline */}
        <div className="flex flex-col gap-6">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-mono text-[0.7rem] tracking-[0.25em] uppercase text-muted"
          >
            / 00 · Software Engineer
          </motion.span>

          <h1 className="font-display tracking-tight text-[clamp(2.75rem,9vw,8.5rem)] leading-[0.92] font-semibold">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="block"
            >
              {profile.firstName}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="block gradient-text"
            >
              {profile.lastName}.
            </motion.span>
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2"
          >
            <span className="inline-flex h-px w-10 bg-accent" />
            <span
              className="font-mono text-sm tracking-[0.18em] text-foreground caret"
              aria-label={profile.role}
              dangerouslySetInnerHTML={{ __html: scrambled }}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="max-w-2xl text-base md:text-lg text-muted leading-relaxed"
          >
            I design and build reliable backend systems with{" "}
            <span className="text-foreground">Python</span>,{" "}
            <span className="text-foreground">C++</span> &{" "}
            <span className="text-foreground">.NET</span> — focused on scalable
            architectures, clean APIs, and the small details that ship great
            software.
          </motion.p>
        </div>

        {/* CTAs + socials */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="flex flex-col sm:flex-row sm:items-center gap-4"
        >
          <a href="#projects" className="btn-primary group">
            View selected work
            <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
          </a>
          <a href="#contact" className="btn-ghost group">
            Let&rsquo;s talk
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          <div className="flex items-center gap-1 sm:ml-2">
            <a
              href={`mailto:${profile.email}`}
              className="grid h-10 w-10 place-items-center rounded-full border border-[color:var(--border)] text-muted hover:text-accent hover:border-accent transition"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-10 w-10 place-items-center rounded-full border border-[color:var(--border)] text-muted hover:text-accent hover:border-accent transition"
              aria-label="LinkedIn"
            >
              <LinkedInIcon className="h-4 w-4" />
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-10 w-10 place-items-center rounded-full border border-[color:var(--border)] text-muted hover:text-accent hover:border-accent transition"
              aria-label="GitHub"
            >
              <GitHubIcon className="h-4 w-4" />
            </a>
          </div>
        </motion.div>

        {/* Metrics strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-px overflow-hidden rounded-xl border border-[color:var(--border)] bg-[color:var(--border)]"
        >
          {[
            { k: "Degree", v: "B.Sc. CS" },
            { k: "Languages spoken", v: "3" },
            { k: "Final project grade", v: "98 / 100" },
            { k: "Backend focus", v: "Python · C++" },
          ].map((m) => (
            <div
              key={m.k}
              className="group/metric relative bg-[color:var(--background-elev)] p-5 md:p-6 transition-colors hover:bg-[color:var(--surface)]"
            >
              <div className="section-label">{m.k}</div>
              <div className="mt-2 font-display text-2xl md:text-3xl font-semibold tracking-tight transition-colors group-hover/metric:text-accent">
                {m.v}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[0.65rem] tracking-[0.25em] uppercase text-muted">
          Scroll
        </span>
        <span className="relative h-10 w-px overflow-hidden bg-[color:var(--border-strong)]">
          <motion.span
            animate={{ y: [-40, 40] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-0 right-0 h-4 bg-accent"
          />
        </span>
      </motion.div>
    </section>
  );
}
