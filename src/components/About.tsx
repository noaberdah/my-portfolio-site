"use client";

import { motion } from "framer-motion";
import { Code2, Cpu, Network, Sparkles } from "lucide-react";
import { profile, languages } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";

const pillars = [
  {
    icon: Cpu,
    title: "Systems thinking",
    body: "Reasoning across layers — from data structures to event-driven services — to keep complexity in check.",
  },
  {
    icon: Code2,
    title: "Backend craft",
    body: "Pythonic, type-safe APIs with FastAPI; performance-minded C++ where it matters; .NET when the stack calls for it.",
  },
  {
    icon: Network,
    title: "Reliable by design",
    body: "Clean architecture, async patterns, and instrumentation so production behaves the way the diagram says it should.",
  },
  {
    icon: Sparkles,
    title: "Calm under pressure",
    body: "Sharpened by IDF 9910 — turning noisy, real-time signals into clear, actionable decisions.",
  },
];

export function About() {
  return (
    <section
      id="about"
      className="relative py-24 md:py-32 border-t border-[color:var(--border)]"
    >
      <div className="container-x grid lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            index="01"
            eyebrow="About"
            title="Engineer of quiet, dependable systems."
          />

          <div className="mt-8 flex flex-col gap-5 text-base md:text-lg leading-relaxed text-muted">
            {profile.summary.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                {p}
              </motion.p>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-[color:var(--border)] bg-[color:var(--border)]">
            {languages.map((l) => (
              <div
                key={l.name}
                className="bg-[color:var(--background-elev)] p-5"
              >
                <div className="section-label">{l.level}</div>
                <div className="mt-1 font-display text-lg font-semibold tracking-tight">
                  {l.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="grid sm:grid-cols-2 gap-4">
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="card p-6 md:p-7 group"
                >
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-md border border-[color:var(--border-strong)] bg-[color:var(--background-elev)] text-accent transition-colors group-hover:bg-accent group-hover:text-black">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="font-mono text-[0.65rem] tracking-[0.2em] text-muted-2">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold tracking-tight">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {p.body}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 card p-6 md:p-7 overflow-hidden"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="section-label">Currently</div>
                <p className="mt-2 max-w-xl text-base md:text-lg leading-relaxed">
                  Wrapping up my B.Sc. and looking for a{" "}
                  <span className="text-accent">production-oriented</span> backend
                  role where reliability, scale, and craft are first-class.
                </p>
              </div>
              <span className="hidden sm:inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] px-3 py-1.5 text-xs text-muted">
                <span className="relative inline-flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                Open to opportunities
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
