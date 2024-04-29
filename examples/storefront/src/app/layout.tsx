import "./styles.css";
import { LoaderContainer, Bars2 } from "@repo/ui";

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang="en">
      <body>
        {children}
        <LoaderContainer>
          <Bars2 />
        </LoaderContainer>
      </body>
    </html>
  );
}
