import { Center } from "@mantine/core";

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Center p="md">{children}</Center>;
}
