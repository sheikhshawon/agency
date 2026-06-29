"use client";

import { useState, useTransition, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import { createCaseStudy, updateCaseStudy, type CaseStudyRow } from "./actions";
import RichTextEditor from "@/components/admin/RichTextEditor";

function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

type FormState = {
  slug: string;
  client: string;
  title: string;
  industry: string;
  challenge: string;
  solution: string;
  outcome: string;
  metric: string;
  metric_label: string;
  cover_url: string;
  body: string;
  featured: boolean;
  order_index: string;
};

function toFormState(c?: CaseStudyRow): FormState {
  return {
    slug: c?.slug ?? "",
    client: c?.client ?? "",
    title: c?.title ?? "",
    industry: c?.industry ?? "",
    challenge: c?.challenge ?? "",
    solution: c?.solution ?? "",
    outcome: c?.outcome ?? "",
    metric: c?.metric ?? "",
    metric_label: c?.metric_label ?? "",
    cover_url: c?.cover_url ?? "",
    body: c?.body ?? "",
    featured: c?.featured ?? false,
    order_index: c ? String(c.order_index) : "0",
  };
}

export default function CaseStudyForm({ initial }: { initial?: CaseStudyRow }) {
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
    fd.set("body", form.body);
    startTransition(async () => {
      if (initial) {
        fd.set("id", initial.id);
        await updateCaseStudy(fd);
      } else {
        await createCaseStudy(fd);
      }
      router.push("/admin/case-studies");
      router.refresh();
    });
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-4xl">

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <Link
            href="/admin/case-studies"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#6B7280] hover:text-[#1B6BFF] mb-2 transition-colors"
          >
            <ArrowLeft size={13} /> Back to Case Studies
          </Link>
          <h1 className="text-2xl font-bold text-[#111827]">{isEdit ? "Edit Case Study" : "New Case Study"}</h1>
          <p className="text-sm text-[#6B7280] mt-0.5">
            {isEdit ? "Update case study details" : "Document a client success story"}
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/admin/case-studies"
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
            {isEdit ? "Save Changes" : "Create Case Study"}
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
              placeholder="How We Scaled Apex's Revenue by 340%"
            />
          </Field>

          <Field label="Slug">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] text-sm">/case-studies/</span>
              <input
                name="slug"
                required
                value={form.slug}
                onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                className="admin-input pl-28"
                placeholder="apex-retail"
              />
            </div>
          </Field>

          <Field label="Challenge">
            <textarea
              name="challenge"
              rows={2}
              value={form.challenge}
              onChange={(e) => setForm((f) => ({ ...f, challenge: e.target.value }))}
              className="admin-input resize-none"
              placeholder="What problem was the client facing?"
            />
          </Field>

          <Field label="Solution">
            <textarea
              name="solution"
              rows={2}
              value={form.solution}
              onChange={(e) => setForm((f) => ({ ...f, solution: e.target.value }))}
              className="admin-input resize-none"
              placeholder="What did we build or do?"
            />
          </Field>

          <Field label="Outcome">
            <textarea
              name="outcome"
              rows={2}
              value={form.outcome}
              onChange={(e) => setForm((f) => ({ ...f, outcome: e.target.value }))}
              className="admin-input resize-none"
              placeholder="What were the measurable results?"
            />
          </Field>

          <Field label="Full Story (detail page body)">
            <RichTextEditor
              name="body"
              value={form.body}
              onChange={(body) => setForm((f) => ({ ...f, body }))}
              rows={12}
              placeholder="Tell the full story. Use the toolbar for headings, bullet points and lists..."
            />
          </Field>
        </div>

        {/* Sidebar column */}
        <div className="flex flex-col gap-4">

          {/* Highlight metric */}
          <div className="bg-white rounded-2xl border border-[#E8ECF4] shadow-sm p-5 flex flex-col gap-4">
            <p className="text-sm font-bold text-[#111827]">Headline Metric</p>
            <Field label="Metric">
              <input
                name="metric"
                value={form.metric}
                onChange={(e) => setForm((f) => ({ ...f, metric: e.target.value }))}
                className="admin-input"
                placeholder="340%"
              />
            </Field>
            <Field label="Metric Label">
              <input
                name="metric_label"
                value={form.metric_label}
                onChange={(e) => setForm((f) => ({ ...f, metric_label: e.target.value }))}
                className="admin-input"
                placeholder="Revenue Growth"
              />
            </Field>
          </div>

          {/* Details */}
          <div className="bg-white rounded-2xl border border-[#E8ECF4] shadow-sm p-5 flex flex-col gap-4">
            <p className="text-sm font-bold text-[#111827]">Details</p>
            <Field label="Client *">
              <input
                name="client"
                required
                value={form.client}
                onChange={(e) => setForm((f) => ({ ...f, client: e.target.value }))}
                className="admin-input"
                placeholder="Apex Retail Group"
              />
            </Field>
            <Field label="Industry">
              <input
                name="industry"
                value={form.industry}
                onChange={(e) => setForm((f) => ({ ...f, industry: e.target.value }))}
                className="admin-input"
                placeholder="E-Commerce"
              />
            </Field>
            <Field label="Cover Image URL">
              <input
                name="cover_url"
                value={form.cover_url}
                onChange={(e) => setForm((f) => ({ ...f, cover_url: e.target.value }))}
                className="admin-input"
                placeholder="https://..."
              />
            </Field>
          </div>

          {/* Visibility */}
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
