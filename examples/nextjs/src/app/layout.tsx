import "./styles.css";
import "react18-loaders/dist/index.css";
import { NextJsServerTarget } from "nextjs-themes/server";
import { ThemeSwitcher } from "nextjs-themes";
import { Layout } from "@repo/shared/dist/server";
import { GlobalLoader } from "@repo/shared/dist/client";
import Header from "../components/header";

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang="en">
      <body>
        <NextJsServerTarget />
        <ThemeSwitcher />
        <Layout>
          <Header />
          {children}
        </Layout>
        <GlobalLoader />
      </body>
    </html>
  );
}
