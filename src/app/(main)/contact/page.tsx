import type { Metadata } from "next";
import { Mail, Phone, MapPin, MessageSquare, Clock, ArrowRight } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Enif IT Services Ltd. — let's build something great together.",
};

const CONTACT_INFO = [
  { icon: Mail, label: "Email Us", value: "hello@enifit.com", href: "mailto:hello@enifit.com" },
  { icon: Phone, label: "Call Us", value: "+880 1234-567 890", href: "tel:+8801234567890" },
  { icon: MapPin, label: "Visit Us", value: "Dhaka, Bangladesh", href: "#" },
  { icon: Clock, label: "Working Hours", value: "Sun–Thu, 9 AM – 6 PM", href: "#" },
];

const SERVICES_LIST = [
  "Web & App Development",
  "Business Management Solutions",
  "Marketing & Business Growth",
  "Brand Identity & Creative Design",
  "AI Solutions & Automation",
  "Other / Not sure yet",
];

export default function ContactPage() {
  return (
    <>
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(27,107,255,0.08) 0%, transparent 70%)" }}
        />
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            badge="Let's Talk"
            title="Start Your Project"
            highlight="Project"
            description="Tell us about your goals and we'll get back to you within 24 hours with a plan to make them happen."
          />
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-2">Contact Information</h2>
              <p className="text-sm text-[#606060] leading-relaxed">
                Prefer to reach out directly? We're available through any of these channels.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-start gap-4 p-4 rounded-xl bg-[#0F0F0F] border border-[#1E1E1E] hover:border-[#1B6BFF]/30 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#1B6BFF]/10 border border-[#1B6BFF]/20 flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-[#1B6BFF]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#606060] font-medium mb-0.5">{label}</p>
                    <p className="text-sm text-white font-medium group-hover:text-[#1B6BFF] transition-colors">{value}</p>
                  </div>
                </a>
              ))}
            </div>
            <div className="p-5 rounded-2xl bg-[#1B6BFF]/5 border border-[#1B6BFF]/15">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare size={14} className="text-[#1B6BFF]" />
                <span className="text-xs font-semibold text-[#1B6BFF] uppercase tracking-wider">Response Time</span>
              </div>
              <p className="text-sm text-[#A0A0A0]">
                We respond to all inquiries within <strong className="text-white">24 hours</strong> on business days.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <form className="flex flex-col gap-5 p-8 rounded-3xl bg-[#0F0F0F] border border-[#1E1E1E]">
              <h3 className="text-lg font-bold text-white mb-1">Send Us a Message</h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-[#808080] uppercase tracking-wider">First Name *</label>
                  <input
                    type="text"
                    placeholder="John"
                    required
                    className="px-4 py-3 rounded-xl bg-[#111111] border border-[#252525] text-white text-sm placeholder:text-[#404040] focus:outline-none focus:border-[#1B6BFF] transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-[#808080] uppercase tracking-wider">Last Name *</label>
                  <input
                    type="text"
                    placeholder="Doe"
                    required
                    className="px-4 py-3 rounded-xl bg-[#111111] border border-[#252525] text-white text-sm placeholder:text-[#404040] focus:outline-none focus:border-[#1B6BFF] transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-[#808080] uppercase tracking-wider">Email Address *</label>
                <input
                  type="email"
                  placeholder="john@company.com"
                  required
                  className="px-4 py-3 rounded-xl bg-[#111111] border border-[#252525] text-white text-sm placeholder:text-[#404040] focus:outline-none focus:border-[#1B6BFF] transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-[#808080] uppercase tracking-wider">Company</label>
                <input
                  type="text"
                  placeholder="Your Company Name"
                  className="px-4 py-3 rounded-xl bg-[#111111] border border-[#252525] text-white text-sm placeholder:text-[#404040] focus:outline-none focus:border-[#1B6BFF] transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-[#808080] uppercase tracking-wider">Service Needed</label>
                <div className="grid grid-cols-2 gap-2">
                  {SERVICES_LIST.map((s) => (
                    <label key={s} className="flex items-center gap-2 cursor-pointer group">
                      <input type="checkbox" className="w-4 h-4 rounded accent-[#1B6BFF]" />
                      <span className="text-xs text-[#606060] group-hover:text-white transition-colors">{s}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-[#808080] uppercase tracking-wider">Budget Range</label>
                <select className="px-4 py-3 rounded-xl bg-[#111111] border border-[#252525] text-white text-sm focus:outline-none focus:border-[#1B6BFF] transition-colors appearance-none">
                  <option value="">Select a range</option>
                  <option>Under $5,000</option>
                  <option>$5,000 – $15,000</option>
                  <option>$15,000 – $50,000</option>
                  <option>$50,000+</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-[#808080] uppercase tracking-wider">Message *</label>
                <textarea
                  placeholder="Tell us about your project, goals, and timeline..."
                  required
                  rows={5}
                  className="px-4 py-3 rounded-xl bg-[#111111] border border-[#252525] text-white text-sm placeholder:text-[#404040] focus:outline-none focus:border-[#1B6BFF] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="group flex items-center justify-center gap-2 px-7 py-3.5 bg-[#1B6BFF] hover:bg-[#4A8FFF] text-white text-sm font-semibold rounded-xl transition-all duration-300 shadow-[0_0_30px_rgba(27,107,255,0.3)] hover:shadow-[0_0_50px_rgba(27,107,255,0.5)]"
              >
                Send Message
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
