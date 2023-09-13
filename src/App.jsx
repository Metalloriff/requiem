import React, { useEffect, useState } from "react";
import { DollarSign, Moon } from "react-feather";
import "./App.scss";
import Config from "./Classes/Config";
import { joinClassNames } from "./Classes/Constants";
import { useMediaQuery } from "./Classes/Hooks";
import RoutesStore from "./Classes/Stores/RoutesStore";
import ContextMenu from "./Components/ContextMenuHandler";
import DarkReaderDetector from "./Components/DarkReaderDetector";
import { Modals } from "./Components/Modals";
import PageFooter from "./Components/PageElements/PageFooter";
import Toasts, { ToastType } from "./Components/Toasts";
import HomePage from "./Pages/Home";
import LicensesPage from "./Pages/LicensesPage";
import "./city-fog-theme.css";

Config.load();

window.addEventListener("popstate", () => {
	PageElement.forceUpdate?.();
});

function PageElement({ ...props }) {
	const [, forceUpdate] = React.useReducer(x => x + 1, 0);
	PageElement.forceUpdate = forceUpdate;

	// Store the formatted hash in a variable.
	const [hash, ...args] = RoutesStore.useState(() => RoutesStore.getFormattedRoute());

	// Set the app hash value.
	App.hash = hash;

	// Zhu Li, do the thing!
	switch (hash) {
		default: return <HomePage {...props} />;
		case "licenses": return <LicensesPage />;
	}
}

export default function App() {
	const isMobile = useMediaQuery({ query: "(max-width: 1224px)" });
	const [, forceUpdate] = React.useReducer(x => x + 1, 0);

	const [sleeping, setSleeping] = useState(false);
	const [fullDark, setFullDark] = useState(false);

	useEffect(() => {
		let sleepTimeout;

		const handleSleep = () => {
			setSleeping(true);
		};

		const resetSleep = () => {
			setSleeping(false);
			setFullDark(false);

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

	useEffect(() => {
		if (Object.values(Config.data.currentState).some(d => d.isPlaying)) {
			Toasts.showToast("Click anywhere to continue where you left off!");
		}
	}, []);

	return (
		<div className={joinClassNames("App", isMobile ? "Mobile" : "Desktop")}>
			<div className={joinClassNames("Main", [sleeping, "Sleeping"], [fullDark, "Black"])}>
				<PageElement goFullDark={() => {
					Toasts.showToast("Going full dark...", ToastType.Default, 3);
					setTimeout(() => (setSleeping(true), setFullDark(true)), 3000);
				}} />

				<div className="PopupContainer FlexCenter AbsoluteCover">
					<div className="Popup FlexCenter">
						<Moon className="Icon" />

						<h2>Rest well...</h2>
					</div>

					<div className="Popup DonatePopup FlexCenter">
						<DollarSign className="Icon" />

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
			<DarkReaderDetector />
		</div>
	);
}