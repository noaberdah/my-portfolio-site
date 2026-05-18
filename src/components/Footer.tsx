"use client";

import { ArrowUp } from "lucide-react";
import { profile } from "@/lib/content";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-[color:var(--border)] py-10">
      <div className="container-x flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center rounded-md border border-[color:var(--border-strong)] bg-[color:var(--surface)] font-mono text-xs font-bold text-accent">
            NL
          </span>
          <div className="text-sm">
            <div className="font-display font-semibold tracking-tight">
              {profile.name}
            </div>
            <div className="text-xs text-muted">
              © {year} · Designed & built with intent.
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <a
            href={`mailto:${profile.email}`}
            className="text-muted hover:text-accent transition-colors"
          >
            {profile.email}
          </a>
          <span className="h-4 w-px bg-[color:var(--border-strong)]" />
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-accent transition-colors"
          >
            LinkedIn
          </a>
          <span className="h-4 w-px bg-[color:var(--border-strong)]" />
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-accent transition-colors"
          >
            GitHub
          </a>
        </div>

        <a
          href="#top"
          className="inline-flex items-center gap-2 self-start md:self-auto text-sm text-muted hover:text-accent transition-colors"
        >
          Back to top
          <span className="grid h-8 w-8 place-items-center rounded-full border border-[color:var(--border-strong)] bg-[color:var(--surface)]">
            <ArrowUp className="h-4 w-4" />
          </span>
        </a>
      </div>
    </footer>
  );
}
