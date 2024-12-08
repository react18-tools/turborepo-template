import { Demo } from "@repo/shared";
import { LandingPage } from "@repo/shared/dist/server";
import { ReactNode } from "react";

/** Remix App */
export default function Index(): ReactNode {
  return (
    <LandingPage title="Remix Example">
      <Demo />
    </LandingPage>
  );
}
