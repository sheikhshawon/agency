"use client";

import { useState, useRef, useTransition } from "react";
import {
  Settings, Globe, Mail, Phone, MapPin, Share2,
  Loader2, Check, AlertCircle, Save, ExternalLink,
} from "lucide-react";
import { updateSettings, type SiteSettings, type SaveResult } from "./actions";

export default function SettingsForm({ initial }: { initial: SiteSettings }) {
  const [form, setForm] = useState<SiteSettings>(initial);
  const [result, setResult] = useState<SaveResult | null>(null);
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  const set = (key: keyof SiteSettings) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [key]: e.target.value }));

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setResult(null);
    const fd = new FormData(formRef.current!);
    startTransition(async () => {
      const res = await updateSettings(fd);
      setResult(res);
      if (res.success) {
        // hide the banner after a moment
        setTimeout(() => setResult(null), 4000);
      }
    });
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-3xl">

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">Site Settings</h1>
          <p className="text-sm text-[#6B7280] mt-0.5">
            Edit your site name, tagline and contact details
          </p>
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#1B6BFF] hover:bg-[#1557CC] disabled:opacity-50 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm shadow-blue-200 shrink-0"
        >
          {isPending ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
          Save Changes
        </button>
      </div>

      {/* Save feedback banner */}
      {result && (
        <div
          className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium border ${
            result.success
              ? "bg-green-50 border-green-100 text-green-700"
              : "bg-red-50 border-red-100 text-red-600"
          }`}
        >
          {result.success ? <Check size={16} /> : <AlertCircle size={16} />}
          {result.message}
        </div>
      )}

      {/* General */}
      <Card icon={<Settings size={16} className="text-[#1B6BFF]" />} title="General" subtitle="The basics that identify your site">
        <Field label="Site Name *">
          <input
            name="site_name"
            required
            value={form.site_name}
            onChange={set("site_name")}
            className="admin-input"
            placeholder="Enif IT Services Ltd."
          />
        </Field>
        <Field label="Tagline" hint="A short line that summarises what you do">
          <input
            name="tagline"
            value={form.tagline}
            onChange={set("tagline")}
            className="admin-input"
            placeholder="Accelerating Business Growth with Intelligent Technology"
          />
        </Field>
        <Field label="Description" hint="Used for SEO / meta description">
          <textarea
            name="description"
            rows={3}
            value={form.description}
            onChange={set("description")}
            className="admin-input resize-none"
            placeholder="A short paragraph describing your company and services..."
          />
        </Field>
      </Card>

      {/* Contact */}
      <Card icon={<Mail size={16} className="text-[#1B6BFF]" />} title="Contact" subtitle="How visitors can reach you">
        <Field label="Contact Email">
          <div className="relative">
            <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
            <input
              name="contact_email"
              type="email"
              value={form.contact_email}
              onChange={set("contact_email")}
              className="admin-input pl-9"
              placeholder="hello@enifit.com"
            />
          </div>
        </Field>
        <Field label="Phone">
          <div className="relative">
            <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
            <input
              name="phone"
              value={form.phone}
              onChange={set("phone")}
              className="admin-input pl-9"
              placeholder="+880 1XXX-XXXXXX"
            />
          </div>
        </Field>
        <Field label="Address">
          <div className="relative">
            <MapPin size={14} className="absolute left-3 top-[18px] text-[#9CA3AF]" />
            <textarea
              name="address"
              rows={2}
              value={form.address}
              onChange={set("address")}
              className="admin-input pl-9 resize-none"
              placeholder="Dhaka, Bangladesh"
            />
          </div>
        </Field>
      </Card>

      {/* Social links */}
      <Card icon={<Share2 size={16} className="text-[#1B6BFF]" />} title="Social Links" subtitle="Profiles linked in your footer">
        <SocialField label="LinkedIn" name="linkedin_url" value={form.linkedin_url} onChange={set("linkedin_url")} placeholder="https://linkedin.com/company/..." />
        <SocialField label="Facebook" name="facebook_url" value={form.facebook_url} onChange={set("facebook_url")} placeholder="https://facebook.com/..." />
        <SocialField label="Twitter / X" name="twitter_url" value={form.twitter_url} onChange={set("twitter_url")} placeholder="https://x.com/..." />
        <SocialField label="Instagram" name="instagram_url" value={form.instagram_url} onChange={set("instagram_url")} placeholder="https://instagram.com/..." />
      </Card>

      {/* Footer meta + bottom save */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <p className="text-xs text-[#9CA3AF]">
          {initial.updated_at
            ? `Last updated ${new Date(initial.updated_at).toLocaleString("en-US", {
                month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit",
              })}`
            : "Not saved yet"}
        </p>
        <button
          type="submit"
          disabled={isPending}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#1B6BFF] hover:bg-[#1557CC] disabled:opacity-50 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm shadow-blue-200"
        >
          {isPending ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
          Save Changes
        </button>
      </div>
    </form>
  );
}

function Card({
  icon, title, subtitle, children,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-[#E8ECF4] shadow-sm overflow-hidden">
      <div className="flex items-center gap-3 px-6 py-4 border-b border-[#F1F3F8]">
        <div className="w-9 h-9 rounded-xl bg-[#EEF3FF] border border-[#DBEAFE] flex items-center justify-center shrink-0">
          {icon}
        </div>
        <div>
          <p className="text-sm font-bold text-[#111827]">{title}</p>
          <p className="text-xs text-[#9CA3AF]">{subtitle}</p>
        </div>
      </div>
      <div className="p-6 flex flex-col gap-4">{children}</div>
    </div>
  );
}

function Field({
  label, hint, children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-[#374151]">{label}</label>
      {children}
      {hint && <p className="text-[11px] text-[#9CA3AF]">{hint}</p>}
    </div>
  );
}

function SocialField({
  label, name, value, onChange, placeholder,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}) {
  return (
    <Field label={label}>
      <div className="relative">
        <Globe size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
        <input
          name={name}
          type="url"
          value={value}
          onChange={onChange}
          className="admin-input pl-9 pr-9"
          placeholder={placeholder}
        />
        {value && (
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#1B6BFF] transition-colors"
            aria-label={`Open ${label}`}
          >
            <ExternalLink size={14} />
          </a>
        )}
      </div>
    </Field>
  );
}
