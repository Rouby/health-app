import { Alert, Container, Switch, Text } from "@mantine/core";
import { IconHeart } from "@tabler/icons";
import { Link } from "@tanstack/react-location";
import { FormattedMessage } from "react-intl";
import { trpc } from "../utils";

export function MoodPage() {
  const utils = trpc.useContext();

  const { data, isLoading } = trpc.account.get.useQuery(undefined);

  const { data: mood } = trpc.mood.get.useQuery();
  const { mutate, isLoading: isSaving } = trpc.mood.set.useMutation({
    onSuccess: () => {
      utils.mood.get.invalidate();
    },
  });

  return (
    <Container>
      {!isLoading && (!data?.partner || !data?.partnerProposer) && (
        <Alert
          title={
            <FormattedMessage defaultMessage="You have no partner linked" />
          }
        >
          <FormattedMessage
            defaultMessage="Go to <a>your Account</a> and link with a partner to make the most of the Mood features."
            values={{
              a: (chunks) => (
                <Text component={Link} to="/account" variant="link">
                  {chunks}
                </Text>
              ),
            }}
          />
        </Alert>
      )}
      <Switch
        label={<FormattedMessage defaultMessage="I am in the mood" />}
        checked={!!mood?.mood}
        onChange={({ target: { checked } }) => {
          mutate({ inMood: checked });
        }}
        disabled={isSaving}
      />
      {mood?.match && (
        <Alert icon={<IconHeart stroke={1.5} />} color="green" mt="md">
          <FormattedMessage defaultMessage="You both are in the mood!" />
        </Alert>
      )}
    </Container>
  );
}
