import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

type Project = {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  status: string;
  year: string;
  href: string;
  published: boolean;
};

type Article = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  published: boolean;
};

type Tab = "projects" | "articles";

function AdminDashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("projects");
  const [projects, setProjects] = useState<Project[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");

  // Auth check
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        navigate({ to: "/admin/login" });
      } else {
        setUserEmail(data.session.user.email ?? "");
      }
    });
  }, [navigate]);

  // Load data
  useEffect(() => {
    async function load() {
      setLoading(true);
      const [{ data: p }, { data: a }] = await Promise.all([
        supabase.from("projects").select("*").order("created_at", { ascending: false }),
        supabase.from("articles").select("*").order("date", { ascending: false }),
      ]);
      setProjects((p as Project[]) || []);
      setArticles((a as Article[]) || []);
      setLoading(false);
    }
    load();
  }, []);

  async function togglePublished(table: "projects" | "articles", id: string, current: boolean) {
    await supabase.from(table).update({ published: !current }).eq("id", id);
    if (table === "projects") {
      setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, published: !current } : p)));
    } else {
      setArticles((prev) => prev.map((a) => (a.id === id ? { ...a, published: !current } : a)));
    }
  }

  async function deleteRow(table: "projects" | "articles", id: string) {
    if (!confirm("O'chirishni tasdiqlaysizmi?")) return;
    await supabase.from(table).delete().eq("id", id);
    if (table === "projects") {
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } else {
      setArticles((prev) => prev.filter((a) => a.id !== id));
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate({ to: "/admin/login" });
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-hairline px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
            ← Saytga qaytish
          </Link>
          <span className="text-sm font-medium text-foreground">Admin Panel</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-muted-foreground">{userEmail}</span>
          <button
            onClick={handleLogout}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Chiqish
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-10">
        {/* Tabs */}
        <div className="flex gap-1 border-b border-hairline mb-8">
          {(["projects", "articles"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                tab === t
                  ? "border-b-2 border-foreground text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t === "projects" ? "Loyihalar" : "Yozmalar"}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-sm text-muted-foreground">Yuklanmoqda...</p>
        ) : tab === "projects" ? (
          <ProjectsTable
            projects={projects}
            onToggle={(id, cur) => togglePublished("projects", id, cur)}
            onDelete={(id) => deleteRow("projects", id)}
          />
        ) : (
          <ArticlesTable
            articles={articles}
            onToggle={(id, cur) => togglePublished("articles", id, cur)}
            onDelete={(id) => deleteRow("articles", id)}
          />
        )}
      </div>
    </div>
  );
}

function ProjectsTable({
  projects,
  onToggle,
  onDelete,
}: {
  projects: Project[];
  onToggle: (id: string, cur: boolean) => void;
  onDelete: (id: string) => void;
}) {
  if (!projects.length)
    return <p className="text-sm text-muted-foreground">Loyihalar yo'q. Supabase'da "projects" jadvalini yarating.</p>;

  return (
    <div className="overflow-x-auto rounded-lg border border-hairline">
      <table className="w-full text-sm">
        <thead className="bg-surface">
          <tr>
            {["Nomi", "Kategoriya", "Status", "Yil", "Nashr", "Amallar"].map((h) => (
              <th key={h} className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-hairline">
          {projects.map((p) => (
            <tr key={p.id} className="hover:bg-surface/50">
              <td className="px-4 py-3 font-medium text-foreground">{p.name}</td>
              <td className="px-4 py-3 text-muted-foreground">{p.category}</td>
              <td className="px-4 py-3 text-muted-foreground">{p.status}</td>
              <td className="px-4 py-3 text-muted-foreground">{p.year}</td>
              <td className="px-4 py-3">
                <button
                  onClick={() => onToggle(p.id, p.published)}
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    p.published
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {p.published ? "Nashr" : "Yashirin"}
                </button>
              </td>
              <td className="px-4 py-3">
                <button
                  onClick={() => onDelete(p.id)}
                  className="text-xs text-red-500 hover:text-red-700"
                >
                  O'chirish
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ArticlesTable({
  articles,
  onToggle,
  onDelete,
}: {
  articles: Article[];
  onToggle: (id: string, cur: boolean) => void;
  onDelete: (id: string) => void;
}) {
  if (!articles.length)
    return <p className="text-sm text-muted-foreground">Yozmalar yo'q. Supabase'da "articles" jadvalini yarating.</p>;

  return (
    <div className="overflow-x-auto rounded-lg border border-hairline">
      <table className="w-full text-sm">
        <thead className="bg-surface">
          <tr>
            {["Sarlavha", "Kategoriya", "Sana", "Nashr", "Amallar"].map((h) => (
              <th key={h} className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-hairline">
          {articles.map((a) => (
            <tr key={a.id} className="hover:bg-surface/50">
              <td className="px-4 py-3 font-medium text-foreground">{a.title}</td>
              <td className="px-4 py-3 text-muted-foreground">{a.category}</td>
              <td className="px-4 py-3 text-muted-foreground">{a.date}</td>
              <td className="px-4 py-3">
                <button
                  onClick={() => onToggle(a.id, a.published)}
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    a.published
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {a.published ? "Nashr" : "Yashirin"}
                </button>
              </td>
              <td className="px-4 py-3">
                <button
                  onClick={() => onDelete(a.id)}
                  className="text-xs text-red-500 hover:text-red-700"
                >
                  O'chirish
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
