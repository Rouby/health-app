import {
  Box,
  Container,
  Group,
  Paper,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { IconChevronDown, IconChevronUp } from "@tabler/icons";
import { Link } from "@tanstack/react-location";
import { useFlag } from "@unleash/proxy-client-react";
import dayjs from "dayjs";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { trpc } from "../utils";

export function OverviewPage() {
  const isTrackingEnabled = useFlag("Tracking");

  return (
    <>
      <Container>{isTrackingEnabled && <TrackingSection />}</Container>
    </>
  );
}

function TrackingSection() {
  const { data: sexActs } = trpc.tracker.sexActs.useQuery({});
  const { data: daysWithoutSex } = trpc.tracker.daysWithoutSex.useQuery({});

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

  return (
    <>
      <WeeklyStats />
      {daysWithoutTracking.filter((day) => !day.isSame(dayjs(), "day")).length >
        0 && (
        <Text>
          <FormattedMessage
            defaultMessage="You have {days, plural, =1 {one day} other {# days}} <a>without tracking</a>."
            values={{
              days: daysWithoutTracking.length,
              a: (chunks) => (
                <Text variant="link" component={Link} to="/tracking">
                  {chunks}
                </Text>
              ),
            }}
          />
        </Text>
      )}
    </>
  );
}

function WeeklyStats() {
  const [week, setWeek] = useState(0);

  const { data: stats } = trpc.tracker.sexStats.useQuery();

  const dateTimeFormat = new Intl.DateTimeFormat(undefined, {
    month: "long",
    day: "2-digit",
  });

  if (!stats || !stats.weeklyStats.length) {
    return null;
  }

  return (
    <>
      <Box
        sx={(theme) => ({
          backgroundImage: `linear-gradient(-60deg, ${
            theme.colors.grape[4]
          } 0%, ${theme.colors[theme.primaryColor][7]} 100%)`,
          padding: theme.spacing.md,
          borderRadius: theme.radius.md,
          display: "flex",
          flexDirection: "row-reverse",
          justifyContent: "space-between",
          gap: theme.spacing.md,

          [theme.fn.smallerThan("xs")]: {
            flexDirection: "column",
            paddingTop: 0,
          },
        })}
      >
        <Box
          sx={(theme) => ({
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            gridTemplateAreas: `
            "next week"
            "prev week"
          `,
            columnGap: theme.spacing.md,
            alignContent: "center",
          })}
        >
          <UnstyledButton
            onClick={() => setWeek((current) => current - 1)}
            disabled={week <= 0}
            sx={(theme) => ({
              height: 28,
              width: "100%",
              color: theme.colors[theme.primaryColor][2],
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: theme.radius.md,
              transition: "background-color 50ms ease",

              [theme.fn.smallerThan("xs")]: {
                height: 34,
                width: 34,
              },

              ":disabled": { opacity: 0.5 },
            })}
          >
            <IconChevronUp stroke={1.5} />
          </UnstyledButton>

          <Box
            sx={(theme) => ({
              gridArea: "week",
              alignSelf: "center",
              justifySelf: "start",
              fontWeight: 700,
              color: theme.white,
            })}
          >
            <Text>
              {dateTimeFormat.formatRange(
                new Date(stats.weeklyStats.at(-week)!.week),
                new Date(stats.weeklyStats.at(-week - 1)!.week)
              )}
            </Text>
          </Box>

          <UnstyledButton
            onClick={() => setWeek((current) => current + 1)}
            disabled={week > stats.weeklyStats.length - 2}
            sx={(theme) => ({
              height: 28,
              width: "100%",
              color: theme.colors[theme.primaryColor][2],
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: theme.radius.md,
              transition: "background-color 50ms ease",

              [theme.fn.smallerThan("xs")]: {
                height: 34,
                width: 34,
              },

              ":disabled": { opacity: 0.5 },
            })}
          >
            <IconChevronDown stroke={1.5} />
          </UnstyledButton>
        </Box>
        <Group>
          <StatCard
            label={<FormattedMessage defaultMessage="Sex acts" />}
            value={stats.weeklyStats.at(-week - 1)!.totalActs}
            size={60}
          />
          <StatCard
            label={<FormattedMessage defaultMessage="Average duration" />}
            value={dayjs
              .duration(stats.weeklyStats.at(-week - 1)!.averageDuration)
              .humanize()}
            size={30}
          />
        </Group>
      </Box>
      <Box
        sx={(theme) => ({
          padding: theme.spacing.md,
          borderRadius: theme.radius.md,
        })}
      >
        <Group>
          <StatCard
            label={<FormattedMessage defaultMessage="Sex acts per week" />}
            value={stats.totalActs / stats.weeklyStats.length}
            size={60}
          />
          <StatCard
            label={<FormattedMessage defaultMessage="Average duration" />}
            value={dayjs.duration(stats.averageDuration).humanize()}
            size={30}
          />
        </Group>
      </Box>
    </>
  );
}

function StatCard({
  label,
  value,
  size,
}: {
  label: React.ReactNode;
  value: React.ReactNode;
  size: number;
}) {
  return (
    <Paper
      radius="md"
      shadow="md"
      p="xs"
      sx={(theme) => ({
        minWidth: 120,
        maxWidth: 120,
        paddingTop: theme.spacing.xl,
        minHeight: 140,
        display: "flex",
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: theme.white,
        color: theme.colors.gray[7],
      })}
    >
      <Box
        sx={(theme) => ({
          marginTop: theme.spacing.lg,
          color: theme.colors[theme.primaryColor][6],
          fontSize: size,
          lineHeight: 1,
          textAlign: "center",
        })}
      >
        {value}
      </Box>
      <Text size="xs">{label}</Text>
    </Paper>
  );
}
