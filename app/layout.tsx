import { theme } from "@/theme";
import { setI18n } from "@lingui/react/server";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import type { Metadata, Viewport } from "next";
import { NextAppDirEmotionCacheProvider } from "tss-react/next/appDir";
import { LinguiClientProvider } from "./LinguiClientProvider";
import { getI18nInstance } from "./i18nRouter";

export const metadata: Metadata = {
	applicationName: "Health App",
	title: "Health App",
	description: "A App to track your health",
};

export const viewport: Viewport = {
	themeColor: "#693396",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const lang = "en";
	const i18n = getI18nInstance(lang);
	setI18n(i18n);

	return (
		<html lang="en" data-mantine-color-scheme="dark" data-lt-installed="true">
			<head>
				<ColorSchemeScript defaultColorScheme="dark" />
			</head>
			<body>
				<NextAppDirEmotionCacheProvider options={{ key: "css" }}>
					<MantineProvider defaultColorScheme="dark" theme={theme}>
						<LinguiClientProvider
							initialLocale={lang}
							initialMessages={i18n.messages}
						>
							{children}
						</LinguiClientProvider>
					</MantineProvider>
				</NextAppDirEmotionCacheProvider>
			</body>
		</html>
	);
}
