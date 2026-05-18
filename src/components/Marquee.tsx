"use client";

import { skillGroups } from "@/lib/content";

export function Marquee() {
  const all = skillGroups.flatMap((g) => g.items);
  const items = [...all, ...all];

  return (
    <section
      aria-hidden
      className="relative border-y border-[color:var(--border)] bg-[color:var(--background-elev)] py-5 overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[color:var(--background-elev)] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[color:var(--background-elev)] to-transparent z-10" />
      <div className="flex w-max animate-marquee will-change-transform">
        {items.map((item, i) => (
          <div
            key={`${item}-${i}`}
            className="flex items-center gap-6 px-8 font-display text-2xl md:text-3xl font-medium tracking-tight text-muted"
          >
            <span>{item}</span>
            <span className="text-accent">✦</span>
          </div>
        ))}
      </div>
    </section>
  );
}
