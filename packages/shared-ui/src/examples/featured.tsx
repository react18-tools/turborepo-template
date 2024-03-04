import type { CardProps } from "../cards/card";
import { Card } from "../cards/card";
import * as featured from "./featured.json";
import styles from "./examples.module.css";

export default function Featured() {
  const featuredPackages = featured as CardProps[];
  featuredPackages.sort((f1, f2) => f1.title.localeCompare(f2.title));
  return (
    <>
      <h2>Featured packages built with this template.</h2>
      <hr />
      <div className={styles.featured}>
        {featuredPackages.map(example => (
          <Card {...example} key={example.href} />
        ))}
      </div>
    </>
  );
}
