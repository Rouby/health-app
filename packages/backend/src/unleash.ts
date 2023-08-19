import { InMemoryStorageProvider, UnleashClient } from "unleash-proxy-client";

const promisedFetch = import("node-fetch").then(({ default: fetch }) => fetch);

export const unleash = new UnleashClient({
  url: process.env.UNLEASH_URL ?? "",
  clientKey: process.env.UNLEASH_CLIENT_KEY ?? "",
  appName: "health-app",
  storageProvider: new InMemoryStorageProvider(),
  fetch: async (url: any, init?: any) => (await promisedFetch)(url, init),
});
