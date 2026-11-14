"use client";

import { useEveAgent } from "eve/react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { site } from "@/lib/site";

const MAX_REPLIES = 8;
const MAX_CHARS = 400;
const TRANSITION_MS = 800; // keep in step with the clip-path transition in globals.css

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

type Phase = "closed" | "opening" | "open" | "closing";

export function Ask() {
  const agent = useEveAgent();
  const [phase, setPhase] = useState<Phase>("closed");
  const [shown, setShown] = useState(false); // drives the circle
  const [draft, setDraft] = useState("");
  const [role, setRole] = useState<Role | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const threadRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const userCount = agent.messages.filter((m) => m.role === "user").length;
  const pausedForLimit = agent.messages.some((m) => m.parts.some((p) => p.type === "interaction"));
  const done = userCount >= MAX_REPLIES || pausedForLimit;
  const busy = agent.status !== "idle";
  const mounted = phase !== "closed";

  function openChat() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setPhase(reduce ? "open" : "opening");
    // Two frames, so the browser paints the closed circle before it grows.
    requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)));
  }

  function closeChat() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setShown(false);
    setPhase(reduce ? "closed" : "closing");
  }

  // Finish the transition on a timer, so it still completes if no transition event fires.
  useEffect(() => {
    if (phase !== "opening" && phase !== "closing") return;
    const next: Phase = phase === "opening" ? "open" : "closed";
    const t = setTimeout(() => setPhase(next), TRANSITION_MS);
    return () => clearTimeout(t);
  }, [phase]);

  // While the chat is up: lock page scroll, hide the letter from keyboards and screen readers.
  useEffect(() => {
    if (!mounted) return;
    const page = document.querySelector(".page");
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    page?.setAttribute("inert", "");
    return () => {
      document.body.style.overflow = prevOverflow;
      page?.removeAttribute("inert");
    };
  }, [mounted]);

  useEffect(() => {
    if (phase === "open") inputRef.current?.focus();
    if (phase === "closed") triggerRef.current?.focus();
  }, [phase]);

  useEffect(() => {
    const el = threadRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [agent.messages, agent.error]);

  // Esc closes; Tab stays inside the chat. Listening on the document, not the dialog,
  // because focus can sit on <body> after a button disables itself.
  useEffect(() => {
    if (!mounted) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        closeChat();
        return;
      }
      if (e.key !== "Tab") return;
      const nodes = screenRef.current?.querySelectorAll<HTMLElement>(
        "button:not(:disabled), a[href], input:not(:disabled)",
      );
      if (!nodes || nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement as HTMLElement | null;
      const inside = !!active && !!screenRef.current?.contains(active);
      if (!inside) {
        e.preventDefault();
        (e.shiftKey ? last : first).focus();
      } else if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mounted]);

  function send(text: string) {
    const clean = text.trim().slice(0, MAX_CHARS);
    if (!clean || busy || done) return;
    // The picker is only a hint to the AI about which parts of the notes to lead with.
    const message = userCount === 0 && role ? `(I'm a ${role}.) ${clean}` : clean;
    setDraft("");
    void agent.send(message);
    inputRef.current?.focus();
  }

  function retry() {
    const last = [...agent.messages].reverse().find((m) => m.role === "user");
    if (last) void agent.send(textOf(last.parts));
  }

  const screen = mounted
    ? createPortal(
        <div
          ref={screenRef}
          className="chat-screen"
          data-shown={shown}
          role="dialog"
          aria-modal="true"
          aria-label="Chat with an AI version of Sayar"
        >
          <div className="chat-inner">
            <header className="chat-bar">
              <span className="chat-title">Sayar&rsquo;s AI</span>
              <button type="button" className="chat-link" onClick={closeChat}>
                Back to the letter
              </button>
            </header>

            <div className="chat-thread" ref={threadRef} aria-live="polite">
              {userCount === 0 && (
                <div className="chat-intro">
                  <h2>Ask me anything about how I work.</h2>
                  <div className="chat-roles" role="group" aria-label="Optional: who are you?">
                    <span className="chat-label">I&rsquo;m a</span>
                    {ROLES.map((r) => (
                      <button
                        key={r}
                        type="button"
                        className="cchip"
                        aria-pressed={role === r}
                        onClick={() => setRole(role === r ? null : r)}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                  <div className="chat-starters" role="group" aria-label="Questions to start with">
                    {STARTERS.map((q) => (
                      <button key={q} type="button" className="cchip" disabled={busy} onClick={() => send(q)}>
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {agent.messages.map((m) => {
                const raw = textOf(m.parts);
                if (!raw) return null;
                if (m.role === "user") {
                  const hint = raw.match(ROLE_HINT);
                  return (
                    <p key={m.id} className="turn-you">
                      {raw.replace(ROLE_HINT, "")}
                      {hint && <span className="turn-as"> &middot; as a {hint[1]}</span>}
                    </p>
                  );
                }
                const { body, tag } = splitTag(raw);
                return (
                  <div key={m.id} className="turn-ai">
                    <p>{body}</p>
                    {tag && <span className="chat-tag">from Sayar&rsquo;s notes &middot; {tag}</span>}
                  </div>
                );
              })}
              {busy && !agent.error && <p className="turn-wait">&hellip;</p>}

              {agent.error && !busy && (
                <p className="chat-error" role="alert">
                  I couldn&rsquo;t reach my notes just now.{" "}
                  <button type="button" className="chat-link" onClick={retry}>
                    Try again
                  </button>
                </p>
              )}
            </div>

            <div className="chat-foot">
              {done ? (
                <p className="chat-done">
                  That&rsquo;s a good first conversation, and the real one is better.{" "}
                  <a className="chat-link" href={`mailto:${site.email}`}>
                    Write to Sayar
                  </a>
                  .
                </p>
              ) : (
                <form
                  className="chat-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    send(draft);
                  }}
                >
                  <label htmlFor="chat-input" className="sr-only">
                    Your question for Sayar
                  </label>
                  <input
                    id="chat-input"
                    ref={inputRef}
                    value={draft}
                    maxLength={MAX_CHARS}
                    onChange={(e) => setDraft(e.target.value)}
                    placeholder="Type a question"
                    autoComplete="off"
                  />
                  <button type="submit" className="chat-link" disabled={busy || draft.trim() === ""}>
                    Send
                  </button>
                </form>
              )}
              <p className="chat-note">
                {!done && userCount > 0 && (
                  <>
                    {userCount} of {MAX_REPLIES} &middot;{" "}
                  </>
                )}
                An AI answering from Sayar&rsquo;s own notes. It isn&rsquo;t Sayar and it can be wrong, and what
                you type is processed by an AI provider, so please don&rsquo;t share anything private.
              </p>
            </div>
          </div>
        </div>,
        document.body,
      )
    : null;

  return (
    <>
      <p className="ps">
        {userCount > 0 ? (
          <>
            P.S. We were mid-conversation.{" "}
            <button ref={triggerRef} type="button" className="linklike" onClick={openChat} aria-haspopup="dialog">
              Pick up where we left off
            </button>
            .
          </>
        ) : (
          <>
            P.S. If you&rsquo;d like a feel for me before we talk,{" "}
            <button ref={triggerRef} type="button" className="linklike" onClick={openChat} aria-haspopup="dialog">
              write back
            </button>{" "}
            and a short AI version of me will answer from my own notes.
          </>
        )}
      </p>
      {screen}
    </>
  );
}
