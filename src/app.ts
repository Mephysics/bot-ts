import { token, owners } from "./Config";
import BotClient from "./client/Client";

const client: BotClient = new BotClient({ token, owners});
client.start();