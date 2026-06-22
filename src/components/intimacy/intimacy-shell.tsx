'use client';

import { Tabs, Card } from '@mantine/core';
import { EncounterForm } from './encounter-form';
import { SwipeDeck } from './swipe-deck';

export function IntimacyShell() {
  return (
    <Tabs defaultValue="log" color="rose" radius="md">
      <Tabs.List grow mb="lg">
        <Tabs.Tab value="log" style={{ fontSize: '16px', fontWeight: 600 }}>
          📝 Log Encounter
        </Tabs.Tab>
        <Tabs.Tab value="deck" style={{ fontSize: '16px', fontWeight: 600 }}>
          🔥 Desires Matcher
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="log">
        <EncounterForm />
      </Tabs.Panel>

      <Tabs.Panel value="deck">
        <Card withBorder radius="md" p="xl" shadow="sm" style={{ minHeight: '520px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <SwipeDeck />
        </Card>
      </Tabs.Panel>
    </Tabs>
  );
}
