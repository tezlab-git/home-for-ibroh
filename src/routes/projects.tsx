import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { ProjectCard } from "@/components/site/ProjectCard";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

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
      { rel: "canonical", href: "https://ibroh.im/projects" },
      { property: "og:image", content: "https://ibroh.im/og-default.svg" },
    ],
  }),
  component: ProjectsPage,
});

type Project = {
  slug: string;
  name: string;
  description?: string;
  category?: string;
  status?: string;
  year?: string;
  href?: string;
};

function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("slug,name,description,category,status,year,href")
          .eq("published", true)
          .order("created_at", { ascending: false });
        if (error) throw error;
        if (mounted) setProjects((data as any) || []);
      } catch (e) {
        console.error("Failed to load projects", e);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

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
