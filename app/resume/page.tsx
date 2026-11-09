import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Resume",
  description: "Resume of Sayar Bhattacharyya, full stack engineer.",
};

const work = [
  {
    org: "MADverse Music",
    role: "Full Stack Developer (Intern + Fulltime) (NextJS, TRPC, Prisma, drizzle, MySQL)",
    dates: "Apr 2023 - Present",
    bullets: [
      "Built multiple features affecting 1,50,000+ users.",
      "Heavily worked on AI, LLM Based solutions for quality assurance on Music Metadata using N8N, Pinecone, Gemini LLMs. Built a scalable system for continuous AI QC System",
      "Built multiple automation scripts/workflows for data consistency across multiple platforms and servers.",
      "Efficiently used Serverless Technologies such as PlanetScale, Vercel, Upstash.",
      "Improved and optimized Royalty Ingestion Logic by 60-80%",
      "Built and deployed several microservices on the Hetzner Cloud, AWS, Modal.com",
      "Used Docker, Docker compose, to deploy several applications on Coolify.",
      "Worked with Timescale DB, postgres, sqlite, MySQL, AWS Lambda",
    ],
  },
  {
    org: "Reunion",
    role: "Frontend Development Intern (Typescript, Gatsby JS, Graphql, Strapi)",
    dates: "Nov 2022 - Feb 2023",
    bullets: [
      "Developed a comprehensive UI Component Library with ReactJS, published as an npm package, that increased development speed by 40% and used Storybook for state visualization",
      "Wrote extensive unit tests on Jest and React Testing Library.",
      "Worked with Strapi API to integrate data and styling into the website. Used GraphQL to efficiently query data and used Mustache to transform json.",
    ],
  },
];

const projects = [
  {
    name: "Syraa - Local AI Agent Harness (github.com/SayarB/syraa)",
    dates: "Aug 2026 - Present",
    stack: "TypeScript, React, Vite, Node.js, PostgreSQL, Redis, Python, Docker, Better Auth, Langfuse",
    bullets: [
      "Built an AI agent harness with chat, durable memory (preferences, rules, methods, decisions stored in Postgres) and PDF context ingestion, as a TypeScript monorepo with a React UI, an API and a Python ingest worker.",
      "Designed the PDF ingest pipeline: upload, Redis queue, Python worker (bookmarks, printed TOC and heading heuristics), then topics and chunks in Postgres, plus an AI summary per document that the chat prompt uses instead of every section title.",
      "Added Langfuse tracing (one trace per chat turn and per document ingest), Google and magic-link sign-in with Better Auth, Docker Compose deployment to a VPS with Dokploy, and tests with Vitest and pytest.",
    ],
  },
  {
    name: "Cimmy - Repo-Connected Agent Ops Platform",
    dates: "Sep 2026 - Present",
    stack: "TypeScript, Node.js, pnpm monorepo, Docker, Sysbox, GitHub App, Better Auth",
    bullets: [
      "Built a platform that connects GitHub repositories and runs in-repo .cimmy skills inside ephemeral Cursor agent containers, with a web UI, API, worker and scheduler.",
      "Designed the isolation model: a separate broker is the only holder of the Docker socket, runs execute under Sysbox as a non-root user with hard CPU, memory and PID limits, and containers receive only short-lived GitHub installation tokens.",
      "Built a CLI to scaffold and validate skills for any project.",
    ],
  },
];

const skillGroups = [
  {
    label: "AI & Agents",
    items:
      "Vercel AI SDK, Mastra, MCP (servers and clients), tool-calling agents, RAG, Pinecone, LLM evals, Langfuse, n8n",
  },
  {
    label: "Languages & Frontend",
    items:
      "TypeScript, JavaScript, Python, Go, SQL, React, Next.js, Vite, Tailwind CSS, shadcn/ui, tRPC, TanStack Query",
  },
  {
    label: "Backend & Data",
    items:
      "Node.js, Hono, Fastify, Drizzle, Prisma, PostgreSQL, MySQL, ClickHouse, Redis, BullMQ, Better Auth, OAuth, Stripe",
  },
  {
    label: "Infra & Tools",
    items:
      "Docker, AWS, Dokploy, Coolify, Vercel, GitHub Actions, Tailscale, Sentry, Turborepo, Vitest, Playwright, pytest, Git",
  },
  {
    label: "Also used",
    items: "Java, Django, MongoDB, Firebase, Socket.io, Redux, Material UI, GraphQL, Zustand, Postman",
  },
];

export default function ResumePage() {
  return (
    <article className="resume">
      <h1>{site.name}</h1>
      <div className="contact">
        <a href={`mailto:${site.email}`}>{site.email}</a>
        <a href={site.github}>github.com/SayarB</a>
        <a href={site.linkedin}>linkedin.com/in/sayar-bhattacharyya</a>
      </div>

      <h2>Work experience</h2>
      {work.map((w) => (
        <div className="item" key={w.org}>
          <div className="item-head">
            {w.org}
            <span>{w.dates}</span>
          </div>
          <div className="sub">{w.role}</div>
          <ul>
            {w.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
      ))}

      <h2>Projects</h2>
      {projects.map((p) => (
        <div className="item" key={p.name}>
          <div className="item-head">
            {p.name}
            <span>{p.dates}</span>
          </div>
          <div className="sub">{p.stack}</div>
          <ul>
            {p.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
      ))}

      <h2>Skills</h2>
      {skillGroups.map((g) => (
        <p className="skills" key={g.label}>
          <strong>{g.label}:</strong> {g.items}
        </p>
      ))}

      <h2>Education</h2>
      <div className="item" style={{ marginTop: 10 }}>
        <div className="item-head">
          Vellore Institute of Technology
          <span>2021 - 2025</span>
        </div>
        <div>
          BTech., Information Technology <span style={{ color: "var(--muted)" }}>· CGPA = 9.03</span>
        </div>
      </div>

      <h2>Volunteership experience</h2>
      <div className="item" style={{ marginTop: 10 }}>
        <div className="item-head">
          GDSC (Google Developer Student Clubs) VIT Vellore
          <span>Mar 2022 - Present</span>
        </div>
        <div className="sub">Inner Core Committee Member</div>
        <ul>
          <li>Helped Organize events such as Women Techies &lsquo;22, and Devjams &lsquo;22.</li>
          <li>Was an Integral part of Building the GDSC Website</li>
          <li>Contributed on the Website of Women Techies &lsquo;22, Deconstru.ctf &lsquo;22.</li>
        </ul>
      </div>

      <a className="print-btn" href="/resume.pdf" download="Sayar_Bhattacharyya_Resume.pdf">
        Download PDF
      </a>
    </article>
  );
}
