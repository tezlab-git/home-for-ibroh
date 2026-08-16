import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { navLinks, site } from "@/content/site";
import { ThemeToggle } from "./ThemeToggle";
import { SearchDialog } from "./SearchDialog";
import { ActionLink } from "./Button";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-background/85 backdrop-blur-md">
      <nav aria-label="Main" className="shell flex h-16 items-center justify-between gap-6">
        <Link
          to="/"
          className="text-sm font-medium tracking-tight text-foreground"
          onClick={() => setOpen(false)}
        >
          {site.name}
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                activeOptions={{ exact: link.to === "/" }}
                activeProps={{ className: "text-foreground" }}
                inactiveProps={{ className: "text-muted-foreground" }}
                className="link-underline text-sm transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <SearchDialog />
          <ThemeToggle />
          <Link
            to="/room"
            className="ml-2 hidden sm:inline-flex items-center gap-1.5 rounded-full bg-foreground px-3 py-1.5 text-xs font-medium text-background transition-opacity hover:opacity-80"
          >
            New ✦
          </Link>
          <ActionLink to="/contact" size="sm" className="ml-1 hidden sm:inline-flex">
            Contact
          </ActionLink>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="ml-1 inline-flex size-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-surface md:hidden"
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
        <div className="border-t border-hairline bg-background md:hidden">
          <ul className="shell flex flex-col py-3">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-base text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="block py-3 text-base text-accent"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
