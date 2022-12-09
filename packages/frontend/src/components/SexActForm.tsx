import {
  Button,
  Group,
  Input,
  MultiSelect,
  NumberInput,
  SegmentedControl,
  Select,
  Stack,
  Switch,
  Text,
} from "@mantine/core";
import { DatePicker, TimeInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import dayjs from "dayjs";
import { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";

export function SexActForm({
  initialDateTime = new Date(),
  positions = [],
  locations = [],
  foreplaysOnUser = [],
  foreplaysOnPartner = [],
  onSubmit,
  loading,
  error,
}: {
  initialDateTime?: Date;
  positions?: string[];
  locations?: string[];
  foreplaysOnUser?: string[];
  foreplaysOnPartner?: string[];
  onSubmit: (values: {
    positions: string[];
    dateTime: Date;
    initiator: "me" | "partner";
    duration: number | null;
    location: string | null;
    foreplayOnUser: string | null;
    foreplayOnPartner: string | null;
    userFinished: boolean;
    partnerFinished: boolean;
  }) => void;
  loading: boolean;
  error?: React.ReactNode;
}) {
  const [favoritePositions, setFavoritePositions] = useState(positions);
  const [favoriteLocations, setFavoriteLocations] = useState(locations);
  const [favoriteForeplayOnMe, setFavoriteForeplayOnMe] =
    useState(foreplaysOnUser);
  const [favoriteForeplayOnPartner, setFavoriteForeplayOnPartner] =
    useState(foreplaysOnPartner);

  const { formatMessage } = useIntl();

  const form = useForm({
    initialValues: {
      positions: [] as string[],
      dateTime: initialDateTime,
      initiator: "me" as "me" | "partner",
      duration: null as number | null,
      location: null as string | null,
      foreplayOnUser: null as string | null,
      foreplayOnPartner: null as string | null,
      userFinished: true,
      partnerFinished: true,
    },

    validate: {
      positions: (value) =>
        value.length > 0
          ? null
          : formatMessage({ defaultMessage: "Select at least one" }),
    },
  });

  return (
    <form id="login" onSubmit={form.onSubmit(onSubmit)}>
      <Stack>
        <MultiSelect
          required
          label={<FormattedMessage defaultMessage="Positions" />}
          placeholder={formatMessage({
            defaultMessage:
              "Missionary, Doggy, Cowgirl, Reverse Cowgirl, 69, Spooning, etc.",
          })}
          searchable
          creatable
          data={favoritePositions}
          getCreateLabel={(query) => `+ ${query}`}
          onCreate={(query) => {
            const item = query;
            setFavoritePositions((current) => [...current, item]);
            return item;
          }}
          {...form.getInputProps("positions")}
        />

        <Group align="baseline">
          <DatePicker
            required
            label={<FormattedMessage defaultMessage="Date" />}
            {...form.getInputProps("dateTime")}
            onChange={(value) =>
              form.setFieldValue(
                "dateTime",
                (value &&
                  dayjs(form.values.dateTime ?? new Date())
                    .set("year", value.getFullYear())
                    .set("month", value.getMonth())
                    .set("date", value.getDate())
                    .toDate()) as Date
              )
            }
          />

          <TimeInput
            required
            label={<FormattedMessage defaultMessage="Time" />}
            {...form.getInputProps("dateTime")}
            onChange={(value) =>
              form.setFieldValue(
                "dateTime",
                dayjs(form.values.dateTime)
                  .set("hours", value.getHours())
                  .set("minutes", value.getMinutes())
                  .toDate()
              )
            }
          />

          <NumberInput
            label={<FormattedMessage defaultMessage="Duration (minutes)" />}
            list="durations"
            {...form.getInputProps("duration")}
          />
          <datalist id="durations">
            {[5, 10, 15, 20, 25, 30].map((minutes) => (
              <option key={minutes} value={minutes.toString()}>
                <FormattedMessage
                  defaultMessage="{minutes} minutes"
                  values={{ minutes }}
                />
              </option>
            ))}
          </datalist>
        </Group>

        <Input.Wrapper
          label={<FormattedMessage defaultMessage="Initiated by" />}
        >
          <SegmentedControl
            data={[
              {
                value: "me",
                label: <FormattedMessage defaultMessage="Me" />,
              },
              {
                value: "partner",
                label: <FormattedMessage defaultMessage="Partner" />,
              },
            ]}
            {...form.getInputProps("initiator")}
          />
        </Input.Wrapper>

        <Select
          label={<FormattedMessage defaultMessage="Location" />}
          placeholder={formatMessage({
            defaultMessage: "Bedroom, Kitchen, Living room, etc.",
          })}
          searchable
          creatable
          data={favoriteLocations}
          getCreateLabel={(query) => `+ ${query}`}
          onCreate={(query) => {
            const item = query;
            setFavoriteLocations((current) => [...current, item]);
            return item;
          }}
          {...form.getInputProps("location")}
        />

        <Group>
          <Select
            label={
              <FormattedMessage defaultMessage="Received foreplay by me" />
            }
            placeholder={formatMessage({
              defaultMessage: "Oral, fingering, etc.",
            })}
            searchable
            creatable
            data={favoriteForeplayOnMe}
            getCreateLabel={(query) => `+ ${query}`}
            onCreate={(query) => {
              const item = query;
              setFavoriteForeplayOnMe((current) => [...current, item]);
              return item;
            }}
            {...form.getInputProps("foreplayOnUser")}
          />
          <Switch
            size="md"
            label={<FormattedMessage defaultMessage="I came" />}
            {...form.getInputProps("userFinished", { type: "checkbox" })}
          />
        </Group>

        <Group>
          <Select
            label={
              <FormattedMessage defaultMessage="Received foreplay by partner" />
            }
            placeholder={formatMessage({
              defaultMessage: "Oral, fingering, etc.",
            })}
            searchable
            creatable
            data={favoriteForeplayOnPartner}
            getCreateLabel={(query) => `+ ${query}`}
            onCreate={(query) => {
              const item = query;
              setFavoriteForeplayOnPartner((current) => [...current, item]);
              return item;
            }}
            {...form.getInputProps("foreplayOnPartner")}
          />
          <Switch
            size="md"
            label={<FormattedMessage defaultMessage="Partner came" />}
            {...form.getInputProps("partnerFinished", { type: "checkbox" })}
          />
        </Group>
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
