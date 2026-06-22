'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Card, Title, Text, Button, Group, Box, Badge, Center, Stack } from '@mantine/core';

// Interface for desire cards
interface DesireCard {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: string;
}

const INITIAL_DESIRES: DesireCard[] = [
  {
    id: 'massage',
    title: 'Sensual Oil Massage',
    category: 'Relaxation & Touch',
    description: 'A slow, full-body massage using warm aromatherapy oils, focusing on connection and easing tension before any intimacy.',
    icon: '💆‍♀️',
  },
  {
    id: 'blindfold',
    title: 'Sensory Deprivation / Blindfold',
    category: 'Trust & Senses',
    description: 'Covering eyes to heighten other senses—touch, hearing, and taste. Focuses on anticipation and trust.',
    icon: '🙈',
  },
  {
    id: 'toys',
    title: 'Introduce a New Toy',
    category: 'Novelty & Play',
    description: 'Exploring intimacy together with toys or accessories to add variety and new physical sensations.',
    icon: '🧸',
  },
  {
    id: 'roleplay',
    title: 'Roleplay Scenario',
    category: 'Fantasy & Fun',
    description: 'Adopting personas or a scenarios (e.g. strangers meeting at a hotel bar) to act out playful dynamics.',
    icon: '🎭',
  },
  {
    id: 'shower',
    title: 'Shower / Bath Together',
    category: 'Sensual & Warmth',
    description: 'Sharing a warm shower or bubble bath, washing each other slowly, focusing purely on closeness and warmth.',
    icon: '🧼',
  },
  {
    id: 'qna',
    title: 'Intimacy Q&A Card Game',
    category: 'Emotional Connection',
    description: 'Asking each other deep, revealing, or spicy questions to foster emotional vulnerability and psychological closeness.',
    icon: '🃏',
  },
  {
    id: 'morning',
    title: 'Morning Quickie',
    category: 'Spontaneous',
    description: 'A playful and quick intimate connection right after waking up to start the day energized.',
    icon: '☀️',
  },
];

