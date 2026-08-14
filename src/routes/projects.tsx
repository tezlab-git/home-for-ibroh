import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { ProjectCard } from "@/components/site/ProjectCard";
import { projects } from "@/content/projects";

const title = "Loyihalar — ibroh.im";
const description =
  "Ibrohimbekning mahsulotlari, tajribalari va konsepsiyalari — Tezlab, Mano, SalomAT va Mayoq Labs.";

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
        <p className="eyebrow">Ishlar</p>
        <h1 className="mt-4 text-3xl font-medium tracking-tightest text-foreground sm:text-5xl">
          Loyihalar
        </h1>
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Men qurayotgan hamma narsa — ishga tushgan mahsulotlardan boshlangʻich
          konsepsiyalargacha. Har bir loyiha uchun alohida sahifalar tez orada.
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
