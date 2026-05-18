import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: {
    default: "Noa Lapidot — Software Engineer",
    template: "%s · Noa Lapidot",
  },
  description:
    "Noa Lapidot — Software Engineer specializing in Python & C++ backend development, scalable systems, REST APIs, and event-driven architectures.",
  keywords: [
    "Noa Lapidot",
    "Software Engineer",
    "Backend Developer",
    "Python",
    "C++",
    "FastAPI",
    "Distributed Systems",
    "Portfolio",
  ],
  authors: [{ name: "Noa Lapidot" }],
  openGraph: {
    title: "Noa Lapidot — Software Engineer",
    description:
      "Backend engineer building reliable, high-performance systems. Python · C++ · FastAPI · .NET.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="relative min-h-full flex flex-col bg-background text-foreground font-sans selection:bg-accent selection:text-black">
        <div className="grain" aria-hidden />
        {children}
      </body>
    </html>
  );
}
