import { Inter } from "next/font/google";
import { StarMe } from "@mayank1513/fork-me";
import styles from "./page.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home(): JSX.Element {
	return (
		<main className={`${styles.main} ${inter.className}`}>
			<div className={styles.description}>
				<a
					className={styles.logo}
					href="https://github.com/mayank1513/turborepo-template"
					rel="noopener noreferrer"
					target="_blank">
					<p>
						<code className={styles.code}>turborepo-template</code>
					</p>
				</a>
				<div>
					<a href="https://mayank-chaudhari.vercel.app" rel="noopener noreferrer" target="_blank">
						By Mayank
					</a>
				</div>
			</div>

			<div className={styles.center}>
				<div>
					<h1>
						Build with <code>turborepo-template</code>
					</h1>
					<p>Unleash the power of React Server Components!</p>
				</div>
			</div>

			<div className={styles.cards}>
				<a
					className={styles.card}
					href="https://github.com/mayank1513/turborepo-template"
					rel="noopener noreferrer"
					target="_blank">
					<h2>
						Use This Template <span>-&gt;</span>
					</h2>
					<p>Explore more on official GitHub Repo.</p>
				</a>
				<StarMe
					className={styles.card}
					gitHubUrl="https://github.com/mayank1513/turborepo-template">
					<h2>
						Star this repo <span>-&gt;</span>
					</h2>
					<p>Star this repo for your new library!</p>
				</StarMe>
			</div>
		</main>
	);
}
