import React from "react";
import manifest from "../Assets/manifest";
import SoundCard from "../Components/General/SoundCard";
import "./Home.scss";

export default function HomePage() {
	const [backgroundSource, _setBackgroundSource] = React.useState(manifest.background);
	const [targetSource, _setTargetSource] = React.useState(null);

	const bgRef = React.useRef();
	const targRef = React.useRef();

	HomePage.setBackground = async newSource => {
		while (targetSource)
			await new Promise(r => setTimeout(r, 200));
		if (backgroundSource === newSource || targetSource === newSource) return;

		_setTargetSource(newSource);

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

			<div className="SoundCards">
				{Object.entries(manifest.sounds).map(([id, sound]) => (
					<SoundCard key={id} id={id} {...sound} />
				))}
			</div>
		</div>
	);
}