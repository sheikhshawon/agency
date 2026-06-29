import React from "react";

/**
 * Minimal, dependency-free Markdown renderer for blog content.
 * Supports: # / ## / ### headings, - / * bullet lists, 1. numbered lists,
 * > blockquotes, **bold**, *italic*, and [text](url) links.
 * Output is styled for the dark site theme.
 */

function renderInline(text: string, keyPrefix: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const regex = /(\*\*([^*]+)\*\*|\*([^*]+)\*|\[([^\]]+)\]\(([^)]+)\))/g;
  let last = 0;
  let i = 0;
  let m: RegExpExecArray | null;

  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    if (m[2] !== undefined) {
      nodes.push(
        <strong key={`${keyPrefix}-b-${i}`} className="font-semibold text-white">
          {m[2]}
        </strong>
      );
    } else if (m[3] !== undefined) {
      nodes.push(<em key={`${keyPrefix}-i-${i}`}>{m[3]}</em>);
    } else if (m[4] !== undefined) {
      nodes.push(
        <a
          key={`${keyPrefix}-a-${i}`}
          href={m[5]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#1B6BFF] underline underline-offset-2 hover:text-[#4A8FFF]"
        >
          {m[4]}
        </a>
      );
    }
    last = m.index + m[0].length;
    i++;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

const isHeading = (l: string) => /^(#{1,3})\s+/.test(l);
const isBullet = (l: string) => /^\s*[-*]\s+/.test(l);
const isNumbered = (l: string) => /^\s*\d+\.\s+/.test(l);
const isQuote = (l: string) => /^\s*>\s?/.test(l);

export function renderMarkdown(md: string): React.ReactNode[] {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const blocks: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === "") {
      i++;
      continue;
    }

    // Heading
    const h = line.match(/^(#{1,3})\s+(.*)$/);
    if (h) {
      const level = h[1].length;
      const content = renderInline(h[2], `h${key}`);
      if (level === 1) {
        blocks.push(<h2 key={key} className="text-2xl font-bold text-white mt-10 mb-4">{content}</h2>);
      } else if (level === 2) {
        blocks.push(<h3 key={key} className="text-xl font-bold text-white mt-8 mb-3">{content}</h3>);
      } else {
        blocks.push(<h4 key={key} className="text-lg font-semibold text-white mt-6 mb-2">{content}</h4>);
      }
      key++;
      i++;
      continue;
    }

    // Bullet list
    if (isBullet(line)) {
      const items: string[] = [];
      while (i < lines.length && isBullet(lines[i])) {
        items.push(lines[i].replace(/^\s*[-*]\s+/, ""));
        i++;
      }
      blocks.push(
        <ul key={key} className="list-disc pl-6 mb-6 space-y-2 text-[#A0A0A0] marker:text-[#1B6BFF]">
          {items.map((it, idx) => (
            <li key={idx} className="leading-relaxed">{renderInline(it, `ul${key}-${idx}`)}</li>
          ))}
        </ul>
      );
      key++;
      continue;
    }

    // Numbered list
    if (isNumbered(line)) {
      const items: string[] = [];
      while (i < lines.length && isNumbered(lines[i])) {
        items.push(lines[i].replace(/^\s*\d+\.\s+/, ""));
        i++;
      }
      blocks.push(
        <ol key={key} className="list-decimal pl-6 mb-6 space-y-2 text-[#A0A0A0] marker:text-[#1B6BFF] marker:font-semibold">
          {items.map((it, idx) => (
            <li key={idx} className="leading-relaxed">{renderInline(it, `ol${key}-${idx}`)}</li>
          ))}
        </ol>
      );
      key++;
      continue;
    }

    // Blockquote
    if (isQuote(line)) {
      const quote: string[] = [];
      while (i < lines.length && isQuote(lines[i])) {
        quote.push(lines[i].replace(/^\s*>\s?/, ""));
        i++;
      }
      blocks.push(
        <blockquote key={key} className="border-l-2 border-[#1B6BFF] pl-5 my-6 italic text-[#A0A0A0]">
          {renderInline(quote.join(" "), `q${key}`)}
        </blockquote>
      );
      key++;
      continue;
    }

    // Paragraph (collect until a blank line or a new block starts)
    const para: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !isHeading(lines[i]) &&
      !isBullet(lines[i]) &&
      !isNumbered(lines[i]) &&
      !isQuote(lines[i])
    ) {
      para.push(lines[i]);
      i++;
    }
    blocks.push(
      <p key={key} className="text-[#A0A0A0] leading-relaxed text-base mb-5">
        {renderInline(para.join(" "), `p${key}`)}
      </p>
    );
    key++;
  }

  return blocks;
}
