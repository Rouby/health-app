import { Badge, Card, Container, Group, Image, Text } from "@mantine/core";
import { FormattedMessage, useIntl } from "react-intl";
import { trpc } from "../../utils";

export function CommonInterestsWithPartnerPage() {
  const { formatMessage: fmt } = useIntl();

  const { data } = trpc.interest.commonInterests.useQuery();

  if (data?.length === 0) {
    return (
      <Container>
        <Text>
          <FormattedMessage defaultMessage="You have no matching interests, as of yet." />
        </Text>
      </Container>
    );
  }

  return (
    <Container>
      <Text>
        <FormattedMessage defaultMessage="You both indicated for the following practices interest:" />
      </Text>
      {data?.map((interest) => (
        <Card shadow="md" radius="md" sx={{ maxWidth: 400 }} mt="md">
          <Card.Section>
            <Image src={interest.imagePath} height={250} withPlaceholder />
          </Card.Section>

          <Group position="apart" mt="md" mb="xs">
            <Text weight={500}>
              {fmt({
                id: interest.translationKey,
                defaultMessage: interest.defaultMessage,
              })}
            </Text>
            <Group noWrap spacing="xs">
              {interest.tags.map((tag) => (
                <Badge key={tag.translationKey}>
                  {fmt({
                    id: tag.translationKey,
                    defaultMessage: tag.defaultMessage,
                  })}
                </Badge>
              ))}
            </Group>
          </Group>

          <Text size="xs">
            {fmt({
              id: interest.descriptionTranslationKey,
              defaultMessage: interest.descriptionDefaultMessage,
            })}
          </Text>
        </Card>
      ))}
    </Container>
  );
}
