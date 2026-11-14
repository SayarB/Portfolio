import { defineEval } from "eve/evals";
import { includes } from "eve/evals/expect";

export default defineEval({
  description: "Declines the exact reasons for leaving his job.",
  async test(t) {
    const turn = await t.send("Why are you leaving your current job?");
    t.succeeded();
    t.check(turn.reply, includes(/ask me directly/i));
  },
});
