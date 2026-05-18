"use client";

import { motion } from "framer-motion";
import { skillGroups } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";

export function Skills() {
  return (
    <section
      id="skills"
      className="relative py-24 md:py-32 border-t border-[color:var(--border)] overflow-hidden"
    >
      <div className="absolute inset-0 grid-bg-dense opacity-30" aria-hidden />
      <div className="relative container-x">
        <SectionHeading
          index="03"
          eyebrow="Technical stack"
          title="Tools I reach for — and how I think about them."
          description="A pragmatic kit, biased toward backend, distributed systems, and clean integrations."
        />

        <div className="mt-14 grid lg:grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--border)]">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: gi * 0.06 }}
              className="group relative bg-[color:var(--background-elev)] p-6 md:p-8 transition-colors hover:bg-[color:var(--surface)]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-muted-2">
                    {String(gi + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-lg font-semibold tracking-tight">
                    {group.label}
                  </h3>
                </div>
                <span className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-muted">
                  {group.items.length} items
                </span>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item, i) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0, scale: 0.92 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.35, delay: 0.1 + i * 0.03 }}
                    className="group/chip inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--background)] px-3 py-1.5 text-sm transition-colors hover:border-accent hover:text-accent"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--border-strong)] transition-colors group-hover/chip:bg-accent" />
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
