import { theme } from "@/theme";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import type { Metadata } from "next";
import { NextAppDirEmotionCacheProvider } from "tss-react/next/appDir";

export const metadata: Metadata = {
  title: "Health App",
  description: "A App to track your health",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const opened = false;

  return (
    <html lang="en" data-mantine-color-scheme="dark" data-lt-installed="true">
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body>
        <NextAppDirEmotionCacheProvider options={{ key: "css" }}>
          <MantineProvider defaultColorScheme="dark" theme={theme}>
            {children}
          </MantineProvider>
        </NextAppDirEmotionCacheProvider>
      </body>
    </html>
  );
}
