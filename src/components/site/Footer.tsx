import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { supabase } from "@/lib/supabaseClient";

type SocialLink = { id: string; label: string; href: string; sort_order: number };

export function Footer() {
  const [links, setLinks] = useState<SocialLink[]>([]);

  useEffect(() => {
    supabase
      .from("social_links")
      .select("*")
      .order("sort_order")
      .then(({ data }) => { if (data) setLinks(data); });
  }, []);

  return (
    <footer className="border-t border-hairline">
      <div className="shell py-16 sm:py-20">
        <p className="text-4xl font-medium tracking-tightest text-foreground sm:text-6xl">
          {site.name}
        </p>
        <div className="mt-8 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            {site.tagline}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
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
        </div>
        <p className="mt-12 border-t border-hairline pt-6 text-xs text-muted-foreground">
          © 2026 Ibrohimbek
        </p>
      </div>
    </footer>
  );
}
