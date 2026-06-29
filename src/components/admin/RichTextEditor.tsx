"use client";

import { useRef, useState } from "react";
import {
  Bold, Italic, Heading2, Heading3, List, ListOrdered, Quote, Link2, Eye, Pencil,
} from "lucide-react";
import { renderMarkdown } from "@/lib/markdown";

interface RichTextEditorProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}

function ToolBtn({
  onClick, title, children,
}: { onClick: () => void; title: string; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className="w-8 h-8 flex items-center justify-center rounded-lg text-[#6B7280] hover:text-[#1B6BFF] hover:bg-[#EEF3FF] transition-colors"
    >
      {children}
    </button>
  );
}

export default function RichTextEditor({
  name, value, onChange, placeholder, rows = 14,
}: RichTextEditorProps) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [preview, setPreview] = useState(false);

  /** Wrap the current selection with `before`/`after`. */
  function wrap(before: string, after: string = before, placeholderText = "text") {
    const el = ref.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selected = value.slice(start, end) || placeholderText;
    const next = value.slice(0, start) + before + selected + after + value.slice(end);
    onChange(next);
    requestAnimationFrame(() => {
      el.focus();
      el.selectionStart = start + before.length;
      el.selectionEnd = start + before.length + selected.length;
    });
  }

  /** Prefix each selected line. For ordered lists, numbers increment. */
  function prefixLines(prefix: string | ((i: number) => string)) {
    const el = ref.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const lineStart = value.lastIndexOf("\n", start - 1) + 1;
    const block = value.slice(lineStart, end);
    const lines = block.split("\n");
    const prefixed = lines
      .map((l, idx) => (typeof prefix === "function" ? prefix(idx) : prefix) + l)
      .join("\n");
    const next = value.slice(0, lineStart) + prefixed + value.slice(end);
    onChange(next);
    requestAnimationFrame(() => {
      el.focus();
      el.selectionStart = lineStart;
      el.selectionEnd = lineStart + prefixed.length;
    });
  }

  function insertLink() {
    const url = window.prompt("Link URL", "https://");
    if (!url) return;
    const el = ref.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const text = value.slice(start, end) || "link text";
    const next = value.slice(0, start) + `[${text}](${url})` + value.slice(end);
    onChange(next);
    requestAnimationFrame(() => el.focus());
  }

  return (
    <div className="rounded-xl border border-[#E8ECF4] overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="flex items-center gap-0.5 px-2 py-1.5 border-b border-[#F1F3F8] bg-[#FAFBFF] flex-wrap">
        <ToolBtn onClick={() => wrap("**")} title="Bold"><Bold size={15} /></ToolBtn>
        <ToolBtn onClick={() => wrap("*")} title="Italic"><Italic size={15} /></ToolBtn>
        <div className="w-px h-5 bg-[#E8ECF4] mx-1" />
        <ToolBtn onClick={() => prefixLines("## ")} title="Heading"><Heading2 size={15} /></ToolBtn>
        <ToolBtn onClick={() => prefixLines("### ")} title="Subheading"><Heading3 size={15} /></ToolBtn>
        <div className="w-px h-5 bg-[#E8ECF4] mx-1" />
        <ToolBtn onClick={() => prefixLines("- ")} title="Bullet list"><List size={15} /></ToolBtn>
        <ToolBtn onClick={() => prefixLines((i) => `${i + 1}. `)} title="Numbered list"><ListOrdered size={15} /></ToolBtn>
        <ToolBtn onClick={() => prefixLines("> ")} title="Quote"><Quote size={15} /></ToolBtn>
        <ToolBtn onClick={insertLink} title="Link"><Link2 size={15} /></ToolBtn>

        <button
          type="button"
          onClick={() => setPreview((p) => !p)}
          className="ml-auto flex items-center gap-1.5 px-2.5 h-8 rounded-lg text-xs font-medium text-[#6B7280] hover:text-[#1B6BFF] hover:bg-[#EEF3FF] transition-colors"
        >
          {preview ? <><Pencil size={13} /> Write</> : <><Eye size={13} /> Preview</>}
        </button>
      </div>

      {/* Editor / Preview */}
      {preview ? (
        <div className="px-5 py-4 min-h-[260px] bg-[#0A0A0A]">
          {value.trim()
            ? <div>{renderMarkdown(value)}</div>
            : <p className="text-[#606060] italic text-sm">Nothing to preview yet.</p>}
        </div>
      ) : (
        <textarea
          ref={ref}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          placeholder={placeholder}
          className="w-full px-4 py-3 text-sm leading-relaxed text-[#111827] placeholder-[#9CA3AF] outline-none resize-y font-mono"
        />
      )}

      {/* Hidden mirror so the value always submits even while previewing */}
      {preview && <input type="hidden" name={name} value={value} />}

      <p className="px-4 py-2 text-[10px] text-[#9CA3AF] border-t border-[#F1F3F8] bg-[#FAFBFF]">
        Supports Markdown — <code>**bold**</code>, <code>## heading</code>, <code>- bullet</code>, <code>1. numbered</code>, <code>&gt; quote</code>, <code>[link](url)</code>
      </p>
    </div>
  );
}
