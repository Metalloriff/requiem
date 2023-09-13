import React from "react";
import manifest from "../Assets/manifest";
import Config from "../Classes/Config";
import BackgroundCard from "../Components/General/BackgroundCard";
import PresetCard, { PlusPresetCard } from "../Components/General/PresetCard";
import SoundCard from "../Components/General/SoundCard";
import "./Home.scss";

export let forceUpdate;

export default function HomePage({ goFullDark }) {
	const [backgroundSource, _setBackgroundSource] = React.useState(Config.getItem("background"));
	const [targetSource, _setTargetSource] = React.useState(null);
	const [cui, _forceUpdate] = React.useReducer(x => x + 1, 0);
	forceUpdate = _forceUpdate;

	const bgRef = React.useRef();
	const targRef = React.useRef();

	HomePage.setBackground = async newSource => {
		while (targetSource)
			await new Promise(r => setTimeout(r, 200));
		if (backgroundSource === newSource || targetSource === newSource) return;

		_setTargetSource(newSource);

		Config.setItem("background", newSource);

		setTimeout(() => {
			targRef.current.oncanplay = () => {
				targRef.current.classList.add("Transitioning");

				targRef.current.onanimationend = () => {
					_setBackgroundSource(newSource);

					setTimeout(() => {
						bgRef.current.oncanplay = () => {
							if (bgRef.current && targRef.current) {
								bgRef.current.currentTime =
									targRef.current.currentTime;

								_setTargetSource(null);
							}
						};
					}, 0);
				};
			};
		}, 0);
	};

	return (
		<div className="HomePage">
			<div className="Background">
				<video
					ref={bgRef}
					src={backgroundSource}
					autoPlay loop muted
				/>

				{targetSource && (
					<video
						className="Target"
						ref={targRef}
						src={targetSource}
						autoPlay loop muted
					/>
				)}
			</div>

			<div className="Foreground">
				<h1 className="Title">Sounds</h1>

				<div className="SoundCards">
					{Object.entries(manifest.sounds).map(([id, sound]) => (
						<SoundCard key={id + cui} id={id} {...sound} />
					))}
				</div>

				<div className="FlexCenter" style={{ gap: 20 }}>
					<div
						className="SoundCard"
						style={{
							"--primary-color": "#ffaaaa",
							"--secondary-color": "#ff5555",
							cursor: "pointer"
						}}
						onClick={() => {
							for (const stateId in Config.data.currentState) {
								Config.data.currentState[stateId].isPlaying = false;
								Config.save();
							}

							forceUpdate();
						}}
					><h3 className="Name">Stop All</h3></div>

					<div
						className="SoundCard"
						style={{
							"--primary-color": "#111111",
							"--secondary-color": "black",
							cursor: "pointer"
						}}
						onClick={goFullDark}
					><h3 className="Name">Go Full Dark</h3></div>
				</div>

				<h1 className="Title">Backgrounds</h1>

				<div className="SoundCards">
					{Object.entries(manifest.videos).map(([id, video]) => (
						<BackgroundCard key={id + cui} id={id} {...video} />
					))}
				</div>

				<h1 className="Title">Presets</h1>

				<div className="SoundCards">
					{manifest.defaultPresets.map(({ id, state }) => (
						<PresetCard key={id + cui} id={id} state={state} />
					))}
				</div>

				<h1 className="Title">Your Presets</h1>

				<div className="SoundCards">
					{Config.getItem("presets").map(({ id, state }) => (
						<PresetCard key={id + cui} id={id} state={state} />
					))}

					<PlusPresetCard />
				</div>
			</div>
		</div>
	);
}