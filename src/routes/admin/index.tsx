import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState, lazy, Suspense } from "react";
import { supabase } from "@/lib/supabaseClient";

const MDEditor = lazy(() => import("@uiw/react-md-editor"));

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

// ── Types ────────────────────────────────────────────────────────────────────

type Project = {
  id: string; slug: string; name: string; description: string;
  category: string; status: string; year: string; href: string; published: boolean;
};
type Article = {
  id: string; slug: string; title: string; excerpt: string; body: string;
  date: string; display_date: string; reading_time: string; category: string; published: boolean;
};
type SocialLink = { id: string; label: string; href: string; sort_order: number };
type SiteSettings = {
  id: string; owner: string; tagline: string; location: string;
  email: string; bio: string; now_updated_at: string;
};

type Tab = "projects" | "articles" | "social" | "settings";

const emptyProject: Omit<Project, "id"> = {
  slug: "", name: "", description: "", category: "", status: "Ishlanmoqda",
  year: String(new Date().getFullYear()), href: "", published: false,
};
const emptyArticle: Omit<Article, "id"> = {
  slug: "", title: "", excerpt: "", body: "", date: new Date().toISOString().slice(0, 10),
  display_date: "", reading_time: "", category: "", published: false,
};
const emptyLink: Omit<SocialLink, "id"> = { label: "", href: "", sort_order: 0 };

const inputCls = "w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary";

// ── Main ─────────────────────────────────────────────────────────────────────

function AdminDashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("projects");
  const [projects, setProjects] = useState<Project[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");

  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [editingArticle, setEditingArticle] = useState<Partial<Article> | null>(null);
  const [editingLink, setEditingLink] = useState<Partial<SocialLink> | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) navigate({ to: "/admin/login" });
      else setUserEmail(data.session.user.email ?? "");
    });
  }, [navigate]);

  async function load() {
    setLoading(true);
    const [{ data: p }, { data: a }, { data: s }, { data: st }] = await Promise.all([
      supabase.from("projects").select("*").order("created_at", { ascending: false }),
      supabase.from("articles").select("*").order("date", { ascending: false }),
      supabase.from("social_links").select("*").order("sort_order"),
      supabase.from("site_settings").select("*").limit(1),
    ]);
    setProjects((p as Project[]) || []);
    setArticles((a as Article[]) || []);
    setSocialLinks((s as SocialLink[]) || []);
    setSettings(st?.[0] as SiteSettings || null);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function togglePublished(table: "projects" | "articles", id: string, cur: boolean) {
    await supabase.from(table).update({ published: !cur }).eq("id", id);
    if (table === "projects") setProjects((prev) => prev.map((p) => p.id === id ? { ...p, published: !cur } : p));
    else setArticles((prev) => prev.map((a) => a.id === id ? { ...a, published: !cur } : a));
  }

  async function deleteRow(table: "projects" | "articles" | "social_links", id: string) {
    if (!confirm("O'chirishni tasdiqlaysizmi?")) return;
    await supabase.from(table).delete().eq("id", id);
    if (table === "projects") setProjects((prev) => prev.filter((p) => p.id !== id));
    else if (table === "articles") setArticles((prev) => prev.filter((a) => a.id !== id));
    else setSocialLinks((prev) => prev.filter((l) => l.id !== id));
  }

  async function saveProject(data: Partial<Project>) {
    if (data.id) await supabase.from("projects").update(data).eq("id", data.id);
    else await supabase.from("projects").insert(data);
    setEditingProject(null); load();
  }

  async function saveArticle(data: Partial<Article>) {
    if (data.id) await supabase.from("articles").update(data).eq("id", data.id);
    else await supabase.from("articles").insert(data);
    setEditingArticle(null); load();
  }

  async function saveLink(data: Partial<SocialLink>) {
    if (data.id) await supabase.from("social_links").update(data).eq("id", data.id);
    else await supabase.from("social_links").insert(data);
    setEditingLink(null); load();
  }

  async function saveSettings(data: SiteSettings) {
    if (data.id) await supabase.from("site_settings").update(data).eq("id", data.id);
    else await supabase.from("site_settings").insert(data);
    load();
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: "projects", label: "Loyihalar" },
    { key: "articles", label: "Yozmalar" },
    { key: "social", label: "Ijtimoiy tarmoqlar" },
    { key: "settings", label: "Sayt sozlamalari" },
  ];

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
        <div className="flex items-center justify-between border-b border-hairline mb-8">
          <div className="flex gap-1">
            {tabs.map((t) => (
              <button key={t.key} onClick={() => setTab(t.key)}
                className={`px-4 py-2 text-sm font-medium transition-colors ${tab === t.key ? "border-b-2 border-foreground text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                {t.label}
              </button>
            ))}
          </div>
          {(tab === "projects" || tab === "articles" || tab === "social") && (
            <button onClick={() => {
              if (tab === "projects") setEditingProject({ ...emptyProject });
              else if (tab === "articles") setEditingArticle({ ...emptyArticle });
              else setEditingLink({ ...emptyLink });
            }} className="mb-2 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90">
              + Yangi {tab === "projects" ? "loyiha" : tab === "articles" ? "maqola" : "link"}
            </button>
          )}
        </div>

        {loading ? (
          <p className="text-sm text-muted-foreground">Yuklanmoqda...</p>
        ) : tab === "projects" ? (
          <ProjectsTable projects={projects}
            onEdit={setEditingProject}
            onToggle={(id, cur) => togglePublished("projects", id, cur)}
            onDelete={(id) => deleteRow("projects", id)} />
        ) : tab === "articles" ? (
          <ArticlesTable articles={articles}
            onEdit={setEditingArticle}
            onToggle={(id, cur) => togglePublished("articles", id, cur)}
            onDelete={(id) => deleteRow("articles", id)} />
        ) : tab === "social" ? (
          <SocialTable links={socialLinks}
            onSave={saveLink}
            onDelete={(id) => deleteRow("social_links", id)} />
        ) : (
          <SettingsForm settings={settings} onSave={saveSettings} />
        )}
      </div>

      {editingProject && <ProjectModal data={editingProject} onSave={saveProject} onClose={() => setEditingProject(null)} />}
      {editingArticle && <ArticleModal data={editingArticle} onSave={saveArticle} onClose={() => setEditingArticle(null)} />}
      {editingLink && <LinkModal data={editingLink} onSave={saveLink} onClose={() => setEditingLink(null)} />}
    </div>
  );
}

// ── Tables ────────────────────────────────────────────────────────────────────

function ProjectsTable({ projects, onEdit, onToggle, onDelete }: {
  projects: Project[]; onEdit: (p: Project) => void;
  onToggle: (id: string, cur: boolean) => void; onDelete: (id: string) => void;
}) {
  if (!projects.length) return <Empty text="Loyihalar yo'q." />;
  return (
    <Table headers={["Nomi", "Kategoriya", "Status", "Yil", "Nashr", "Amallar"]}>
      {projects.map((p) => (
        <tr key={p.id} className="hover:bg-surface/50">
          <td className="px-4 py-3 font-medium text-foreground">{p.name}</td>
          <td className="px-4 py-3 text-muted-foreground">{p.category}</td>
          <td className="px-4 py-3 text-muted-foreground">{p.status}</td>
          <td className="px-4 py-3 text-muted-foreground">{p.year}</td>
          <td className="px-4 py-3"><PublishBadge published={p.published} onClick={() => onToggle(p.id, p.published)} /></td>
          <td className="px-4 py-3"><Actions onEdit={() => onEdit(p)} onDelete={() => onDelete(p.id)} /></td>
        </tr>
      ))}
    </Table>
  );
}

function ArticlesTable({ articles, onEdit, onToggle, onDelete }: {
  articles: Article[]; onEdit: (a: Article) => void;
  onToggle: (id: string, cur: boolean) => void; onDelete: (id: string) => void;
}) {
  if (!articles.length) return <Empty text="Yozmalar yo'q." />;
  return (
    <Table headers={["Sarlavha", "Kategoriya", "Sana", "Nashr", "Amallar"]}>
      {articles.map((a) => (
        <tr key={a.id} className="hover:bg-surface/50">
          <td className="px-4 py-3 font-medium text-foreground">{a.title}</td>
          <td className="px-4 py-3 text-muted-foreground">{a.category}</td>
          <td className="px-4 py-3 text-muted-foreground">{a.date}</td>
          <td className="px-4 py-3"><PublishBadge published={a.published} onClick={() => onToggle(a.id, a.published)} /></td>
          <td className="px-4 py-3"><Actions onEdit={() => onEdit(a)} onDelete={() => onDelete(a.id)} /></td>
        </tr>
      ))}
    </Table>
  );
}

function SocialTable({ links, onSave, onDelete }: {
  links: SocialLink[];
  onSave: (l: Partial<SocialLink>) => void;
  onDelete: (id: string) => void;
}) {
  const [editing, setEditing] = useState<Record<string, SocialLink>>({});

  function startEdit(l: SocialLink) {
    setEditing((prev) => ({ ...prev, [l.id]: { ...l } }));
  }
  function set(id: string, k: keyof SocialLink, v: string | number) {
    setEditing((prev) => ({ ...prev, [id]: { ...prev[id], [k]: v } }));
  }
  async function save(id: string) {
    await onSave(editing[id]);
    setEditing((prev) => { const n = { ...prev }; delete n[id]; return n; });
  }
  function cancel(id: string) {
    setEditing((prev) => { const n = { ...prev }; delete n[id]; return n; });
  }

  if (!links.length) return <Empty text="Ijtimoiy tarmoq linklari yo'q." />;
  return (
    <Table headers={["Label", "Havola", "Tartib", "Amallar"]}>
      {links.map((l) => {
        const row = editing[l.id];
        return row ? (
          <tr key={l.id} className="bg-surface/50">
            <td className="px-4 py-2">
              <input className={inputCls} value={row.label} onChange={(e) => set(l.id, "label", e.target.value)} />
            </td>
            <td className="px-4 py-2">
              <input className={inputCls} value={row.href} onChange={(e) => set(l.id, "href", e.target.value)} />
            </td>
            <td className="px-4 py-2">
              <input className={inputCls} type="number" value={row.sort_order} onChange={(e) => set(l.id, "sort_order", Number(e.target.value))} style={{ width: 60 }} />
            </td>
            <td className="px-4 py-2">
              <div className="flex gap-3">
                <button onClick={() => save(l.id)} className="text-xs text-green-600 hover:text-green-800">Saqlash</button>
                <button onClick={() => cancel(l.id)} className="text-xs text-muted-foreground hover:text-foreground">Bekor</button>
              </div>
            </td>
          </tr>
        ) : (
          <tr key={l.id} className="hover:bg-surface/50 cursor-pointer" onClick={() => startEdit(l)}>
            <td className="px-4 py-3 font-medium text-foreground">{l.label}</td>
            <td className="px-4 py-3 text-muted-foreground text-xs truncate max-w-xs">{l.href}</td>
            <td className="px-4 py-3 text-muted-foreground">{l.sort_order}</td>
            <td className="px-4 py-3">
              <div className="flex gap-3">
                <button onClick={(e) => { e.stopPropagation(); startEdit(l); }} className="text-xs text-blue-500 hover:text-blue-700">Tahrirlash</button>
                <button onClick={(e) => { e.stopPropagation(); onDelete(l.id); }} className="text-xs text-red-500 hover:text-red-700">O'chirish</button>
              </div>
            </td>
          </tr>
        );
      })}
    </Table>
  );
}

// ── Settings Form ─────────────────────────────────────────────────────────────

function SettingsForm({ settings, onSave }: { settings: SiteSettings | null; onSave: (d: SiteSettings) => void }) {
  const [form, setForm] = useState<Partial<SiteSettings>>(settings || {});
  const [saved, setSaved] = useState(false);
  const set = (k: keyof SiteSettings, v: string) => setForm((f) => ({ ...f, [k]: v }));

  async function handleSave() {
    await onSave(form as SiteSettings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="max-w-xl space-y-5">
      <Field label="Ism (owner)"><input className={inputCls} value={form.owner ?? ""} onChange={(e) => set("owner", e.target.value)} /></Field>
      <Field label="Tagline"><input className={inputCls} value={form.tagline ?? ""} onChange={(e) => set("tagline", e.target.value)} /></Field>
      <Field label="Joylashuv"><input className={inputCls} value={form.location ?? ""} onChange={(e) => set("location", e.target.value)} /></Field>
      <Field label="Email"><input className={inputCls} type="email" value={form.email ?? ""} onChange={(e) => set("email", e.target.value)} /></Field>
      <Field label="Bio (haqimda matni)">
        <textarea className={inputCls} rows={5} value={form.bio ?? ""} onChange={(e) => set("bio", e.target.value)} />
      </Field>
      <Field label="'Hozir' oxirgi yangilanish">
        <input className={inputCls} value={form.now_updated_at ?? ""} onChange={(e) => set("now_updated_at", e.target.value)} />
      </Field>
      <button onClick={handleSave}
        className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
        {saved ? "✓ Saqlandi" : "Saqlash"}
      </button>
    </div>
  );
}

// ── Modals ────────────────────────────────────────────────────────────────────

function ProjectModal({ data, onSave, onClose }: { data: Partial<Project>; onSave: (d: Partial<Project>) => void; onClose: () => void }) {
  const [form, setForm] = useState(data);
  const set = (k: keyof Project, v: string | boolean) => setForm((f) => ({ ...f, [k]: v }));
  return (
    <Modal title={form.id ? "Loyihani tahrirlash" : "Yangi loyiha"} onClose={onClose} onSave={() => onSave(form)}>
      <Field label="Nomi"><input className={inputCls} value={form.name ?? ""} onChange={(e) => set("name", e.target.value)} /></Field>
      <Field label="Slug"><input className={inputCls} value={form.slug ?? ""} onChange={(e) => set("slug", e.target.value)} /></Field>
      <Field label="Tavsif"><textarea className={inputCls} rows={3} value={form.description ?? ""} onChange={(e) => set("description", e.target.value)} /></Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Kategoriya"><input className={inputCls} value={form.category ?? ""} onChange={(e) => set("category", e.target.value)} /></Field>
        <Field label="Status">
          <select className={inputCls} value={form.status ?? ""} onChange={(e) => set("status", e.target.value)}>
            {["Ishlanmoqda", "Ishga tushgan", "Konsepsiya", "Davom etmoqda", "To'xtatilgan"].map((s) => <option key={s}>{s}</option>)}
          </select>
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Yil"><input className={inputCls} value={form.year ?? ""} onChange={(e) => set("year", e.target.value)} /></Field>
        <Field label="Havola (href)"><input className={inputCls} value={form.href ?? ""} onChange={(e) => set("href", e.target.value)} /></Field>
      </div>
      <Checkbox label="Nashr qilish" checked={form.published ?? false} onChange={(v) => set("published", v)} />
    </Modal>
  );
}

function ArticleModal({ data, onSave, onClose }: { data: Partial<Article>; onSave: (d: Partial<Article>) => void; onClose: () => void }) {
  const [form, setForm] = useState(data);
  const set = (k: keyof Article, v: string | boolean) => setForm((f) => ({ ...f, [k]: v }));
  return (
    <Modal title={form.id ? "Maqolani tahrirlash" : "Yangi maqola"} onClose={onClose} onSave={() => onSave(form)} wide>
      <Field label="Sarlavha"><input className={inputCls} value={form.title ?? ""} onChange={(e) => set("title", e.target.value)} /></Field>
      <Field label="Slug"><input className={inputCls} value={form.slug ?? ""} onChange={(e) => set("slug", e.target.value)} /></Field>
      <Field label="Qisqa tavsif"><textarea className={inputCls} rows={2} value={form.excerpt ?? ""} onChange={(e) => set("excerpt", e.target.value)} /></Field>
      <Field label="Matn (Markdown)">
        <Suspense fallback={<textarea className={inputCls} rows={12} value={form.body ?? ""} onChange={(e) => set("body", e.target.value)} />}>
          <div data-color-mode="light">
            <MDEditor value={form.body ?? ""} onChange={(v) => set("body", v ?? "")} height={360} />
          </div>
        </Suspense>
      </Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Sana (YYYY-MM-DD)"><input className={inputCls} value={form.date ?? ""} onChange={(e) => set("date", e.target.value)} /></Field>
        <Field label="Ko'rsatiladigan sana"><input className={inputCls} value={form.display_date ?? ""} onChange={(e) => set("display_date", e.target.value)} /></Field>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Field label="O'qish vaqti"><input className={inputCls} value={form.reading_time ?? ""} onChange={(e) => set("reading_time", e.target.value)} /></Field>
        <Field label="Kategoriya"><input className={inputCls} value={form.category ?? ""} onChange={(e) => set("category", e.target.value)} /></Field>
      </div>
      <Checkbox label="Nashr qilish" checked={form.published ?? false} onChange={(v) => set("published", v)} />
    </Modal>
  );
}

function LinkModal({ data, onSave, onClose }: { data: Partial<SocialLink>; onSave: (d: Partial<SocialLink>) => void; onClose: () => void }) {
  const [form, setForm] = useState(data);
  const set = (k: keyof SocialLink, v: string | number) => setForm((f) => ({ ...f, [k]: v }));
  return (
    <Modal title={form.id ? "Linkni tahrirlash" : "Yangi link"} onClose={onClose} onSave={() => onSave(form)}>
      <Field label="Label (nomi)"><input className={inputCls} value={form.label ?? ""} onChange={(e) => set("label", e.target.value)} /></Field>
      <Field label="Havola (href)"><input className={inputCls} value={form.href ?? ""} onChange={(e) => set("href", e.target.value)} /></Field>
      <Field label="Tartib raqami"><input className={inputCls} type="number" value={form.sort_order ?? 0} onChange={(e) => set("sort_order", Number(e.target.value))} /></Field>
    </Modal>
  );
}

// ── Shared UI ─────────────────────────────────────────────────────────────────

function Table({ headers, children }: { headers: string[]; children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-hairline">
      <table className="w-full text-sm">
        <thead className="bg-surface">
          <tr>{headers.map((h) => <th key={h} className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">{h}</th>)}</tr>
        </thead>
        <tbody className="divide-y divide-hairline">{children}</tbody>
      </table>
    </div>
  );
}

function PublishBadge({ published, onClick }: { published: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`rounded-full px-2 py-0.5 text-xs font-medium ${published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
      {published ? "Nashr" : "Yashirin"}
    </button>
  );
}

function Actions({ onEdit, onDelete }: { onEdit: () => void; onDelete: () => void }) {
  return (
    <div className="flex gap-3">
      <button onClick={onEdit} className="text-xs text-blue-500 hover:text-blue-700">Tahrirlash</button>
      <button onClick={onDelete} className="text-xs text-red-500 hover:text-red-700">O'chirish</button>
    </div>
  );
}

function Empty({ text }: { text: string }) {
  return <p className="text-sm text-muted-foreground">{text} Yuqoridagi "+" tugmasini bosing.</p>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-medium text-foreground mb-1">{label}</label>
      {children}
    </div>
  );
}

function Checkbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      {label}
    </label>
  );
}

function Modal({ title, children, onSave, onClose, wide }: {
  title: string; children: React.ReactNode;
  onSave: () => void; onClose: () => void; wide?: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className={`w-full ${wide ? "max-w-3xl" : "max-w-lg"} max-h-[90vh] overflow-y-auto rounded-xl bg-background border border-hairline p-6 shadow-xl`}>
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
