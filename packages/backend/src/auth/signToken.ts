import { User } from "@prisma/client";
import { sign } from "jsonwebtoken";

export function signToken(user: User) {
  return sign(payload(user), process.env.SESSION_SECRET!, {
    algorithm: "HS256",
    subject: user.id,
    expiresIn: "1y",
  });
}

function payload(user: User) {
  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      firstDayOfWeek: user.firstDayOfWeek,
    },
  };
}
