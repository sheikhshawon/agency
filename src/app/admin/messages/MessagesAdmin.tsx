"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Inbox, Mail, MailOpen, Phone, Building2, Tag, Trash2, X,
  Loader2, CheckCheck, Clock, Search,
} from "lucide-react";
import {
  setMessageRead, markAllRead, deleteMessage, type ContactMessageRow,
} from "./actions";

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit",
  });
}
function isThisMonth(iso: string) {
  const d = new Date(iso), now = new Date();
  return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
}

export default function MessagesAdmin({ initial }: { initial: ContactMessageRow[] }) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<ContactMessageRow | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const unread = initial.filter((m) => !m.is_read).length;
  const thisMonth = initial.filter((m) => isThisMonth(m.created_at)).length;

  const filtered = initial.filter((m) => {
    const q = search.toLowerCase();
    return (
      m.full_name.toLowerCase().includes(q) ||
      m.email.toLowerCase().includes(q) ||
      (m.phone ?? "").toLowerCase().includes(q) ||
      (m.company ?? "").toLowerCase().includes(q) ||
      (m.service ?? "").toLowerCase().includes(q) ||
      m.message.toLowerCase().includes(q)
    );
  });

  function openMessage(m: ContactMessageRow) {
    setSelected(m);
    if (!m.is_read) {
      const fd = new FormData();
      fd.set("id", m.id);
      fd.set("is_read", "true");
      startTransition(async () => {
        await setMessageRead(fd);
        router.refresh();
      });
    }
  }

  function toggleRead(m: ContactMessageRow) {
    const fd = new FormData();
    fd.set("id", m.id);
    fd.set("is_read", String(!m.is_read));
    startTransition(async () => {
      await setMessageRead(fd);
      router.refresh();
      setSelected((s) => (s && s.id === m.id ? { ...s, is_read: !m.is_read } : s));
    });
  }

  function handleMarkAll() {
    startTransition(async () => {
      await markAllRead();
      router.refresh();
    });
  }

  function handleDelete(id: string) {
    const fd = new FormData();
    fd.set("id", id);
    startTransition(async () => {
      await deleteMessage(fd);
      router.refresh();
      setDeleteId(null);
      setSelected((s) => (s && s.id === id ? null : s));
    });
  }

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">Messages</h1>
          <p className="text-sm text-[#6B7280] mt-0.5">Inquiries submitted through the contact form</p>
        </div>
        <button
          onClick={handleMarkAll}
          disabled={isPending || unread === 0}
          className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#E8ECF4] text-[#374151] text-sm font-medium rounded-xl hover:bg-[#F4F6FB] disabled:opacity-50 transition-colors shadow-sm"
        >
          <CheckCheck size={15} /> Mark all read
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-3 gap-4 max-w-2xl">
        <StatCard icon={<Inbox size={18} className="text-[#1B6BFF]" />} bg="bg-blue-50" value={initial.length} label="Total Messages" />
        <StatCard icon={<Mail size={18} className="text-red-500" />} bg="bg-red-50" value={unread} label="Unread" />
        <StatCard icon={<Clock size={18} className="text-green-500" />} bg="bg-green-50" value={thisMonth} label="This Month" />
      </div>

      {/* List card */}
      <div className="bg-white rounded-2xl border border-[#E8ECF4] shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#F1F3F8] gap-4 flex-wrap">
          <p className="text-sm font-bold text-[#111827]">All Messages</p>
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search messages..."
              className="pl-9 pr-4 py-2 text-sm border border-[#E8ECF4] rounded-xl bg-[#F9FAFB] text-[#111827] placeholder-[#9CA3AF] outline-none focus:border-[#1B6BFF] focus:bg-white transition-all w-56"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-16 px-6">
            <div className="w-12 h-12 rounded-2xl bg-[#F4F6FB] flex items-center justify-center">
              <Inbox size={22} className="text-[#9CA3AF]" />
            </div>
            <p className="text-sm font-medium text-[#374151]">
              {search ? "No messages match your search" : "No messages yet"}
            </p>
            <p className="text-xs text-[#9CA3AF]">
              {!search && "Submissions from the contact form will appear here"}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#F1F3F8]">
            {filtered.map((m) => (
              <button
                key={m.id}
                onClick={() => openMessage(m)}
                className={`w-full text-left flex items-start gap-4 px-6 py-4 hover:bg-[#FAFBFF] transition-colors group ${
                  !m.is_read ? "bg-[#FAFBFF]" : ""
                }`}
              >
                {/* Unread indicator / avatar */}
                <div className="relative shrink-0">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    m.is_read ? "bg-[#F4F6FB] border border-[#E8ECF4]" : "bg-[#EEF3FF] border border-[#DBEAFE]"
                  }`}>
                    {m.is_read
                      ? <MailOpen size={16} className="text-[#9CA3AF]" />
                      : <Mail size={16} className="text-[#1B6BFF]" />}
                  </div>
                  {!m.is_read && <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-500 border-2 border-white" />}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className={`text-sm truncate ${!m.is_read ? "font-bold text-[#111827]" : "font-medium text-[#374151]"}`}>
                      {m.full_name}
                    </p>
                    {m.service && (
                      <span className="hidden sm:inline-flex px-2 py-0.5 rounded-md bg-blue-50 text-blue-600 border border-blue-100 text-[10px] font-medium shrink-0">
                        {m.service}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#9CA3AF] mt-0.5 truncate">{m.message}</p>
                </div>

                {/* Meta */}
                <div className="text-right shrink-0 hidden sm:block">
                  <p className="text-[11px] text-[#9CA3AF]">{formatDate(m.created_at)}</p>
                  {m.phone && <p className="text-[11px] text-[#1B6BFF] mt-0.5">{m.phone}</p>}
                </div>
              </button>
            ))}
          </div>
        )}

        {filtered.length > 0 && (
          <div className="px-6 py-3 border-t border-[#F1F3F8] bg-[#FAFBFF]">
            <p className="text-xs text-[#9CA3AF]">Showing {filtered.length} of {initial.length} messages</p>
          </div>
        )}
      </div>

      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm" onClick={() => setSelected(null)}>
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#E8ECF4] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            {/* Modal header */}
            <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-[#F1F3F8]">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-11 h-11 rounded-xl bg-[#EEF3FF] border border-[#DBEAFE] flex items-center justify-center shrink-0">
                  <span className="text-[#1B6BFF] font-bold text-sm">
                    {selected.full_name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-base font-bold text-[#111827] truncate">{selected.full_name}</p>
                  <p className="text-xs text-[#9CA3AF]">{formatDate(selected.created_at)}</p>
                </div>
              </div>
              <button onClick={() => setSelected(null)} className="w-8 h-8 flex items-center justify-center rounded-lg text-[#9CA3AF] hover:text-[#374151] hover:bg-[#F4F6FB] transition-colors shrink-0">
                <X size={16} />
              </button>
            </div>

            {/* Modal body */}
            <div className="px-6 py-5 flex flex-col gap-4">
              <DetailRow icon={<Mail size={15} className="text-[#1B6BFF]" />} label="Email">
                <a href={`mailto:${selected.email}`} className="text-[#1B6BFF] hover:underline">{selected.email}</a>
              </DetailRow>
              {selected.phone && (
                <DetailRow icon={<Phone size={15} className="text-[#1B6BFF]" />} label="Phone">
                  <a href={`tel:${selected.phone}`} className="text-[#1B6BFF] hover:underline">{selected.phone}</a>
                </DetailRow>
              )}
              {selected.company && (
                <DetailRow icon={<Building2 size={15} className="text-[#1B6BFF]" />} label="Company">
                  {selected.company}
                </DetailRow>
              )}
              {selected.service && (
                <DetailRow icon={<Tag size={15} className="text-[#1B6BFF]" />} label="Service">
                  {selected.service}
                </DetailRow>
              )}
              <div className="flex flex-col gap-1.5 pt-1">
                <p className="text-xs font-semibold text-[#374151]">Message</p>
                <p className="text-sm text-[#4B5563] leading-relaxed whitespace-pre-wrap bg-[#F9FAFB] border border-[#F1F3F8] rounded-xl p-4">
                  {selected.message}
                </p>
              </div>
            </div>

            {/* Modal actions */}
            <div className="flex items-center justify-between gap-3 px-6 py-4 border-t border-[#F1F3F8] bg-[#FAFBFF]">
              <button
                onClick={() => setDeleteId(selected.id)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-[#6B7280] hover:text-red-500 hover:bg-red-50 transition-colors"
              >
                <Trash2 size={14} /> Delete
              </button>
              <button
                onClick={() => toggleRead(selected)}
                disabled={isPending}
                className="flex items-center gap-2 px-4 py-2 bg-[#1B6BFF] hover:bg-[#1557CC] disabled:opacity-50 text-white text-sm font-semibold rounded-xl transition-colors"
              >
                {isPending ? <Loader2 size={14} className="animate-spin" /> : (selected.is_read ? <Mail size={14} /> : <MailOpen size={14} />)}
                Mark as {selected.is_read ? "unread" : "read"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteId && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6 border border-[#E8ECF4]">
            <div className="w-11 h-11 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mb-4">
              <Trash2 size={18} className="text-red-500" />
            </div>
            <h3 className="text-base font-bold text-[#111827] mb-1">Delete message?</h3>
            <p className="text-sm text-[#6B7280] mb-6">This will permanently remove this inquiry.</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setDeleteId(null)} className="px-4 py-2 text-sm font-medium text-[#6B7280] hover:text-[#374151] hover:bg-[#F4F6FB] rounded-xl transition-colors">
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

function StatCard({ icon, bg, value, label }: { icon: React.ReactNode; bg: string; value: number; label: string }) {
  return (
    <div className="bg-white rounded-2xl border border-[#E8ECF4] shadow-sm px-5 py-4 flex items-center gap-4">
      <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center shrink-0`}>{icon}</div>
      <div>
        <p className="text-2xl font-bold text-[#111827]">{value}</p>
        <p className="text-xs text-[#9CA3AF]">{label}</p>
      </div>
    </div>
  );
}

function DetailRow({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg bg-[#F4F6FB] flex items-center justify-center shrink-0">{icon}</div>
      <div className="min-w-0">
        <p className="text-[11px] text-[#9CA3AF]">{label}</p>
        <p className="text-sm font-medium text-[#111827] truncate">{children}</p>
      </div>
    </div>
  );
}
