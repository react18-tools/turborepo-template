import styles from "./cards.module.css";

interface CardProps {
	href: string;
	title: string;
	description: string;
}

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
