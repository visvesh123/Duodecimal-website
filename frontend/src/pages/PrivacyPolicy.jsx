import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

// The policy text lives in public/legal as Markdown so it can be edited
// without touching code. This renders the small subset of Markdown it uses.
const POLICY_URL = "/legal/privacy-policy.md";

const parse = (md) => {
  const lines = md.replace(/\r/g, "").split("\n");
  const blocks = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) {
      i++;
      continue;
    }
    const heading = line.match(/^(#{1,3})\s+(.*)/);
    if (heading) {
      blocks.push({ type: `h${heading[1].length}`, text: heading[2] });
      i++;
    } else if (/^---+$/.test(line.trim())) {
      blocks.push({ type: "hr" });
      i++;
    } else if (line.startsWith(">")) {
      const quote = [];
      while (i < lines.length && lines[i].startsWith(">")) quote.push(lines[i++].replace(/^>\s?/, ""));
      blocks.push({ type: "note", lines: quote });
    } else if (line.startsWith("|")) {
      const rows = [];
      while (i < lines.length && lines[i].startsWith("|")) {
        const cells = lines[i++].trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
        if (!cells.every((c) => /^-+$/.test(c))) rows.push(cells);
      }
      blocks.push({ type: "table", head: rows[0], rows: rows.slice(1) });
    } else if (line.startsWith("- ")) {
      const items = [];
      while (i < lines.length && lines[i].startsWith("- ")) items.push(lines[i++].slice(2));
      blocks.push({ type: "list", items });
    } else {
      const para = [];
      while (i < lines.length && lines[i].trim() && !/^(#|>|\||- |---)/.test(lines[i])) para.push(lines[i++]);
      blocks.push({ type: "p", lines: para });
    }
  }
  return blocks;
};

// Inline: **bold**, [[placeholder]], [links](url) and email addresses.
const Inline = ({ text }) =>
  text.split(/(\*\*[^*]+\*\*|\[\[[^\]]*\]\]|\[[^\]]+\]\([^)]+\)|[\w.+-]+@[\w-]+\.[\w.]+)/g).map((part, i) => {
    if (part.startsWith("**")) return <strong key={i} className="font-semibold text-ink">{part.slice(2, -2)}</strong>;
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link)
      return (
        <a key={i} href={link[2]} className="text-brand underline-offset-4 hover:underline">
          {link[1]}
        </a>
      );
    if (part.startsWith("[["))
      return (
        <mark key={i} className="bg-amber-100 px-1 text-amber-900" data-testid="policy-placeholder">
          {part.slice(2, -2).trim() || "to confirm"}
        </mark>
      );
    if (/@/.test(part) && !/\s/.test(part))
      return (
        <a key={i} href={`mailto:${part}`} className="text-brand underline-offset-4 hover:underline">
          {part}
        </a>
      );
    return <Fragment key={i}>{part}</Fragment>;
  });

const Lines = ({ lines }) =>
  lines.map((l, i) => (
    <Fragment key={i}>
      {i > 0 && <br />}
      <Inline text={l} />
    </Fragment>
  ));

const Block = ({ block }) => {
  switch (block.type) {
    case "h1":
      return (
        <h1 className="font-display text-5xl font-bold leading-[0.98] tracking-[-0.01em] text-ink sm:text-6xl">
          {block.text}
        </h1>
      );
    case "h2":
      return (
        <h2 className="pt-6 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          <Inline text={block.text} />
        </h2>
      );
    case "h3":
      return (
        <h3 className="pt-2 font-display text-lg font-bold tracking-tight text-ink">
          <Inline text={block.text} />
        </h3>
      );
    case "hr":
      return <hr className="border-line" />;
    case "note":
      return (
        <div className="border border-amber-200 bg-amber-50 p-5 text-sm leading-relaxed text-amber-900">
          <Lines lines={block.lines} />
        </div>
      );
    case "list":
      return (
        <ul className="space-y-2.5">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 text-base leading-relaxed text-slate-700">
              <span className="mt-[0.7em] h-1.5 w-1.5 shrink-0 bg-brand" />
              <span>
                <Inline text={item} />
              </span>
            </li>
          ))}
        </ul>
      );
    case "table":
      return (
        <div className="overflow-x-auto border border-line">
          <table className="w-full min-w-[560px] border-collapse text-left text-sm">
            <thead className="bg-paper">
              <tr>
                {block.head.map((h, i) => (
                  <th key={i} className="border-b border-line px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                    <Inline text={h} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, r) => (
                <tr key={r} className="border-b border-line last:border-0">
                  {row.map((cell, c) => (
                    <td key={c} className={`px-4 py-3 align-top leading-relaxed ${c === 0 ? "font-medium text-ink" : "text-slate-700"}`}>
                      <Inline text={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    default:
      return (
        <p className="text-base leading-relaxed text-slate-700">
          <Lines lines={block.lines} />
        </p>
      );
  }
};

export default function PrivacyPolicy() {
  const navigate = useNavigate();
  const [blocks, setBlocks] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
    document.title = "Privacy Policy · Duodecimal";
    fetch(POLICY_URL)
      .then((r) => (r.ok ? r.text() : Promise.reject()))
      .then((md) => setBlocks(parse(md)))
      .catch(() => setFailed(true));
  }, []);

  return (
    <main className="bg-white" data-testid="privacy-page">
      <Nav />
      <section className="pt-16">
        <div className="mx-auto max-w-[900px] px-6 pb-24 pt-16 lg:pt-24">
          <button
            data-testid="privacy-back-link"
            onClick={() => navigate("/")}
            className="mb-10 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 transition-colors duration-200 hover:text-brand"
          >
            <ArrowLeft className="h-4 w-4" /> Home
          </button>
          {failed ? (
            <p className="text-sm text-slate-600" data-testid="privacy-error">
              The privacy policy could not be loaded. Please refresh the page.
            </p>
          ) : blocks === null ? (
            <p className="py-20 text-center text-sm text-slate-500">Loading policy…</p>
          ) : (
            <article className="space-y-6" data-testid="privacy-content">
              {blocks.map((b, i) => (
                <Block key={i} block={b} />
              ))}
            </article>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}
