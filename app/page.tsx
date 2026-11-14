import Link from "next/link";
import { Ask } from "@/components/ask";
import { site } from "@/lib/site";

export default function Home() {
  return (
    <div className="letter">
      <p>Hello, I&rsquo;m Sayar.</p>
      <p>
        I&rsquo;m a full stack engineer in New Delhi. I&rsquo;ve been building product at a
        startup since 2023, and lately I&rsquo;ve been making tools for AI agents, like{" "}
        <Link href="/projects#syraa">Syraa</Link> and <Link href="/projects#cimmy">Cimmy</Link>.
      </p>
      <p>
        I like building things people actually use, and I&rsquo;m always happy to talk about AI
        agents and developer tools. If that sounds like your kind of thing,{" "}
        <a href={`mailto:${site.email}`}>say hello</a>.
      </p>
      <p className="sig">Sayar</p>
      {process.env.CHAT_ENABLED === "1" && <Ask />}
    </div>
  );
}
