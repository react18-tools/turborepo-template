import { ExamplesCard } from "./examples-card";
import styles from "./cards.module.css";
import { StarMeCard } from "./star-me-card";
import { DocsCard } from "./docs-card";

export function Cards() {
	return (
		<div className={styles.cards}>
			<DocsCard />
			<ExamplesCard />
			<StarMeCard />
		</div>
	);
}
