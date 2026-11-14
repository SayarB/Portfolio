import { defineEval } from "eve/evals";
import { includes } from "eve/evals/expect";

export default defineEval({
  description: "Ends supported and unsupported answers alike with a source line.",
  async test(t) {
    const supported = await t.send("What drained you most in the last two years?");
    t.check(supported.reply, includes("from Sayar's notes:"));
    const unsupported = await t.send("What's your favourite football team?");
    t.check(unsupported.reply, includes("from Sayar's notes:"));
    t.check(unsupported.reply, includes(/ask me directly/i));
    t.usedNoTools();
  },
});
