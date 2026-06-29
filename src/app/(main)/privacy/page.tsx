import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Enif IT Services Ltd. collects, uses, shares, and protects your personal information, and the rights you have over your data.",
};

const LAST_UPDATED = "January 2026";

type Block =
  | { type: "p"; text: string }
  | { type: "sub"; text: string }
  | { type: "list"; items: string[] }
  | { type: "labeled"; label: string; text: string };

type Section = {
  id: string;
  heading: string;
  blocks: Block[];
};

const SECTIONS: Section[] = [
  {
    id: "introduction",
    heading: "Your Privacy Matters to Us",
    blocks: [
      {
        type: "p",
        text: 'At Enif IT Services Ltd ("Enif", "we", "us", or "our"), we are committed to protecting the privacy and security of the personal information you share with us. This Privacy Policy explains what information we collect, how we use it, who we share it with, and what rights you have over your data.',
      },
      {
        type: "p",
        text: "This policy applies to all visitors, clients, and users who interact with our website at enifit.com, our services, and any communications we have with you.",
      },
      {
        type: "p",
        text: "By using our website or engaging our services, you agree to the practices described in this Privacy Policy. If you do not agree, please do not use our website or services.",
      },
    ],
  },
  {
    id: "information-we-collect",
    heading: "What Information We Collect",
    blocks: [
      {
        type: "p",
        text: "We collect information in two ways: information you provide directly to us, and information collected automatically when you use our website.",
      },
      { type: "sub", text: "Information You Provide to Us" },
      {
        type: "p",
        text: "This includes any information you voluntarily submit when you:",
      },
      {
        type: "list",
        items: [
          "Contact us through our website contact form or email",
          "Request a consultation, quote, or proposal",
          "Engage us for any of our services",
          "Subscribe to our newsletter or communications",
          "Communicate with us via email, phone, or social media",
        ],
      },
      { type: "p", text: "The types of information you may provide include:" },
      {
        type: "list",
        items: [
          "Full name",
          "Email address",
          "Phone number",
          "Company name and job title",
          "Project details, requirements, and any files or documents you share with us",
          "Payment and billing information when engaging our services",
          "Any other information you choose to include in your communications with us",
        ],
      },
      { type: "sub", text: "Information Collected Automatically" },
      {
        type: "p",
        text: "When you visit enifit.com, we automatically collect certain technical information through cookies and similar technologies, including:",
      },
      {
        type: "list",
        items: [
          "IP address and approximate location",
          "Browser type and version",
          "Device type and operating system",
          "Pages visited and time spent on each page",
          "Referring website or source",
          "Links clicked within our website",
        ],
      },
      {
        type: "p",
        text: "This information is used to understand how visitors use our website, improve our content and user experience, and ensure our website functions correctly.",
      },
      { type: "sub", text: "Cookies" },
      {
        type: "p",
        text: "We use cookies and similar tracking technologies on our website. Cookies are small data files stored on your device that help us provide a better browsing experience. We use the following types of cookies:",
      },
      {
        type: "labeled",
        label: "Essential Cookies",
        text: "Required for the website to function correctly. These cannot be disabled.",
      },
      {
        type: "labeled",
        label: "Analytics Cookies",
        text: "Help us understand how visitors interact with our website. We use this data in aggregate to improve our content and structure.",
      },
      {
        type: "labeled",
        label: "Marketing Cookies",
        text: "Used to deliver relevant content and measure the effectiveness of our marketing efforts. These are only placed with your consent.",
      },
      {
        type: "p",
        text: "You can manage your cookie preferences through your browser settings. Disabling certain cookies may affect the functionality of our website.",
      },
    ],
  },
  {
    id: "how-we-use",
    heading: "How We Use Your Information",
    blocks: [
      {
        type: "p",
        text: "We use the information we collect for the following purposes:",
      },
      {
        type: "labeled",
        label: "To Respond to Your Enquiries",
        text: "When you contact us, we use your information to respond to your questions, provide the information you requested, and follow up on your enquiry.",
      },
      {
        type: "labeled",
        label: "To Deliver Our Services",
        text: "When you engage Enif for a project, we use your information to plan, manage, and deliver the services you have contracted us for, and to communicate with you throughout the project.",
      },
      {
        type: "labeled",
        label: "To Process Payments",
        text: "We use billing and payment information to process invoices and payments for services rendered.",
      },
      {
        type: "labeled",
        label: "To Improve Our Website and Services",
        text: "We use aggregated analytics data to understand how our website is used and where we can improve the user experience and content.",
      },
      {
        type: "labeled",
        label: "To Send Communications",
        text: "With your consent, we may send you updates, newsletters, or information about our services. You can unsubscribe from marketing communications at any time.",
      },
      {
        type: "labeled",
        label: "To Comply with Legal Obligations",
        text: "We may use or retain your information where required to comply with applicable laws, regulations, or legal proceedings.",
      },
      {
        type: "labeled",
        label: "To Protect Our Business and Users",
        text: "We may use information to detect, investigate, and prevent fraudulent activity, security incidents, or violations of our terms.",
      },
    ],
  },
  {
    id: "how-we-share",
    heading: "Who We Share Your Information With",
    blocks: [
      {
        type: "p",
        text: "We do not sell your personal information. We do not share your data with third parties for their own marketing purposes. We share your information only in the following limited circumstances:",
      },
      {
        type: "labeled",
        label: "Service Providers",
        text: "We work with trusted third-party providers who assist us in operating our business, including hosting providers, payment processors, project management tools, and communication platforms. These providers are contractually obligated to handle your data securely and only as instructed by us.",
      },
      {
        type: "labeled",
        label: "Professional Advisors",
        text: "We may share information with our legal, financial, or business advisors where necessary and where appropriate confidentiality obligations are in place.",
      },
      {
        type: "labeled",
        label: "Legal Requirements",
        text: "We may disclose your information if required to do so by law, court order, or government authority, or if we believe in good faith that such disclosure is necessary to protect the rights, property, or safety of Enif, our clients, or others.",
      },
      {
        type: "labeled",
        label: "Business Transfers",
        text: "In the event of a merger, acquisition, or sale of all or part of our business, your information may be transferred as part of that transaction. We will notify you of any such change and the choices available to you.",
      },
    ],
  },
  {
    id: "data-retention",
    heading: "How Long We Keep Your Information",
    blocks: [
      {
        type: "p",
        text: "We retain your personal information for as long as necessary to fulfil the purposes described in this policy, unless a longer retention period is required or permitted by law. Specifically:",
      },
      {
        type: "list",
        items: [
          "Client project data and communications are retained for a minimum of five years following the completion of a project for legal and business record-keeping purposes.",
          "Enquiry and contact form data is retained for up to two years if no engagement follows the initial contact.",
          "Analytics data is retained in aggregate form and is not linked to individual identities after 26 months.",
          "Marketing communication preferences and subscription records are retained until you unsubscribe or request deletion.",
        ],
      },
      {
        type: "p",
        text: "When your data is no longer needed, we securely delete or anonymise it.",
      },
    ],
  },
  {
    id: "data-security",
    heading: "How We Protect Your Information",
    blocks: [
      {
        type: "p",
        text: "We take the security of your personal information seriously. We implement appropriate technical and organisational measures to protect your data against unauthorised access, loss, alteration, or disclosure. These measures include:",
      },
      {
        type: "list",
        items: [
          "Secure HTTPS encryption across our website",
          "Access controls limiting who within our team can access personal data",
          "Secure, reputable third-party platforms for data storage and communication",
          "Regular review of our security practices and third-party providers",
        ],
      },
      {
        type: "p",
        text: "While we take every reasonable precaution, no method of transmission over the internet or electronic storage is completely secure. We cannot guarantee absolute security, but we are committed to protecting your information to the best of our ability and will notify you promptly in the event of a breach that affects your data.",
      },
    ],
  },
  {
    id: "your-rights",
    heading: "Your Rights Over Your Data",
    blocks: [
      {
        type: "p",
        text: "Depending on your location and applicable law, you may have the following rights regarding your personal information:",
      },
      {
        type: "labeled",
        label: "Right to Access",
        text: "You have the right to request a copy of the personal information we hold about you.",
      },
      {
        type: "labeled",
        label: "Right to Correction",
        text: "You have the right to request that we correct any inaccurate or incomplete information we hold about you.",
      },
      {
        type: "labeled",
        label: "Right to Deletion",
        text: "You have the right to request that we delete your personal information, subject to certain legal exceptions.",
      },
      {
        type: "labeled",
        label: "Right to Restrict Processing",
        text: "You have the right to request that we limit how we use your information in certain circumstances.",
      },
      {
        type: "labeled",
        label: "Right to Data Portability",
        text: "Where technically feasible, you have the right to receive your personal data in a structured, commonly used format.",
      },
      {
        type: "labeled",
        label: "Right to Object",
        text: "You have the right to object to our processing of your personal information for marketing purposes at any time.",
      },
      {
        type: "labeled",
        label: "Right to Withdraw Consent",
        text: "Where we rely on your consent to process your data, you have the right to withdraw that consent at any time. Withdrawal of consent does not affect the lawfulness of processing carried out before withdrawal.",
      },
      {
        type: "p",
        text: "To exercise any of these rights, please contact us using the details provided in the Contact section below. We will respond to your request within 30 days.",
      },
    ],
  },
  {
    id: "third-party-links",
    heading: "Links to Other Websites",
    blocks: [
      {
        type: "p",
        text: "Our website may contain links to third-party websites, tools, or platforms. This Privacy Policy applies only to enifit.com and our services. We are not responsible for the privacy practices of any third-party websites and encourage you to review their privacy policies before providing any personal information.",
      },
    ],
  },
  {
    id: "childrens-privacy",
    heading: "Children's Privacy",
    blocks: [
      {
        type: "p",
        text: "Our website and services are not directed at children under the age of 16. We do not knowingly collect personal information from anyone under 16. If you believe we have inadvertently collected information from a child, please contact us immediately and we will take steps to delete it.",
      },
    ],
  },
  {
    id: "changes",
    heading: "Updates to This Privacy Policy",
    blocks: [
      {
        type: "p",
        text: 'We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or for other operational reasons. When we make material changes, we will update the "Last Updated" date at the top of this page.',
      },
      {
        type: "p",
        text: "We encourage you to review this policy periodically. Continued use of our website or services following any updates constitutes your acceptance of the revised policy.",
      },
    ],
  },
];

