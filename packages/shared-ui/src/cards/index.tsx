import { ExamplesCard } from "./examples-card";
import type { PageNavigatorCardProps } from "./page-navigator-card";
import { PageNavigatorCard } from "./page-navigator-card";
import styles from "./cards.module.css";
import { StarMeCard } from "./star-me-card";
import { DocsCard } from "./docs-card";

export function Cards({ LinkElement }: PageNavigatorCardProps) {
	return (
		<div className={styles.cards}>
			<PageNavigatorCard LinkElement={LinkElement} />
			<DocsCard />
			<ExamplesCard />
			<StarMeCard />
		</div>
	);
}
