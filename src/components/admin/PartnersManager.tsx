"use client";

import { useRef, useState, useTransition } from "react";
import { Plus, Trash2, ChevronUp, ChevronDown, UploadCloud, Loader2, ExternalLink, Handshake } from "lucide-react";
import { createPartner, deletePartner, movePartner, getPartners, type PartnerRow } from "@/app/admin/partners/actions";

export default function PartnersManager({ initial }: { initial: PartnerRow[] }) {
  const [partners, setPartners] = useState<PartnerRow[]>(initial);
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [notice, setNotice] = useState<{ ok: boolean; text: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [pending, start] = useTransition();
  const fileRef = useRef<HTMLInputElement>(null);

  async function add() {
    setNotice(null);
    if (!name.trim()) return setNotice({ ok: false, text: "Enter the partner's name." });
    if (!file) return setNotice({ ok: false, text: "Choose a logo image." });

    setBusy(true);
    const form = new FormData();
    form.set("name", name);
    form.set("link_url", link);
    form.set("logo", file);
    const res = await createPartner(form);
    setNotice({ ok: res.success, text: res.message });
    if (res.success) {
      setName(""); setLink(""); setFile(null);
      if (fileRef.current) fileRef.current.value = "";
      setPartners(await getPartners());
    }
    setBusy(false);
  }

  function remove(id: string) {
    if (!confirm("Remove this partner?")) return;
    const form = new FormData();
    form.set("id", id);
    start(async () => {
      const res = await deletePartner(form);
      if (res.success) setPartners((p) => p.filter((x) => x.id !== id));
    });
  }

  function move(id: string, dir: "up" | "down") {
    const form = new FormData();
    form.set("id", id);
    form.set("dir", dir);
    start(async () => {
      await movePartner(form);
      setPartners(await getPartners());
    });
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-[#111827]">Partners</h1>
        <p className="text-sm text-[#6B7280] mt-0.5">
          Logos shown in the homepage “Trusted by” marquee. Upload, reorder, or remove.
        </p>
      </div>

      {/* Add form */}
      <div className="bg-white rounded-2xl border border-[#E8ECF4] shadow-sm p-5 flex flex-col gap-3">
        <p className="text-sm font-bold text-[#111827]">Add a partner</p>
        <div className="grid sm:grid-cols-2 gap-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Partner name *"
            className="rounded-lg border border-[#E8ECF4] px-3 py-2 text-sm"
          />
          <input
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="Website URL (optional)"
            className="rounded-lg border border-[#E8ECF4] px-3 py-2 text-sm"
          />
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => fileRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#F4F6FB] border border-[#E8ECF4] text-sm text-[#374151] hover:bg-[#EAEEF6] transition-colors"
          >
            <UploadCloud size={15} /> {file ? "Change logo" : "Choose logo"}
          </button>
          {file && <span className="text-xs text-[#6B7280] truncate max-w-[240px]">{file.name}</span>}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
          <button
            onClick={add}
            disabled={busy}
            className="ml-auto flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1B6BFF] hover:bg-[#1557CC] text-white text-sm font-semibold transition-colors disabled:opacity-60"
          >
            {busy ? <Loader2 size={15} className="animate-spin" /> : <Plus size={15} />}
            {busy ? "Adding…" : "Add Partner"}
          </button>
        </div>
        {notice && <p className={`text-xs ${notice.ok ? "text-green-600" : "text-red-600"}`}>{notice.text}</p>}
      </div>

      {/* List */}
      <div className="bg-white rounded-2xl border border-[#E8ECF4] shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-[#F1F3F8]">
          <p className="text-sm font-bold text-[#111827]">Current Partners</p>
          <p className="text-xs text-[#9CA3AF] mt-0.5">{partners.length} logo{partners.length === 1 ? "" : "s"} in the marquee</p>
        </div>
        {partners.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-14 text-center">
            <div className="w-12 h-12 rounded-2xl bg-[#F4F6FB] flex items-center justify-center">
              <Handshake size={22} className="text-[#9CA3AF]" />
            </div>
            <p className="text-sm font-medium text-[#374151]">No partners yet</p>
            <p className="text-xs text-[#9CA3AF]">Add one above — until then the marquee shows placeholder logos.</p>
          </div>
        ) : (
          <div className="divide-y divide-[#F1F3F8]">
            {partners.map((p, i) => (
              <div key={p.id} className="flex items-center gap-4 px-6 py-3.5 hover:bg-[#FAFBFF] transition-colors">
                <div className="w-20 h-12 rounded-lg bg-[#0C0D2E] border border-[#E8ECF4] flex items-center justify-center shrink-0 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.logo_url} alt={p.name} className="max-w-[72px] max-h-9 object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#111827] truncate">{p.name}</p>
                  {p.link_url && (
                    <a href={p.link_url} target="_blank" rel="noreferrer" className="text-[11px] text-[#1B6BFF] hover:underline inline-flex items-center gap-1 truncate">
                      {p.link_url} <ExternalLink size={10} />
                    </a>
                  )}
                </div>
                <div className="flex items-center gap-0.5 shrink-0">
                  <button onClick={() => move(p.id, "up")} disabled={pending || i === 0}
                    className="w-7 h-7 flex items-center justify-center rounded-lg text-[#9CA3AF] hover:text-[#374151] hover:bg-[#F4F6FB] disabled:opacity-30" aria-label="Move up">
                    <ChevronUp size={15} />
                  </button>
                  <button onClick={() => move(p.id, "down")} disabled={pending || i === partners.length - 1}
                    className="w-7 h-7 flex items-center justify-center rounded-lg text-[#9CA3AF] hover:text-[#374151] hover:bg-[#F4F6FB] disabled:opacity-30" aria-label="Move down">
                    <ChevronDown size={15} />
                  </button>
                  <button onClick={() => remove(p.id)} disabled={pending}
                    className="w-7 h-7 flex items-center justify-center rounded-lg text-[#9CA3AF] hover:text-red-500 hover:bg-red-50 disabled:opacity-40" aria-label="Remove">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
