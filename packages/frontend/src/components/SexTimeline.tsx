import { Box, Text, Timeline } from "@mantine/core";
import { IconActivity } from "@tabler/icons";
import dayjs, { Dayjs } from "dayjs";
import { FormattedMessage } from "react-intl";

const dateTime = new Intl.DateTimeFormat(undefined, {
  dateStyle: "long",
});
const relativeTime = new Intl.RelativeTimeFormat(undefined, {
  style: "long",
});

export function SexTimeline<
  TItem extends {
    date: Dayjs;
    acts: {
      dateTime: string;
      position: string;
      userFinished: boolean;
      partnerFinished: boolean;
    }[];
    daysOnPeriod: number;
  }
>({
  items,
  onEditAct,
}: {
  items: TItem[];
  onEditAct: (act: TItem["acts"][0]) => void;
}) {
  return (
    <Timeline mt="md">
      {[...items].reverse().map(({ date, acts, daysOnPeriod }, idx, arr) =>
        acts.length > 0 ? (
          <Timeline.Item
            key={date.toISOString()}
            bullet={<IconActivity />}
            title={acts.map((act) => (
              <Box
                key={act.dateTime}
                sx={{
                  cursor: "pointer",
                  display: "inline-block",
                  marginRight: 8,
                }}
                onClick={() => onEditAct(act)}
              >
                {act.position.split(",").join(", ") +
                  [act.userFinished, act.partnerFinished]
                    .filter(Boolean)
                    .map(() => "💦")
                    .join("")}
              </Box>
            ))}
            lineVariant={
              (arr[idx + 1]?.acts.length ?? 0) === 0 ? "dashed" : "solid"
            }
          >
            <Text size="xs" mt={4}>
              {dateTime.format(date.toDate())},{" "}
              {relativeTime.format(
                Math.round(
                  dayjs(acts.at(-1)!.dateTime).diff(undefined, "days", true)
                ),
                "days"
              )}
            </Text>
          </Timeline.Item>
        ) : (
          <Timeline.Item
            key={date.toISOString()}
            title={
              <FormattedMessage
                defaultMessage="No sex for {days, plural, =1 {1 day} other {# days}} :("
                values={{
                  days: Math.round(
                    arr[idx - 1]
                      ? dayjs(arr[idx - 1].date).diff(date, "days", true)
                      : dayjs(date)
                          .subtract(1, "day")
                          .diff(arr[idx + 1]?.date, "days", true)
                  ),
                }}
              />
            }
            lineVariant="dashed"
          >
            <Text size="xs" mt={4}>
              {dateTime.format(date.toDate())}
              <FormattedMessage
                defaultMessage="{daysOnPeriod, plural, =0 {} =1 {, # day 🩸} other {, # days 🩸}}"
                values={{ daysOnPeriod }}
              />
            </Text>
          </Timeline.Item>
        )
      )}
    </Timeline>
  );
}
