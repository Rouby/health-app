"use client";

import { signin, signup } from "@/app/actions/auth";
import {
  Anchor,
  Button,
  Group,
  Paper,
  type PaperProps,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { upperFirst, useToggle } from "@mantine/hooks";
import { useActionState } from "react";

export function SignUp(props: PaperProps) {
  const [type, toggle] = useToggle(["login", "register"]);

  const [state, action, pending] = useActionState(
    type === "register" ? signup : signin,
    undefined
  );

  return (
    <Paper radius="md" p="xl" withBorder miw={300} {...props}>
      <Text size="lg" fw={500}>
        Welcome to Health App, {type} with
      </Text>

      <form action={action}>
        <Stack>
          {type === "register" && (
            <TextInput
              label="Name"
              placeholder="Your name"
              name="name"
              radius="md"
            />
          )}

          <TextInput
            required
            label="Email"
            placeholder="hello@mantine.dev"
            type="email"
            name="email"
            error={state?.errors?.email && "Invalid email"}
            radius="md"
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            type="password"
            name="password"
            error={state?.errors?.password && "Invalid Password"}
            radius="md"
          />
        </Stack>

        <Group justify="space-between" mt="xl">
          <Anchor
            component="button"
            type="button"
            c="dimmed"
            onClick={() => toggle()}
            size="xs"
          >
            {type === "register"
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </Anchor>
          <Button type="submit" radius="xl" loading={pending}>
            {upperFirst(type)}
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
