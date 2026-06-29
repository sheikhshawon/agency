"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Users, UserPlus, Shield, Trash2, Mail, Loader2, X, Search,
  Check, AlertCircle, Eye, EyeOff,
} from "lucide-react";
import { createAdminUser, deleteAdminUser, type AdminUserRow } from "./actions";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function UsersAdmin({ initial }: { initial: AdminUserRow[] }) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<AdminUserRow | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const filtered = initial.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  function handleDelete(id: string) {
    const fd = new FormData();
    fd.set("id", id);
    startTransition(async () => {
      const res = await deleteAdminUser(fd);
      if (res.success) {
        setDeleteTarget(null);
        router.refresh();
      } else {
        setError(res.message);
        setDeleteTarget(null);
      }
    });
  }

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">Users</h1>
          <p className="text-sm text-[#6B7280] mt-0.5">Admins who can access this dashboard</p>
        </div>
        <button
          onClick={() => { setError(null); setShowCreate(true); }}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#1B6BFF] hover:bg-[#1557CC] text-white text-sm font-semibold rounded-xl transition-colors shadow-sm shadow-blue-200"
        >
          <UserPlus size={15} /> Add Admin
        </button>
      </div>

      {/* Error banner */}
      {error && (
        <div className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-sm font-medium border bg-red-50 border-red-100 text-red-600">
          <span className="flex items-center gap-2"><AlertCircle size={16} /> {error}</span>
          <button onClick={() => setError(null)} className="text-red-400 hover:text-red-600"><X size={15} /></button>
        </div>
      )}

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 max-w-md">
        <div className="bg-white rounded-2xl border border-[#E8ECF4] shadow-sm px-5 py-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
            <Users size={18} className="text-[#1B6BFF]" />
          </div>
          <div>
            <p className="text-2xl font-bold text-[#111827]">{initial.length}</p>
            <p className="text-xs text-[#9CA3AF]">Total Admins</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-[#E8ECF4] shadow-sm px-5 py-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
            <Shield size={18} className="text-green-500" />
          </div>
          <div>
            <p className="text-2xl font-bold text-[#111827]">Full</p>
            <p className="text-xs text-[#9CA3AF]">Access Level</p>
          </div>
        </div>
      </div>

      {/* Table card */}
      <div className="bg-white rounded-2xl border border-[#E8ECF4] shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#F1F3F8] gap-4 flex-wrap">
          <p className="text-sm font-bold text-[#111827]">All Admins</p>
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or email..."
              className="pl-9 pr-4 py-2 text-sm border border-[#E8ECF4] rounded-xl bg-[#F9FAFB] text-[#111827] placeholder-[#9CA3AF] outline-none focus:border-[#1B6BFF] focus:bg-white transition-all w-64"
            />
          </div>
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#F9FAFB] border-b border-[#F1F3F8]">
              <th className="text-left px-6 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Name</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Role</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Added</th>
              <th className="text-right px-6 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F1F3F8]">
            {filtered.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-16 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#F4F6FB] flex items-center justify-center">
                      <Users size={22} className="text-[#9CA3AF]" />
                    </div>
                    <p className="text-sm font-medium text-[#374151]">
                      {search ? "No admins match your search" : "No admins yet"}
                    </p>
                    {!search && (
                      <button onClick={() => { setError(null); setShowCreate(true); }} className="text-xs text-[#1B6BFF] hover:underline font-medium">
                        Create your first admin
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            )}
            {filtered.map((u) => (
              <tr key={u.id} className="hover:bg-[#FAFBFF] transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#EEF3FF] border border-[#DBEAFE] flex items-center justify-center shrink-0">
                      <span className="text-[#1B6BFF] font-bold text-sm">{u.name.charAt(0).toUpperCase()}</span>
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-[#111827] truncate">{u.name}</p>
                      <p className="text-xs text-[#9CA3AF] truncate flex items-center gap-1">
                        <Mail size={11} /> {u.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-600 border border-blue-100 text-[11px] font-semibold capitalize">
                    <Shield size={11} /> {u.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-[#6B7280]">{formatDate(u.created_at)}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => { setError(null); setDeleteTarget(u); }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#6B7280] hover:text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 size={13} /> Remove
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length > 0 && (
          <div className="px-6 py-3 border-t border-[#F1F3F8] bg-[#FAFBFF]">
            <p className="text-xs text-[#9CA3AF]">Showing {filtered.length} of {initial.length} admins</p>
          </div>
        )}
      </div>

      {showCreate && (
        <CreateAdminModal
          onClose={() => setShowCreate(false)}
          onCreated={() => { setShowCreate(false); router.refresh(); }}
        />
      )}

      {/* Delete confirm */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6 border border-[#E8ECF4]">
            <div className="w-11 h-11 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mb-4">
              <Trash2 size={18} className="text-red-500" />
            </div>
            <h3 className="text-base font-bold text-[#111827] mb-1">Remove admin?</h3>
            <p className="text-sm text-[#6B7280] mb-6">
              <strong className="text-[#374151]">{deleteTarget.name}</strong> ({deleteTarget.email}) will lose dashboard access.
            </p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setDeleteTarget(null)} className="px-4 py-2 text-sm font-medium text-[#6B7280] hover:text-[#374151] hover:bg-[#F4F6FB] rounded-xl transition-colors">
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteTarget.id)}
                disabled={isPending}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-xl transition-colors"
              >
                {isPending && <Loader2 size={14} className="animate-spin" />}
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CreateAdminModal({ onClose, onCreated }: { onClose: () => void; onCreated: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const fd = new FormData();
    fd.set("name", name);
    fd.set("email", email);
    fd.set("password", password);
    startTransition(async () => {
      const res = await createAdminUser(fd);
      if (res.success) onCreated();
      else setError(res.message);
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm" onClick={onClose}>
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-[#E8ECF4] overflow-hidden"
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#F1F3F8]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EEF3FF] border border-[#DBEAFE] flex items-center justify-center">
              <UserPlus size={18} className="text-[#1B6BFF]" />
            </div>
            <div>
              <p className="text-base font-bold text-[#111827]">Add Admin</p>
              <p className="text-xs text-[#9CA3AF]">They&apos;ll have full dashboard access</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg text-[#9CA3AF] hover:text-[#374151] hover:bg-[#F4F6FB] transition-colors">
            <X size={16} />
          </button>
        </div>

        <div className="px-6 py-5 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#374151]">Full Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="admin-input" placeholder="Jane Doe" autoFocus />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#374151]">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="admin-input" placeholder="jane@enifit.com" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#374151]">Password</label>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="admin-input pr-10"
                placeholder="At least 6 characters"
              />
              <button
                type="button"
                onClick={() => setShowPw((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#374151]"
                aria-label={showPw ? "Hide password" : "Show password"}
              >
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-sm font-medium text-red-600">
              <AlertCircle size={15} /> {error}
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#F1F3F8] bg-[#FAFBFF]">
          <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-[#6B7280] hover:text-[#374151] hover:bg-[#F4F6FB] rounded-xl transition-colors">
            Cancel
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="flex items-center gap-2 px-5 py-2 bg-[#1B6BFF] hover:bg-[#1557CC] disabled:opacity-50 text-white text-sm font-semibold rounded-xl transition-colors"
          >
            {isPending ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
            Create Admin
          </button>
        </div>
      </form>
    </div>
  );
}
