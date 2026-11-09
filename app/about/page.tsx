import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "About Sayar Bhattacharyya, a full stack engineer in New Delhi.",
};

export default function AboutPage() {
  return (
    <>
      <h1 className="page-title">About</h1>
      <div className="prose" style={{ marginTop: 30 }}>
        <p>
          I&rsquo;m Sayar, a full stack engineer based in New Delhi. These days most of my time goes
          into AI agents: tool-calling agents built with the Vercel AI SDK and Mastra, MCP servers
          and clients, and the evals and tracing that keep them honest. Around that I work in
          TypeScript, React, Next.js and Node with Postgres underneath, and I reach for Python or Go
          when the job needs them.
        </p>
        <p>
          Since 2023 I&rsquo;ve been at MADverse Music, a music-tech startup. I&rsquo;ve built features
          used by over 1,50,000 people, made the royalty ingestion pipeline 60&ndash;80% faster, and
          built an AI quality-control system for music metadata with n8n, Pinecone and Gemini.
        </p>
        <p>
          Before that I did frontend internships, including a component library published to npm.
          I studied information technology at VIT Vellore.
        </p>
        <p>
          Lately I&rsquo;ve been spending my time on how AI agents should remember things and run
          safely, and turning those ideas into small tools. If you want to talk about any of it,
          I&rsquo;m at <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </div>
    </>
  );
}
