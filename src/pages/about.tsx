import { Link } from 'waku';
import { Container, Title, Text, Button, Card, Stack, Group } from '@mantine/core';

export default async function AboutPage() {
  const data = await getData();

  return (
    <Container size="sm" py="xl">
      <title>{data.title}</title>
      
      <Card withBorder radius="md" p="xl" shadow="md">
        <Stack gap="md">
          <Title order={1} size="h2" className="text-3xl font-bold tracking-tight">
            {data.headline}
          </Title>
          
          <Text size="md" c="dimmed">
            {data.body}
          </Text>

          <Text size="sm">
            HealthSync is powered by Waku, a minimal React framework designed for React Server Components (RSC). Waku allows rendering page structures dynamically or statically at the edge, offering blazingly fast load times and optimized client bundles.
          </Text>

          <Group justify="flex-start" mt="xl">
            <Button 
              component={Link} 
              to="/" 
              variant="light" 
              color="teal"
              radius="md"
            >
              ← Back to Dashboard
            </Button>
          </Group>
        </Stack>
      </Card>
    </Container>
  );
}

const getData = async () => {
  const data = {
    title: 'About HealthSync',
    headline: 'About Waku & HealthSync',
    body: 'The minimal React Server Component Framework.',
  };

  return data;
};

export const getConfig = async () => {
  return {
    render: 'static',
  } as const;
};
