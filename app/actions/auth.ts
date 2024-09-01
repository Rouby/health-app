"use server";

import { User } from "@/data/users";
import { createSession, deleteSession } from "@/lib/session";
import { compare, hash } from "bcryptjs";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function signup(
  state:
    | {
        errors?: {
          name?: string[];
          email?: string[];
          password?: string[];
        };
      }
    | undefined,
  formData: FormData
) {
  const validatedFields = z
    .object({
      name: z.string().min(2),
      email: z.string().email(),
      password: z.string(),
    })
    .safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    });

  console.log(validatedFields);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  if (await User.findByEmail(validatedFields.data.email)) {
    return {
      errors: {
        email: ["Email already taken"],
      },
    };
  }

  const hashedPassword = await hash(validatedFields.data.password, 10);

  const user = await new User({
    name: validatedFields.data.name,
    email: validatedFields.data.email,
    password: hashedPassword,
  }).save();

  await createSession(user.id);

  redirect("/");
}

export async function signin(
  state:
    | {
        errors?: {
          email?: string[];
          password?: string[];
        };
      }
    | undefined,
  formData: FormData
) {
  const validatedFields = z
    .object({
      email: z.string().email(),
      password: z.string(),
    })
    .safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const user = await User.findByEmail(validatedFields.data.email);

  if (!user || !(await compare(validatedFields.data.password, user.password))) {
    return {
      errors: {
        email: ["Invalid email or password"],
      },
    };
  }

  await createSession(user.id);

  redirect("/");
}

export async function signout() {
  deleteSession();

  redirect("/login");
}
