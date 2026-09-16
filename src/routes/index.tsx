import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Sparkles,
  Code2,
  BrainCircuit,
  BookOpen,
  Compass,
  Copy,
  Check,
  MapPin,
  Headphones,
  BookMarked,
  Terminal,
  Play,
  Pause,
  Layers,
  Zap,
} from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeader } from "@/components/site/SectionHeader";
import { ProjectCard } from "@/components/site/ProjectCard";
import { ArticleCard } from "@/components/site/ArticleCard";
import { ActionLink } from "@/components/site/Button";
import { projects as staticProjects, type Project } from "@/content/projects";
import { articles as staticArticles, type Article } from "@/content/articles";
import { nowItems, nowUpdatedAt, site } from "@/content/site";
import { supabase } from "@/lib/supabaseClient";
import { InteractiveBackground } from "@/components/site/InteractiveBackground";
import { InteractiveTerminal } from "@/components/site/InteractiveTerminal";
import { QuestTracker, type QuestKey } from "@/components/site/QuestTracker";
import { ambientAudio } from "@/components/site/ambientAudio";

const title = "Ibrohimbek Gulomov — Quraman, oʻrganaman va ulashaman.";
const description =
  "Ibrohimbek Gulomov (Ibrohim) — Oʻzbekistonlik dasturchi va mahsulot yaratuvchi. Loyihalar, yozmalar, tajribalar va internetda narsalar qurish jarayonida oʻrganayotgan narsalarim.";

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

function mapDbArticle(row: any): Article {
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt || "",
    date: row.date || "",
    displayDate: row.date || "",
    readingTime: row.reading_time ? `${row.reading_time} daqiqa` : "3 daqiqa",
    category: row.category || "Fikrlar",
    body: row.content || "",
  };
}

const currentlyItems = [
  {
    label: "Quryapman",
    value: "Raqamli mahsulotlar",
    Icon: Code2,
    badge: "text-amber-500 bg-amber-500/10 border-amber-500/20",
  },
  {
    label: "Oʻrganyapman",
    value: "AI · Biznes · Texnologiya",
    Icon: BrainCircuit,
    badge: "text-violet-500 bg-violet-500/10 border-violet-500/20",
  },
  {
    label: "Oʻqiyapman",
    value: "Kitoblar va tadqiqotlar",
    Icon: BookOpen,
    badge: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
  },
  {
    label: "Izlanyapman",
    value: "Yangi gʻoyalar",
    Icon: Compass,
    badge: "text-sky-500 bg-sky-500/10 border-sky-500/20",
  },
];

const configCodeSnippet = `// ibroh.config.ts
export default defineDeveloper({
  name: "Ibrohimbek Gulomov",
  role: "Software Builder & Creator",
  location: "Tashkent, UZ",
  status: "available_for_new_ideas",
  stack: ["React", "TypeScript", "Next.js", "AI/LLM"],
  mission: "Quraman, oʻrganaman va ulashaman."
});`;

