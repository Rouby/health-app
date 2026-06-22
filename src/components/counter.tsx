'use client';

import { useState } from 'react';
import { Button, Text, Paper, Group, Stack } from '@mantine/core';

export const Counter = ({ max }: { max?: number | undefined }) => {
  const [count, setCount] = useState(0);

  const handleIncrement = () =>
    setCount((c) => (max !== undefined && c + 1 > max ? c : c + 1));

  const handleDecrement = () =>
    setCount((c) => (c - 1 < 0 ? 0 : c - 1));

  return (
    <Paper withBorder p="xl" radius="md" shadow="md" style={{ maxWidth: 320 }}>
      <Stack align="center" gap="md">
        <Text size="sm" fw={500} c="dimmed">
          Daily Hydration Tracker (Glasses)
        </Text>
        
        <Text size="xl" fw={700} style={{ fontSize: '2.5rem' }}>
          {count} {max !== undefined ? `/ ${max}` : ''}
        </Text>

        <Group gap="sm">
          <Button 
            variant="light" 
            color="blue" 
            onClick={handleDecrement}
            disabled={count === 0}
          >
            -
          </Button>
          <Button 
            variant="gradient" 
            gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
            onClick={handleIncrement}
            disabled={max !== undefined && count >= max}
          >
            + Add Glass
          </Button>
        </Group>
      </Stack>
    </Paper>
  );
};
