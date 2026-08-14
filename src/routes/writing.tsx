import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { ArticleCard } from "@/components/site/ArticleCard";
import { articles } from "@/content/articles";

const title = "Yozmalar — ibroh.im";
const description =
  "Kichik mahsulotlar qurish, ochiq oʻrganish, AI va shaxsiy rivojlanish haqida esselar va qaydlar.";

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
        <p className="eyebrow">Kundalik</p>
        <h1 className="mt-4 text-3xl font-medium tracking-tightest text-foreground sm:text-5xl">
          Yozmalar
        </h1>
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Narsalar qurish jarayonidan qaydlar, esselar va saboqlar. Alohida maqolalar tez
          orada.
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
