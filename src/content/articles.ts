export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  displayDate: string;
  readingTime: string;
  category: string;
};

/**
 * Content source for writing. Shaped like a CMS/database record so this array
 * can later be swapped for a fetch/loader without touching the UI components.
 */
export const articles: Article[] = [
  {
    slug: "what-im-building-right-now",
    title: "What I'm Building Right Now",
    excerpt:
      "A short look inside the products, experiments, and half-finished ideas currently living on my desk.",
    date: "2026-08-02",
    displayDate: "Aug 2, 2026",
    readingTime: "4 min read",
    category: "Building",
  },
  {
    slug: "why-i-like-building-small-products",
    title: "Why I Like Building Small Products",
    excerpt:
      "Small products teach faster than big plans. Notes on shipping tiny things and letting them grow slowly.",
    date: "2026-07-18",
    displayDate: "Jul 18, 2026",
    readingTime: "6 min read",
    category: "Craft",
  },
  {
    slug: "lessons-from-my-latest-project",
    title: "Lessons From My Latest Project",
    excerpt:
      "What worked, what quietly failed, and the decisions I would make differently the next time around.",
    date: "2026-06-29",
    displayDate: "Jun 29, 2026",
    readingTime: "7 min read",
    category: "Reflection",
  },
  {
    slug: "the-things-im-learning",
    title: "The Things I'm Learning",
    excerpt:
      "On learning in public: AI, business, writing, and the habit of taking better notes about everything.",
    date: "2026-06-10",
    displayDate: "Jun 10, 2026",
    readingTime: "5 min read",
    category: "Learning",
  },
];
