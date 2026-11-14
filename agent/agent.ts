import { defineAgent } from "eve";

export default defineAgent({
  // Cheap and fast. About $0.002 per 8-message conversation in testing.
  model: "anthropic/claude-haiku-5.5",
  reasoning: "low",
  // Tool-free Q&A about Sayar. No shell, files or sandbox work.
  defaultTools: false,
  limits: {
    // Ends a runaway session. Counts new input tokens only (cache reads excluded).
    // A normal 8-message chat uses about 8,000. On crossing it, eve pauses the turn;
    // the chat UI treats a pause as "that's enough" and offers no Continue.
    sessionUsage: ({ window }) => window.inputTokens - window.cacheReadTokens >= 30_000,
  },
});
