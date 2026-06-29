"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import {
  Plus, Pencil, Trash2, Star, Loader2,
  FileText, Search, Eye, EyeOff, Clock,
} from "lucide-react";
import { deleteBlog, type BlogRow } from "./actions";

const STATUS_STYLES = {
  published: "bg-green-50 text-green-600 border-green-100",
  draft:     "bg-amber-50 text-amber-600 border-amber-100",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function BlogAdmin({ initial }: { initial: BlogRow[] }) {
  const [isPending, startTransition] = useTransition();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");

  const filtered = initial.filter((b) => {
    const matchSearch = b.title.toLowerCase().includes(search.toLowerCase()) ||
      (b.category ?? "").toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || b.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const published = initial.filter((b) => b.status === "published").length;
  const drafts = initial.filter((b) => b.status === "draft").length;

  function handleDelete(id: string) {
    const fd = new FormData();
    fd.set("id", id);
    startTransition(async () => { await deleteBlog(fd); setDeleteId(null); });
  }

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">Blog</h1>
          <p className="text-sm text-[#6B7280] mt-0.5">Write and publish articles</p>
        </div>
        <Link
          href="/admin/blog/new"
          className="flex items-center gap-2 px-4 py-2.5 bg-[#1B6BFF] hover:bg-[#1557CC] text-white text-sm font-semibold rounded-xl transition-colors shadow-sm shadow-blue-200"
        >
          <Plus size={16} />
          New Post
        </Link>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-[#E8ECF4] shadow-sm px-5 py-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
            <FileText size={18} className="text-[#1B6BFF]" />
          </div>
          <div>
            <p className="text-2xl font-bold text-[#111827]">{initial.length}</p>
            <p className="text-xs text-[#9CA3AF]">Total Posts</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-[#E8ECF4] shadow-sm px-5 py-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
            <Eye size={18} className="text-green-500" />
          </div>
          <div>
            <p className="text-2xl font-bold text-[#111827]">{published}</p>
            <p className="text-xs text-[#9CA3AF]">Published</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-[#E8ECF4] shadow-sm px-5 py-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
            <EyeOff size={18} className="text-amber-500" />
          </div>
          <div>
            <p className="text-2xl font-bold text-[#111827]">{drafts}</p>
            <p className="text-xs text-[#9CA3AF]">Drafts</p>
          </div>
        </div>
      </div>

      {/* Table card */}
      <div className="bg-white rounded-2xl border border-[#E8ECF4] shadow-sm overflow-hidden">

        {/* Toolbar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#F1F3F8] gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            {(["all", "published", "draft"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors capitalize ${
                  statusFilter === s
                    ? "bg-[#EEF3FF] text-[#1B6BFF]"
                    : "text-[#6B7280] hover:bg-[#F4F6FB]"
                }`}
              >
                {s === "all" ? `All (${initial.length})` : s === "published" ? `Published (${published})` : `Drafts (${drafts})`}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search posts..."
              className="pl-9 pr-4 py-2 text-sm border border-[#E8ECF4] rounded-xl bg-[#F9FAFB] text-[#111827] placeholder-[#9CA3AF] outline-none focus:border-[#1B6BFF] focus:bg-white transition-all w-52"
            />
          </div>
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#F9FAFB] border-b border-[#F1F3F8]">
              <th className="text-left px-6 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Post</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Category</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Status</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Date</th>
              <th className="text-right px-6 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F1F3F8]">
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-16 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#F4F6FB] flex items-center justify-center">
                      <FileText size={22} className="text-[#9CA3AF]" />
                    </div>
                    <p className="text-sm font-medium text-[#374151]">
                      {search ? "No posts match your search" : "No posts yet"}
                    </p>
                    <p className="text-xs text-[#9CA3AF]">
                      {!search && 'Click "New Post" to write your first article'}
                    </p>
                  </div>
                </td>
              </tr>
            )}
            {filtered.map((b) => (
              <tr key={b.id} className="hover:bg-[#FAFBFF] transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {b.cover_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={b.cover_url} alt={b.title} className="w-11 h-11 rounded-xl object-cover border border-[#E8ECF4] shrink-0" />
                    ) : (
                      <div className="w-11 h-11 rounded-xl bg-[#EEF3FF] border border-[#DBEAFE] flex items-center justify-center shrink-0">
                        <FileText size={16} className="text-[#1B6BFF]" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-[#111827] line-clamp-1">{b.title}</span>
                        {b.featured && <Star size={11} className="text-amber-400 fill-amber-400 shrink-0" />}
                      </div>
                      <p className="text-xs text-[#9CA3AF] mt-0.5 font-mono">/{b.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {b.category
                    ? <span className="px-2.5 py-1 rounded-lg bg-[#F4F6FB] border border-[#E8ECF4] text-[#6B7280] text-xs font-medium">{b.category}</span>
                    : <span className="text-[#D1D5DB]">—</span>
                  }
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-semibold ${STATUS_STYLES[b.status]}`}>
                    {b.status === "published" ? <Eye size={10} /> : <EyeOff size={10} />}
                    {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1 text-xs text-[#6B7280]">
                    <Clock size={11} className="text-[#9CA3AF]" />
                    {b.read_time && <span className="mr-1">{b.read_time} ·</span>}
                    {formatDate(b.published_at ?? b.created_at)}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link
                      href={`/admin/blog/${b.id}/edit`}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#6B7280] hover:text-[#1B6BFF] hover:bg-[#EEF3FF] transition-colors"
                    >
                      <Pencil size={13} /> Edit
                    </Link>
                    <button
                      onClick={() => setDeleteId(b.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#6B7280] hover:text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 size={13} /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length > 0 && (
          <div className="px-6 py-3 border-t border-[#F1F3F8] bg-[#FAFBFF]">
            <p className="text-xs text-[#9CA3AF]">Showing {filtered.length} of {initial.length} posts</p>
          </div>
        )}
      </div>

      {/* Delete Confirmation */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6 border border-[#E8ECF4]">
            <div className="w-11 h-11 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mb-4">
              <Trash2 size={18} className="text-red-500" />
            </div>
            <h3 className="text-base font-bold text-[#111827] mb-1">Delete post?</h3>
            <p className="text-sm text-[#6B7280] mb-6">This will permanently remove the article.</p>
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
