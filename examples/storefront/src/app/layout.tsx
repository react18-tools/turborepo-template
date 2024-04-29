import "./styles.css";
import { Bars2 } from "@repo/ui";
import { LoaderContainer } from "@repo/ui/dist/client";
import "@repo/ui/dist/index.css";

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang="en">
      <body>
        {children}
        <LoaderContainer>
          <Bars2 color="red" />
        </LoaderContainer>
      </body>
    </html>
  );
}
