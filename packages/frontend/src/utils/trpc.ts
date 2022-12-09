import type { AppRouter } from "@rouby/sex-app-backend/src/main";
import { createTRPCReact } from "@trpc/react-query";

export const trpc = createTRPCReact<AppRouter>();
