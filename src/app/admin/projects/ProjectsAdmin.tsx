"use client";

import { useState, useTransition, useRef } from "react";
import { Plus, Pencil, Trash2, X, Star, ExternalLink, GitFork, Loader2, FolderKanban, Search } from "lucide-react";
import { createProject, updateProject, deleteProject, type ProjectRow } from "./actions";

const CATEGORIES = [
  "Web Development",
  "Business Solutions",
  "Marketing & Growth",
  "AI & Automation",
  "Brand & Design",
];

const CATEGORY_COLORS: Record<string, string> = {
  "Web Development":    "bg-blue-50 text-blue-600 border-blue-100",
  "Business Solutions": "bg-purple-50 text-purple-600 border-purple-100",
  "Marketing & Growth": "bg-green-50 text-green-600 border-green-100",
  "AI & Automation":    "bg-orange-50 text-orange-600 border-orange-100",
  "Brand & Design":     "bg-pink-50 text-pink-600 border-pink-100",
};

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
  const [search, setSearch] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const filtered = initial.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      (p.category ?? "").toLowerCase().includes(search.toLowerCase())
  );

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

  const featured = initial.filter((p) => p.featured).length;

  return (
    <div className="flex flex-col gap-6">

      {/* Page header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">Projects</h1>
          <p className="text-sm text-[#6B7280] mt-0.5">Manage your portfolio projects</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#1B6BFF] hover:bg-[#1557CC] text-white text-sm font-semibold rounded-xl transition-colors shadow-sm shadow-blue-200"
        >
          <Plus size={16} />
          New Project
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Total Projects" value={initial.length} color="blue" icon={<FolderKanban size={18} className="text-[#1B6BFF]" />} />
        <StatCard label="Featured" value={featured} color="amber" icon={<Star size={18} className="text-amber-500 fill-amber-500" />} />
        <StatCard label="Categories" value={new Set(initial.map((p) => p.category).filter(Boolean)).size} color="purple" icon={<FolderKanban size={18} className="text-purple-500" />} />
      </div>

      {/* Table card */}
      <div className="bg-white rounded-2xl border border-[#E8ECF4] shadow-sm overflow-hidden">

        {/* Table toolbar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#F1F3F8]">
          <p className="text-sm font-semibold text-[#111827]">All Projects</p>
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="pl-9 pr-4 py-2 text-sm border border-[#E8ECF4] rounded-xl bg-[#F9FAFB] text-[#111827] placeholder-[#9CA3AF] outline-none focus:border-[#1B6BFF] focus:bg-white transition-all w-52"
            />
          </div>
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#F9FAFB] border-b border-[#F1F3F8]">
              <th className="text-left px-6 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Project</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Category</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Tags</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Year</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Featured</th>
              <th className="text-right px-6 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F1F3F8]">
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-16 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#F4F6FB] flex items-center justify-center">
                      <FolderKanban size={22} className="text-[#9CA3AF]" />
                    </div>
                    <p className="text-sm font-medium text-[#374151]">
                      {search ? "No projects match your search" : "No projects yet"}
                    </p>
                    <p className="text-xs text-[#9CA3AF]">
                      {search ? "Try a different keyword" : 'Click "New Project" to add one'}
                    </p>
                  </div>
                </td>
              </tr>
            )}
            {filtered.map((p) => (
              <tr key={p.id} className="hover:bg-[#FAFBFF] transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {p.thumbnail_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.thumbnail_url} alt={p.title} className="w-9 h-9 rounded-lg object-cover border border-[#E8ECF4] shrink-0" />
                    ) : (
                      <div className="w-9 h-9 rounded-lg bg-[#EEF3FF] border border-[#DBEAFE] flex items-center justify-center shrink-0">
                        <FolderKanban size={14} className="text-[#1B6BFF]" />
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-[#111827]">{p.title}</span>
                        {p.live_url && (
                          <a href={p.live_url} target="_blank" rel="noopener noreferrer" className="text-[#9CA3AF] hover:text-[#1B6BFF] transition-colors">
                            <ExternalLink size={11} />
                          </a>
                        )}
                        {p.github_url && (
                          <a href={p.github_url} target="_blank" rel="noopener noreferrer" className="text-[#9CA3AF] hover:text-[#1B6BFF] transition-colors">
                            <GitFork size={11} />
                          </a>
                        )}
                      </div>
                      {p.description && (
                        <p className="text-xs text-[#9CA3AF] mt-0.5 line-clamp-1 max-w-xs">{p.description}</p>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {p.category ? (
                    <span className={`inline-flex px-2.5 py-1 rounded-lg border text-xs font-medium ${CATEGORY_COLORS[p.category] ?? "bg-gray-50 text-gray-600 border-gray-100"}`}>
                      {p.category}
                    </span>
                  ) : (
                    <span className="text-[#D1D5DB]">—</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {p.tags.slice(0, 2).map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded-md bg-[#F4F6FB] border border-[#E8ECF4] text-[#6B7280] text-[10px] font-medium">
                        {t}
                      </span>
                    ))}
                    {p.tags.length > 2 && (
                      <span className="px-2 py-0.5 rounded-md bg-[#F4F6FB] border border-[#E8ECF4] text-[#9CA3AF] text-[10px]">
                        +{p.tags.length - 2}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-[#6B7280]">{p.year ?? "—"}</td>
                <td className="px-6 py-4">
                  {p.featured ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-100 text-amber-600 text-xs font-medium">
                      <Star size={10} className="fill-amber-500" />
                      Featured
                    </span>
                  ) : (
                    <span className="text-[#D1D5DB] text-xs">—</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => openEdit(p)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#6B7280] hover:text-[#1B6BFF] hover:bg-[#EEF3FF] transition-colors"
                    >
                      <Pencil size={13} />
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteId(p.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#6B7280] hover:text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 size={13} />
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length > 0 && (
          <div className="px-6 py-3 border-t border-[#F1F3F8] bg-[#FAFBFF]">
            <p className="text-xs text-[#9CA3AF]">
              Showing {filtered.length} of {initial.length} projects
            </p>
          </div>
        )}
      </div>

      {/* Create / Edit Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#E8ECF4]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#F1F3F8]">
              <div>
                <h2 className="text-base font-bold text-[#111827]">
                  {form.id ? "Edit Project" : "New Project"}
                </h2>
                <p className="text-xs text-[#9CA3AF] mt-0.5">
                  {form.id ? "Update project details" : "Fill in the project details below"}
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-[#9CA3AF] hover:text-[#374151] hover:bg-[#F4F6FB] transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <form ref={formRef} className="px-6 py-5 flex flex-col gap-4 max-h-[65vh] overflow-y-auto">
              <Field label="Title *">
                <input
                  name="title"
                  required
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  className="admin-input"
                  placeholder="My Awesome Project"
                />
              </Field>

              <Field label="Description">
                <textarea
                  name="description"
                  rows={2}
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  className="admin-input resize-none"
                  placeholder="A short description of the project..."
                />
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Category">
                  <select
                    name="category"
                    value={form.category}
                    onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                    className="admin-input"
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
                    className="admin-input"
                    placeholder="2025"
                  />
                </Field>
              </div>

              <Field label="Tags (comma-separated)">
                <input
                  name="tags"
                  value={form.tags}
                  onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
                  className="admin-input"
                  placeholder="React, Node.js, Tailwind CSS"
                />
              </Field>

              <Field label="Thumbnail URL">
                <input
                  name="thumbnail_url"
                  value={form.thumbnail_url}
                  onChange={(e) => setForm((f) => ({ ...f, thumbnail_url: e.target.value }))}
                  className="admin-input"
                  placeholder="https://..."
                />
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Live URL">
                  <input
                    name="live_url"
                    value={form.live_url}
                    onChange={(e) => setForm((f) => ({ ...f, live_url: e.target.value }))}
                    className="admin-input"
                    placeholder="https://myproject.com"
                  />
                </Field>
                <Field label="GitHub URL">
                  <input
                    name="github_url"
                    value={form.github_url}
                    onChange={(e) => setForm((f) => ({ ...f, github_url: e.target.value }))}
                    className="admin-input"
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
                    className="admin-input"
                    placeholder="0"
                  />
                </Field>
                <Field label="Featured">
                  <button
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, featured: !f.featured }))}
                    className={`h-10 px-4 rounded-xl border text-sm font-medium transition-all ${
                      form.featured
                        ? "bg-amber-50 border-amber-200 text-amber-600"
                        : "bg-white border-[#E8ECF4] text-[#6B7280] hover:border-[#CBD5E1]"
                    }`}
                  >
                    {form.featured ? "★ Featured" : "☆ Not featured"}
                  </button>
                </Field>
              </div>
            </form>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#F1F3F8] bg-[#FAFBFF]">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 text-sm font-medium text-[#6B7280] hover:text-[#374151] hover:bg-[#F4F6FB] rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isPending}
                className="flex items-center gap-2 px-5 py-2 bg-[#1B6BFF] hover:bg-[#1557CC] disabled:opacity-50 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm shadow-blue-200"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6 border border-[#E8ECF4]">
            <div className="w-11 h-11 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mb-4">
              <Trash2 size={18} className="text-red-500" />
            </div>
            <h3 className="text-base font-bold text-[#111827] mb-1">Delete project?</h3>
            <p className="text-sm text-[#6B7280] mb-6">This action is permanent and cannot be undone.</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 text-sm font-medium text-[#6B7280] hover:text-[#374151] hover:bg-[#F4F6FB] rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                disabled={isPending}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-xl transition-colors"
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

function StatCard({ label, value, icon }: { label: string; value: number; color: string; icon: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-[#E8ECF4] shadow-sm px-5 py-4 flex items-center gap-4">
      <div className="w-10 h-10 rounded-xl bg-[#F4F6FB] flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold text-[#111827]">{value}</p>
        <p className="text-xs text-[#9CA3AF] mt-0.5">{label}</p>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-[#374151]">{label}</label>
      {children}
    </div>
  );
}
