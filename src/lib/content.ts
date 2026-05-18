export const profile = {
  name: "Noa Lapidot",
  firstName: "Noa",
  lastName: "Lapidot",
  role: "Software Engineer",
  tagline: "Backend systems · Scalable architectures · Reliable software",
  location: "Tel Aviv, Israel",
  email: "noaberdah@gmail.com",
  phone: "+972 54-539-1286",
  linkedin: "https://www.linkedin.com/in/noa-lapidot",
  github: "https://github.com/",
  available: true,
  summary: [
    "Software Engineer with a B.Sc. in Computer Science, specializing in Python and C++ backend development and scalable systems.",
    "Experienced in REST APIs, SQL databases, and event-driven architectures with modern frameworks. Strong foundation in data structures, algorithms, and object-oriented design — with hands-on experience debugging complex systems and improving performance.",
    "Passionate about building reliable, high-quality software and growing in a production-oriented environment while contributing to impactful systems.",
  ],
} as const;

export type SkillGroup = {
  label: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    label: "Languages",
    items: ["C", "C++", "C#", "JavaScript", "Python", "SQL"],
  },
  {
    label: "Frameworks & Libraries",
    items: [".NET", "FastAPI", "Express.js"],
  },
  {
    label: "Tools & Platforms",
    items: ["RabbitMQ", "Kafka", "Git", "GitHub", "MongoDB", "Linux"],
  },
  {
    label: "Methodologies",
    items: [
      "OOP",
      "REST APIs",
      "Client-Server",
      "Async Programming",
      "API Integration",
      "Data Modeling",
    ],
  },
];

export type TimelineItem = {
  period: string;
  title: string;
  org: string;
  tags?: string[];
  bullets: string[];
  kind: "education" | "service" | "experience";
};

export const timeline: TimelineItem[] = [
  {
    period: "2021 — 2025",
    title: "B.Sc. in Computer Science",
    org: "The Academic College of Tel Aviv–Yaffo",
    kind: "education",
    tags: ["Algorithms", "Data Structures", "OOP", "Systems"],
    bullets: [
      "Coursework in algorithms, data structures, operating systems, databases, and distributed computing.",
      "Final project graded 98 — an open-source contribution extending uBlock Origin with modular runtime modes.",
    ],
  },
  {
    period: "2017 — 2020",
    title: "Commander — VISINT Analysis Course",
    org: "IDF · Unit 9910",
    kind: "service",
    tags: ["Leadership", "Training", "Operations"],
    bullets: [
      "Led and trained 40 analysts on analytical systems and methodologies.",
      "Managed onboarding of new tools and systems, including integration into operational workflows.",
    ],
  },
  {
    period: "2017 — 2020",
    title: "Visual Intelligence Analyst",
    org: "IDF · Unit 9910",
    kind: "service",
    tags: ["Real-time data", "Anomaly detection", "Decisioning"],
    bullets: [
      "Analyzed multi-source data systems in real-time environments.",
      "Worked with complex data platforms requiring precision, a debugging mindset, and anomaly detection.",
      "Identified system inconsistencies and contributed to operational decision-making.",
    ],
  },
];

export type Project = {
  title: string;
  subtitle: string;
  description: string;
  stack: string[];
  highlights: string[];
  status: "Shipped" | "In Progress" | "Open Source";
  metric?: { label: string; value: string };
  link?: string;
};

export const projects: Project[] = [
  {
    title: "uBlock Origin — Modular Fork",
    subtitle: "Open-source browser extension",
    description:
      "Designed and implemented modular features in a complex browser-based system, extending dynamic DOM manipulation and adding time-based runtime modes (Study / Kids / Night).",
    stack: ["JavaScript", "WebExtensions API", "IndexedDB", "LocalStorage"],
    highlights: [
      "Built async, event-driven state management",
      "Client-side persistence focused on performance",
      "Real-time UI control via DOM manipulation",
    ],
    status: "Open Source",
    metric: { label: "Final Grade", value: "98 / 100" },
    link: "#",
  },
  {
    title: "Mini Social Network",
    subtitle: "Facebook-like client–server system",
    description:
      "End-to-end social platform with authentication, posts, messaging, and real-time interactions — designed around scalability and clean architecture.",
    stack: ["C#", ".NET", "REST APIs", "OOP"],
    highlights: [
      "Designed client-server architecture",
      "Implemented REST APIs and data persistence",
      "Applied OOP and clean architecture principles",
    ],
    status: "Shipped",
    link: "#",
  },
];

export const languages = [
  { name: "Hebrew", level: "Native" },
  { name: "French", level: "Native" },
  { name: "English", level: "Fluent" },
];

export const navLinks = [
  { id: "about", label: "About" },
  { id: "journey", label: "Journey" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];
