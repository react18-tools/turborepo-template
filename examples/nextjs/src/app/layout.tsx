import "./styles.css";
import "react18-loaders/dist/index.css";
import { Core } from "nextjs-darkmode";
import { Layout } from "@repo/shared/dist/server";
import { GlobalLoader, Header } from "@repo/shared";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

/** Root layout. */
export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Core />
        <Layout>
          <Header />
          {children}
        </Layout>
        <GlobalLoader />
      </body>
    </html>
  );
}
