import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { supabase } from "@/lib/supabaseClient";
import { articles as staticArticles } from "@/content/articles";

export const Route = createFileRoute("/writing/$slug")({
  loader: async ({ params }) => {
    // Avval Supabase dan qidirish
    const { data } = await supabase
      .from("articles")
      .select("*")
      .eq("slug", params.slug)
      .eq("published", true)
      .single();

    if (data) return { article: data };

    // Supabase da yo'q bo'lsa static contentdan
    const article = staticArticles.find((a) => a.slug === params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.article.title} — ibroh.im` },
          { name: "description", content: loaderData.article.excerpt },
          { property: "og:title", content: loaderData.article.title },
          { property: "og:description", content: loaderData.article.excerpt },
        ]
      : [],
  }),
  component: ArticlePage,
});

function ArticlePage() {
  const { article } = Route.useLoaderData();

  const paragraphs = (article.body as string)
    .split("\n\n")
    .filter(Boolean)
    .map((block: string, i: number) => {
      if (block.startsWith("**") && block.endsWith("**")) {
        return (
          <h2 key={i} className="mt-8 text-lg font-semibold text-foreground">
            {block.replace(/\*\*/g, "")}
          </h2>
        );
      }
      if (block.startsWith("- ")) {
        const items = block.split("\n").filter((l) => l.startsWith("- "));
        return (
          <ul key={i} className="mt-4 list-disc pl-5 space-y-1">
            {items.map((item, j) => (
              <li key={j} className="text-base leading-relaxed text-muted-foreground">
                {item.replace(/^- /, "")}
              </li>
            ))}
          </ul>
        );
      }
      // Bold inline **text**
      const parts = block.split(/(\*\*[^*]+\*\*)/g);
      return (
        <p key={i} className="mt-4 text-base leading-relaxed text-muted-foreground">
          {parts.map((part, j) =>
            part.startsWith("**") && part.endsWith("**") ? (
              <strong key={j} className="font-semibold text-foreground">
                {part.replace(/\*\*/g, "")}
              </strong>
            ) : (
              part
            )
          )}
        </p>
      );
    });

  return (
    <div className="shell py-20 sm:py-28">
      <Link
        to="/writing"
        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        ← Yozmalar
      </Link>

      <article className="mt-10 max-w-2xl">
        <header>
          <p className="eyebrow">{article.category}</p>
          <h1 className="mt-3 text-3xl font-medium tracking-tightest text-foreground sm:text-4xl">
            {article.title}
          </h1>
          <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
            <time dateTime={article.date}>{article.display_date ?? article.displayDate}</time>
            <span>·</span>
            <span>{article.reading_time ?? article.readingTime}</span>
          </div>
        </header>

        <div className="mt-10 border-t border-hairline pt-10">{paragraphs}</div>
      </article>
    </div>
  );
}
