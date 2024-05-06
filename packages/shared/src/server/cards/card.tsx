import styles from "./cards.module.scss";

export interface CardProps {
  href: string;
  title: string;
  description: string;
}

/** Display component */
export function Card({ href, title, description }: CardProps) {
  return (
    <a className={styles.card} href={href} rel="noopener noreferrer" target="_blank">
      <h2>
        {title} <span>-&gt;</span>
      </h2>
      <p>{description}</p>
    </a>
  );
}
