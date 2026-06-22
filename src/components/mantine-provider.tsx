'use client';

import { MantineProvider } from '@mantine/core';
import { useEffect, type ReactNode } from 'react';

export function MantineClientProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            console.log('Service Worker registered with scope:', registration.scope);
          })
          .catch((error) => {
            console.error('Service Worker registration failed:', error);
          });
      });
    }
  }, []);

  return (
    <MantineProvider defaultColorScheme="auto" deduplicateInlineStyles>
      {children}
    </MantineProvider>
  );
}
