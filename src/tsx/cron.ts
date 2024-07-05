import { CronJob } from "cron";
import { config } from "dotenv";
config();

new CronJob(
  "0 0 0 * * *",
  async function () {
    const lucia = (await import("#/features/auth/libs/auth")).lucia;
    lucia.deleteExpiredSessions();
    console.log("Lucia expired sessions deleted");
  },
  null,
  true,
  "Europe/Warsaw",
);
