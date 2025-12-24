import {render} from "preact";
import {Router} from "preact-router";

import Home from "./routes/Home";
import ViewData from "./routes/ViewData";
import ManageData from "./routes/ManageData";
import StartWorkout from "./routes/StartWorkout";

function App() {
	return (
		<Router>
			<Home path="/" />
			<StartWorkout path="/start" />
			<ViewData path="/trends" />
			<ManageData path="/manage" />
		</Router>
	);
};

render(<App />, document.getElementById("app")!);

// Register service worker if browser supports and prod
if (import.meta.env.PROD && "serviceWorker" in navigator) {
	window.addEventListener("load", (): void => {
		navigator.serviceWorker
			.register("/service-worker.js")
			.catch((error: unknown): void => {
				console.error("Failed to register service worker:", error);
			});
	});
}
