import { Button, Collapse, Container, Group, Paper, Text } from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { DayWithoutSexForm, SexActForm, SexTimeline } from "../components";
import { ArrayElement, trpc } from "../utils";

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
  const {
    mutate: updateSexAct,
    isLoading: isUpdatingSexAct,
    error: errorUpdatingSexAct,
  } = trpc.tracker.update.useMutation({
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

  const [initialFormValues, setInitialFormValues] =
    useState<Partial<ArrayElement<typeof sexActs>>>();
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
        <SexTimeline
          items={timelineEvents}
          onEditAct={(act) => {
            setInitialFormValues(act);
            toggleShowSexActForm(true);
          }}
        />

        {daysWithoutTracking.filter((day) => !day.isSame(dayjs(), "day"))
          .length > 0 && (
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
                  setInitialFormValues({ dateTime: day.toISOString() });
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
                key={JSON.stringify(initialFormValues ?? {})}
                initialDateTime={
                  initialFormValues?.dateTime
                    ? dayjs(initialFormValues.dateTime).toDate()
                    : undefined
                }
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
                key={`${JSON.stringify(initialFormValues ?? {})}-${
                  sexActs?.length
                }`}
                initialValues={{
                  ...initialFormValues,
                  positions: initialFormValues?.position?.split(","),
                  duration: initialFormValues?.duration
                    ? dayjs.duration(initialFormValues.duration).minutes()
                    : null,
                  dateTime: initialFormValues?.dateTime
                    ? dayjs(initialFormValues.dateTime).toDate()
                    : undefined,
                  initiator: initialFormValues?.initiator
                    ? initialFormValues?.initiator === "USER"
                      ? "me"
                      : "partner"
                    : undefined,
                }}
                loading={isSavingSexAct || isUpdatingSexAct}
                error={
                  errorSavingSexAct?.message ?? errorUpdatingSexAct?.message
                }
                onSubmit={({
                  id,
                  positions,
                  duration,
                  initiator,
                  dateTime,
                  ...values
                }) => {
                  const data = {
                    position: positions.join(","),
                    duration: duration
                      ? dayjs.duration(duration, "minutes").toISOString()
                      : null,
                    initiator:
                      initiator === "me"
                        ? ("USER" as const)
                        : ("PARTNER" as const),
                    dateTime: dateTime.toISOString(),
                    ...values,
                  };

                  if (id) {
                    updateSexAct({
                      id,
                      ...data,
                    });
                  } else {
                    addSexAct(data);
                  }
                }}
                positions={[
                  ...new Set(
                    sexActs?.flatMap((act) => act.position.split(","))
                  ),
                ]}
                locations={[
                  ...new Set(sexActs?.flatMap((act) => act.location ?? [])),
                ]}
                foreplaysOnUser={[
                  ...new Set(
                    sexActs?.flatMap((act) => act.foreplayOnUser ?? [])
                  ),
                ]}
                foreplaysOnPartner={[
                  ...new Set(
                    sexActs?.flatMap((act) => act.foreplayOnPartner ?? [])
                  ),
                ]}
              />
            )}
          </Paper>
        </Collapse>
      </Container>
    </>
  );
}
