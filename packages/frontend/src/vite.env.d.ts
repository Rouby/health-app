/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

interface ImportMetaEnv {
  readonly VITE_VAPID_PUBLIC_KEY: string;
  readonly VITE_UNLEASH_CLIENT_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

import "unleash-proxy-client";
module "unleash-proxy-client" {
  interface IMutableContext {
    userEmail?: string;
  }
}
