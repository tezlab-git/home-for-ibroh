import { Link } from "@tanstack/react-router";
import { ArrowRight, Clock, BookOpen } from "lucide-react";
import type { Article } from "@/content/articles";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      to="/writing/$slug"
      params={{ slug: article.slug }}
      aria-label={article.title}
      className="group relative -mx-4 flex flex-col gap-4 rounded-2xl border border-transparent p-4.5 transition-all duration-300 hover:border-hairline hover:bg-surface/50 sm:flex-row sm:items-baseline sm:gap-10 sm:p-6"
    >
      <div className="flex shrink-0 items-center gap-3 text-xs text-muted-foreground sm:w-40 sm:flex-col sm:items-start sm:gap-2">
        <span className="rounded-md bg-surface px-2.5 py-1 text-[11px] font-medium text-muted-foreground border border-hairline group-hover:border-foreground/15">
          {article.category || "Fikrlar"}
        </span>
        <time dateTime={article.date} className="font-mono text-xs text-muted-foreground/80">
          {article.displayDate || article.date}
        </time>
      </div>

      <div className="flex-1">
        <h3 className="text-lg font-medium tracking-tight text-foreground transition-colors group-hover:text-accent sm:text-xl">
          {article.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">
          {article.excerpt}
        </p>
        <div className="mt-3.5 flex items-center gap-2 text-xs text-muted-foreground/80">
          <Clock className="size-3.5" />
          <span>{article.readingTime || "3 daqiqa"}</span>
        </div>
      </div>

      <div className="hidden sm:flex size-9 shrink-0 items-center justify-center rounded-full bg-surface text-muted-foreground transition-all duration-300 group-hover:bg-foreground group-hover:text-background group-hover:translate-x-1">
        <ArrowRight aria-hidden="true" className="size-4" />
      </div>
    </Link>
  );
}

