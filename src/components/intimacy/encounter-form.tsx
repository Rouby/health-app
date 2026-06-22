'use client';

import { useState } from 'react';
import { 
  Stack, 
  Card, 
  Title, 
  Text, 
  TextInput, 
  Textarea, 
  Button, 
  Slider, 
  Group, 
  Chip, 
  Switch, 
  Badge,
  ActionIcon,
  Collapse
} from '@mantine/core';

export function EncounterForm() {
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
  const [time, setTime] = useState('22:00');
  const [acts, setActs] = useState<string[]>([]);
  const [satisfaction, setSatisfaction] = useState(4);
  const [connection, setConnection] = useState(4);
  const [protection, setProtection] = useState(true);
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const availableActs = [
    { value: 'intercourse', label: 'Intercourse 💋' },
    { value: 'oral', label: 'Oral Sex 🔥' },
    { value: 'manual', label: 'Manual/Touch ✨' },
    { value: 'toys', label: 'Toys/Accessories 🧸' },
    { value: 'massage', label: 'Sensual Massage 💆' },
    { value: 'cuddling', label: 'Cuddling/Closeness 🤗' },
    { value: 'kissing', label: 'Deep Kissing 💏' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate E2EE encryption & save (which will eventually write to IndexedDB)
    setTimeout(() => {
      const payload = {
        date,
        time,
        acts,
        satisfaction,
        connection,
        protection,
        notes, // In real sync, this string will be AES-GCM encrypted
      };
      
      console.log('Encrypted Payload to Sync:', payload);
      
      // Save locally (mock)
      const existing = JSON.parse(localStorage.getItem('intimacy_logs') || '[]');
      existing.unshift({
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        ...payload
      });
      localStorage.setItem('intimacy_logs', JSON.stringify(existing));

      setSubmitting(false);
      setSuccess(true);
      
      // Reset form
      setActs([]);
      setNotes('');
      
      setTimeout(() => setSuccess(false), 3000);
    }, 1000);
  };

  return (
    <Card withBorder radius="md" p="xl" shadow="sm" style={{ backgroundColor: 'var(--mantine-color-body)' }}>
      <form onSubmit={handleSubmit}>
        <Stack gap="lg">
          <Group justify="space-between" align="center">
            <div>
              <Title order={3} size="h3">Log Encounter</Title>
              <Text size="xs" c="dimmed">Log intimacy to monitor trends & sync with partner.</Text>
            </div>
            <Badge color="teal" variant="light" leftSection="🔒">E2EE Secured</Badge>
          </Group>

          {/* Date and Time */}
          <Group grow>
            <TextInput 
              label="Date" 
              type="date" 
              value={date} 
              onChange={(e) => setDate(e.target.value)} 
              required 
            />
            <TextInput 
              label="Time" 
              type="time" 
              value={time} 
              onChange={(e) => setTime(e.target.value)} 
              required 
            />
          </Group>

          {/* Activities */}
          <Stack gap="xs">
            <Text size="sm" fw={500}>Activities & Acts</Text>
            <Chip.Group multiple value={acts} onChange={setActs}>
              <Group gap="xs">
                {availableActs.map((act) => (
                  <Chip 
                    key={act.value} 
                    value={act.value}
                    color="rose"
                    variant="light"
                  >
                    {act.label}
                  </Chip>
                ))}
              </Group>
            </Chip.Group>
          </Stack>

          {/* Satisfaction rating */}
          <Stack gap="xs">
            <Group justify="space-between">
              <Text size="sm" fw={500}>Physical Satisfaction</Text>
              <Text size="sm" fw={700} c="rose.6">{satisfaction} / 5</Text>
            </Group>
            <Slider 
              min={1} 
              max={5} 
              step={1} 
              value={satisfaction} 
              onChange={setSatisfaction}
              color="rose"
              marks={[
                { value: 1, label: 'Low' },
                { value: 3, label: 'Medium' },
                { value: 5, label: 'Ecstatic' }
              ]}
              mb="md"
            />
          </Stack>

          {/* Emotional Connection rating */}
          <Stack gap="xs">
            <Group justify="space-between">
              <Text size="sm" fw={500}>Emotional Closeness</Text>
              <Text size="sm" fw={700} c="teal.6">{connection} / 5</Text>
            </Group>
            <Slider 
              min={1} 
              max={5} 
              step={1} 
              value={connection} 
              onChange={setConnection}
              color="teal"
              marks={[
                { value: 1, label: 'Distant' },
                { value: 3, label: 'Connected' },
                { value: 5, label: 'Inseparable' }
              ]}
              mb="md"
            />
          </Stack>

          {/* Contraception / Protection */}
          <Switch 
            label="Protection / Contraception Used" 
            checked={protection} 
            onChange={(e) => setProtection(e.currentTarget.checked)}
            color="rose"
          />

          {/* Notes (Encrypted) */}
          <Textarea 
            label="Encrypted Journal Reflections" 
            placeholder="Add feelings, physical symptoms, notes... (encrypted locally before saving)" 
            value={notes} 
            onChange={(e) => setNotes(e.target.value)} 
            rows={3}
          />

          {success && (
            <Card bg="teal.0" py="xs" px="md" radius="sm">
              <Text c="teal.9" size="sm" fw={600} ta="center">
                ✨ Logged successfully! Ciphertext queued for sync.
              </Text>
            </Card>
          )}

          <Button 
            type="submit" 
            color="rose" 
            variant="gradient"
            gradient={{ from: 'rose', to: 'pink', deg: 45 }}
            loading={submitting} 
            fullWidth
            radius="md"
            size="md"
          >
            Encrypt & Log Encounter
          </Button>
        </Stack>
      </form>
    </Card>
  );
}
