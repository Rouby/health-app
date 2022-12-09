import {
  Button,
  Checkbox,
  Group,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useIntl } from "react-intl";

export function LoginForm({
  onSubmit,
  loading,
  error,
}: {
  onSubmit: (values: {
    email: string;
    password: string;
    rememberMe: boolean;
    name: string;
    mode: "login" | "register";
  }) => void;
  loading: boolean;
  error?: React.ReactNode;
}) {
  const { formatMessage } = useIntl();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,

      name: "",

      mode: "login" as "login" | "register",
    },

    validate: {
      email: (value) =>
        /^\S+@\S+$/.test(value)
          ? null
          : formatMessage({ defaultMessage: "Invalid email" }),
      name: (value, values) =>
        values.mode === "register"
          ? value.length > 2
            ? null
            : formatMessage({
                defaultMessage: "Name must be at least 3 characters",
              })
          : null,
    },
  });

  return (
    <form id="login" onSubmit={form.onSubmit(onSubmit)}>
      <Stack>
        <TextInput
          required
          name="login"
          autoComplete="username"
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps("email")}
        />

        <PasswordInput
          required
          name="password"
          autoComplete={
            form.values.mode === "login" ? "current-password" : "new-password"
          }
          label="Password"
          {...form.getInputProps("password")}
        />

        {form.values.mode === "login" && (
          <Checkbox
            mt="md"
            label="Remember me"
            {...form.getInputProps("rememberMe", { type: "checkbox" })}
          />
        )}

        {form.values.mode === "register" && (
          <TextInput
            required
            minLength={3}
            name="name"
            label="Name"
            placeholder="Your name"
            {...form.getInputProps("name")}
          />
        )}
      </Stack>

      <Group position="apart" mt="md" noWrap>
        <Text color="red">{error}</Text>
        <Group position="right" noWrap>
          <Button
            variant="subtle"
            disabled={loading}
            onClick={() =>
              form.setFieldValue(
                "mode",
                form.values.mode === "login" ? "register" : "login"
              )
            }
          >
            {form.values.mode === "register" ? "Login" : "Create Account"}
          </Button>
          <Button type="submit" loading={loading}>
            {form.values.mode === "login" ? "Login" : "Register"}
          </Button>
        </Group>
      </Group>
    </form>
  );
}
