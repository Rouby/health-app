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
import { FormattedMessage, useIntl } from "react-intl";

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
      rememberMe: true,

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
          label={<FormattedMessage defaultMessage="Email" />}
          placeholder="your@email.com"
          {...form.getInputProps("email")}
        />

        <PasswordInput
          required
          name="password"
          autoComplete={
            form.values.mode === "login" ? "current-password" : "new-password"
          }
          label={<FormattedMessage defaultMessage="Password" />}
          {...form.getInputProps("password")}
        />

        {form.values.mode === "login" && (
          <Checkbox
            mt="md"
            label={<FormattedMessage defaultMessage="Remember me" />}
            {...form.getInputProps("rememberMe", { type: "checkbox" })}
          />
        )}

        {form.values.mode === "register" && (
          <TextInput
            required
            minLength={3}
            name="name"
            label={<FormattedMessage defaultMessage="Name" />}
            placeholder={formatMessage({ defaultMessage: "Your name" })}
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
            {form.values.mode === "register" ? (
              <FormattedMessage defaultMessage="Login" />
            ) : (
              <FormattedMessage defaultMessage="Create Account" />
            )}
          </Button>
          <Button type="submit" loading={loading}>
            {form.values.mode === "login" ? (
              <FormattedMessage defaultMessage="Login" />
            ) : (
              <FormattedMessage defaultMessage="Register" />
            )}
          </Button>
        </Group>
      </Group>
    </form>
  );
}
