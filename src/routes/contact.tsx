import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { site, socialLinks } from "@/content/site";

const title = "Aloqa — ibroh.im";
const description =
  "Loyihalar, gʻoyalar, hamkorlik yoki shunchaki salomlashish uchun Ibrohimbek bilan bogʻlaning.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="shell py-20 sm:py-28">
      <Reveal>
        <p className="eyebrow">Aloqa</p>
        <h1 className="mt-4 text-3xl font-medium tracking-tightest text-foreground sm:text-5xl">
          Salom aytish
        </h1>
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Mahsulotlar, gʻoyalar va tajribalar haqida suhbatlashishga har doim tayyorman.
          Menga eng tez yoʻl — elektron pochta.
        </p>
        <a
          href={`mailto:${site.email}`}
          className="link-underline mt-8 inline-block text-lg font-medium text-foreground sm:text-2xl"
        >
          {site.email}
        </a>
      </Reveal>
      <Reveal delay={80} className="mt-14 border-t border-hairline pt-8">
        <p className="eyebrow">Boshqa joylarda</p>
        <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
          {socialLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                className="link-underline text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}
