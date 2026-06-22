import { Link } from 'waku';
import { Group, Anchor, Text, Container } from '@mantine/core';

export const Header = () => {
  return (
    <header style={{ borderBottom: '1px solid var(--mantine-color-default-border)', backgroundColor: 'var(--mantine-color-body)' }}>
      <Container size="lg" py="md">
        <Group justify="space-between">
          <Text fw={800} size="xl" variant="gradient" gradient={{ from: 'teal', to: 'cyan', deg: 45 }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              HealthSync
            </Link>
          </Text>
          <Group gap="lg">
            <Anchor component={Link} to="/" size="sm" fw={500} c="dimmed">
              Dashboard
            </Anchor>
            <Anchor component={Link} to="/intimacy" size="sm" fw={500} c="dimmed">
              Intimacy
            </Anchor>
            <Anchor component={Link} to="/about" size="sm" fw={500} c="dimmed">
              About
            </Anchor>
          </Group>
        </Group>
      </Container>
    </header>
  );
};
