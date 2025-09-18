import "./styles.css";
import "react18-loaders/styles";
import { GlobalLoader, Header } from "@repo/shared";
import { Layout } from "@repo/shared/dist/server";
import { Inter } from "next/font/google";
import Link from "next/link";
import { Core } from "nextjs-darkmode-lite";
import type { ReactNode } from "react";
import { Particles } from "webgl-generative-particles/react";

const inter = Inter({ subsets: ["latin"] });

/** Root layout. */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): ReactNode {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Core />
        <Layout>
          <Header linkComponent={Link} />
          {children}
        </Layout>
        <GlobalLoader />
        <Particles fullScreenOverlay />
      </body>
    </html>
  );
}
