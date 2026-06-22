import { Suspense } from 'react';
import { Link } from 'waku';
import { Counter } from '../components/counter';
import { Container, Title, Text, SimpleGrid, Card, Badge, Group, Stack, Box, Center, Button } from '@mantine/core';

export default async function HomePage() {
  const data = await getData();

  // Asynchronous background task simulation for Node.js
  new Promise<void>((resolve) => {
    setTimeout(() => {
      console.log('Background promise resolved.');
      resolve();
    }, 1000);
  });

  const maxItems = process.env.MAX_ITEMS ? parseInt(process.env.MAX_ITEMS, 10) : 8;

  return (
    <Container size="lg" py="xl">
      <title>{data.title}</title>
      
      <Stack gap="xl">
        {/* Hero Section */}
        <Box ta="center" py="xl" style={{ borderBottom: '1px solid var(--mantine-color-default-border)' }}>
          <Title order={1} size="h1" className="text-5xl font-extrabold tracking-tight">
            Welcome to{' '}
            <Text 
              span 
              variant="gradient" 
              gradient={{ from: 'teal', to: 'cyan', deg: 45 }}
              inherit
            >
              HealthSync
            </Text>
          </Title>
          <Text size="lg" c="dimmed" mt="md" max-width={600} mx="auto">
            Your personalized dashboard for tracking daily wellness and hydration. Sync your vitals, stay hydrated, and live healthier.
          </Text>
        </Box>

        {/* Dynamic Server Message Banner */}
        <Suspense fallback={
          <Card withBorder radius="md" p="md" bg="var(--mantine-color-gray-light)">
            <Text size="sm" c="dimmed" ta="center">Checking server connection...</Text>
          </Card>
        }>
          <ServerMessage />
        </Suspense>

        {/* Dashboard Grid */}
        <SimpleGrid cols={{ base: 1, md: 2 }} gap="lg">
          {/* Tracker Card */}
          <Card withBorder radius="md" p="xl" shadow="sm" className="hover:shadow-md transition-all">
            <Stack gap="md" justify="space-between" h="100%">
              <div>
                <Group justify="space-between" mb="xs">
                  <Text fw={700} size="lg">Daily Goals</Text>
                  <Badge color="teal" variant="light">Active</Badge>
                </Group>
                <Text size="sm" c="dimmed" mb="lg">
                  Track your fluid intake throughout the day. Your recommended target is configured dynamically below.
                </Text>
              </div>
              <Center>
                <Counter max={maxItems} />
              </Center>
            </Stack>
          </Card>

          {/* Info Card */}
          <Card withBorder radius="md" p="xl" shadow="sm" className="hover:shadow-md transition-all">
            <Stack justify="space-between" h="100%">
              <div>
                <Group justify="space-between" mb="xs">
                  <Text fw={700} size="lg">System Info</Text>
                  <Badge color="blue" variant="light">Cloudflare Worker</Badge>
                </Group>
                <Text size="sm" c="dimmed" mb="md">
                  This page is rendered dynamically using React Server Components on Cloudflare Edge.
                </Text>
                
                <Stack gap="xs" mt="lg">
                  <Text size="sm" fw={500}>
                    Target Limit: <Text span c="blue" fw={700}>{maxItems} glasses</Text>
                  </Text>
                  <Text size="sm" fw={500}>
                    Source: <Text span c="dimmed" fontStyle="italic">env.MAX_ITEMS</Text>
                  </Text>
                  <Text size="sm" fw={500}>
                    Headline: <Text span c="dimmed">{data.headline}</Text>
                  </Text>
                </Stack>
              </div>

              <Group justify="flex-end" mt="xl">
                <Button 
                  component={Link} 
                  to="/about" 
                  variant="outline" 
                  color="teal"
                  radius="md"
                >
                  About HealthSync
                </Button>
              </Group>
            </Stack>
          </Card>
        </SimpleGrid>
      </Stack>
    </Container>
  );
}

// Example async server component
const ServerMessage = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return (
    <Card withBorder radius="md" p="md" bg="var(--mantine-color-teal-light)" border-color="var(--mantine-color-teal-outline)">
      <Group justify="center" gap="xs">
        <Text size="sm" fw={600} c="teal.9">
          ⚡ Connected to Edge Server:
        </Text>
        <Text size="sm" c="teal.8">
          Status nominal. Vitals API online.
        </Text>
      </Group>
    </Card>
  );
};

// Example async data fetching
const getData = async () => {
  const data = {
    title: 'HealthSync Dashboard',
    headline: 'Real-time Vitals & Wellness Tracking',
    body: 'Welcome to your wellness dashboard.',
  };

  return data;
};

// Enable dynamic server rendering.
export const getConfig = async () => {
  return {
    render: 'dynamic',
  } as const;
};
