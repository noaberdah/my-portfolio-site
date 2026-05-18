"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Copy, Check, Mail, Phone } from "lucide-react";
import { useState } from "react";
import { GitHubIcon, LinkedInIcon } from "@/components/Brand";
import { profile } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";

function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        } catch {
          /* ignore */
        }
      }}
      className="inline-flex items-center gap-2 text-xs text-muted hover:text-accent transition-colors"
      aria-label={`Copy ${label}`}
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5" /> Copied
        </>
      ) : (
        <>
          <Copy className="h-3.5 w-3.5" /> Copy
        </>
      )}
    </button>
  );
}

export function Contact() {
  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 border-t border-[color:var(--border)] overflow-hidden"
    >
      <div className="aurora opacity-60" aria-hidden />
      <div className="relative container-x">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-7">
            <SectionHeading
              index="05"
              eyebrow="Get in touch"
              title="Let’s build something reliable."
              description="I’m open to backend, systems, and platform engineering roles — full-time or internship — in Tel Aviv or remote-friendly setups. The fastest way to reach me is email."
            />

            <motion.a
              href={`mailto:${profile.email}`}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              className="group mt-10 inline-flex flex-wrap items-center gap-3 font-display text-[clamp(2rem,5.5vw,4.5rem)] font-semibold tracking-tight leading-[1] hover:text-accent transition-colors"
            >
              <span className="break-all">{profile.email}</span>
              <span className="grid h-12 w-12 md:h-14 md:w-14 place-items-center rounded-full border border-[color:var(--border-strong)] bg-[color:var(--background-elev)] transition-all group-hover:bg-accent group-hover:text-black group-hover:border-accent">
                <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </motion.a>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                <LinkedInIcon className="h-4 w-4" /> LinkedIn
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                <GitHubIcon className="h-4 w-4" /> GitHub
              </a>
              <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="btn-ghost">
                <Phone className="h-4 w-4" /> Call
              </a>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-5 card p-6 md:p-7"
          >
            <div className="flex items-center justify-between">
              <div className="section-label">Contact card</div>
              <span className="font-mono text-[0.65rem] tracking-[0.2em] text-muted">
                NL · 2026
              </span>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <span className="grid h-14 w-14 place-items-center rounded-xl border border-[color:var(--border-strong)] bg-[color:var(--background-elev)] font-display text-xl font-semibold text-accent">
                NL
              </span>
              <div>
                <div className="font-display text-lg font-semibold tracking-tight">
                  {profile.name}
                </div>
                <div className="text-sm text-muted">{profile.role}</div>
              </div>
            </div>

            <ul className="mt-6 flex flex-col divide-y divide-[color:var(--border)] border-y border-[color:var(--border)]">
              <li className="flex items-center justify-between gap-3 py-3">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted" />
                  <span className="text-sm">{profile.email}</span>
                </div>
                <CopyButton value={profile.email} label="email" />
              </li>
              <li className="flex items-center justify-between gap-3 py-3">
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted" />
                  <span className="text-sm tabular-nums">{profile.phone}</span>
                </div>
                <CopyButton value={profile.phone} label="phone" />
              </li>
            </ul>

            <div className="mt-6 flex items-center justify-between">
              <div>
                <div className="section-label">Location</div>
                <div className="mt-1 text-sm">{profile.location}</div>
              </div>
              <div className="text-right">
                <div className="section-label">Status</div>
                <div className="mt-1 inline-flex items-center gap-2 text-sm">
                  <span className="relative inline-flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                  </span>
                  Available
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