export function SwipeDeck() {
  const [desires, setDesires] = useState<DesireCard[]>(INITIAL_DESIRES);
  const [history, setHistory] = useState<{ [key: string]: 'yes' | 'no' | 'curious' }>({});
  const [matches, setMatches] = useState<string[]>([]); // Matches discovered (mocked for demo)

  const handleSwipe = (id: string, choice: 'yes' | 'no' | 'curious') => {
    // Record swipe locally
    const newHistory = { ...history, [id]: choice };
    setHistory(newHistory);

    // Mock partner matching:
    // In a real application, we would encrypt this response and sync it.
    // If partner also swiped 'yes' or 'curious' (which the server informs us), it triggers a match!
    // For demo purposes, let's randomly "match" on 50% of 'yes' or 'curious' swipes.
    if (choice === 'yes' || choice === 'curious') {
      if (Math.random() > 0.4) {
        const swipedCard = desires.find(d => d.id === id);
        if (swipedCard) {
          setTimeout(() => {
            setMatches(prev => [...prev, swipedCard.title]);
          }, 600);
        }
      }
    }

    // Remove the swiped card from the active list
    setDesires(prev => prev.filter(item => item.id !== id));
  };

  const handleReset = () => {
    setDesires(INITIAL_DESIRES);
    setHistory({});
    setMatches([]);
  };

  return (
    <Stack gap="xl" align="center" style={{ width: '100%' }}>
      <Box ta="center">
        <Title order={3}>Desires Matcher</Title>
        <Text size="xs" c="dimmed" mt="4px">
          Swipe cards to register your desires. Matches are double-blinded and only revealed if you both express interest!
        </Text>
      </Box>

      {/* Match Alert Notification banner */}
      <AnimatePresence>
        {matches.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            style={{ width: '100%', maxWidth: 400 }}
          >
            <Card withBorder radius="md" p="md" bg="var(--mantine-color-rose-light)" style={{ borderColor: 'var(--mantine-color-rose-outline)' }}>
              <Stack gap="xs" align="center">
                <Text size="sm" fw={800} c="rose.9" ta="center">
                  💖 IT'S A MATCH!
                </Text>
                <Text size="xs" c="rose.8" ta="center" fw={500}>
                  You and your partner both want to try: <br />
                  <strong style={{ fontSize: '14px' }}>"{matches[matches.length - 1]}"</strong>
                </Text>
              </Stack>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Card Deck Area */}
      <Box style={{ position: 'relative', width: '100%', maxWidth: 360, height: 420 }}>
        <AnimatePresence>
          {desires.length > 0 ? (
            desires.map((card, index) => (
              <SwipeCard 
                key={card.id} 
                card={card} 
                index={index}
                total={desires.length}
                onSwipe={(choice) => handleSwipe(card.id, choice)} 
              />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Card withBorder radius="md" p="xl" shadow="sm" ta="center" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Text size="xl" mb="md">🎉</Text>
                <Text fw={700} size="lg" mb="xs">All Caught Up!</Text>
                <Text size="sm" c="dimmed" mb="xl">
                  You have swiped on all available cards. Once your partner swipes, matches will appear here instantly.
                </Text>
                <Button variant="outline" color="rose" radius="md" onClick={handleReset}>
                  Swipe Again
                </Button>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>

      {/* Control Buttons (Only if cards exist) */}
      {desires.length > 0 && (
        <Group gap="md" justify="center">
          <Button 
            radius="xl" 
            size="lg"
            variant="light"
            color="gray"
            style={{ width: 60, height: 60, padding: 0 }}
            onClick={() => handleSwipe(desires[desires.length - 1].id, 'no')}
          >
            ❌
          </Button>
          <Button 
            radius="xl" 
            size="lg"
            variant="light"
            color="blue"
            style={{ width: 60, height: 60, padding: 0 }}
            onClick={() => handleSwipe(desires[desires.length - 1].id, 'curious')}
          >
            ❓
          </Button>
          <Button 
            radius="xl" 
            size="lg"
            variant="light"
            color="rose"
            style={{ width: 60, height: 60, padding: 0 }}
            onClick={() => handleSwipe(desires[desires.length - 1].id, 'yes')}
          >
            ❤️
          </Button>
        </Group>
      )}
    </Stack>
  );
}

// Sub-component for individual card with Framer Motion drag
function SwipeCard({ 
  card, 
  index, 
  total,
  onSwipe 
}: { 
  card: DesireCard; 
  index: number; 
  total: number;
  onSwipe: (choice: 'yes' | 'no' | 'curious') => void;
}) {
  const isTopCard = index === total - 1;

  // Motion values to track drag distance
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Transformed values for tilt and opacity overlay indicators
  const rotate = useTransform(x, [-200, 200], [-30, 30]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
  
  // Custom badges for YES/NO/CURIOUS based on drag direction
  const yesOpacity = useTransform(x, [0, 100], [0, 1]);
  const noOpacity = useTransform(x, [-100, 0], [1, 0]);
  const curiousOpacity = useTransform(y, [-100, 0], [1, 0]);

  const handleDragEnd = (event: any, info: any) => {
    if (info.offset.x > 140) {
      onSwipe('yes');
    } else if (info.offset.x < -140) {
      onSwipe('no');
    } else if (info.offset.y < -140) {
      onSwipe('curious');
    }
  };

  return (
    <motion.div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        x,
        y,
        rotate,
        zIndex: index,
        cursor: isTopCard ? 'grab' : 'auto',
      }}
      drag={isTopCard}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      animate={isTopCard ? undefined : { scale: 0.95 + index * 0.01, y: (total - index - 1) * -8 }}
      exit={{ 
        x: x.get() > 0 ? (x.get() === 0 ? 300 : x.get() * 3) : (x.get() === 0 ? -300 : x.get() * 3), 
        y: y.get() < 0 ? y.get() * 3 : 0,
        opacity: 0, 
        transition: { duration: 0.3 } 
      }}
    >
      <Card
        withBorder
        radius="lg"
        shadow="md"
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '28px',
          backgroundColor: 'var(--mantine-color-body)',
          userSelect: 'none',
          borderWidth: '2px',
          borderColor: isTopCard ? 'var(--mantine-color-rose-outline)' : 'var(--mantine-color-default-border)'
        }}
      >
        {/* Swipe Direction Indicators */}
        {isTopCard && (
          <>
            <motion.div style={{ opacity: yesOpacity, position: 'absolute', top: 20, left: 20, rotate: -15, zIndex: 10 }}>
              <Badge color="green" size="lg" variant="filled">LIKE ❤️</Badge>
            </motion.div>
            <motion.div style={{ opacity: noOpacity, position: 'absolute', top: 20, right: 20, rotate: 15, zIndex: 10 }}>
              <Badge color="red" size="lg" variant="filled">PASS ❌</Badge>
            </motion.div>
            <motion.div style={{ opacity: curiousOpacity, position: 'absolute', bottom: 20, left: '35%', zIndex: 10 }}>
              <Badge color="blue" size="lg" variant="filled">CURIOUS ❓</Badge>
            </motion.div>
          </>
        )}

        <Stack align="center" gap="md" style={{ flex: 1, justifyContent: 'center' }}>
          <Center style={{ width: 80, height: 80, borderRadius: '50%', backgroundColor: 'var(--mantine-color-rose-light)', fontSize: 44 }}>
            {card.icon}
          </Center>
          
          <Stack gap="xs" align="center" ta="center">
            <Badge color="rose" variant="light">{card.category}</Badge>
            <Title order={3} size="h3" style={{ fontWeight: 800 }}>{card.title}</Title>
          </Stack>
          
          <Text size="sm" c="dimmed" ta="center" style={{ lineHeight: 1.5 }}>
            {card.description}
          </Text>
        </Stack>

        <Text size="xs" c="gray.5" ta="center" mt="md">
          {isTopCard ? '👈 Swipe Left (Pass) | Swipe Right (Like) 👉' : ''}
        </Text>
      </Card>
    </motion.div>
  );
}
