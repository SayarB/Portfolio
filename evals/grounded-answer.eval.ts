import { defineEval } from "eve/evals";
import { includes } from "eve/evals/expect";

export default defineEval({
  description: "Answers a supported question from the notes, in first person, with a source tag, using no tools.",
  async test(t) {
    const turn = await t.send("How did you get into software?");
    t.succeeded();
    t.usedNoTools();
    t.check(turn.reply, includes(/Java/i));
    t.check(turn.reply, includes("from Sayar's notes:"));
  },
});
