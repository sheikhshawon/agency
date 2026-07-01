"use client";

import { useState, useTransition, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import { createBlog, updateBlog, type BlogRow } from "./actions";
import RichTextEditor from "@/components/admin/RichTextEditor";

const CATEGORIES = ["Development", "Design", "AI & Automation", "Business Solutions", "Marketing", "Career"];

function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

type FormState = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_url: string;
  category: string;
  tags: string;
  author: string;
  status: "draft" | "published";
  featured: boolean;
  read_time: string;
};

function toFormState(b?: BlogRow): FormState {
  return {
    title: b?.title ?? "",
    slug: b?.slug ?? "",
    excerpt: b?.excerpt ?? "",
    content: b?.content ?? "",
    cover_url: b?.cover_url ?? "",
    category: b?.category ?? "",
    tags: b?.tags.join(", ") ?? "",
    author: b?.author ?? "Enif IT Team",
    status: b?.status ?? "draft",
    featured: b?.featured ?? false,
    read_time: b?.read_time ?? "",
  };
}

export default function BlogForm({ initial }: { initial?: BlogRow }) {
  const router = useRouter();
  const isEdit = Boolean(initial);
  const [form, setForm] = useState<FormState>(toFormState(initial));
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  function handleTitleChange(title: string) {
    setForm((f) => ({ ...f, title, slug: isEdit ? f.slug : slugify(title) }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const fd = new FormData(formRef.current!);
    fd.set("featured", String(form.featured));
    fd.set("status", form.status);
    fd.set("content", form.content);
    startTransition(async () => {
      if (initial) {
        fd.set("id", initial.id);
        await updateBlog(fd);
      } else {
        await createBlog(fd);
      }
      router.push("/admin/blog");
      router.refresh();
    });
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <Link
            href="/admin/blog"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#6B7280] hover:text-[#1B6BFF] mb-2 transition-colors"
          >
            <ArrowLeft size={13} /> Back to Blog
          </Link>
          <h1 className="text-2xl font-bold text-[#111827]">{isEdit ? "Edit Post" : "New Blog Post"}</h1>
          <p className="text-sm text-[#6B7280] mt-0.5">
            {isEdit ? "Update article details" : "Write and publish a new article"}
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/admin/blog"
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
            {isEdit ? "Save Changes" : form.status === "published" ? "Publish Post" : "Save Draft"}
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
              onChange={(e) => handleTitleChange(e.target.value)}
              className="admin-input"
              placeholder="My Awesome Article"
            />
          </Field>

          <Field label="Slug">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] text-sm">/blog/</span>
              <input
                name="slug"
                required
                value={form.slug}
                onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                className="admin-input pl-14"
                placeholder="my-awesome-article"
              />
            </div>
          </Field>

          <Field label="Excerpt">
            <textarea
              name="excerpt"
              rows={2}
              value={form.excerpt}
              onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
              className="admin-input resize-none"
              placeholder="A short summary shown on the blog listing page..."
            />
          </Field>

          <Field label="Content">
            <RichTextEditor
              name="content"
              value={form.content}
              onChange={(content) => setForm((f) => ({ ...f, content }))}
              placeholder="Write your article here. Use the toolbar to add headings, bullet points, lists and more..."
            />
          </Field>
        </div>

        {/* Sidebar column */}
        <div className="flex flex-col gap-4">

          {/* Publish */}
          <div className="bg-white rounded-2xl border border-[#E8ECF4] shadow-sm p-5 flex flex-col gap-4">
            <p className="text-sm font-bold text-[#111827]">Publish</p>
            <Field label="Status">
              <div className="flex gap-2">
                {(["draft", "published"] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, status: s }))}
                    className={`flex-1 h-10 rounded-xl border text-sm font-medium transition-all capitalize ${
                      form.status === s
                        ? s === "published"
                          ? "bg-green-50 border-green-200 text-green-600"
                          : "bg-amber-50 border-amber-200 text-amber-600"
                        : "bg-white border-[#E8ECF4] text-[#6B7280] hover:border-[#CBD5E1]"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
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

          {/* Details */}
          <div className="bg-white rounded-2xl border border-[#E8ECF4] shadow-sm p-5 flex flex-col gap-4">
            <p className="text-sm font-bold text-[#111827]">Details</p>
            <Field label="Cover Image URL">
              <input
                name="cover_url"
                value={form.cover_url}
                onChange={(e) => setForm((f) => ({ ...f, cover_url: e.target.value }))}
                className="admin-input"
                placeholder="https://..."
              />
            </Field>
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
            <Field label="Read Time">
              <input
                name="read_time"
                value={form.read_time}
                onChange={(e) => setForm((f) => ({ ...f, read_time: e.target.value }))}
                className="admin-input"
                placeholder="5 min read"
              />
            </Field>
            <Field label="Tags (comma-separated)">
              <input
                name="tags"
                value={form.tags}
                onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
                className="admin-input"
                placeholder="Next.js, TypeScript"
              />
            </Field>
            <Field label="Author">
              <input
                name="author"
                value={form.author}
                onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
                className="admin-input"
                placeholder="Enif IT Team"
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
