import { Navigation, NavigationBar } from "@/features/Navigation";
import {
	AppShell,
	AppShellMain,
	AppShellNavbar,
	Container,
	rem,
} from "@mantine/core";
import "@mantine/core/styles.css";

export default function SignedInLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const opened = false;

	return (
		<AppShell
			navbar={{
				width: rem(80),
				breakpoint: "sm",
				collapsed: { mobile: !opened },
			}}
			padding="md"
		>
			<AppShellNavbar component="div">
				<Navigation />
			</AppShellNavbar>
			<NavigationBar />

			<AppShellMain>
				<Container>{children}</Container>
			</AppShellMain>
		</AppShell>
	);
}
