import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { SharedRootLayout } from "shared-ui";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<SharedRootLayout>
			<App />
		</SharedRootLayout>
	</React.StrictMode>,
);
