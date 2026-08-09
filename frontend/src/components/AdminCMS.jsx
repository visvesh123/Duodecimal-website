import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const authHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("dd_admin_token")}`,
});

const inputCls =
  "w-full border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition-colors duration-200 placeholder:text-slate-400 focus:border-brand";

const labelCls =
  "mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-slate-500";

export const BlogManager = () => {
  const [posts, setPosts] = useState(null);
  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    cover: "",
    author: "Duodecimal Team",
    tags: "",
  });
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    try {
      const { data } = await axios.get(`${API}/posts`);
      setPosts(data);
    } catch {
      setPosts([]);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axios.post(
        `${API}/posts`,
        {
          ...form,
          tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        },
        { headers: authHeaders() }
      );
      toast.success("Article published");
      setForm({ title: "", excerpt: "", content: "", cover: "", author: "Duodecimal Team", tags: "" });
      load();
    } catch {
      toast.error("Could not publish article");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id) => {
    try {
      await axios.delete(`${API}/posts/${id}`, { headers: authHeaders() });
      toast.success("Article deleted");
      load();
    } catch {
      toast.error("Could not delete article");
    }
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12" data-testid="blog-manager">
      <form onSubmit={submit} className="border border-line bg-white p-8 lg:col-span-5" data-testid="blog-create-form">
        <h2 className="font-display text-xl font-bold tracking-tight text-ink">
          New article
        </h2>
        <div className="mt-6 space-y-5">
          <div>
            <label htmlFor="post-title" className={labelCls}>Title *</label>
            <input id="post-title" data-testid="post-title-input" required value={form.title} onChange={set("title")} className={inputCls} placeholder="Article title" />
          </div>
          <div>
            <label htmlFor="post-excerpt" className={labelCls}>Excerpt</label>
            <input id="post-excerpt" data-testid="post-excerpt-input" value={form.excerpt} onChange={set("excerpt")} className={inputCls} placeholder="One-line summary" />
          </div>
          <div>
            <label htmlFor="post-cover" className={labelCls}>Cover image URL</label>
            <input id="post-cover" data-testid="post-cover-input" value={form.cover} onChange={set("cover")} className={inputCls} placeholder="https://…" />
          </div>
          <div>
            <label htmlFor="post-tags" className={labelCls}>Tags (comma separated)</label>
            <input id="post-tags" data-testid="post-tags-input" value={form.tags} onChange={set("tags")} className={inputCls} placeholder="AI, Data Engineering" />
          </div>
          <div>
            <label htmlFor="post-content" className={labelCls}>Content * (blank line between paragraphs)</label>
            <textarea id="post-content" data-testid="post-content-input" required rows={8} value={form.content} onChange={set("content")} className={`${inputCls} resize-none`} placeholder="Write the article…" />
          </div>
          <button
            data-testid="post-publish-button"
            type="submit"
            disabled={saving}
            className="bg-ink px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-brand disabled:opacity-60"
          >
            {saving ? "Publishing…" : "Publish article"}
          </button>
        </div>
      </form>

      <div className="lg:col-span-7">
        <div className="border border-line bg-white" data-testid="blog-list">
          {posts === null ? (
            <p className="px-6 py-10 text-sm text-slate-500">Loading…</p>
          ) : posts.length === 0 ? (
            <p className="px-6 py-10 text-sm text-slate-500">No articles yet.</p>
          ) : (
            posts.map((p) => (
              <div key={p.id} className="flex items-start justify-between gap-4 border-b border-line px-6 py-5 last:border-0" data-testid={`blog-row-${p.id}`}>
                <div>
                  <p className="text-sm font-semibold text-ink">{p.title}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    /blog/{p.slug} · {new Date(p.created_at).toLocaleDateString()}
                  </p>
                </div>
                <button
                  data-testid={`blog-delete-${p.id}`}
                  onClick={() => remove(p.id)}
                  className="flex items-center gap-1.5 border border-line px-3 py-1.5 text-xs font-medium text-slate-500 transition-colors duration-200 hover:border-red-300 hover:text-red-600"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export const HappeningsManager = () => {
  const [items, setItems] = useState(null);
  const [form, setForm] = useState({ title: "", excerpt: "", link: "" });
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    try {
      const { data } = await axios.get(`${API}/happenings`);
      setItems(data);
    } catch {
      setItems([]);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axios.post(`${API}/happenings`, form, { headers: authHeaders() });
      toast.success("Happening published");
      setForm({ title: "", excerpt: "", link: "" });
      load();
    } catch {
      toast.error("Could not publish happening");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id) => {
    try {
      await axios.delete(`${API}/happenings/${id}`, { headers: authHeaders() });
      toast.success("Happening deleted");
      load();
    } catch {
      toast.error("Could not delete happening");
    }
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12" data-testid="happenings-manager">
      <form onSubmit={submit} className="border border-line bg-white p-8 lg:col-span-5" data-testid="happening-create-form">
        <h2 className="font-display text-xl font-bold tracking-tight text-ink">
          New happening
        </h2>
        <p className="mt-2 text-xs text-slate-500">
          Company news, events or a LinkedIn post you want to feature.
        </p>
        <div className="mt-6 space-y-5">
          <div>
            <label htmlFor="happening-title" className={labelCls}>Title *</label>
            <input id="happening-title" data-testid="happening-title-input" required value={form.title} onChange={set("title")} className={inputCls} placeholder="e.g. Join us at Airport360 2026" />
          </div>
          <div>
            <label htmlFor="happening-excerpt" className={labelCls}>Details</label>
            <textarea id="happening-excerpt" data-testid="happening-excerpt-input" rows={3} value={form.excerpt} onChange={set("excerpt")} className={`${inputCls} resize-none`} placeholder="Short description…" />
          </div>
          <div>
            <label htmlFor="happening-link" className={labelCls}>Link (LinkedIn post URL)</label>
            <input id="happening-link" data-testid="happening-link-input" value={form.link} onChange={set("link")} className={inputCls} placeholder="https://www.linkedin.com/posts/…" />
          </div>
          <button
            data-testid="happening-publish-button"
            type="submit"
            disabled={saving}
            className="bg-ink px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-brand disabled:opacity-60"
          >
            {saving ? "Publishing…" : "Publish happening"}
          </button>
        </div>
      </form>

      <div className="lg:col-span-7">
        <div className="border border-line bg-white" data-testid="happenings-list">
          {items === null ? (
            <p className="px-6 py-10 text-sm text-slate-500">Loading…</p>
          ) : items.length === 0 ? (
            <p className="px-6 py-10 text-sm text-slate-500">No happenings yet.</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex items-start justify-between gap-4 border-b border-line px-6 py-5 last:border-0" data-testid={`happening-row-${item.id}`}>
                <div>
                  <p className="text-sm font-semibold text-ink">{item.title}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    {new Date(item.created_at).toLocaleDateString()}
                    {item.link ? " · has link" : ""}
                  </p>
                </div>
                <button
                  data-testid={`happening-delete-${item.id}`}
                  onClick={() => remove(item.id)}
                  className="flex items-center gap-1.5 border border-line px-3 py-1.5 text-xs font-medium text-slate-500 transition-colors duration-200 hover:border-red-300 hover:text-red-600"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
