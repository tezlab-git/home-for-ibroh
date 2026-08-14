import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { supabase } from "@/lib/supabaseClient";
import { site } from "@/content/site";

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

type SocialLink = { id: string; label: string; href: string; sort_order: number };

function ContactPage() {
  const [email, setEmail] = useState(site.email);
  const [links, setLinks] = useState<SocialLink[]>([]);

  useEffect(() => {
    supabase
      .from("site_settings")
      .select("email")
      .limit(1)
      .then(({ data }) => { if (data?.[0]?.email) setEmail(data[0].email); });

    supabase
      .from("social_links")
      .select("*")
      .order("sort_order")
      .then(({ data }) => { if (data) setLinks(data); });
  }, []);

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
          href={`mailto:${email}`}
          className="link-underline mt-8 inline-block text-lg font-medium text-foreground sm:text-2xl"
        >
          {email}
        </a>
      </Reveal>
      {links.length > 0 && (
        <Reveal delay={80} className="mt-14 border-t border-hairline pt-8">
          <p className="eyebrow">Boshqa joylarda</p>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
            {links.map((link) => (
              <li key={link.id}>
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
      )}
    </div>
  );
}
