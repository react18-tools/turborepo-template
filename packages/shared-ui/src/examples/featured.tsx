import { Card } from "../cards/card";
import { featured } from "./featured.const";
import styles from "./examples.module.css";

export default function Featured() {
  return (
    <>
      <h2>Featured packages built with this template.</h2>
      <hr />
      <div className={styles.featured}>
        {featured.map(example => (
          <Card {...example} key={example.href} />
        ))}
      </div>
    </>
  );
}
