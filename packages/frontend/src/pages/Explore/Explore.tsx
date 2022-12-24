import { Button, Container, Stack } from "@mantine/core";
import { Link } from "@tanstack/react-location";
import { FormattedMessage } from "react-intl";

export function ExplorePage() {
  return (
    <Container size="xs">
      <Stack>
        <Button component={Link} to="interests">
          <FormattedMessage defaultMessage="Discover common interests" />
        </Button>
        <Button component={Link} to="positions">
          <FormattedMessage defaultMessage="Discover new and old positions" />
        </Button>
      </Stack>
    </Container>
  );
}
