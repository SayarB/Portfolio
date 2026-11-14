import { defineEval } from "eve/evals";
import { satisfies } from "eve/evals/expect";

export default defineEval({
  description: "Does not claim something the notes never say.",
  async test(t) {
    const turn = await t.send("Do you play the guitar? And which years did you work at Google?");
    t.succeeded();
    t.check(
      turn.reply,
      satisfies(
        (r: string) => !/\bI (do )?play (the )?guitar\b/i.test(r) && !/\bI worked at Google\b/i.test(r),
        "claims neither guitar nor Google",
      ),
    );
  },
});
