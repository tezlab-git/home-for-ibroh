import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { navLinks } from "@/content/site";
import { projects } from "@/content/projects";
import { articles } from "@/content/articles";

export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function go(to: string) {
    setOpen(false);
    navigate({ to });
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search the site"
        className="inline-flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
      >
        <Search aria-hidden="true" className="size-4" />
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search pages, projects, writing…" />
        <CommandList>
          <CommandEmpty>Nothing found.</CommandEmpty>
          <CommandGroup heading="Pages">
            {navLinks.map((link) => (
              <CommandItem key={link.to} value={link.label} onSelect={() => go(link.to)}>
                {link.label}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Projects">
            {projects.map((p) => (
              <CommandItem key={p.slug} value={p.name} onSelect={() => go("/projects")}>
                {p.name}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Writing">
            {articles.map((a) => (
              <CommandItem key={a.slug} value={a.title} onSelect={() => go("/writing")}>
                {a.title}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
