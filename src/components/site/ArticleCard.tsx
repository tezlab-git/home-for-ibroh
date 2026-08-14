import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { Article } from "@/content/articles";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      to="/writing/$slug"
      params={{ slug: article.slug }}
      aria-label={article.title}
      className="group flex flex-col gap-3 border-t border-hairline py-7 transition-colors sm:flex-row sm:items-baseline sm:gap-10"
    >
      <div className="flex shrink-0 items-center gap-3 text-xs text-muted-foreground sm:w-44 sm:flex-col sm:items-start sm:gap-1.5">
        <time dateTime={article.date}>{article.displayDate}</time>
        <span className="text-muted-foreground/70">{article.category}</span>
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-medium tracking-tight text-foreground transition-colors group-hover:text-accent sm:text-xl">
          {article.title}
        </h3>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {article.excerpt}
        </p>
        <p className="mt-3 text-xs text-muted-foreground/80">{article.readingTime}</p>
      </div>
      <ArrowRight
        aria-hidden="true"
        className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent"
      />
    </Link>
  );
}
