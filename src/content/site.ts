export const site = {
  name: "ibroh.im",
  owner: "Ibrohimbek Gulomov",
  tagline: "A personal space for ideas, projects, and experiments.",
  location: "Based in Uzbekistan · Building things on the internet",
  email: "hello@ibroh.im",
};

export const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Projects", to: "/projects" },
  { label: "Writing", to: "/writing" },
  { label: "Now", to: "/now" },
] as const;

export const socialLinks = [
  { label: "Instagram", href: "https://instagram.com/" },
  { label: "Telegram", href: "https://t.me/" },
  { label: "LinkedIn", href: "https://linkedin.com/" },
  { label: "GitHub", href: "https://github.com/" },
  { label: "Email", href: "mailto:hello@ibroh.im" },
];

export const currently = [
  { label: "Building", value: "Digital products" },
  { label: "Learning", value: "AI · Business · Technology" },
  { label: "Reading", value: "Books & research" },
  { label: "Exploring", value: "New ideas" },
];

export const nowItems = [
  {
    title: "Building",
    body: "Working on new digital products and experiments.",
  },
  {
    title: "Learning",
    body: "Improving my skills in technology, business, AI, and communication.",
  },
  {
    title: "Exploring",
    body: "New ideas around startups, education, AI, and personal development.",
  },
];

export const nowUpdatedAt = "August 2026";
