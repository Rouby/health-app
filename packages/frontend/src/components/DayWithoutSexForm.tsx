import { Box, Button, Checkbox, Group, Stack, Text } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import dayjs from "dayjs";
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
  onSubmit: (values: { dateTime: Date; onPeriod: boolean }) => void;
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
          renderDay={(date) => {
            const day = date.getDate();
            return (
              <Box
                sx={{
                  background: dayjs(date).isSame(new Date(), "day")
                    ? "rgba(0,0,255,.2)"
                    : undefined,
                  borderRadius: "50%",
                }}
              >
                {date.getDate()}
              </Box>
            );
          }}
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
