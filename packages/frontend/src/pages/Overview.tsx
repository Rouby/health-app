import { Container, Text } from "@mantine/core";
import { Link } from "@tanstack/react-location";
import dayjs from "dayjs";
import { FormattedMessage } from "react-intl";
import { trpc } from "../utils";

export function OverviewPage() {
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
      <Container>
        {daysWithoutTracking.filter((day) => !day.isSame(dayjs(), "day"))
          .length > 0 && (
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
      </Container>
    </>
  );
}
