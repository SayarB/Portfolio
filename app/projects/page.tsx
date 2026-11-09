import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Things Sayar has been building lately: Syraa, Cimmy and Hem Vault.",
};

const projects = [
  {
    id: "syraa",
    name: "Syraa",
    meta: "2026 · TypeScript, React, Postgres, Redis, Python",
    body: "A local agent harness: chat with durable memory, plus a way to feed it PDFs. A Python worker splits each upload into topics and chunks, and the chat prompt gets a short summary of every document instead of the whole thing. Every chat turn is traced with Langfuse.",
    links: [{ label: "Source on GitHub", href: "https://github.com/SayarB/syraa" }],
  },
  {
    id: "cimmy",
    name: "Cimmy",
    meta: "2026 · TypeScript, Docker, GitHub App",
    body: "Connects a GitHub repo and runs the skills that live inside it in throw-away agent containers. The part I enjoyed most was the isolation: a small broker is the only thing that touches Docker, and every run is sandboxed with short-lived tokens.",
    links: [],
    note: "Private for now.",
  },
  {
    id: "hem-vault",
    name: "Hem Vault",
    meta: "2026 · TypeScript, MCP",
    body: "An MCP server that gives coding agents (Claude, Cursor, Codex, Zed) a memory: a markdown vault they can search, read and write. You install it by pasting one sentence into your agent.",
    links: [{ label: "Source on GitHub", href: "https://github.com/SayarB/ai-mcp-brain" }],
  },
];

export default function ProjectsPage() {
  return (
    <>
      <h1 className="page-title">Projects</h1>
      <p className="lede">A few things I&rsquo;ve been making lately.</p>
      {projects.map((p) => (
        <section className="entry" id={p.id} key={p.id}>
          <h2>{p.name}</h2>
          <div className="meta">{p.meta}</div>
          <p>{p.body}</p>
          <div className="links">
            {p.links.map((l) => (
              <a className="ext" key={l.href} href={l.href} target="_blank" rel="noreferrer noopener">
                {l.label} ↗
              </a>
            ))}
            {p.note && <span style={{ color: "var(--muted)" }}>{p.note}</span>}
          </div>
        </section>
      ))}
    </>
  );
}
