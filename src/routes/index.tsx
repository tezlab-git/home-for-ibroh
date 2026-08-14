import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeader } from "@/components/site/SectionHeader";
import { ProjectCard } from "@/components/site/ProjectCard";
import { ArticleCard } from "@/components/site/ArticleCard";
import { ActionLink } from "@/components/site/Button";
import { projects } from "@/content/projects";
import { articles } from "@/content/articles";
import { currently, nowItems, nowUpdatedAt, site } from "@/content/site";

const title = "ibroh.im — I build, learn, and share.";
const description =
  "The personal website of Ibrohimbek: projects, writing, experiments, and things I'm learning while building on the internet.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      {/* Hero */}
      <section className="shell pt-20 pb-20 sm:pt-32 sm:pb-28">
        <Reveal>
          <p className="eyebrow">{site.owner}</p>
          <h1 className="mt-6 max-w-3xl text-4xl leading-[1.05] font-medium tracking-tightest text-foreground sm:text-6xl lg:text-7xl">
            I build, learn, and share.
          </h1>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            A personal space for my projects, ideas, experiments, and things I'm learning
            along the way.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <ActionLink to="/projects">
              Explore my work
              <ArrowRight aria-hidden="true" className="size-4" />
            </ActionLink>
            <ActionLink to="/writing" variant="outline">
              Read my writing
            </ActionLink>
          </div>
          <p className="mt-12 text-xs tracking-wide text-muted-foreground">
            {site.location}
          </p>
        </Reveal>
      </section>

      {/* Currently strip */}
      <section aria-label="Currently" className="border-y border-hairline bg-surface">
        <ul className="shell grid grid-cols-2 divide-hairline lg:grid-cols-4 lg:divide-x">
          {currently.map((item, i) => (
            <Reveal
              as="li"
              key={item.label}
              delay={i * 60}
              className="px-0 py-5 lg:px-6 lg:first:pl-0 lg:last:pr-0"
            >
              <p className="eyebrow">{item.label}</p>
              <p className="mt-1.5 text-sm text-foreground">{item.value}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Selected Projects */}
      <section id="projects" className="shell py-20 sm:py-28">
        <SectionHeader
          eyebrow="Work"
          title="Selected Projects"
          description="A few things I'm building, shipping, and experimenting with."
          action={{ label: "View all projects →", to: "/projects" }}
        />
        <div className="grid gap-5 sm:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={i * 70}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="border-t border-hairline">
        <div className="shell grid gap-12 py-20 sm:py-28 lg:grid-cols-[1fr_20rem] lg:gap-20">
          <Reveal>
            <p className="eyebrow">About</p>
            <h2 className="mt-4 text-2xl font-medium tracking-tightest text-foreground sm:text-3xl">
              A little about me
            </h2>
            <div className="mt-6 max-w-xl space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              <p>
                This is my corner of the internet — a place where I document the things I
                build, the things I learn, and the ideas I keep coming back to.
              </p>
              <p>
                I spend most of my time making digital products, running small
                experiments, reading, and taking notes on technology, business, and
                personal development. Some of it turns into products, some of it turns
                into writing, and the rest lives here as a work in progress.
              </p>
            </div>
            <Link
              to="/about"
              className="link-underline mt-8 inline-block text-sm font-medium text-foreground"
            >
              More about me →
            </Link>
          </Reveal>
          <Reveal delay={90}>
            <div className="flex aspect-4/5 w-full items-end rounded-2xl border border-hairline bg-surface p-6">
              <div>
                <p className="font-serif text-3xl text-foreground">IG</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  Portrait coming soon
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Latest Writing */}
      <section id="writing" className="border-t border-hairline">
        <div className="shell py-20 sm:py-28">
          <SectionHeader
            eyebrow="Journal"
            title="Latest Writing"
            description="Notes, essays, and lessons from building things."
            action={{ label: "Read all writing →", to: "/writing" }}
          />
          <div>
            {articles.map((article, i) => (
              <Reveal key={article.slug} delay={i * 50}>
                <ArticleCard article={article} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Now */}
      <section id="now" className="border-t border-hairline bg-surface">
        <div className="shell py-20 sm:py-28">
          <SectionHeader
            eyebrow="Right now"
            title="Now"
            description="What I'm currently working on, learning, reading, and exploring."
            action={{ label: "Full now page →", to: "/now" }}
          />
          <div className="grid gap-5 sm:grid-cols-3">
            {nowItems.map((item, i) => (
              <Reveal key={item.title} delay={i * 70}>
                <div className="h-full rounded-2xl border border-hairline bg-card p-6 transition-transform duration-300 hover:-translate-y-1">
                  <h3 className="text-base font-medium text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 text-xs text-muted-foreground">
            Last updated · {nowUpdatedAt}
          </p>
        </div>
      </section>
    </>
  );
}
