import * as React from "react";
import styles from "./landing-page.module.scss";
import { Cards } from "../cards";
import { Logo } from "../logo";
import featured from "../../../../../featured.json";

interface LandingPageProps {
  title: string;
  children?: React.ReactNode;
}

const cards = [
  {
    href: "https://react18-tools.github.io/turborepo-template/",
    title: "Docs",
    description: "Check out the official documentation for more information.",
  },
  {
    href: "https://github.com/react18-tools/turborepo-template",
    title: "More Examples",
    description:
      "Check out more examples on the official GitHub Repo. Feel free to suggest additional examples in the discussions section.",
  },
  {
    href: "https://github.com/react18-tools/turborepo-template",
    title: "Star this repo",
    description:
      "Star this repo for your new library! This also motivates us and helps us understand that community is interested in this work.",
  },
];

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
      <div className={styles.featured}>
        <h2>Featured packages built with this template.</h2>
        <hr />
        <Cards cards={featured} />
      </div>
      <Cards cards={cards} />
    </main>
  );
}
