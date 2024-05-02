import { DrawerButton } from "@repo/shared";
import { Logo } from "@repo/shared/dist/server";
import ThemeSwitch from "./theme-switch";

export default function Header() {
  return (
    <header>
      <DrawerButton />
      <Logo />
      <nav>
        <a href="https://mayank-chaudhari.vercel.app/" target="_blank" rel="noopener noreferrer">
          By Mayank
        </a>
        <ThemeSwitch />
      </nav>
    </header>
  );
}
