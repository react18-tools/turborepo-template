import { Card, type CardProps } from "./card";
import styles from "./cards.module.scss";

/** Component to render cards */
export function Cards({ cards }: { cards: CardProps[] }) {
  return (
    <div className={styles.cards}>
      {cards.map((card) => (
        <Card key={card.href} {...card} />
      ))}
    </div>
  );
}
