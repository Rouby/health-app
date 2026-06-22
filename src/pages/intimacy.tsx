import { Container, Title, Text, Stack } from '@mantine/core';
import { IntimacyShell } from '../components/intimacy/intimacy-shell';

export default async function IntimacyPage() {
  return (
    <Container size="md" py="xl">
      <title>Intimacy & Sex-Life Sync - HealthSync</title>
      
      <Stack gap="xl">
        {/* Page Header */}
        <div style={{ borderBottom: '1px solid var(--mantine-color-default-border)', paddingBottom: '1rem' }}>
          <Title order={1} size="h2" style={{ fontWeight: 900 }}>
            Intimacy & Sex-Life
          </Title>
          <Text size="sm" c="dimmed">
            Manage your personal intimacy logs, track connection ratings, and sync double-blind desires with your partner.
          </Text>
        </div>

        {/* Client Interactivity Container */}
        <IntimacyShell />
      </Stack>
    </Container>
  );
}

// Set Waku Config to render dynamically
export const getConfig = async () => {
  return {
    render: 'dynamic',
  } as const;
};
