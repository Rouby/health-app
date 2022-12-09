import { Button, Checkbox, Group, Stack, Text } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { FormattedMessage, useIntl } from "react-intl";

export function DayWithoutSexForm({
  initialDateTime = new Date(),
  excludeDate,
  onSubmit,
  loading,
  error,
}: {
  initialDateTime?: Date;
  excludeDate?: (date: Date) => boolean;
  onSubmit: (values: { dateTime: Date }) => void;
  loading: boolean;
  error?: React.ReactNode;
}) {
  const { formatMessage } = useIntl();

  const form = useForm({
    initialValues: {
      dateTime: initialDateTime,
      onPeriod: false,
    },

    validate: {},
  });

  return (
    <form id="login" onSubmit={form.onSubmit(onSubmit)}>
      <Stack>
        <DatePicker
          required
          label={<FormattedMessage defaultMessage="Date" />}
          {...form.getInputProps("dateTime")}
          excludeDate={excludeDate}
        />

        <Checkbox
          label={<FormattedMessage defaultMessage="On Period?" />}
          {...form.getInputProps("onPeriod", { type: "checkbox" })}
        />
      </Stack>

      <Group position="apart" mt="md" noWrap>
        <Text color="red">{error}</Text>
        <Group position="right" noWrap>
          <Button type="submit" loading={loading}>
            <FormattedMessage defaultMessage="Save" />
          </Button>
        </Group>
      </Group>
    </form>
  );
}
