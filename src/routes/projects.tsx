import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { ProjectCard } from "@/components/site/ProjectCard";
import { projects } from "@/content/projects";

const title = "Projects — ibroh.im";
const description =
  "Products, experiments, and concepts by Ibrohimbek — including Tezlab, Mano, SalomAT, and Mayoq Labs.";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <div className="shell py-20 sm:py-28">
      <Reveal>
        <p className="eyebrow">Work</p>
        <h1 className="mt-4 text-3xl font-medium tracking-tightest text-foreground sm:text-5xl">
          Projects
        </h1>
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Everything I'm building — from live products to early concepts. Individual case
          studies are on the way.
        </p>
      </Reveal>
      <div className="mt-14 grid gap-5 sm:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 70}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
