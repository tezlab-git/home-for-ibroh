import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/projects";
import { Tag } from "./Tag";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      to={project.href}
      aria-label={`${project.name} — ${project.description}`}
      className="group relative flex h-full flex-col justify-between gap-8 rounded-2xl border border-hairline bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-foreground/15 sm:p-7"
    >
      <div>
        <div className="mb-5 flex items-center justify-between gap-4">
          <Tag>{project.category}</Tag>
          <ArrowUpRight
            aria-hidden="true"
            className="size-4 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
          />
        </div>
        <h3 className="text-lg font-medium tracking-tight text-foreground">
          {project.name}
        </h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>
      </div>
      <div className="flex items-center gap-3 border-t border-hairline pt-4 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
          {project.status}
        </span>
        <span aria-hidden="true">·</span>
        <span>{project.year}</span>
      </div>
    </Link>
  );
}
