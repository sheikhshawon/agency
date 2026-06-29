"use client";

import { useState, useTransition } from "react";
import { ArrowRight, Check, Loader2, AlertCircle } from "lucide-react";
import { submitMessage } from "@/app/admin/messages/actions";

const SERVICES_LIST = [
  "Web & App Development",
  "Business Management Solutions",
  "Marketing & Business Growth",
  "Brand Identity & Creative Design",
  "AI Solutions & Automation",
  "Other / Not sure yet",
];

const INPUT_CLASS =
  "px-4 py-3 rounded-xl bg-[#111111] border border-[#252525] text-white text-sm placeholder:text-[#404040] focus:outline-none focus:border-[#1B6BFF] transition-colors";

type FormState = {
  full_name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
};

const EMPTY: FormState = { full_name: "", email: "", phone: "", company: "", service: "", message: "" };

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);

  const set =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((f) => ({ ...f, [key]: e.target.value }));
      setResult(null);
    };

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const fd = new FormData();
    fd.set("full_name", form.full_name);
    fd.set("email", form.email);
    fd.set("phone", form.phone);
    fd.set("company", form.company);
    fd.set("service", form.service);
    fd.set("message", form.message);
    startTransition(async () => {
      const res = await submitMessage(fd);
      setResult({ ok: res.success, message: res.message });
      if (res.success) setForm(EMPTY);
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 p-8 rounded-3xl bg-[#0F0F0F] border border-[#1E1E1E]"
    >
      <h3 className="text-lg font-bold text-white mb-1">Send Us a Message</h3>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-[#808080] uppercase tracking-wider">Full Name *</label>
          <input
            type="text"
            value={form.full_name}
            onChange={set("full_name")}
            placeholder="John Doe"
            required
            className={INPUT_CLASS}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-[#808080] uppercase tracking-wider">Email Address *</label>
          <input
            type="email"
            value={form.email}
            onChange={set("email")}
            placeholder="john@company.com"
            required
            className={INPUT_CLASS}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-[#808080] uppercase tracking-wider">Phone Number</label>
          <input
            type="tel"
            value={form.phone}
            onChange={set("phone")}
            placeholder="+880 1XXX-XXXXXX"
            className={INPUT_CLASS}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-[#808080] uppercase tracking-wider">Company Name</label>
          <input
            type="text"
            value={form.company}
            onChange={set("company")}
            placeholder="Your Company Name"
            className={INPUT_CLASS}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-[#808080] uppercase tracking-wider">Service Needed</label>
        <select
          value={form.service}
          onChange={set("service")}
          className={`${INPUT_CLASS} appearance-none cursor-pointer`}
        >
          <option value="">Select a service</option>
          {SERVICES_LIST.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-[#808080] uppercase tracking-wider">Message *</label>
        <textarea
          value={form.message}
          onChange={set("message")}
          placeholder="Tell us about your project, goals, and timeline..."
          required
          rows={5}
          className={`${INPUT_CLASS} resize-none`}
        />
      </div>

      {result && (
        <div
          className={`flex items-center gap-2 text-sm font-medium ${
            result.ok ? "text-green-400" : "text-red-400"
          }`}
        >
          {result.ok ? <Check size={16} /> : <AlertCircle size={16} />}
          {result.message}
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="group flex items-center justify-center gap-2 px-7 py-3.5 bg-[#1B6BFF] hover:bg-[#4A8FFF] disabled:opacity-60 text-white text-sm font-semibold rounded-xl transition-all duration-300 shadow-[0_0_30px_rgba(27,107,255,0.3)] hover:shadow-[0_0_50px_rgba(27,107,255,0.5)]"
      >
        {isPending ? (
          <>
            <Loader2 size={15} className="animate-spin" /> Sending...
          </>
        ) : (
          <>
            Send Message
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </>
        )}
      </button>
    </form>
  );
}
