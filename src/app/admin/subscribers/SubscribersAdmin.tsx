"use client";

import { useState, useTransition } from "react";
import {
  Mail, Trash2, Search, Loader2, Download, Users, CalendarDays,
} from "lucide-react";
import { deleteSubscriber, type SubscriberRow } from "./actions";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function isThisMonth(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
}

export default function SubscribersAdmin({ initial }: { initial: SubscriberRow[] }) {
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const filtered = initial.filter((s) =>
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  const thisMonth = initial.filter((s) => isThisMonth(s.created_at)).length;

  function handleDelete(id: string) {
    const fd = new FormData();
    fd.set("id", id);
    startTransition(async () => {
      await deleteSubscriber(fd);
      setDeleteId(null);
    });
  }

  function exportCsv() {
    const rows = [["Email", "Subscribed"], ...initial.map((s) => [s.email, s.created_at])];
    const csv = rows.map((r) => r.map((c) => `"${c.replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `subscribers-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">Subscribers</h1>
          <p className="text-sm text-[#6B7280] mt-0.5">People who signed up via the website footer</p>
        </div>
        <button
          onClick={exportCsv}
          disabled={initial.length === 0}
          className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#E8ECF4] text-[#374151] text-sm font-medium rounded-xl hover:bg-[#F4F6FB] disabled:opacity-50 transition-colors shadow-sm"
        >
          <Download size={15} />
          Export CSV
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 max-w-md">
        <div className="bg-white rounded-2xl border border-[#E8ECF4] shadow-sm px-5 py-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
            <Users size={18} className="text-[#1B6BFF]" />
          </div>
          <div>
            <p className="text-2xl font-bold text-[#111827]">{initial.length}</p>
            <p className="text-xs text-[#9CA3AF]">Total Subscribers</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-[#E8ECF4] shadow-sm px-5 py-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
            <CalendarDays size={18} className="text-green-500" />
          </div>
          <div>
            <p className="text-2xl font-bold text-[#111827]">{thisMonth}</p>
            <p className="text-xs text-[#9CA3AF]">This Month</p>
          </div>
        </div>
      </div>

      {/* Table card */}
      <div className="bg-white rounded-2xl border border-[#E8ECF4] shadow-sm overflow-hidden">

        {/* Toolbar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#F1F3F8] gap-4 flex-wrap">
          <p className="text-sm font-bold text-[#111827]">All Subscribers</p>
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by email..."
              className="pl-9 pr-4 py-2 text-sm border border-[#E8ECF4] rounded-xl bg-[#F9FAFB] text-[#111827] placeholder-[#9CA3AF] outline-none focus:border-[#1B6BFF] focus:bg-white transition-all w-56"
            />
          </div>
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#F9FAFB] border-b border-[#F1F3F8]">
              <th className="text-left px-6 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Email</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Subscribed</th>
              <th className="text-right px-6 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F1F3F8]">
            {filtered.length === 0 && (
              <tr>
                <td colSpan={3} className="px-6 py-16 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#F4F6FB] flex items-center justify-center">
                      <Mail size={22} className="text-[#9CA3AF]" />
                    </div>
                    <p className="text-sm font-medium text-[#374151]">
                      {search ? "No subscribers match your search" : "No subscribers yet"}
                    </p>
                    <p className="text-xs text-[#9CA3AF]">
                      {!search && "Emails captured from the website footer will appear here"}
                    </p>
                  </div>
                </td>
              </tr>
            )}
            {filtered.map((s) => (
              <tr key={s.id} className="hover:bg-[#FAFBFF] transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#EEF3FF] border border-[#DBEAFE] flex items-center justify-center shrink-0">
                      <Mail size={15} className="text-[#1B6BFF]" />
                    </div>
                    <span className="font-medium text-[#111827]">{s.email}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-[#6B7280]">{formatDate(s.created_at)}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => setDeleteId(s.id)}
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
            <p className="text-xs text-[#9CA3AF]">Showing {filtered.length} of {initial.length} subscribers</p>
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
            <h3 className="text-base font-bold text-[#111827] mb-1">Remove subscriber?</h3>
            <p className="text-sm text-[#6B7280] mb-6">This will permanently remove this email from your list.</p>
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
