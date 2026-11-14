"use client";

import { useEveAgent } from "eve/react";
import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";

const MAX_REPLIES = 8;
const MAX_CHARS = 400;

const STARTERS = [
  "How did you get into software?",
  "What are you like to work with?",
  "What do you love building?",
  "What drained you most recently?",
  "What do people get wrong about you?",
];

const ROLES = ["recruiter", "hiring manager", "teammate", "just curious"] as const;
type Role = (typeof ROLES)[number];

const TAG = /^from Sayar'?s notes:\s*(.+)$/im;
const ROLE_HINT = /^\(I'm an? ([^.)]+)\.\)\s*/;

/** Splits "answer \n\n from Sayar's notes: topic" into the answer and a small tag. */
function splitTag(text: string): { body: string; tag: string | null } {
  const match = text.match(TAG);
  if (!match) return { body: text.trim(), tag: null };
  const tag = match[1].trim();
  return {
    body: text.replace(TAG, "").trim(),
    tag: tag.toLowerCase() === "nothing on this yet" ? null : tag,
  };
}

function textOf(parts: ReadonlyArray<{ type: string; text?: string }>): string {
  return parts
    .filter((p) => p.type === "text")
    .map((p) => p.text ?? "")
    .join("");
}

export function Ask() {
  const agent = useEveAgent();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [role, setRole] = useState<Role | null>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const userCount = agent.messages.filter((m) => m.role === "user").length;
  const pausedForLimit = agent.messages.some((m) => m.parts.some((p) => p.type === "interaction"));
  const done = userCount >= MAX_REPLIES || pausedForLimit;
  const busy = agent.status !== "idle";

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [agent.messages]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  function send(text: string) {
    const clean = text.trim().slice(0, MAX_CHARS);
    if (!clean || busy || done) return;
    // The picker is only a hint to the AI about which parts of the notes to lead with.
    const message = userCount === 0 && role ? `(I'm a ${role}.) ${clean}` : clean;
    setDraft("");
    void agent.send(message);
  }

  function retry() {
    const last = [...agent.messages].reverse().find((m) => m.role === "user");
    if (last) void agent.send(textOf(last.parts));
  }

  if (!open) {
    return (
      <p className="ps">
        P.S. If you&rsquo;d like a feel for me before we talk,{" "}
        <button type="button" className="linklike" onClick={() => setOpen(true)} aria-expanded={false}>
          write back
        </button>{" "}
        and a short AI version of me will answer from my own notes.
      </p>
    );
  }

  return (
    <section className="ask" aria-label="Write back to Sayar">
      <p className="ask-note">
        This is an AI answering from Sayar&rsquo;s own notes. It isn&rsquo;t Sayar and it can be wrong, and
        what you type is processed by an AI provider. Please don&rsquo;t share anything private.
      </p>

      {userCount === 0 && (
        <div className="ask-setup">
          <div className="ask-roles" role="group" aria-label="Optional: who are you?">
            <span className="ask-label">I&rsquo;m a</span>
            {ROLES.map((r) => (
              <button
                key={r}
                type="button"
                className="chip"
                aria-pressed={role === r}
                onClick={() => setRole(role === r ? null : r)}
              >
                {r}
              </button>
            ))}
          </div>
          <div className="ask-starters" role="group" aria-label="Questions to start with">
            {STARTERS.map((q) => (
              <button key={q} type="button" className="chip chip-q" disabled={busy} onClick={() => send(q)}>
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="ask-thread" aria-live="polite">
        {agent.messages.map((m) => {
          const raw = textOf(m.parts);
          if (!raw) return null;
          if (m.role === "user") {
            const hint = raw.match(ROLE_HINT);
            return (
              <p key={m.id} className="turn turn-you">
                {raw.replace(ROLE_HINT, "")}
                {hint && <span className="turn-as"> &middot; as a {hint[1]}</span>}
              </p>
            );
          }
          const { body, tag } = splitTag(raw);
          return (
            <div key={m.id} className="turn turn-ai">
              <p>{body}</p>
              {tag && <span className="tag">from Sayar&rsquo;s notes &middot; {tag}</span>}
            </div>
          );
        })}
        {busy && !agent.error && <p className="turn-wait">&hellip;</p>}
        <div ref={endRef} />
      </div>

      {agent.error && !busy && (
        <p className="ask-error" role="alert">
          I couldn&rsquo;t reach my notes just now.{" "}
          <button type="button" className="linklike" onClick={retry}>
            Try again
          </button>
        </p>
      )}

      {done ? (
        <p className="ask-done">
          That&rsquo;s a good first conversation, and the real one is better.{" "}
          <a href={`mailto:${site.email}`}>Write to Sayar</a>.
        </p>
      ) : (
        <form
          className="ask-form"
          onSubmit={(e) => {
            e.preventDefault();
            send(draft);
          }}
        >
          <label htmlFor="ask-input" className="sr-only">
            Your question for Sayar
          </label>
          <input
            id="ask-input"
            ref={inputRef}
            value={draft}
            maxLength={MAX_CHARS}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Ask me anything about how I work"
            autoComplete="off"
            disabled={busy}
          />
          <button type="submit" className="linklike" disabled={busy || draft.trim() === ""}>
            Send
          </button>
        </form>
      )}

      {!done && userCount > 0 && (
        <p className="ask-count">
          {userCount} of {MAX_REPLIES}
        </p>
      )}
    </section>
  );
}
