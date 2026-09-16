import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Sparkles } from "lucide-react";
import { navLinks, site } from "@/content/site";
import { ThemeToggle } from "./ThemeToggle";
import { SearchDialog } from "./SearchDialog";
import { ActionLink } from "./Button";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-hairline/80 bg-background/80 backdrop-blur-xl transition-colors">
      <nav aria-label="Main" className="shell flex h-16 items-center justify-between gap-6">
        <Link
          to="/"
          className="group flex items-center gap-2.5 text-sm font-semibold tracking-tight text-foreground"
          onClick={() => setOpen(false)}
        >
          <span className="flex size-7 items-center justify-center rounded-lg bg-foreground text-xs font-bold text-background shadow-sm transition-transform duration-300 group-hover:scale-105">
            ib
          </span>
          <span className="transition-colors group-hover:text-accent">{site.name}</span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                activeOptions={{ exact: link.to === "/" }}
                activeProps={{ className: "text-foreground font-medium" }}
                inactiveProps={{ className: "text-muted-foreground" }}
                className="link-underline text-sm transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5">
          <SearchDialog />
          <ThemeToggle />
          <Link
            to="/room"
            className="ml-2 hidden sm:inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-700 dark:text-amber-300 border border-amber-500/30 transition-all duration-300 hover:border-amber-500/60 hover:bg-amber-500/15"
          >
            <span className="relative flex size-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-amber-500" />
            </span>
            <span>Room</span>
            <Sparkles className="size-3 text-amber-500" />
          </Link>
          <ActionLink to="/contact" size="sm" className="ml-1 hidden sm:inline-flex">
            Bogʻlanish
          </ActionLink>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="ml-1 inline-flex size-9 items-center justify-center rounded-xl border border-hairline text-foreground transition-colors hover:bg-surface md:hidden"
          >
            {open ? (
              <X aria-hidden="true" className="size-4" />
            ) : (
              <Menu aria-hidden="true" className="size-4" />
            )}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-hairline bg-background/95 backdrop-blur-xl md:hidden">
          <ul className="shell flex flex-col py-4">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className="block py-2.5 text-base font-medium text-foreground transition-colors hover:text-accent"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                to="/room"
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-2 py-2 text-sm font-medium text-amber-600 dark:text-amber-400"
              >
                <span>Room (Interaktiv xona)</span>
                <Sparkles className="size-3.5" />
              </Link>
            </li>
            <li className="pt-2">
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="block py-2 text-sm font-medium text-accent"
              >
                Bogʻlanish →
              </Link>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}

