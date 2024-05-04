import * as React from "react";
import styles from "./landing-page.module.scss";
import { Cards } from "../cards";
import { Logo } from "../logo";

interface LandingPageProps {
  title: string;
  children?: React.ReactNode;
}

/**
 * # LandingPage
 * library&#x27;s landing page
 */
export function LandingPage({ title, children }: LandingPageProps) {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.center}>
        <h2>
          <i>Craft your next amazing library using</i>
        </h2>
        <Logo />
        <p>
          <strong>
            <i>Harness the full potential of React 18 Server Components!</i>
          </strong>
        </p>
      </div>
      {children}
      <Cards />
    </main>
  );
}
