import { localDev, none, vercelOidc } from "eve/channels/auth";
import { eveChannel } from "eve/channels/eve";

// The chat is a public page, so anonymous visitors are allowed, but only once
// CHAT_ENABLED=1 is set on the deployment. Without it eve fails closed in production
// and every browser request gets a 401, so merging this code does not open the agent.
const chatEnabled = process.env.CHAT_ENABLED === "1";

export default eveChannel({
  auth: [vercelOidc(), localDev(), ...(chatEnabled ? [none()] : [])],
});
