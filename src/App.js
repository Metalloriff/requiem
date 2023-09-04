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
import Config from "./Classes/Config";
import { Moon, DollarSign } from "react-feather";

Config.load();

window.addEventListener("popstate", () => {
	PageElement.forceUpdate?.();
});

function PageElement() {
	const [, forceUpdate] = React.useReducer(x => x + 1, 0);
	PageElement.forceUpdate = forceUpdate;

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

	const [sleeping, setSleeping] = React.useState(false);

	React.useEffect(() => {
		let sleepTimeout;

		const handleSleep = () => {
			setSleeping(true);
		};

		const resetSleep = () => {
			setSleeping(false);

			clearTimeout(sleepTimeout);
			sleepTimeout = setTimeout(handleSleep, 1000 * 30);
		};

		window.addEventListener("mousemove", resetSleep);
		window.addEventListener("scroll", resetSleep);
		window.addEventListener("click", resetSleep);
		window.addEventListener("keydown", resetSleep);

		return () => {
			window.removeEventListener("mousemove", resetSleep);
			window.removeEventListener("scroll", resetSleep);
			window.removeEventListener("click", resetSleep);
			window.removeEventListener("keydown", resetSleep);
		};
	}, []);

	return (
		<div className={joinClassNames("App", isMobile ? "Mobile" : "Desktop")}>
			<div className={joinClassNames("Main", [sleeping, "Sleeping"])}>
				<PageElement />

				<div className="PopupContainer FlexCenter AbsoluteCover">
					<div className="Popup FlexCenter">
						<Moon className="Icon"/>

						<h2>Rest well...</h2>
					</div>

					<div className="Popup DonatePopup FlexCenter">
						<DollarSign className="Icon"/>

						<div>
							<h2>If you enjoy this web app, please consider donating.</h2>
							<h2>Your contributions help me continue making free things just like this!</h2>
						</div>
					</div>
				</div>
			</div>

			<PageFooter />

			<Modals />
			<Toasts />
			<ContextMenu.Handler />
		</div>
	);
}