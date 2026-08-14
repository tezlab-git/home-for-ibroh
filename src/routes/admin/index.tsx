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
  body: string;
  date: string;
  display_date: string;
  reading_time: string;
  category: string;
  published: boolean;
};

type Tab = "projects" | "articles";

const emptyProject: Omit<Project, "id"> = {
  slug: "", name: "", description: "", category: "", status: "Ishlanmoqda", year: String(new Date().getFullYear()), href: "", published: false,
};

const emptyArticle: Omit<Article, "id"> = {
  slug: "", title: "", excerpt: "", body: "", date: new Date().toISOString().slice(0, 10),
  display_date: "", reading_time: "", category: "", published: false,
};

function AdminDashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("projects");
  const [projects, setProjects] = useState<Project[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");

  // Modal state
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [editingArticle, setEditingArticle] = useState<Partial<Article> | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) navigate({ to: "/admin/login" });
      else setUserEmail(data.session.user.email ?? "");
    });
  }, [navigate]);

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

  useEffect(() => { load(); }, []);

  async function togglePublished(table: Tab, id: string, current: boolean) {
    await supabase.from(table).update({ published: !current }).eq("id", id);
    if (table === "projects") setProjects((prev) => prev.map((p) => p.id === id ? { ...p, published: !current } : p));
    else setArticles((prev) => prev.map((a) => a.id === id ? { ...a, published: !current } : a));
  }

  async function deleteRow(table: Tab, id: string) {
    if (!confirm("O'chirishni tasdiqlaysizmi?")) return;
    await supabase.from(table).delete().eq("id", id);
    if (table === "projects") setProjects((prev) => prev.filter((p) => p.id !== id));
    else setArticles((prev) => prev.filter((a) => a.id !== id));
  }

  async function saveProject(data: Partial<Project>) {
    if (data.id) {
      await supabase.from("projects").update(data).eq("id", data.id);
    } else {
      await supabase.from("projects").insert(data);
    }
    setEditingProject(null);
    load();
  }

  async function saveArticle(data: Partial<Article>) {
    if (data.id) {
      await supabase.from("articles").update(data).eq("id", data.id);
    } else {
      await supabase.from("articles").insert(data);
    }
    setEditingArticle(null);
    load();
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-hairline px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">← Saytga qaytish</Link>
          <span className="text-sm font-medium text-foreground">Admin Panel</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-muted-foreground">{userEmail}</span>
          <button onClick={async () => { await supabase.auth.signOut(); navigate({ to: "/admin/login" }); }}
            className="text-sm text-muted-foreground hover:text-foreground">Chiqish</button>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="flex items-center justify-between mb-8 border-b border-hairline pb-0">
          <div className="flex gap-1">
            {(["projects", "articles"] as Tab[]).map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className={`px-4 py-2 text-sm font-medium transition-colors ${tab === t ? "border-b-2 border-foreground text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                {t === "projects" ? "Loyihalar" : "Yozmalar"}
              </button>
            ))}
          </div>
          <button
            onClick={() => tab === "projects" ? setEditingProject({ ...emptyProject }) : setEditingArticle({ ...emptyArticle })}
            className="mb-2 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90">
            + Yangi {tab === "projects" ? "loyiha" : "maqola"}
          </button>
        </div>

        {loading ? (
          <p className="text-sm text-muted-foreground">Yuklanmoqda...</p>
        ) : tab === "projects" ? (
          <ProjectsTable projects={projects}
            onEdit={(p) => setEditingProject(p)}
            onToggle={(id, cur) => togglePublished("projects", id, cur)}
            onDelete={(id) => deleteRow("projects", id)} />
        ) : (
          <ArticlesTable articles={articles}
            onEdit={(a) => setEditingArticle(a)}
            onToggle={(id, cur) => togglePublished("articles", id, cur)}
            onDelete={(id) => deleteRow("articles", id)} />
        )}
      </div>

      {editingProject && (
        <ProjectModal data={editingProject} onSave={saveProject} onClose={() => setEditingProject(null)} />
      )}
      {editingArticle && (
        <ArticleModal data={editingArticle} onSave={saveArticle} onClose={() => setEditingArticle(null)} />
      )}
    </div>
  );
}

// ── Tables ──────────────────────────────────────────────────────────────────

function ProjectsTable({ projects, onEdit, onToggle, onDelete }: {
  projects: Project[];
  onEdit: (p: Project) => void;
  onToggle: (id: string, cur: boolean) => void;
  onDelete: (id: string) => void;
}) {
  if (!projects.length)
    return <p className="text-sm text-muted-foreground">Loyihalar yo'q. "Yangi loyiha" tugmasini bosing.</p>;
  return (
    <div className="overflow-x-auto rounded-lg border border-hairline">
      <table className="w-full text-sm">
        <thead className="bg-surface">
          <tr>{["Nomi", "Kategoriya", "Status", "Yil", "Nashr", "Amallar"].map((h) => (
            <th key={h} className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">{h}</th>
          ))}</tr>
        </thead>
        <tbody className="divide-y divide-hairline">
          {projects.map((p) => (
            <tr key={p.id} className="hover:bg-surface/50">
              <td className="px-4 py-3 font-medium text-foreground">{p.name}</td>
              <td className="px-4 py-3 text-muted-foreground">{p.category}</td>
              <td className="px-4 py-3 text-muted-foreground">{p.status}</td>
              <td className="px-4 py-3 text-muted-foreground">{p.year}</td>
              <td className="px-4 py-3">
                <button onClick={() => onToggle(p.id, p.published)}
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${p.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                  {p.published ? "Nashr" : "Yashirin"}
                </button>
              </td>
              <td className="px-4 py-3 flex gap-3">
                <button onClick={() => onEdit(p)} className="text-xs text-blue-500 hover:text-blue-700">Tahrirlash</button>
                <button onClick={() => onDelete(p.id)} className="text-xs text-red-500 hover:text-red-700">O'chirish</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ArticlesTable({ articles, onEdit, onToggle, onDelete }: {
  articles: Article[];
  onEdit: (a: Article) => void;
  onToggle: (id: string, cur: boolean) => void;
  onDelete: (id: string) => void;
}) {
  if (!articles.length)
    return <p className="text-sm text-muted-foreground">Yozmalar yo'q. "Yangi maqola" tugmasini bosing.</p>;
  return (
    <div className="overflow-x-auto rounded-lg border border-hairline">
      <table className="w-full text-sm">
        <thead className="bg-surface">
          <tr>{["Sarlavha", "Kategoriya", "Sana", "Nashr", "Amallar"].map((h) => (
            <th key={h} className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">{h}</th>
          ))}</tr>
        </thead>
        <tbody className="divide-y divide-hairline">
          {articles.map((a) => (
            <tr key={a.id} className="hover:bg-surface/50">
              <td className="px-4 py-3 font-medium text-foreground">{a.title}</td>
              <td className="px-4 py-3 text-muted-foreground">{a.category}</td>
              <td className="px-4 py-3 text-muted-foreground">{a.date}</td>
              <td className="px-4 py-3">
                <button onClick={() => onToggle(a.id, a.published)}
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${a.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                  {a.published ? "Nashr" : "Yashirin"}
                </button>
              </td>
              <td className="px-4 py-3 flex gap-3">
                <button onClick={() => onEdit(a)} className="text-xs text-blue-500 hover:text-blue-700">Tahrirlash</button>
                <button onClick={() => onDelete(a.id)} className="text-xs text-red-500 hover:text-red-700">O'chirish</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Modals ───────────────────────────────────────────────────────────────────

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-medium text-foreground mb-1">{label}</label>
      {children}
    </div>
  );
}

const inputCls = "w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary";

function ProjectModal({ data, onSave, onClose }: {
  data: Partial<Project>;
  onSave: (d: Partial<Project>) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState(data);
  const set = (k: keyof Project, v: string | boolean) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <Modal title={form.id ? "Loyihani tahrirlash" : "Yangi loyiha"} onClose={onClose}
      onSave={() => onSave(form)}>
      <Field label="Nomi"><input className={inputCls} value={form.name ?? ""} onChange={(e) => set("name", e.target.value)} /></Field>
      <Field label="Slug"><input className={inputCls} value={form.slug ?? ""} onChange={(e) => set("slug", e.target.value)} /></Field>
      <Field label="Tavsif"><textarea className={inputCls} rows={3} value={form.description ?? ""} onChange={(e) => set("description", e.target.value)} /></Field>
      <Field label="Kategoriya"><input className={inputCls} value={form.category ?? ""} onChange={(e) => set("category", e.target.value)} /></Field>
      <Field label="Status"><input className={inputCls} value={form.status ?? ""} onChange={(e) => set("status", e.target.value)} /></Field>
      <Field label="Yil"><input className={inputCls} value={form.year ?? ""} onChange={(e) => set("year", e.target.value)} /></Field>
      <Field label="Havola (href)"><input className={inputCls} value={form.href ?? ""} onChange={(e) => set("href", e.target.value)} /></Field>
      <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
        <input type="checkbox" checked={form.published ?? false} onChange={(e) => set("published", e.target.checked)} />
        Nashr qilish
      </label>
    </Modal>
  );
}

function ArticleModal({ data, onSave, onClose }: {
  data: Partial<Article>;
  onSave: (d: Partial<Article>) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState(data);
  const set = (k: keyof Article, v: string | boolean) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <Modal title={form.id ? "Maqolani tahrirlash" : "Yangi maqola"} onClose={onClose}
      onSave={() => onSave(form)}>
      <Field label="Sarlavha"><input className={inputCls} value={form.title ?? ""} onChange={(e) => set("title", e.target.value)} /></Field>
      <Field label="Slug"><input className={inputCls} value={form.slug ?? ""} onChange={(e) => set("slug", e.target.value)} /></Field>
      <Field label="Qisqa tavsif (excerpt)"><textarea className={inputCls} rows={2} value={form.excerpt ?? ""} onChange={(e) => set("excerpt", e.target.value)} /></Field>
      <Field label="Matn (body)"><textarea className={inputCls} rows={10} value={form.body ?? ""} onChange={(e) => set("body", e.target.value)} /></Field>
      <Field label="Sana (YYYY-MM-DD)"><input className={inputCls} value={form.date ?? ""} onChange={(e) => set("date", e.target.value)} /></Field>
      <Field label="Ko'rsatiladigan sana"><input className={inputCls} value={form.display_date ?? ""} onChange={(e) => set("display_date", e.target.value)} /></Field>
      <Field label="O'qish vaqti"><input className={inputCls} value={form.reading_time ?? ""} onChange={(e) => set("reading_time", e.target.value)} /></Field>
      <Field label="Kategoriya"><input className={inputCls} value={form.category ?? ""} onChange={(e) => set("category", e.target.value)} /></Field>
      <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
        <input type="checkbox" checked={form.published ?? false} onChange={(e) => set("published", e.target.checked)} />
        Nashr qilish
      </label>
    </Modal>
  );
}

function Modal({ title, children, onSave, onClose }: {
  title: string;
  children: React.ReactNode;
  onSave: () => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl bg-background border border-hairline p-6 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-base font-semibold text-foreground">{title}</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground text-lg leading-none">✕</button>
        </div>
        <div className="space-y-4">{children}</div>
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} className="rounded-md border border-input px-4 py-2 text-sm text-foreground hover:bg-surface">Bekor qilish</button>
          <button onClick={onSave} className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Saqlash</button>
        </div>
      </div>
    </div>
  );
}
