"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import {
  Plus, Pencil, Trash2, Star, Loader2, TrendingUp, Search, BarChart3,
} from "lucide-react";
import { deleteCaseStudy, type CaseStudyRow } from "./actions";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function CaseStudiesAdmin({ initial }: { initial: CaseStudyRow[] }) {
  const [isPending, startTransition] = useTransition();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const filtered = initial.filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.client.toLowerCase().includes(search.toLowerCase()) ||
      (c.industry ?? "").toLowerCase().includes(search.toLowerCase())
  );

  const featured = initial.filter((c) => c.featured).length;

  function handleDelete(id: string) {
    const fd = new FormData();
    fd.set("id", id);
    startTransition(async () => {
      await deleteCaseStudy(fd);
      setDeleteId(null);
    });
  }

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">Case Studies</h1>
          <p className="text-sm text-[#6B7280] mt-0.5">Document and manage client success stories</p>
        </div>
        <Link
          href="/admin/case-studies/new"
          className="flex items-center gap-2 px-4 py-2.5 bg-[#1B6BFF] hover:bg-[#1557CC] text-white text-sm font-semibold rounded-xl transition-colors shadow-sm shadow-blue-200"
        >
          <Plus size={16} />
          New Case Study
        </Link>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Total" value={initial.length} icon={<BarChart3 size={18} className="text-[#1B6BFF]" />} />
        <StatCard label="Featured" value={featured} icon={<Star size={18} className="text-amber-500 fill-amber-500" />} />
        <StatCard label="Industries" value={new Set(initial.map((c) => c.industry).filter(Boolean)).size} icon={<TrendingUp size={18} className="text-purple-500" />} />
      </div>

      {/* Table card */}
      <div className="bg-white rounded-2xl border border-[#E8ECF4] shadow-sm overflow-hidden">

        {/* Toolbar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#F1F3F8]">
          <p className="text-sm font-semibold text-[#111827]">All Case Studies</p>
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
              <th className="text-left px-6 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Case Study</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Industry</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Metric</th>
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
                      <BarChart3 size={22} className="text-[#9CA3AF]" />
                    </div>
                    <p className="text-sm font-medium text-[#374151]">
                      {search ? "No case studies match your search" : "No case studies yet"}
                    </p>
                    <p className="text-xs text-[#9CA3AF]">
                      {!search && 'Click "New Case Study" to add one'}
                    </p>
                  </div>
                </td>
              </tr>
            )}
            {filtered.map((c) => (
              <tr key={c.id} className="hover:bg-[#FAFBFF] transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {c.cover_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={c.cover_url} alt={c.title} className="w-11 h-11 rounded-xl object-cover border border-[#E8ECF4] shrink-0" />
                    ) : (
                      <div className="w-11 h-11 rounded-xl bg-[#EEF3FF] border border-[#DBEAFE] flex items-center justify-center shrink-0">
                        <BarChart3 size={16} className="text-[#1B6BFF]" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-[#111827] line-clamp-1">{c.title}</span>
                        {c.featured && <Star size={11} className="text-amber-400 fill-amber-400 shrink-0" />}
                      </div>
                      <p className="text-xs text-[#9CA3AF] mt-0.5">{c.client}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {c.industry
                    ? <span className="px-2.5 py-1 rounded-lg bg-[#F4F6FB] border border-[#E8ECF4] text-[#6B7280] text-xs font-medium">{c.industry}</span>
                    : <span className="text-[#D1D5DB]">—</span>
                  }
                </td>
                <td className="px-6 py-4">
                  {c.metric
                    ? <span className="text-sm font-bold text-[#1B6BFF]">{c.metric} <span className="text-[10px] font-normal text-[#9CA3AF]">{c.metric_label}</span></span>
                    : <span className="text-[#D1D5DB]">—</span>
                  }
                </td>
                <td className="px-6 py-4 text-xs text-[#6B7280]">{formatDate(c.created_at)}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link
                      href={`/admin/case-studies/${c.id}/edit`}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#6B7280] hover:text-[#1B6BFF] hover:bg-[#EEF3FF] transition-colors"
                    >
                      <Pencil size={13} /> Edit
                    </Link>
                    <button
                      onClick={() => setDeleteId(c.id)}
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
            <p className="text-xs text-[#9CA3AF]">Showing {filtered.length} of {initial.length} case studies</p>
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
            <h3 className="text-base font-bold text-[#111827] mb-1">Delete case study?</h3>
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

function StatCard({ label, value, icon }: { label: string; value: number; icon: React.ReactNode }) {
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
