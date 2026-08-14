import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { supabase } from "@/lib/supabaseClient";
import { articles as staticArticles } from "@/content/articles";

const MDPreview = lazy(() => import("@uiw/react-md-editor").then((m) => ({ default: m.default.Markdown })));

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

        <div className="mt-10 border-t border-hairline pt-10">
          <Suspense fallback={<p className="text-sm text-muted-foreground">Yuklanmoqda...</p>}>
            <div data-color-mode="light" className="prose prose-sm max-w-none">
              <MDPreview source={article.body as string} />
            </div>
          </Suspense>
        </div>
      </article>
    </div>
  );
}
