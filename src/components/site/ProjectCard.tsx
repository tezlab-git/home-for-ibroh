import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Sparkles, Terminal, BookMarked, HeartPulse, Layers } from "lucide-react";
import type { Project } from "@/content/projects";

function getProjectStyle(slug: string, name: string) {
  const s = slug.toLowerCase();
  if (s.includes("tezlab")) {
    return {
      Icon: Terminal,
      gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
      badge: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/25",
    };
  }
  if (s.includes("mano")) {
    return {
      Icon: BookMarked,
      gradient: "from-violet-500/20 via-purple-500/10 to-transparent",
      badge: "bg-violet-500/10 text-violet-700 dark:text-violet-300 border-violet-500/25",
    };
  }
  if (s.includes("salom")) {
    return {
      Icon: HeartPulse,
      gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
      badge: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/25",
    };
  }
  if (s.includes("mayoq")) {
    return {
      Icon: Sparkles,
      gradient: "from-sky-500/20 via-blue-500/10 to-transparent",
      badge: "bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/25",
    };
  }
  return {
    Icon: Layers,
    gradient: "from-primary/10 via-accent/5 to-transparent",
    badge: "bg-surface text-foreground border-border/40",
  };
}

function getProjectTags(slug: string): string[] {
  const s = slug.toLowerCase();
  if (s.includes("tezlab")) return ["Next.js", "TypeScript", "PostgreSQL"];
  if (s.includes("mano")) return ["React", "TanStack", "AI Notes"];
  if (s.includes("salom")) return ["AI / Health", "LLM", "React"];
  if (s.includes("mayoq")) return ["R&D", "AI Prototypes", "Cloud"];
  return ["Web", "Product"];
}

export function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isExternal = project.href?.startsWith("http://") || project.href?.startsWith("https://");
  const { Icon, gradient, badge } = getProjectStyle(project.slug, project.name);
  const tags = getProjectTags(project.slug);
  const isFaol =
    project.status?.toLowerCase().includes("faol") ||
    project.status?.toLowerCase().includes("active");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  const CardContent = (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="spotlight-card relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-hairline/80 bg-card/75 p-6 backdrop-blur-md transition-all duration-300 hover:border-foreground/25 hover:shadow-2xl hover:shadow-primary/5 sm:p-7 card-hover"
    >
      {/* Subtle top ambient gradient on hover */}
      <div
        className={`pointer-events-none absolute -top-16 -right-16 size-44 rounded-full bg-gradient-to-br ${gradient} blur-2xl opacity-50 transition-opacity duration-300 group-hover:opacity-100`}
        aria-hidden="true"
      />

      <div className="relative z-10">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span
              className={`flex size-9 items-center justify-center rounded-xl border ${badge} transition-transform duration-300 group-hover:scale-110`}
            >
              <Icon className="size-4" />
            </span>
            <span className="rounded-full bg-surface/90 px-2.5 py-0.5 text-xs font-medium text-muted-foreground border border-hairline">
              {project.category}
            </span>
          </div>

          <span className="flex size-8 items-center justify-center rounded-full bg-surface text-muted-foreground transition-all duration-300 group-hover:bg-foreground group-hover:text-background group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:shadow-md">
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </span>
        </div>

        <h3 className="text-xl font-medium tracking-tight text-foreground transition-colors group-hover:text-accent">
          {project.name}
        </h3>
        <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground line-clamp-2">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-surface/60 px-2 py-0.5 font-mono text-[11px] text-muted-foreground/90 border border-hairline/60 transition-colors group-hover:border-foreground/15"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-10 mt-8 flex items-center justify-between border-t border-hairline/70 pt-4 text-xs text-muted-foreground">
        {isFaol ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 font-medium text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <span className="relative flex size-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
            </span>
            {project.status}
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-2.5 py-0.5 font-medium text-amber-600 dark:text-amber-400 border border-amber-500/20">
            <span className="size-1.5 rounded-full bg-amber-500" />
            {project.status}
          </span>
        )}
        <span className="font-mono text-muted-foreground/70">{project.year}</span>
      </div>
    </div>
  );

  if (isExternal) {
    return (
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${project.name} — ${project.description}`}
        className="group block h-full"
      >
        {CardContent}
      </a>
    );
  }

  return (
    <Link
      to={project.href}
      aria-label={`${project.name} — ${project.description}`}
      className="group block h-full"
    >
      {CardContent}
    </Link>
  );
}


