import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "@api/trpc/trpc.router";
import superjson from "superjson";

// TODO: Getting env from common env.local does not work. Fix this.
const NESTJS_URL =
  process.env.NEXT_PUBLIC_NESTJS_URL || "http://localhost:3001";

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${NESTJS_URL}/trpc`,
    }),
  ],
  transformer: superjson,
});
