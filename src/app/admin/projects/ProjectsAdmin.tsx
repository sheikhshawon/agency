"use client";

import { useState, useTransition, useRef } from "react";
import { Plus, Pencil, Trash2, X, Star, ExternalLink, GitFork, Loader2 } from "lucide-react";
import { createProject, updateProject, deleteProject, type ProjectRow } from "./actions";

const CATEGORIES = [
  "Web Development",
  "Business Solutions",
  "Marketing & Growth",
  "AI & Automation",
  "Brand & Design",
];

type FormState = {
  id?: string;
  title: string;
  description: string;
  category: string;
  thumbnail_url: string;
  tags: string;
  live_url: string;
  github_url: string;
  year: string;
  featured: boolean;
  order_index: string;
};

const EMPTY: FormState = {
  title: "",
  description: "",
  category: "",
  thumbnail_url: "",
  tags: "",
  live_url: "",
  github_url: "",
  year: String(new Date().getFullYear()),
  featured: false,
  order_index: "0",
};

function toFormState(p: ProjectRow): FormState {
  return {
    id: p.id,
    title: p.title,
    description: p.description ?? "",
    category: p.category ?? "",
    thumbnail_url: p.thumbnail_url ?? "",
    tags: p.tags.join(", "),
    live_url: p.live_url ?? "",
    github_url: p.github_url ?? "",
    year: p.year ?? String(new Date().getFullYear()),
    featured: p.featured,
    order_index: String(p.order_index),
  };
}

