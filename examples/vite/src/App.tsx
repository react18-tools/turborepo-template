import { useState } from "react";
import { ThemeSwitcher } from "react18-themes";
import { ForkMe } from "@mayank1513/fork-me/server";
import { StarMe } from "@mayank1513/fork-me";
import "./App.css";

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<ThemeSwitcher />
			<h1>Vite + React + TS Example</h1>
			<div className="card">
				<button onClick={() => setCount(count => count + 1)}>count is {count}</button>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<StarMe gitHubUrl="https://github.com/mayank1513/turborepo-template" />
			<ForkMe gitHubUrl="https://github.com/mayank1513/turborepo-template" />
		</>
	);
}

export default App;
