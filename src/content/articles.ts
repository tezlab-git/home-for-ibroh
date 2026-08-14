export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  displayDate: string;
  readingTime: string;
  category: string;
  body: string;
};

export const articles: Article[] = [];
