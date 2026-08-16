import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";

const title = "Ibrohimbek Gulomov — Men haqimda";
const description =
  "Ibrohimbek Gulomov (Ibrohim) — O'zbekistonlik dasturchi va mahsulot yaratuvchi. Raqamli mahsulotlar qurish, texnologiya va biznes haqida yozish bilan shug'ullanadi.";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ibrohimbek Gulomov",
  alternateName: ["Ibrohim Gulomov", "Ibrohim", "ibroh"],
  url: "https://ibroh.im",
  sameAs: [
    "https://github.com/",
    "https://linkedin.com/in/",
    "https://t.me/",
  ],
  jobTitle: "Software Developer & Product Builder",
  nationality: "Uzbek",
  description: description,
};

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "keywords", content: "Ibrohimbek Gulomov, Ibrohim Gulomov, Ibrohim, O'zbekiston dasturchi, Uzbekistan developer, ibroh.im" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "https://ibroh.im/about" },
    ],
    links: [{ rel: "canonical", href: "https://ibroh.im/about" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(jsonLd),
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <section className="shell py-20 sm:py-28">
      <Reveal>
        <p className="eyebrow">Men haqimda</p>
        <h1 className="mt-4 max-w-2xl text-3xl font-medium tracking-tightest text-foreground sm:text-4xl">
          Ibrohimbek Gulomov
        </h1>
        <div className="mt-8 max-w-xl space-y-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
          <p>
            Salom — men Ibrohim. O'zbekistonda yashayman va internetda narsalar
            quraman. Raqamli mahsulotlar, veb ilovalar va kichik tajribalar
            yaratish bilan shug'ullanaman.
          </p>
          <p>
            Vaqtimning ko'p qismini yangi texnologiyalarni o'rganish, mahsulot
            g'oyalarini sinab ko'rish va o'rganganlarimni yozib borish bilan
            o'tkazaman. Bu sayt — mening internetdagi burchagim.
          </p>
          <p>
            Bog'lanish uchun:{" "}
            <a
              href="mailto:me@ibroh.im"
              className="text-foreground underline underline-offset-4"
            >
              me@ibroh.im
            </a>
          </p>
        </div>
      </Reveal>
    </section>
  );
}
