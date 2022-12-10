import {
  Button,
  Collapse,
  Container,
  Group,
  Paper,
  Text,
  Timeline,
} from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import { IconActivity } from "@tabler/icons";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { DayWithoutSexForm, SexActForm } from "../components";
import { trpc } from "../utils";

type ArrayElement<ArrayType> = ArrayType extends readonly (infer ElementType)[]
  ? ElementType
  : never;

export function OverviewPage() {
  const utils = trpc.useContext();

  const { data: sexActs } = trpc.tracker.sexActs.useQuery({});
  const {
    mutate: addSexAct,
    isLoading: isSavingSexAct,
    error: errorSavingSexAct,
  } = trpc.tracker.add.useMutation({
    onSuccess: () => {
      utils.tracker.sexActs.invalidate();
    },
  });

  const { data: daysWithoutSex } = trpc.tracker.daysWithoutSex.useQuery({});
  const {
    mutate: addDayWithoutSex,
    isLoading: isSavingDayWithoutSex,
    error: errorSavingDayWithoutSex,
  } = trpc.tracker.addDayWithoutSex.useMutation({
    onSuccess: () => {
      utils.tracker.daysWithoutSex.invalidate();
    },
  });

  const dateTime = new Intl.DateTimeFormat(undefined, {
    dateStyle: "long",
  });
  const relativeTime = new Intl.RelativeTimeFormat(undefined, {
    style: "long",
  });

  const [preselectedDate, setPreselectedDate] = useState<Date | null>(null);
  const [showSexActForm, toggleShowSexActForm] = useToggle();
  const [showNoSexForm, toggleShowNoSexForm] = useToggle();

  const firstTrackedDay = dayjs
    .min(
      dayjs(sexActs?.at(0)?.dateTime),
      dayjs(daysWithoutSex?.at(0)?.dateTime)
    )
    .startOf("day");
  const days = Array.from(
    {
      length: Math.ceil(
        dayjs().endOf("day").diff(firstTrackedDay, "day", true)
      ),
    },
    (_, idx) => firstTrackedDay.add(idx, "day")
  );
  const daysWithoutTracking = days.filter(
    (day) =>
      ![...(sexActs ?? []), ...(daysWithoutSex ?? [])].some((act) =>
        day.isSame(act.dateTime, "day")
      )
  );

  const timelineEvents = days.reduce((acc, day) => {
    const sexActsOnDate =
      sexActs?.filter((sexAct) => dayjs(sexAct.dateTime).isSame(day, "day")) ??
      [];

    if (sexActsOnDate.length > 0) {
      acc.push({
        date: day,
        acts: sexActsOnDate,
        daysOnPeriod: 0,
      });
    } else {
      const onPeriod =
        daysWithoutSex?.find((wo) => dayjs(wo.dateTime).isSame(day, "day"))
          ?.onPeriod ?? false;
      if (acc.length === 0) {
        acc.push({
          date: day,
          acts: [],
          daysOnPeriod: onPeriod ? 1 : 0,
        });
      } else if (acc.at(-1)!.acts.length > 0) {
        acc.push({
          date: day,
          acts: [],
          daysOnPeriod: onPeriod ? 1 : 0,
        });
      } else {
        acc.at(-1)!.daysOnPeriod += onPeriod ? 1 : 0;
      }
    }

    return acc;
  }, [] as { date: Dayjs; acts: ArrayElement<typeof sexActs>[]; daysOnPeriod: number }[]);

  let previousDaysOnPeriod = undefined;
  if (timelineEvents.at(-1)?.acts.length === 0) {
    previousDaysOnPeriod = timelineEvents.pop()?.daysOnPeriod;
  }
  if (!timelineEvents.at(-1)?.date.isSame(dayjs(), "day")) {
    timelineEvents.push({
      date: dayjs().endOf("day"),
      acts: [],
      daysOnPeriod: previousDaysOnPeriod ?? 0,
    });
  }

  return (
    <>
      <Container>
        <Timeline>
          {timelineEvents.map(({ date, acts, daysOnPeriod }, idx, arr) =>
            acts.length > 0 ? (
              <Timeline.Item
                key={date.toISOString()}
                bullet={<IconActivity />}
                title={acts
                  .map((act) => act.position.split(",").join(", "))
                  .join(" + ")}
                lineVariant={
                  arr[idx + 1]?.acts.length === 0 ? "dashed" : "solid"
                }
              >
                <Text size="xs" mt={4}>
                  {dateTime.format(date.toDate())},{" "}
                  {relativeTime.format(
                    Math.round(
                      dayjs(acts[0].dateTime).diff(undefined, "days", true)
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
                        arr[idx + 1]
                          ? dayjs(arr[idx + 1].date).diff(date, "days", true)
                          : dayjs(date)
                              .subtract(1, "day")
                              .diff(arr[idx - 1]?.date, "days", true)
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

        {daysWithoutTracking.length > 0 && (
          <Text>
            <FormattedMessage
              defaultMessage="You have {days, plural, =1 {one day} other {# days}} without tracking:"
              values={{ days: daysWithoutTracking.length }}
            />
            {daysWithoutTracking.map((day) => (
              <Text
                key={day.toISOString()}
                variant="link"
                sx={{
                  cursor: "pointer",
                  display: "inline-block",
                  marginRight: 8,
                }}
                onClick={() => {
                  setPreselectedDate(day.toDate());
                  if (!showNoSexForm && !showSexActForm) {
                    toggleShowSexActForm(true);
                  }
                }}
              >
                {day
                  .toDate()
                  .toLocaleDateString(undefined, { dateStyle: "long" })}
              </Text>
            ))}
          </Text>
        )}

        <Group mt={16}>
          <Button
            onClick={() => {
              toggleShowSexActForm();
              toggleShowNoSexForm(false);
            }}
          >
            <FormattedMessage defaultMessage="Track sex act" />
          </Button>
          <Button
            onClick={() => {
              toggleShowNoSexForm();
              toggleShowSexActForm(false);
            }}
          >
            <FormattedMessage defaultMessage="Track day without sex" />
          </Button>
        </Group>

        <Collapse in={showSexActForm || showNoSexForm} mt={16}>
          <Paper radius="md" p="xl" withBorder>
            {showNoSexForm ? (
              <DayWithoutSexForm
                key={preselectedDate?.toISOString()}
                initialDateTime={preselectedDate ?? undefined}
                excludeDate={(date) =>
                  [...(sexActs ?? []), ...(daysWithoutSex ?? [])]?.some((act) =>
                    dayjs(act.dateTime).isSame(date, "day")
                  ) ?? false
                }
                loading={isSavingDayWithoutSex}
                error={errorSavingDayWithoutSex?.message}
                onSubmit={({ dateTime, onPeriod }) =>
                  addDayWithoutSex({
                    dateTime: dateTime.toISOString(),
                    onPeriod,
                  })
                }
              />
            ) : (
              <SexActForm
                key={`${preselectedDate?.toISOString()}-${sexActs?.length}`}
                initialDateTime={preselectedDate ?? undefined}
                loading={isSavingSexAct}
                error={errorSavingSexAct?.message}
                onSubmit={({
                  positions,
                  duration,
                  initiator,
                  dateTime,
                  ...values
                }) => {
                  addSexAct({
                    position: positions.join(","),
                    duration: duration
                      ? dayjs.duration(duration).toISOString()
                      : null,
                    initiator: initiator === "me" ? "USER" : "PARTNER",
                    dateTime: dateTime.toISOString(),
                    ...values,
                  });
                }}
                positions={sexActs?.flatMap((act) => act.position.split(","))}
                locations={sexActs?.flatMap((act) => act.location ?? [])}
                foreplaysOnUser={sexActs?.flatMap(
                  (act) => act.foreplayOnUser ?? []
                )}
                foreplaysOnPartner={sexActs?.flatMap(
                  (act) => act.foreplayOnPartner ?? []
                )}
              />
            )}
          </Paper>
        </Collapse>
      </Container>
    </>
  );
}
