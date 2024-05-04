import { log } from "@repo/logger";
import MyButton from "./button";
import { LandingPage } from "@repo/shared/dist/server";
import { Demo } from "@repo/shared";

export const metadata = {
  title: "Store | Kitchen Sink",
};

export default function Store(): JSX.Element {
  log("Hey! This is the Store page.");

  return (
    <LandingPage title="Next.js Example">
      <Demo />
    </LandingPage>
  );
}