function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case "p":
      return <p className="text-[#A0A0A0] leading-relaxed">{block.text}</p>;
    case "sub":
      return (
        <h3 className="text-lg lg:text-xl font-semibold text-white pt-2">
          {block.text}
        </h3>
      );
    case "list":
      return (
        <ul className="space-y-2.5">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3 text-[#A0A0A0] leading-relaxed">
              <span className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#1B6BFF]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "labeled":
      return (
        <p className="text-[#A0A0A0] leading-relaxed">
          <span className="font-semibold text-white">{block.label}. </span>
          {block.text}
        </p>
      );
  }
}

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(27,107,255,0.08) 0%, transparent 70%)" }}
        />
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <SectionHeading
            badge="Legal"
            title="Privacy Policy"
            description="How we collect, use, share, and protect your personal information, and the rights you have over your data."
            align="left"
          />
          <p className="mt-5 text-sm text-[#606060]">Last Updated: {LAST_UPDATED}</p>
        </div>
      </section>

      {/* Body */}
      <section className="pb-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 space-y-14">
          {SECTIONS.map((section) => (
            <div key={section.id} className="scroll-mt-28" id={section.id}>
              <h2 className="text-2xl lg:text-3xl font-bold text-white leading-tight mb-5">
                {section.heading}
              </h2>
              <div className="space-y-4">
                {section.blocks.map((block, i) => (
                  <BlockRenderer key={i} block={block} />
                ))}
              </div>
            </div>
          ))}

          {/* Contact */}
          <div className="scroll-mt-28" id="contact">
            <h2 className="text-2xl lg:text-3xl font-bold text-white leading-tight mb-5">
              Questions or Concerns?
            </h2>
            <div className="space-y-4">
              <p className="text-[#A0A0A0] leading-relaxed">
                If you have any questions about this Privacy Policy, wish to exercise your data
                rights, or have a concern about how we handle your personal information, please
                contact us:
              </p>
              <div className="p-7 rounded-2xl bg-[#0F0F0F] border border-[#1E1E1E] space-y-1.5">
                <p className="font-semibold text-white">Enif IT Services Ltd</p>
                <p className="text-[#A0A0A0]">
                  Website:{" "}
                  <Link href="/" className="text-[#1B6BFF] hover:underline">
                    enifit.com
                  </Link>
                </p>
                <p className="text-[#A0A0A0]">
                  Email:{" "}
                  <a href="mailto:hello@enifit.com" className="text-[#1B6BFF] hover:underline">
                    hello@enifit.com
                  </a>
                </p>
                <p className="text-[#A0A0A0]">Location: Bangladesh</p>
              </div>
              <p className="text-[#A0A0A0] leading-relaxed">
                We are committed to resolving any concerns promptly and transparently.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="pt-4">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 px-7 py-3 bg-[#1B6BFF] hover:bg-[#3a7bff] text-white text-sm font-semibold rounded-xl transition-all duration-300 shadow-[0_0_28px_rgba(27,107,255,0.35)] hover:shadow-[0_0_48px_rgba(27,107,255,0.55)]"
            >
              Get in Touch
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
