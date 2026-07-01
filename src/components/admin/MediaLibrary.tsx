"use client";

import { useRef, useState, useTransition } from "react";
import Image from "next/image";
import { UploadCloud, Trash2, Link2, Check, Loader2, File as FileIcon, ImageIcon } from "lucide-react";
import { uploadMedia, deleteMedia, listMedia, type MediaFile } from "@/app/admin/media/actions";

function formatSize(bytes: number) {
  if (!bytes) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const isImage = (m: MediaFile) => m.mimeType.startsWith("image/");

export default function MediaLibrary({ initial }: { initial: MediaFile[] }) {
  const [files, setFiles] = useState<MediaFile[]>(initial);
  const [notice, setNotice] = useState<{ ok: boolean; text: string } | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [pending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);

  async function upload(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;
    setNotice(null);
    setBusy(true);
    const form = new FormData();
    Array.from(fileList).forEach((f) => form.append("file", f));
    const res = await uploadMedia(form);
    setNotice({ ok: res.success, text: res.message });
    if (res.success) setFiles(await listMedia());
    setBusy(false);
    if (inputRef.current) inputRef.current.value = "";
  }

  function remove(name: string) {
    if (!confirm("Delete this file? This cannot be undone.")) return;
    const form = new FormData();
    form.set("name", name);
    startTransition(async () => {
      const res = await deleteMedia(form);
      setNotice({ ok: res.success, text: res.message });
      if (res.success) setFiles((prev) => prev.filter((f) => f.name !== name));
    });
  }

  async function copy(url: string, name: string) {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(name);
      setTimeout(() => setCopied((c) => (c === name ? null : c)), 1800);
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">Media</h1>
          <p className="text-sm text-[#6B7280] mt-0.5">
            {files.length} file{files.length === 1 ? "" : "s"} in storage · upload, copy links, or delete
          </p>
        </div>
        <button
          onClick={() => inputRef.current?.click()}
          disabled={busy}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#1B6BFF] hover:bg-[#1557CC] text-white text-sm font-semibold rounded-xl transition-colors shadow-sm shadow-blue-200 disabled:opacity-60"
        >
          {busy ? <Loader2 size={15} className="animate-spin" /> : <UploadCloud size={15} />}
          {busy ? "Uploading…" : "Upload"}
        </button>
      </div>

      <input
        ref={inputRef}
        type="file"
        multiple
        className="hidden"
        onChange={(e) => upload(e.target.files)}
      />

      {/* Dropzone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); upload(e.dataTransfer.files); }}
        onClick={() => inputRef.current?.click()}
        className={`rounded-2xl border-2 border-dashed px-6 py-8 flex flex-col items-center justify-center gap-2 text-center cursor-pointer transition-colors ${
          dragging ? "border-[#1B6BFF] bg-[#EEF3FF]" : "border-[#D8DFEC] bg-white hover:bg-[#FAFBFF]"
        }`}
      >
        <div className="w-11 h-11 rounded-xl bg-[#EEF3FF] flex items-center justify-center">
          <UploadCloud size={20} className="text-[#1B6BFF]" />
        </div>
        <p className="text-sm font-medium text-[#374151]">Drag &amp; drop files here, or click to browse</p>
        <p className="text-xs text-[#9CA3AF]">Images, PDFs, and other files up to 20 MB</p>
      </div>

      {notice && (
        <p className={`text-sm ${notice.ok ? "text-green-600" : "text-red-600"}`}>{notice.text}</p>
      )}

      {/* Grid */}
      {files.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#E8ECF4] shadow-sm flex flex-col items-center gap-3 py-16">
          <div className="w-12 h-12 rounded-2xl bg-[#F4F6FB] flex items-center justify-center">
            <ImageIcon size={22} className="text-[#9CA3AF]" />
          </div>
          <p className="text-sm font-medium text-[#374151]">No media yet</p>
          <p className="text-xs text-[#9CA3AF]">Upload your first file to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {files.map((f) => (
            <div key={f.name} className="group bg-white rounded-2xl border border-[#E8ECF4] shadow-sm overflow-hidden flex flex-col">
              {/* Preview */}
              <div className="relative aspect-[4/3] bg-[#F4F6FB] flex items-center justify-center overflow-hidden">
                {isImage(f) ? (
                  <Image src={f.url} alt={f.name} fill sizes="240px" className="object-cover" unoptimized />
                ) : (
                  <div className="flex flex-col items-center gap-1 text-[#9CA3AF]">
                    <FileIcon size={28} />
                    <span className="text-[10px] uppercase font-semibold">
                      {f.name.split(".").pop()}
                    </span>
                  </div>
                )}
                {/* Hover actions */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={() => copy(f.url, f.name)}
                    title="Copy link"
                    className="w-9 h-9 rounded-lg bg-white/95 hover:bg-white flex items-center justify-center text-[#374151] transition-colors"
                  >
                    {copied === f.name ? <Check size={15} className="text-green-600" /> : <Link2 size={15} />}
                  </button>
                  <button
                    onClick={() => remove(f.name)}
                    disabled={pending}
                    title="Delete"
                    className="w-9 h-9 rounded-lg bg-white/95 hover:bg-white flex items-center justify-center text-red-500 transition-colors disabled:opacity-60"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
              {/* Meta */}
              <div className="p-3 flex flex-col gap-0.5">
                <p className="text-xs font-medium text-[#111827] truncate" title={f.name}>{f.name}</p>
                <p className="text-[10px] text-[#9CA3AF]">{formatSize(f.size)}</p>
              </div>
              {/* Copy link footer (always visible for touch) */}
              <button
                onClick={() => copy(f.url, f.name)}
                className="border-t border-[#F1F3F8] px-3 py-2 flex items-center justify-center gap-1.5 text-[11px] font-medium text-[#1B6BFF] hover:bg-[#EEF3FF] transition-colors"
              >
                {copied === f.name ? (
                  <><Check size={12} className="text-green-600" /> Copied</>
                ) : (
                  <><Link2 size={12} /> Copy link</>
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