function Index() {
  const [liveProjects, setLiveProjects] = useState<Project[]>(staticProjects);
  const [liveArticles, setLiveArticles] = useState<Article[]>(staticArticles);
  const [selectedCategory, setSelectedCategory] = useState<string>("Barchasi");
  const [heroWidget, setHeroWidget] = useState<"terminal" | "config">("terminal");
  const [timeString, setTimeString] = useState<string>("");
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Gamification Quest state
  const [completedQuests, setCompletedQuests] = useState<Set<QuestKey>>(() => new Set());

  const completeQuest = (key: QuestKey) => {
    setCompletedQuests((prev) => {
      if (prev.has(key)) return prev;
      const next = new Set(prev);
      next.add(key);
      return next;
    });
  };

  // Live Tashkent Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Tashkent",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      setTimeString(formatter.format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch Supabase data
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const [{ data: pData }, { data: aData }] = await Promise.all([
          supabase
            .from("projects")
            .select("slug,name,description,category,status,year,href")
            .eq("published", true)
            .order("created_at", { ascending: false })
            .limit(6),
          supabase
            .from("articles")
            .select("*")
            .eq("published", true)
            .order("date", { ascending: false })
            .limit(3),
        ]);

        if (mounted) {
          if (pData && pData.length > 0) setLiveProjects(pData as Project[]);
          if (aData && aData.length > 0) setLiveArticles(aData.map(mapDbArticle));
        }
      } catch (err) {
        console.error("Maʼlumotlarni yuklashda xatolik:", err);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>(["Barchasi"]);
    liveProjects.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return Array.from(set);
  }, [liveProjects]);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === "Barchasi") return liveProjects;
    return liveProjects.filter(
      (p) => p.category?.toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [liveProjects, selectedCategory]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(configCodeSnippet);
    setCopiedCode(true);
    completeQuest("copy");
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(site.email);
    setCopiedEmail(true);
    completeQuest("copy");
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleToggleAudio = () => {
    const active = ambientAudio.toggle();
    setIsPlayingAudio(active);
  };

  return (
    <>
      {/* Gamified Discovery Quest Tracker */}
      <QuestTracker completedQuests={completedQuests} />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 sm:pt-28 sm:pb-28">
        <div className="ambient-glow" aria-hidden="true" />
        <div className="shell relative z-10">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-hairline/80 bg-surface/80 px-3.5 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-md shadow-xs">
                <span className="relative flex size-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                </span>
                <span className="font-medium text-foreground">Faol ish rejimida</span>
                <span className="text-hairline">·</span>
                <span>Yangi gʻoyalarga ochiq</span>
              </div>

              <h1 className="mt-7 text-4xl leading-[1.06] font-medium tracking-tightest text-foreground sm:text-6xl lg:text-7xl">
                <span className="font-serif italic font-normal text-foreground">Quraman</span>, oʻrganaman va{" "}
                <span className="font-serif italic font-normal text-foreground">ulashaman</span>.
              </h1>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Internetda raqamli mahsulotlar yaratish, zamonaviy veb texnologiyalari, AI yechimlari
                va oʻrganayotgan narsalarim uchun shaxsiy internet makoni.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <ActionLink to="/projects" className="animate-sheen">
                  Loyihalarni koʻrish
                  <ArrowRight aria-hidden="true" className="size-4" />
                </ActionLink>
                <ActionLink to="/writing" variant="outline">
                  Yozmalarni oʻqish
                </ActionLink>
                <Link
                  to="/room"
                  onClick={() => completeQuest("room")}
                  className="inline-flex items-center gap-2 rounded-xl border border-cyan-500/35 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-700 dark:text-cyan-300 transition-all duration-200 hover:border-cyan-500/60 hover:bg-cyan-500/20 holographic-glow shadow-sm"
                >
                  <Sparkles className="size-4 text-cyan-400" />
                  <span>🥽 3D VR Xona</span>
                </Link>
              </div>

              {/* Quick stats */}
              <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-hairline/70 pt-7 text-xs text-muted-foreground sm:text-sm">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-accent" />
                  <span className="font-semibold text-foreground">4+</span>
                  <span>Raqamli mahsulot</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-emerald-500" />
                  <span className="font-semibold text-foreground">Fullstack & AI</span>
                  <span>Tajriba</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-sky-500" />
                  <span className="font-semibold text-foreground">Toshkent, UZ</span>
                </div>
              </div>
            </Reveal>

            {/* Right column: Interactive Switchable Terminal / Config Widget */}
            <Reveal delay={100} className="hidden lg:block">
              <div className="space-y-3">
                {/* Switcher tabs */}
                <div className="flex items-center justify-end gap-1.5 font-mono text-xs">
                  <button
                    onClick={() => setHeroWidget("terminal")}
                    className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 transition-all ${
                      heroWidget === "terminal"
                        ? "bg-foreground text-background font-bold shadow-xs"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Terminal className="size-3.5" />
                    <span>CLI Terminal (Interactive)</span>
                  </button>
                  <button
                    onClick={() => setHeroWidget("config")}
                    className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 transition-all ${
                      heroWidget === "config"
                        ? "bg-foreground text-background font-bold shadow-xs"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Code2 className="size-3.5" />
                    <span>ibroh.config.ts</span>
                  </button>
                </div>

                {heroWidget === "terminal" ? (
                  <InteractiveTerminal
                    onCommandRun={() => completeQuest("terminal")}
                  />
                ) : (
                  <div className="relative overflow-hidden rounded-3xl border border-hairline/90 bg-card/85 p-6 backdrop-blur-xl shadow-2xl shadow-primary/10">
                    <div className="flex items-center justify-between border-b border-hairline/80 pb-4">
                      <div className="flex items-center gap-2">
                        <span className="size-3 rounded-full bg-rose-500/80" />
                        <span className="size-3 rounded-full bg-amber-500/80" />
                        <span className="size-3 rounded-full bg-emerald-500/80" />
                        <span className="ml-2 font-mono text-xs text-muted-foreground">
                          ibroh.config.ts
                        </span>
                      </div>

                      <button
                        onClick={handleCopyCode}
                        className="flex items-center gap-1.5 rounded-lg border border-hairline bg-surface/80 px-2.5 py-1 text-xs font-medium text-muted-foreground transition-all hover:border-foreground/20 hover:text-foreground"
                        title="Kodni nusxalash"
                      >
                        {copiedCode ? (
                          <>
                            <Check className="size-3 text-emerald-500" />
                            <span className="text-emerald-600 dark:text-emerald-400">
                              Nusxalandi!
                            </span>
                          </>
                        ) : (
                          <>
                            <Copy className="size-3" />
                            <span>Nusxalash</span>
                          </>
                        )}
                      </button>
                    </div>

                    <pre className="mt-4 overflow-x-auto font-mono text-[12.5px] leading-relaxed text-foreground/90">
                      <code>
                        <span className="text-violet-500 dark:text-violet-400">export default</span>{" "}
                        <span className="text-sky-500 dark:text-sky-400">defineDeveloper</span>({"{"}
                        {"\n  "}
                        <span className="text-muted-foreground">name:</span>{" "}
                        <span className="text-emerald-600 dark:text-emerald-300">
                          "Ibrohimbek Gulomov"
                        </span>
                        ,{"\n  "}
                        <span className="text-muted-foreground">role:</span>{" "}
                        <span className="text-emerald-600 dark:text-emerald-300">
                          "Software Builder & Creator"
                        </span>
                        ,{"\n  "}
                        <span className="text-muted-foreground">location:</span>{" "}
                        <span className="text-emerald-600 dark:text-emerald-300">"Tashkent, UZ"</span>,
                        {"\n  "}
                        <span className="text-muted-foreground">status:</span>{" "}
                        <span className="text-amber-600 dark:text-amber-400">
                          "available_for_new_ideas"
                        </span>
                        ,{"\n  "}
                        <span className="text-muted-foreground">stack:</span> [
                        <span className="text-emerald-600 dark:text-emerald-300">"React"</span>,{" "}
                        <span className="text-emerald-600 dark:text-emerald-300">"TypeScript"</span>,{" "}
                        <span className="text-emerald-600 dark:text-emerald-300">"Next.js"</span>,{" "}
                        <span className="text-emerald-600 dark:text-emerald-300">"AI/LLM"</span>],
                        {"\n  "}
                        <span className="text-muted-foreground">mission:</span>{" "}
                        <span className="text-emerald-600 dark:text-emerald-300">
                          "Quraman, oʻrganaman va ulashaman."
                        </span>
                        {"\n"}
                        {"}"});
                      </code>
                    </pre>

                    <div className="mt-5 flex items-center justify-between border-t border-hairline/80 pt-3 text-[11px] text-muted-foreground font-mono">
                      <div className="flex items-center gap-2">
                        <span className="size-2 rounded-full bg-emerald-500" />
                        <span>TypeScript 5.8 · Ready</span>
                      </div>
                      <span>UTF-8</span>
                    </div>
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Currently strip with animated cards */}
      <section aria-label="Ayni damda" className="border-y border-hairline/80 bg-surface/50 py-3.5">
        <div className="shell">
          <ul className="grid grid-cols-2 gap-3 py-1 sm:grid-cols-4 sm:gap-4">
            {currentlyItems.map((item, i) => (
              <Reveal as="li" key={item.label} delay={i * 60}>
                <div className="group flex h-full items-center gap-3 rounded-2xl border border-hairline/70 bg-card/65 p-3.5 backdrop-blur-xs transition-all duration-300 hover:border-foreground/20 hover:bg-card hover:shadow-sm">
                  <span
                    className={`flex size-9 shrink-0 items-center justify-center rounded-xl border ${item.badge} transition-transform duration-300 group-hover:scale-110`}
                  >
                    <item.Icon className="size-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="eyebrow truncate">{item.label}</p>
                    <p className="mt-0.5 truncate text-xs font-semibold text-foreground sm:text-sm">
                      {item.value}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Selected Projects with Interactive Category Switcher */}
      <section id="projects" className="shell py-20 sm:py-28">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionHeader
              eyebrow="Ishlar"
              title="Tanlangan loyihalar"
              description="Men qurayotgan, ishga tushirayotgan va sinab koʻrayotgan raqamli mahsulotlar."
            />
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 rounded-2xl border border-hairline bg-surface/80 p-1 backdrop-blur-md">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  completeQuest("category");
                }}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-foreground text-background shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <p className="mt-8 text-sm text-muted-foreground">
            Tanlangan toifada loyihalar mavjud emas.
          </p>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {filteredProjects.map((project, i) => (
              <Reveal key={project.slug} delay={i * 70}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        )}
      </section>

      {/* Apple-style Bento Grid for "Men haqimda" */}
      <section id="about" className="border-t border-hairline/80 bg-surface/20 py-20 sm:py-28">
        <div className="shell">
          <SectionHeader
            eyebrow="Men haqimda"
            title="Bento Grid: Shaxsiy makon"
            description="Qurilish falsafam, joylashuvim, texnologik arsenalim va ish muhitim haqida."
          />

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {/* Bento Card 1: Main Story (spans 2 columns) */}
            <div className="md:col-span-2 relative overflow-hidden rounded-3xl border border-hairline/80 bg-card/85 p-7 backdrop-blur-xl transition-all duration-300 hover:border-foreground/20 card-hover">
              <div className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-accent/10 blur-3xl" />
              <div className="flex items-center gap-4">
                <div className="relative flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-accent/25 via-primary/10 to-transparent border border-accent/30 shadow-inner">
                  <span className="font-serif text-2xl font-bold tracking-tight text-foreground">
                    IG
                  </span>
                  <span className="absolute -bottom-1 -right-1 flex size-4 items-center justify-center rounded-full bg-background">
                    <span className="size-2.5 rounded-full bg-emerald-500 animate-pulse-dot" />
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Ibrohimbek Gulomov</h3>
                  <p className="text-xs text-muted-foreground">Software Builder & Creator</p>
                </div>
              </div>

              <div className="mt-6 space-y-3.5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                <p>
                  Salom! Men Ibrohim. Internetda raqamli mahsulotlar yaratish, murakkab
                  muammolarni oddiy va goʻzal dasturiy yechimga aylantirish bilan shugʻullanaman.
                </p>
                <p>
                  Yangi gʻoyalarni kechiktirmasdan prototipga keltirish, foydalanuvchilar bilan
                  erta sinash va har kuni yangi biror narsa oʻrganish — mening asosiy prinsipim.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-hairline/70 pt-5">
                <span className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-foreground border border-hairline">
                  ✦ Product-minded engineer
                </span>
                <span className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-foreground border border-hairline">
                  ✦ Open Source enthusiast
                </span>
                <span className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-foreground border border-hairline">
                  ✦ AI Integrator
                </span>
              </div>
            </div>

            {/* Bento Card 2: Live Tashkent Time */}
            <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-hairline/80 bg-card/85 p-7 backdrop-blur-xl transition-all duration-300 hover:border-foreground/20 card-hover">
              <div className="flex items-center justify-between">
                <span className="eyebrow flex items-center gap-1.5">
                  <MapPin className="size-3.5 text-accent" />
                  Joylashuv
                </span>
                <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Jonli
                </span>
              </div>

              <div className="my-6 text-center">
                <p className="font-mono text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                  {timeString || "19:40:00"}
                </p>
                <p className="mt-2 text-xs font-medium text-muted-foreground">
                  Toshkent, Oʻzbekiston (UTC+5)
                </p>
              </div>

              <div className="rounded-2xl border border-hairline/80 bg-surface/60 p-3 text-center text-xs text-muted-foreground font-mono">
                Real vaqtda sinxronizatsiya
              </div>
            </div>

            {/* Bento Card 3: Arsenal / Tech Stack */}
            <div className="md:col-span-2 relative overflow-hidden rounded-3xl border border-hairline/80 bg-card/85 p-7 backdrop-blur-xl transition-all duration-300 hover:border-foreground/20 card-hover">
              <span className="eyebrow flex items-center gap-1.5">
                <Terminal className="size-3.5 text-accent" />
                Texnologik Arsenal
              </span>
              <p className="mt-2 text-sm text-muted-foreground">
                Kundalik ishlatadigan asosiy dasturlash tillari, freymvorklar va asboblar:
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-hairline/70 bg-surface/50 p-4">
                  <p className="text-xs font-semibold text-foreground">Frontend & UI</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {["React 19", "TypeScript", "Next.js", "TanStack", "Tailwind v4"].map((t) => (
                      <span
                        key={t}
                        className="rounded-lg bg-card px-2 py-1 text-[11px] font-medium text-foreground border border-hairline/70"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-hairline/70 bg-surface/50 p-4">
                  <p className="text-xs font-semibold text-foreground">Backend & Data</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {["Node.js", "Supabase", "PostgreSQL", "REST & RPC"].map((t) => (
                      <span
                        key={t}
                        className="rounded-lg bg-card px-2 py-1 text-[11px] font-medium text-foreground border border-hairline/70"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-hairline/70 bg-surface/50 p-4">
                  <p className="text-xs font-semibold text-foreground">AI & Vositalar</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {["LLM APIs", "Claude Code", "Git / GitHub", "Vite", "Figma"].map((t) => (
                      <span
                        key={t}
                        className="rounded-lg bg-card px-2 py-1 text-[11px] font-medium text-foreground border border-hairline/70"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bento Card 4: Audio / Deep Focus Environment with REAL Synthesizer Audio */}
            <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-hairline/80 bg-card/85 p-7 backdrop-blur-xl transition-all duration-300 hover:border-foreground/20 card-hover">
              <div>
                <div className="flex items-center justify-between">
                  <span className="eyebrow flex items-center gap-1.5">
                    <Headphones className="size-3.5 text-accent" />
                    Fokus Muhiti
                  </span>
                  {/* Animated Sound Wave Bars */}
                  <div className="flex items-end gap-1 h-6">
                    <span className={`w-1 bg-accent rounded-full ${isPlayingAudio ? "wave-bar-1" : "h-1"}`} />
                    <span className={`w-1 bg-accent rounded-full ${isPlayingAudio ? "wave-bar-2" : "h-2"}`} />
                    <span className={`w-1 bg-accent rounded-full ${isPlayingAudio ? "wave-bar-3" : "h-1"}`} />
                    <span className={`w-1 bg-accent rounded-full ${isPlayingAudio ? "wave-bar-4" : "h-2"}`} />
                  </div>
                </div>

                <h4 className="mt-6 text-base font-semibold text-foreground">
                  Chuqur Diqqat & Ambient Lofi
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  Lofi akkordlari, tinch xona va doimiy oqim (flow state) da yaratish.
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between rounded-2xl border border-hairline/80 bg-surface/60 p-3.5">
                <div className="min-w-0">
                  <p className="truncate text-xs font-semibold text-foreground">
                    {isPlayingAudio ? "Lofi Ambient Chords: Oʻynamoqda" : "Lofi Ambient Chords"}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {isPlayingAudio ? "Sintetik ambient audio faol" : "Ovozni yoqish uchun bosing"}
                  </p>
                </div>

                <button
                  onClick={handleToggleAudio}
                  className={`flex size-9 items-center justify-center rounded-xl border transition-all ${
                    isPlayingAudio
                      ? "border-accent bg-accent text-accent-foreground shadow-md"
                      : "border-hairline bg-card text-foreground hover:bg-surface"
                  }`}
                  title={isPlayingAudio ? "Ovozni toʻxtatish" : "Lofi ambient ovozini eshitish"}
                >
                  {isPlayingAudio ? <Pause className="size-4" /> : <Play className="size-4 ml-0.5" />}
                </button>
              </div>
            </div>

            {/* Bento Card 5: Interactive 3D Room Teaser (spans 3 columns) */}
            <div className="md:col-span-3 relative overflow-hidden rounded-3xl border border-cyan-500/25 bg-gradient-to-r from-cyan-500/10 via-card/90 to-surface/80 p-7 backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/50 card-hover">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="max-w-xl">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/15 px-3 py-1 text-xs font-semibold text-cyan-700 dark:text-cyan-300 border border-cyan-500/30">
                    <Sparkles className="size-3.5 text-cyan-400" />
                    🥽 3D VR Headset Tajribasi
                  </span>
                  <h3 className="mt-3 text-2xl font-medium tracking-tight text-foreground">
                    Ibrohimning Xonasi — VR Koʻzoynak va 3D Kitob Javoni
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Haqiqiy Apple Vision Pro kabi optik linzalar, giroskopik bosh harakatlanishi va
                    interaktiv 3D kitob varaqlash tajribasini sinab koʻring.
                  </p>
                </div>

                <Link
                  to="/room"
                  onClick={() => completeQuest("room")}
                  className="animate-sheen inline-flex shrink-0 items-center gap-2 rounded-2xl bg-foreground px-6 py-3.5 text-sm font-medium text-background transition-all hover:opacity-90 hover:shadow-lg holographic-glow"
                >
                  <BookMarked className="size-4" />
                  <span>VR Xonaga kirish →</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Writing Section */}
      <section id="writing" className="border-t border-hairline/80">
        <div className="shell py-20 sm:py-28">
          <SectionHeader
            eyebrow="Kundalik"
            title="Soʻnggi yozmalar"
            description="Narsalar qurish jarayonidan qaydlar, esselar va saboqlar."
            action={{ label: "Barcha yozmalar →", to: "/writing" }}
          />
          {liveArticles.length === 0 ? (
            <p className="text-sm text-muted-foreground">Hozircha yozmalar mavjud emas.</p>
          ) : (
            <div className="mt-10 space-y-1">
              {liveArticles.map((article, i) => (
                <Reveal key={article.slug} delay={i * 50}>
                  <ArticleCard article={article} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Now & Quick Connect Section */}
      <section id="now" className="border-t border-hairline/80 bg-surface/30">
        <div className="shell py-20 sm:py-28">
          <SectionHeader
            eyebrow="Ayni damda"
            title="Hozir"
            description="Hozir nima ustida ishlayotganim, nimalarni oʻrganayotganim va izlayotganim."
            action={{ label: "Toʻliq sahifa →", to: "/now" }}
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {nowItems.map((item, i) => (
              <Reveal key={item.title} delay={i * 70}>
                <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-hairline/80 bg-card/80 p-6 backdrop-blur-md transition-all duration-300 hover:border-foreground/20 hover:shadow-lg card-hover">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-semibold text-accent/90">
                        0{i + 1}
                      </span>
                      <span className="size-1.5 rounded-full bg-accent/40 transition-colors group-hover:bg-accent" />
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-foreground transition-colors group-hover:text-accent">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {item.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Quick Connect / Copy Email Banner */}
          <div className="mt-12 overflow-hidden rounded-3xl border border-hairline/80 bg-gradient-to-r from-card/90 via-surface/60 to-card/90 p-8 backdrop-blur-xl">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="eyebrow">Birgalikda ishlaymizmi?</span>
                <h3 className="mt-2 text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
                  Gʻoya yoki loyihangiz bormi?
                </h3>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  Savollaringiz, takliflaringiz yoki hamkorlik uchun men bilan bogʻlaning.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={handleCopyEmail}
                  className="flex items-center gap-2 rounded-2xl border border-hairline bg-surface px-5 py-3 text-sm font-medium text-foreground transition-all hover:border-foreground/30 hover:bg-card"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="size-4 text-emerald-500" />
                      <span className="text-emerald-600 dark:text-emerald-400">
                        Email nusxalandi!
                      </span>
                    </>
                  ) : (
                    <>
                      <Copy className="size-4 text-muted-foreground" />
                      <span>{site.email}</span>
                    </>
                  )}
                </button>

                <ActionLink to="/contact">
                  Xabar yozish
                  <ArrowRight aria-hidden="true" className="size-4" />
                </ActionLink>
              </div>
            </div>
          </div>

          <p className="mt-8 text-xs text-muted-foreground">
            Oxirgi yangilanish · {nowUpdatedAt}
          </p>
        </div>
      </section>
    </>
  );
}
