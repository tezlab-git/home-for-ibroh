export type Project = {
  slug: string;
  name: string;
  description: string;
  category: string;
  status: "Live" | "In progress" | "Concept" | "Ongoing";
  year: string;
  href: string;
};

export const projects: Project[] = [
  {
    slug: "tezlab",
    name: "Tezlab",
    description:
      "AI-powered platform for launching websites and digital businesses.",
    category: "Platform",
    status: "In progress",
    year: "2026",
    href: "/projects",
  },
  {
    slug: "mano",
    name: "Mano",
    description:
      "A vocabulary learning application focused on helping people remember words more effectively.",
    category: "Education",
    status: "Live",
    year: "2025",
    href: "/projects",
  },
  {
    slug: "salomat",
    name: "SalomAT",
    description:
      "An experimental wearable technology concept focused on personal health and daily insights.",
    category: "Hardware",
    status: "Concept",
    year: "2026",
    href: "/projects",
  },
  {
    slug: "mayoq-labs",
    name: "Mayoq Labs",
    description:
      "A personal technology and product ecosystem for building digital products.",
    category: "Studio",
    status: "Ongoing",
    year: "2024",
    href: "/projects",
  },
];
