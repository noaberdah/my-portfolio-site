"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, FolderGit2, Sparkles } from "lucide-react";
import { projects } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";

const statusColor: Record<string, string> = {
  "Open Source": "var(--violet)",
  Shipped: "var(--accent)",
  "In Progress": "var(--violet)",
};

export function Projects() {
  return (
    <section
      id="projects"
      className="relative py-24 md:py-32 border-t border-[color:var(--border)]"
    >
      <div className="container-x">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <SectionHeading
            index="04"
            eyebrow="Selected work"
            title="Projects that taught me how to ship."
            description="A small, growing set of work — each one a step deeper into systems thinking and reliable engineering."
          />
          <a
            href="#contact"
            className="btn-ghost self-start md:self-end shrink-0"
          >
            Full portfolio coming soon
            <Sparkles className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-14 grid md:grid-cols-2 gap-5">
          {projects.map((p, i) => (
            <motion.a
              key={p.title}
              href={p.link ?? "#"}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: i * 0.07 }}
              className="card relative flex flex-col p-6 md:p-7 overflow-hidden group corner-marks"
            >
              <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-accent/0 blur-3xl transition-all duration-500 group-hover:bg-accent/10" />

              <div className="relative flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-md border border-[color:var(--border-strong)] bg-[color:var(--background-elev)] text-accent">
                    <FolderGit2 className="h-4 w-4" />
                  </span>
                  <span className="section-label">
                    Project · {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <span
                  className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--background-elev)] px-2.5 py-1 text-[0.7rem] text-muted"
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: statusColor[p.status] ?? "var(--accent)" }}
                  />
                  {p.status}
                </span>
              </div>

              <h3 className="relative mt-6 font-display text-2xl md:text-[1.65rem] font-semibold tracking-tight">
                {p.title}
              </h3>
              <p className="relative mt-1 text-sm text-muted">{p.subtitle}</p>

              <p className="relative mt-5 text-sm md:text-base leading-relaxed text-muted">
                {p.description}
              </p>

              <ul className="relative mt-5 flex flex-col gap-2 text-sm text-muted">
                {p.highlights.map((h) => (
                  <li key={h} className="flex gap-3">
                    <span className="mt-2 h-px w-3 shrink-0 bg-accent" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              <div className="relative mt-6 flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-md border border-[color:var(--border)] bg-[color:var(--background-elev)] px-2 py-1 font-mono text-[0.7rem] text-muted"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <div className="relative mt-7 flex items-center justify-between pt-5 border-t border-[color:var(--border)]">
                {p.metric ? (
                  <div>
                    <div className="section-label">{p.metric.label}</div>
                    <div className="mt-1 font-display text-lg font-semibold tracking-tight text-accent">
                      {p.metric.value}
                    </div>
                  </div>
                ) : (
                  <div className="section-label">Case study</div>
                )}
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--border-strong)] bg-[color:var(--background-elev)] transition-all group-hover:bg-accent group-hover:text-black group-hover:border-accent">
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Portfolio placeholder slot */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="mt-5 grid md:grid-cols-2 gap-5"
        >
          <div className="relative rounded-xl border border-dashed border-[color:var(--border-strong)] bg-[color:var(--background-elev)] p-6 md:p-7 overflow-hidden">
            <div className="absolute inset-0 grid-bg-dense opacity-40" aria-hidden />
            <div className="relative">
              <div className="section-label">Coming soon</div>
              <h3 className="mt-3 font-display text-xl md:text-2xl font-semibold tracking-tight">
                Full case studies & live demos
              </h3>
              <p className="mt-2 text-sm text-muted max-w-md">
                Architecture write-ups, performance breakdowns, and the lessons
                behind each shipped system — being added soon.
              </p>
            </div>
          </div>
          <div className="relative rounded-xl border border-dashed border-[color:var(--border-strong)] bg-[color:var(--background-elev)] p-6 md:p-7 overflow-hidden">
            <div className="absolute inset-0 grid-bg-dense opacity-40" aria-hidden />
            <div className="relative">
              <div className="section-label">Reserved</div>
              <h3 className="mt-3 font-display text-xl md:text-2xl font-semibold tracking-tight">
                Open-source contributions & writing
              </h3>
              <p className="mt-2 text-sm text-muted max-w-md">
                A space for upcoming OSS work, technical articles, and project
                deep-dives. Want a sneak peek?{" "}
                <a href="#contact" className="text-accent hover:underline">
                  Ping me.
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
