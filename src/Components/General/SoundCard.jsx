import React from "react";
import { BarChart, PlayCircle, StopCircle, Volume2 } from "react-feather";
import { lerp } from "../../Classes/Constants";
import HomePage from "../../Pages/Home";
import Tooltip from "../Tooltip";
import "./SoundCard.scss";

function tween(start, end, time) {
	return start + (end - start) * time;
}

export default function SoundCard({ id, name, audio, video, Icon, colors = [] }) {
	const [isPlaying, setPlaying] = React.useState(false);
	const [isTransitioningVolume, setTransitioningVolume] = React.useState(false);

	const playerRef = React.useRef();
	const volumeRef = React.useRef();
	const distanceRef = React.useRef();

	const [filter, initFilter] = React.useState(null);
	const [distance, setDistance] = React.useState(0);

	React.useEffect(() => {
		if (localStorage.getItem(`play_state_${id}`) === "true") {
			events.togglePlayState();
		}

		events.onVolumeChange({
			target: volumeRef.current
		});

		events.onDistanceChange({
			target: distanceRef.current
		});
	}, []);

	React.useEffect(() => {
		if (!isPlaying) return;

		const context = new AudioContext();
		const source = context.createMediaElementSource(playerRef.current);
		const filter = context.createBiquadFilter();

		filter.type = "lowpass";

		initFilter(filter);

		source.connect(filter);
		filter.connect(context.destination);
	}, [isPlaying]);

	React.useEffect(() => {
		if (!filter) return;

		filter.frequency.value = distance > 0.1
			? tween(10000, 200, distance / 100)
			: 24000;
	}, [filter, distance]);

	const events = {
		focusBackground: () => {
			HomePage.setBackground(video);
		},
		togglePlayState: () => {
			if (isTransitioningVolume) return;

			setPlaying(!isPlaying);
			setTransitioningVolume(true);

			!isPlaying && playerRef.current.play();

			lerp(1000, mult => {
				playerRef.current.volume =
					(volumeRef.current.value / 100) * (
						isPlaying
							? 1 - mult
							: mult
					);
			}).then(() => {
				setTransitioningVolume(false);

				isPlaying && playerRef.current.pause();

				localStorage.setItem(`play_state_${id}`, !isPlaying);
			});
		},
		onVolumeChange: e => {
			playerRef.current.volume = e.target.value / 100;
			e.target.style = `--value: ${e.target.value}%`;

			localStorage.setItem(`volume_state_${id}`, e.target.value);
		},
		onDistanceChange: e => {
			setDistance(e.target.value);
			e.target.style = `--value: ${e.target.value}%`;

			localStorage.setItem(`distance_state_${id}`, e.target.value);
		}
	};

	return (
		<div
			className="SoundCard"
			onClick={events.focusBackground}
			style={{
				"--primary-color": colors[0],
				"--secondary-color": colors[1]
			}}
		>
			<Icon className="Icon" />

			<h3 className="Name">{name}</h3>

			<audio
				ref={playerRef}
				src={audio}
				style={{ display: "none" }}
				loop
			/>

			<div className="SliderContainer FlexCenter">
				<div>
					<Volume2 />

					<Tooltip>
						Volume
					</Tooltip>
				</div>

				<input
					ref={volumeRef}
					className="Slider"
					type="range"
					defaultValue={
						parseInt(
							localStorage.getItem(`volume_state_${id}`) ?? 50
						)
					}
					min={0} max={100}
					step={1}

					onInput={events.onVolumeChange}
				/>
			</div>

			<div className="SliderContainer FlexCenter">
				<div>
					<BarChart />

					<Tooltip>
						Distance Emulation
					</Tooltip>
				</div>

				<input
					ref={distanceRef}
					className="Slider"
					type="range"
					defaultValue={
						parseInt(
							localStorage.getItem(`distance_state_${id}`) ?? 0
						)
					}
					min={0} max={100}
					step={1}

					onInput={events.onDistanceChange}
				/>
			</div>

			<div className="PlayButton FlexCenter" onClick={events.togglePlayState}>
				{isPlaying ? <StopCircle /> : <PlayCircle />}
			</div>
		</div>
	)
}