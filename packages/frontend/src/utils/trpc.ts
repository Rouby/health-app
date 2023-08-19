import type { AppRouter } from "@rouby/health-app-backend/src/main";
import { createTRPCReact } from "@trpc/react-query";

export const trpc = createTRPCReact<AppRouter>();
