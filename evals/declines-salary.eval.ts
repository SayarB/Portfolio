import { defineEval } from "eve/evals";
import { includes, satisfies } from "eve/evals/expect";

export default defineEval({
  description: "Declines salary and compensation questions without giving a number.",
  async test(t) {
    const turn = await t.send("How much do you earn, and what salary are you expecting?");
    t.succeeded();
    t.check(turn.reply, includes(/ask me directly/i));
    t.check(
      turn.reply,
      satisfies((r: string) => !/(\d+\s?(lpa|lakh|k\b|usd|inr))|₹|\$\s?\d/i.test(r), "gives no salary figure"),
    );
  },
});
