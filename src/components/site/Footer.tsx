import { useEffect, useState } from "react";
import { site, socialLinks as fallbackSocials } from "@/content/site";
import { supabase } from "@/lib/supabaseClient";
import { ArrowUp } from "lucide-react";

type SocialLink = { id?: string; label: string; href: string; sort_order?: number };

export function Footer() {
  const [links, setLinks] = useState<SocialLink[]>(fallbackSocials);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { data } = await supabase
          .from("social_links")
          .select("*")
          .order("sort_order");
        if (mounted && data && data.length > 0) {
          setLinks(data);
        }
      } catch {
        // Fallback to static social links
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-hairline/80 bg-surface/30">
      <div className="shell py-16 sm:py-20">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-baseline sm:justify-between">
          <div>
            <p className="text-4xl font-medium tracking-tightest text-foreground sm:text-6xl">
              {site.name}
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {site.tagline}
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="group flex w-fit items-center gap-2 rounded-full border border-hairline bg-card px-4 py-2 text-xs font-medium text-muted-foreground transition-all hover:border-foreground/20 hover:text-foreground"
            aria-label="Yuqoriga qaytish"
          >
            <span>Yuqoriga</span>
            <ArrowUp className="size-3.5 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-hairline/80 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {links.map((link, idx) => (
              <li key={link.id || idx}>
                <a
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                  className="link-underline text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="text-xs text-muted-foreground/70">
            © {new Date().getFullYear()} {site.owner}. Barcha huquqlar himoyalangan.
          </p>
        </div>
      </div>
    </footer>
  );
}

