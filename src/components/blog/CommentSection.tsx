"use client";

import { useState, useTransition } from "react";
import { MessageCircle, Send, Loader2 } from "lucide-react";
import { addComment, getComments, type CommentRow } from "@/app/(main)/blog/comment-actions";

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const min = Math.floor(diff / 60000);
  if (min < 1) return "just now";
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const day = Math.floor(hr / 24);
  if (day < 30) return `${day}d ago`;
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function CommentSection({
  blogId,
  slug,
  initial,
}: {
  blogId: string;
  slug: string;
  initial: CommentRow[];
}) {
  const [comments, setComments] = useState<CommentRow[]>(initial);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");
  const [notice, setNotice] = useState<{ ok: boolean; text: string } | null>(null);
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setNotice(null);

    const form = new FormData();
    form.set("blog_id", blogId);
    form.set("slug", slug);
    form.set("author_name", name);
    form.set("email", email);
    form.set("body", body);

    startTransition(async () => {
      const res = await addComment(form);
      setNotice({ ok: res.success, text: res.message });
      if (res.success) {
        setName("");
        setEmail("");
        setBody("");
        setComments(await getComments(blogId)); // refresh with the newly-approved list
      }
    });
  }

  const inputCls =
    "w-full rounded-xl bg-[#0F0F0F] border border-[#1E1E1E] px-4 py-3 text-sm text-white placeholder-[#606060] focus:outline-none focus:border-[#1B6BFF]/50 transition-colors";

  return (
    <section className="max-w-3xl mx-auto px-6 lg:px-8 pb-24">
      <div className="flex items-center gap-2 mb-8">
        <MessageCircle size={18} className="text-[#1B6BFF]" />
        <h2 className="text-xl font-bold text-white">
          {comments.length > 0 ? `${comments.length} Comment${comments.length === 1 ? "" : "s"}` : "Comments"}
        </h2>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-12">
        <div className="grid sm:grid-cols-2 gap-4">
          <input
            className={inputCls}
            placeholder="Your name *"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={80}
            required
          />
          <input
            className={inputCls}
            type="email"
            placeholder="Email (optional, not shown)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            maxLength={120}
          />
        </div>
        <textarea
          className={`${inputCls} resize-y min-h-[120px]`}
          placeholder="Share your thoughts…"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          maxLength={2000}
          required
        />
        <div className="flex items-center justify-between gap-4 flex-wrap">
          {notice ? (
            <p className={`text-sm ${notice.ok ? "text-green-400" : "text-red-400"}`}>{notice.text}</p>
          ) : (
            <span className="text-xs text-[#606060]">Be respectful — comments are public.</span>
          )}
          <button
            type="submit"
            disabled={pending}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1B6BFF] hover:bg-[#1557CC] text-white text-sm font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {pending ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />}
            {pending ? "Posting…" : "Post Comment"}
          </button>
        </div>
      </form>

      {/* List */}
      {comments.length === 0 ? (
        <p className="text-sm text-[#606060] text-center py-8 border-t border-[#1A1A1A]">
          No comments yet. Be the first to share your thoughts.
        </p>
      ) : (
        <div className="flex flex-col gap-6 border-t border-[#1A1A1A] pt-8">
          {comments.map((c) => (
            <div key={c.id} className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#1B6BFF]/10 border border-[#1B6BFF]/20 flex items-center justify-center shrink-0 text-[#1B6BFF] text-sm font-bold uppercase">
                {c.author_name.trim().charAt(0) || "?"}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-white">{c.author_name}</p>
                  <span className="text-xs text-[#606060]">{timeAgo(c.created_at)}</span>
                </div>
                <p className="text-sm text-[#A0A0A0] leading-relaxed mt-1 whitespace-pre-wrap break-words">
                  {c.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
