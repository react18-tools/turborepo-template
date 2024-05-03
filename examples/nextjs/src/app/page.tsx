import { log } from "@repo/logger";
import MyButton from "./button";
import { LandingPage } from "@repo/shared/dist/server";

export const metadata = {
  title: "Store | Kitchen Sink",
};

export default function Store(): JSX.Element {
  log("Hey! This is the Store page.");

  return (
    <div className="container">
      <LandingPage title="Next.js Example" />
      <h1 className="title">
        Store <br />
        <span>Kitchen Sink</span>
      </h1>
      <MyButton />
    </div>
  );
}