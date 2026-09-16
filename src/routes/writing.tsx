import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Reveal } from "@/components/site/Reveal";
import { ArticleCard } from "@/components/site/ArticleCard";
import { articles as staticArticles, type Article } from "@/content/articles";
import { supabase } from "@/lib/supabaseClient";

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

function mapDbArticle(row: any): Article {
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt || "",
    date: row.date || "",
    displayDate: row.date || "",
    readingTime: row.reading_time ? `${row.reading_time} daqiqa` : "3 daqiqa",
    category: row.category || "Fikrlar",
    body: row.content || "",
  };
}

function WritingPage() {
  const [articleList, setArticleList] = useState<Article[]>(staticArticles);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { data, error } = await supabase
          .from("articles")
          .select("*")
          .eq("published", true)
          .order("date", { ascending: false });

        if (error) throw error;

        if (mounted && data && data.length > 0) {
          setArticleList(data.map(mapDbArticle));
        }
      } catch (e) {
        console.error("Yozmalarni yuklashda xatolik:", e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="shell py-20 sm:py-28">
      <Reveal>
        <p className="eyebrow">Kundalik</p>
        <h1 className="mt-4 text-3xl font-medium tracking-tightest text-foreground sm:text-5xl">
          Yozmalar
        </h1>
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Narsalar qurish jarayonidan qaydlar, esselar va saboqlar. Alohida maqolalar va
          tahlillar.
        </p>
      </Reveal>
      <div className="mt-14">
        {loading && articleList.length === 0 ? (
          <p className="text-sm text-muted-foreground">Yuklanmoqda...</p>
        ) : articleList.length === 0 ? (
          <p className="text-sm text-muted-foreground">Hozircha maqolalar mavjud emas.</p>
        ) : (
          articleList.map((article, i) => (
            <Reveal key={article.slug} delay={i * 50}>
              <ArticleCard article={article} />
            </Reveal>
          ))
        )}
      </div>
    </div>
  );
}