export default function ProjectsAdmin({ initial }: { initial: ProjectRow[] }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [isPending, startTransition] = useTransition();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  function openCreate() {
    setForm(EMPTY);
    setOpen(true);
  }

  function openEdit(p: ProjectRow) {
    setForm(toFormState(p));
    setOpen(true);
  }

  function handleSubmit() {
    const fd = new FormData(formRef.current!);
    fd.set("featured", String(form.featured));
    startTransition(async () => {
      if (form.id) {
        fd.set("id", form.id);
        await updateProject(fd);
      } else {
        await createProject(fd);
      }
      setOpen(false);
      setForm(EMPTY);
    });
  }

  function handleDelete(id: string) {
    const fd = new FormData();
    fd.set("id", id);
    startTransition(async () => {
      await deleteProject(fd);
      setDeleteId(null);
    });
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Projects</h1>
          <p className="text-sm text-[#606060] mt-1">{initial.length} projects total</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2 bg-[#1B6BFF] hover:bg-[#1557CC] text-white text-sm font-semibold rounded-xl transition-colors"
        >
          <Plus size={16} />
          Add Project
        </button>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-[#1A1A1A] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#1A1A1A] bg-[#070707]">
              <th className="text-left px-5 py-3 text-[#606060] font-medium">Title</th>
              <th className="text-left px-5 py-3 text-[#606060] font-medium">Category</th>
              <th className="text-left px-5 py-3 text-[#606060] font-medium">Tags</th>
              <th className="text-left px-5 py-3 text-[#606060] font-medium">Year</th>
              <th className="text-left px-5 py-3 text-[#606060] font-medium">Featured</th>
              <th className="text-right px-5 py-3 text-[#606060] font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {initial.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-12 text-center text-[#606060]">
                  No projects yet. Click "Add Project" to create one.
                </td>
              </tr>
            )}
            {initial.map((p) => (
              <tr key={p.id} className="border-b border-[#111111] hover:bg-[#080808] transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium">{p.title}</span>
                    {p.live_url && (
                      <a href={p.live_url} target="_blank" rel="noopener noreferrer" className="text-[#404040] hover:text-[#1B6BFF]">
                        <ExternalLink size={12} />
                      </a>
                    )}
                    {p.github_url && (
                      <a href={p.github_url} target="_blank" rel="noopener noreferrer" className="text-[#404040] hover:text-[#1B6BFF]">
                        <GitFork size={12} />
                      </a>
                    )}
                  </div>
                  {p.description && (
                    <p className="text-[#505050] text-xs mt-1 line-clamp-1">{p.description}</p>
                  )}
                </td>
                <td className="px-5 py-4 text-[#A0A0A0]">{p.category ?? "—"}</td>
                <td className="px-5 py-4">
                  <div className="flex flex-wrap gap-1">
                    {p.tags.slice(0, 3).map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded-full bg-[#111111] border border-[#222222] text-[#808080] text-[10px]">
                        {t}
                      </span>
                    ))}
                    {p.tags.length > 3 && (
                      <span className="text-[#505050] text-[10px]">+{p.tags.length - 3}</span>
                    )}
                  </div>
                </td>
                <td className="px-5 py-4 text-[#A0A0A0]">{p.year ?? "—"}</td>
                <td className="px-5 py-4">
                  {p.featured ? (
                    <Star size={14} className="text-[#F5A623] fill-[#F5A623]" />
                  ) : (
                    <span className="text-[#303030]">—</span>
                  )}
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => openEdit(p)}
                      className="p-1.5 rounded-lg text-[#606060] hover:text-white hover:bg-[#1A1A1A] transition-colors"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => setDeleteId(p.id)}
                      className="p-1.5 rounded-lg text-[#606060] hover:text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create / Edit Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-[#0A0A0A] border border-[#1E1E1E] rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#1A1A1A]">
              <h2 className="text-base font-semibold text-white">
                {form.id ? "Edit Project" : "Add Project"}
              </h2>
              <button onClick={() => setOpen(false)} className="text-[#606060] hover:text-white">
                <X size={18} />
              </button>
            </div>

            <form ref={formRef} className="px-6 py-5 flex flex-col gap-4 max-h-[70vh] overflow-y-auto">
              <Field label="Title *">
                <input
                  name="title"
                  required
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  className="input"
                  placeholder="Project title"
                />
              </Field>

              <Field label="Description">
                <textarea
                  name="description"
                  rows={2}
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  className="input resize-none"
                  placeholder="Short description"
                />
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Category">
                  <select
                    name="category"
                    value={form.category}
                    onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                    className="input"
                  >
                    <option value="">Select category</option>
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Year">
                  <input
                    name="year"
                    value={form.year}
                    onChange={(e) => setForm((f) => ({ ...f, year: e.target.value }))}
                    className="input"
                    placeholder="2025"
                  />
                </Field>
              </div>

              <Field label="Tags (comma-separated)">
                <input
                  name="tags"
                  value={form.tags}
                  onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
                  className="input"
                  placeholder="React, Node.js, Tailwind"
                />
              </Field>

              <Field label="Thumbnail URL">
                <input
                  name="thumbnail_url"
                  value={form.thumbnail_url}
                  onChange={(e) => setForm((f) => ({ ...f, thumbnail_url: e.target.value }))}
                  className="input"
                  placeholder="https://..."
                />
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Live URL">
                  <input
                    name="live_url"
                    value={form.live_url}
                    onChange={(e) => setForm((f) => ({ ...f, live_url: e.target.value }))}
                    className="input"
                    placeholder="https://..."
                  />
                </Field>
                <Field label="GitHub URL">
                  <input
                    name="github_url"
                    value={form.github_url}
                    onChange={(e) => setForm((f) => ({ ...f, github_url: e.target.value }))}
                    className="input"
                    placeholder="https://github.com/..."
                  />
                </Field>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Order Index">
                  <input
                    name="order_index"
                    type="number"
                    value={form.order_index}
                    onChange={(e) => setForm((f) => ({ ...f, order_index: e.target.value }))}
                    className="input"
                    placeholder="0"
                  />
                </Field>
                <Field label="Featured">
                  <button
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, featured: !f.featured }))}
                    className={`h-10 px-4 rounded-xl border text-sm font-medium transition-colors ${
                      form.featured
                        ? "bg-[#F5A623]/15 border-[#F5A623]/30 text-[#F5A623]"
                        : "bg-transparent border-[#252525] text-[#606060] hover:border-[#353535]"
                    }`}
                  >
                    {form.featured ? "★ Featured" : "☆ Not featured"}
                  </button>
                </Field>
              </div>
            </form>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#1A1A1A]">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 text-sm text-[#606060] hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isPending}
                className="flex items-center gap-2 px-5 py-2 bg-[#1B6BFF] hover:bg-[#1557CC] disabled:opacity-50 text-white text-sm font-semibold rounded-xl transition-colors"
              >
                {isPending && <Loader2 size={14} className="animate-spin" />}
                {form.id ? "Save Changes" : "Create Project"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-[#0A0A0A] border border-[#1E1E1E] rounded-2xl shadow-2xl p-6">
            <h3 className="text-base font-semibold text-white mb-2">Delete project?</h3>
            <p className="text-sm text-[#606060] mb-6">This action cannot be undone.</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 text-sm text-[#606060] hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                disabled={isPending}
                className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 text-sm font-semibold rounded-xl transition-colors"
              >
                {isPending && <Loader2 size={14} className="animate-spin" />}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-[#808080]">{label}</label>
      {children}
    </div>
  );
}
