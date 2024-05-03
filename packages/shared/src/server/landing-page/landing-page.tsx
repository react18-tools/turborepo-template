import * as React from "react";
import styles from "./landing-page.module.scss";
import { Cards } from "../cards";

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
      <h1>{title}</h1>
      <Cards />
    </main>
  );
}
