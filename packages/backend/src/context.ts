import { User } from "@prisma/client";
import { inferAsyncReturnType, TRPCError } from "@trpc/server";
import { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";
import { decode, JwtPayload, verify } from "jsonwebtoken";
import { createAbility } from "./ability";
import { prisma } from "./prisma";

export async function createContext({ req, res }: CreateFastifyContextOptions) {
  let token: string | undefined;
  if (req.headers.authorization) {
    [, token] = req.headers.authorization.split(" ");
  }

  let user: User | null = null;
  if (token) {
    let decodedToken: JwtPayload | null = null;

    try {
      decodedToken = decode(token, { complete: true });
    } catch {
      throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid token" });
    }

    try {
      verify(token, process.env.SESSION_SECRET!);
    } catch {
      throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid token" });
    }

    // TODO check if token was revoked

    user = await prisma.user.findUnique({
      where: { id: decodedToken?.payload.user.id },
    });
  }

  const ability = await createAbility(user);

  return { req, res, user, ability };
}

export type Context = inferAsyncReturnType<typeof createContext>;
