"use client";

import { useState, useTransition, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import { createProject, updateProject, type ProjectRow } from "./actions";
import RichTextEditor from "@/components/admin/RichTextEditor";

const CATEGORIES = [
  "Web Development",
  "Business Solutions",
  "Marketing & Growth",
  "AI & Automation",
  "Brand & Design",
];

type FormState = {
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

function toFormState(p?: ProjectRow): FormState {
  return {
    title: p?.title ?? "",
    description: p?.description ?? "",
    category: p?.category ?? "",
    thumbnail_url: p?.thumbnail_url ?? "",
    tags: p?.tags.join(", ") ?? "",
    live_url: p?.live_url ?? "",
    github_url: p?.github_url ?? "",
    year: p?.year ?? String(new Date().getFullYear()),
    featured: p?.featured ?? false,
    order_index: p ? String(p.order_index) : "0",
  };
}

export default function ProjectForm({ initial }: { initial?: ProjectRow }) {
  const router = useRouter();
  const isEdit = Boolean(initial);
  const [form, setForm] = useState<FormState>(toFormState(initial));
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const fd = new FormData(formRef.current!);
    fd.set("featured", String(form.featured));
    fd.set("description", form.description);
    startTransition(async () => {
      if (initial) {
        fd.set("id", initial.id);
        await updateProject(fd);
      } else {
        await createProject(fd);
      }
      router.push("/admin/projects");
      router.refresh();
    });
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-4xl">

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <Link
            href="/admin/projects"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#6B7280] hover:text-[#1B6BFF] mb-2 transition-colors"
          >
            <ArrowLeft size={13} /> Back to Projects
          </Link>
          <h1 className="text-2xl font-bold text-[#111827]">{isEdit ? "Edit Project" : "New Project"}</h1>
          <p className="text-sm text-[#6B7280] mt-0.5">
            {isEdit ? "Update project details" : "Fill in the project details below"}
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/admin/projects"
            className="px-4 py-2.5 text-sm font-medium text-[#6B7280] hover:text-[#374151] hover:bg-[#F4F6FB] rounded-xl transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isPending}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#1B6BFF] hover:bg-[#1557CC] disabled:opacity-50 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm shadow-blue-200"
          >
            {isPending && <Loader2 size={14} className="animate-spin" />}
            {isEdit ? "Save Changes" : "Create Project"}
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_300px] gap-6 items-start">

        {/* Main column */}
        <div className="flex flex-col gap-4 bg-white rounded-2xl border border-[#E8ECF4] shadow-sm p-6">
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
            <RichTextEditor
              name="description"
              value={form.description}
              onChange={(description) => setForm((f) => ({ ...f, description }))}
              rows={10}
              placeholder="Describe the project. Use the toolbar to add headings, bullet points and lists..."
            />
          </Field>

          <Field label="Tags (comma-separated)">
            <input
              name="tags"
              value={form.tags}
              onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
              className="admin-input"
              placeholder="React, Node.js, Tailwind CSS"
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
        </div>

        {/* Sidebar column */}
        <div className="flex flex-col gap-4">

          {/* Publish */}
          <div className="bg-white rounded-2xl border border-[#E8ECF4] shadow-sm p-5 flex flex-col gap-4">
            <p className="text-sm font-bold text-[#111827]">Visibility</p>
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
          </div>

          {/* Details */}
          <div className="bg-white rounded-2xl border border-[#E8ECF4] shadow-sm p-5 flex flex-col gap-4">
            <p className="text-sm font-bold text-[#111827]">Details</p>
            <Field label="Category">
              <select
                name="category"
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                className="admin-input"
              >
                <option value="">Select category</option>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
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
            <Field label="Thumbnail URL">
              <input
                name="thumbnail_url"
                value={form.thumbnail_url}
                onChange={(e) => setForm((f) => ({ ...f, thumbnail_url: e.target.value }))}
                className="admin-input"
                placeholder="https://..."
              />
            </Field>
          </div>
        </div>
      </div>
    </form>
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
