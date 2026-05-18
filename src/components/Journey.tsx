"use client";

import { motion } from "framer-motion";
import { GraduationCap, Shield, Briefcase } from "lucide-react";
import { timeline } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";

const kindMeta = {
  education: { Icon: GraduationCap, label: "Education", accent: "var(--accent)" },
  service: { Icon: Shield, label: "Service", accent: "var(--violet)" },
  experience: { Icon: Briefcase, label: "Experience", accent: "var(--accent)" },
} as const;

export function Journey() {
  return (
    <section
      id="journey"
      className="relative py-24 md:py-32 border-t border-[color:var(--border)]"
    >
      <div className="container-x">
        <SectionHeading
          index="02"
          eyebrow="Career journey"
          title="A path through analysis, leadership, and engineering."
          description="From real-time intelligence analysis in the IDF to building scalable backend systems — each chapter sharpened the next."
        />

        <div className="relative mt-16 md:mt-20">
          {/* spine */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[color:var(--border-strong)] to-transparent" />

          <ul className="flex flex-col gap-12 md:gap-16">
            {timeline.map((item, i) => {
              const meta = kindMeta[item.kind];
              const Icon = meta.Icon;
              const left = i % 2 === 0;

              return (
                <li key={`${item.title}-${i}`} className="relative">
                  <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start">
                    {/* timeline node */}
                    <span
                      aria-hidden
                      className="absolute left-4 md:left-1/2 top-7 z-10 -translate-x-1/2 grid h-4 w-4 place-items-center rounded-full border border-[color:var(--border-strong)] bg-[color:var(--background)]"
                    >
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ background: meta.accent }}
                      />
                    </span>

                    {/* card */}
                    <motion.div
                      initial={{ opacity: 0, x: left ? -20 : 20, y: 12 }}
                      whileInView={{ opacity: 1, x: 0, y: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                      className={`card p-6 md:p-7 ml-12 md:ml-0 ${
                        left ? "md:col-start-1" : "md:col-start-2"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <span
                            className="grid h-8 w-8 place-items-center rounded-md border border-[color:var(--border-strong)] bg-[color:var(--background-elev)]"
                            style={{ color: meta.accent }}
                          >
                            <Icon className="h-4 w-4" />
                          </span>
                          <span className="section-label">{meta.label}</span>
                        </div>
                        <span className="font-mono text-xs text-muted">
                          {item.period}
                        </span>
                      </div>

                      <h3 className="mt-5 font-display text-xl md:text-2xl font-semibold tracking-tight">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted">{item.org}</p>

                      <ul className="mt-5 flex flex-col gap-2.5 text-sm leading-relaxed text-muted">
                        {item.bullets.map((b, j) => (
                          <li key={j} className="flex gap-3">
                            <span
                              className="mt-2 h-px w-3 shrink-0"
                              style={{ background: meta.accent }}
                            />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>

                      {item.tags && (
                        <div className="mt-5 flex flex-wrap gap-2">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-[color:var(--border)] bg-[color:var(--background-elev)] px-2.5 py-1 text-[0.7rem] text-muted"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </motion.div>

                    {/* spacer */}
                    <div className="hidden md:block" />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
