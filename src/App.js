import React from "react";
import "./App.scss";
import "./city-fog-theme.css";
import { joinClassNames } from "./Classes/Constants";
import { useMediaQuery } from "./Classes/Hooks";
import ContextMenu from "./Components/ContextMenuHandler";
import { Modals } from "./Components/Modals";
import PageFooter from "./Components/PageElements/PageFooter";
import Toasts from "./Components/Toasts";
import HomePage from "./Pages/Home";
import LicensesPage from "./Pages/LicensesPage";

window.addEventListener("popstate", () => {
	PageElement.forceUpdate?.();
});

function PageElement() {
	const [, forceUpdate] = React.useReducer(x => x + 1, 0);
	PageElement.forceUpdate = forceUpdate;

	if (~navigator.userAgent.indexOf("Firefox")) {
		// return (
		// 	<div className="NotSupported FlexCenter">
		// 		<h1>UNSUPPORTED BROWSER</h1>

		// 		<h3>
		// 			Due to Firefox's limitations and
		// 			lack of support for modern web features,
		// 			it is not supported.
		// 		</h3>

		// 		<h3>
		// 			Please upgrade your browser to any
		// 			chromium-powered browser.
		// 		</h3>

		// 		<h3>
		// 			Examples -
		// 			<a href="https://www.google.com/chrome/">Chrome</a>,
		// 			<a href="https://www.opera.com/download">Opera</a>,
		// 			<a href="https://www.opera.com/gx">Opera GX</a>,
		// 			<a href="https://brave.com/download/">Brave</a>,
		// 			<a href="https://www.microsoft.com/en-us/edge">Edge</a>
		// 		</h3>
		// 	</div>
		// );
	}

	// Store the formatted hash in a variable.
	const [hash, ...args] = (window.location.hash
		.split(/#\/?/)[1] ?? "")
		.split("?")[0]
		.split("/");

	// Set the app hash value.
	App.hash = hash;

	// Zhu Li, do the thing!
	switch (hash) {
		default: return <HomePage />;
		case "licenses": return <LicensesPage />;
	}
}

export default function App() {
	const isMobile = useMediaQuery({ query: "(max-width: 1224px)" });
	const [, forceUpdate] = React.useReducer(x => x + 1, 0);

	return (
		<div className={joinClassNames("App", isMobile ? "Mobile" : "Desktop")}>
			<div className="Main">
				<PageElement />
			</div>

			<PageFooter />

			<Modals />
			<Toasts />
			<ContextMenu.Handler />
		</div>
	);
}