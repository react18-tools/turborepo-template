import { Inter } from "next/font/google";
import styles from "./page.module.css";
import { StarMe } from "@mayank1513/fork-me";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	return (
		<main className={`${styles.main} ${inter.className}`}>
			<div className={styles.description}>
				<a
					href="https://github.com/mayank1513/turborepo-template"
					target="_blank"
					rel="noopener noreferrer"
					className={styles.logo}>
					<p>
						<code className={styles.code}>turborepo-template</code>
					</p>
				</a>
				<div>
					<a href="https://mayank-chaudhari.vercel.app" target="_blank" rel="noopener noreferrer">
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
					href="https://github.com/mayank1513/turborepo-template"
					className={styles.card}
					target="_blank"
					rel="noopener noreferrer">
					<h2>
						Use This Template <span>-&gt;</span>
					</h2>
					<p>Explore more on official GitHub Repo.</p>
				</a>
				<StarMe
					gitHubUrl="https://github.com/mayank1513/turborepo-template"
					className={styles.card}>
					<h2>
						Star this repo <span>-&gt;</span>
					</h2>
					<p>Star this repo for your new library!</p>
				</StarMe>
			</div>
		</main>
	);
}
