import "./styles.css";
import { Bars2 } from "react18-loaders";
import { LoaderContainer } from "react18-loaders/dist/client";
import "react18-loaders/dist/index.css";
import { NextJsServerTarget } from "nextjs-themes/server";
import { ThemeSwitcher } from "nextjs-themes";

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang="en">
      <body>
        <NextJsServerTarget />
        <ThemeSwitcher />
        {children}
        <LoaderContainer>
          <Bars2 color="red" />
        </LoaderContainer>
      </body>
    </html>
  );
}
