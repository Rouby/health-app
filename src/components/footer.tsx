import { Container, Group, Text, Anchor } from '@mantine/core';

export const Footer = () => {
  return (
    <footer style={{ borderTop: '1px solid var(--mantine-color-default-border)', backgroundColor: 'var(--mantine-color-body)', marginTop: 'auto' }}>
      <Container size="lg" py="md">
        <Group justify="space-between">
          <Text size="xs" c="dimmed">
            © {new Date().getFullYear()} HealthSync. All rights reserved.
          </Text>
          <Text size="xs" c="dimmed">
            Powered by{' '}
            <Anchor href="https://waku.gg/" target="_blank" rel="noreferrer" inherit fw={500}>
              waku.gg
            </Anchor>
          </Text>
        </Group>
      </Container>
    </footer>
  );
};
