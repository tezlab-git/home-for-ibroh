import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { ArticleCard } from "@/components/site/ArticleCard";
import { articles } from "@/content/articles";

const title = "Writing — ibroh.im";
const description =
  "Essays and notes on building small products, learning in public, AI, and personal development.";

export const Route = createFileRoute("/writing")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: WritingPage,
});

function WritingPage() {
  return (
    <div className="shell py-20 sm:py-28">
      <Reveal>
        <p className="eyebrow">Journal</p>
        <h1 className="mt-4 text-3xl font-medium tracking-tightest text-foreground sm:text-5xl">
          Writing
        </h1>
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Notes, essays, and lessons from building things. Individual articles are coming
          soon.
        </p>
      </Reveal>
      <div className="mt-14">
        {articles.map((article, i) => (
          <Reveal key={article.slug} delay={i * 50}>
            <ArticleCard article={article} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
