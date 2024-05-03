import styles from "./cards.module.scss";
import { Card } from "./card";

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

export function Cards() {
  return (
    <div className={styles.cards}>
      {cards.map(card => (
        <Card key={card.href} {...card} />
      ))}
    </div>
  );
}
