import React from "react";
import { BarChart, MinusCircle, PlayCircle, StopCircle, Volume2 } from "react-feather";
import Config from "../../Classes/Config";
import { lerp } from "../../Classes/Constants";
import Tooltip from "../Tooltip";
import "./SoundCard.scss";

function tween(start, end, time) {
	return start + (end - start) * time;
}

let hasInteracted = false;

function interactEvent() {
	hasInteracted = true;
	window.removeEventListener("click", interactEvent);
}

window.addEventListener("click", interactEvent);

export default function SoundCard({ id, name, audio, Icon, colors = [] }) {
	const [isPlaying, setPlaying] = React.useState(false);
	const [isLoading, setLoading] = React.useState(false);
	const [isTransitioningVolume, setTransitioningVolume] = React.useState(false);

	const volumeRef = React.useRef();
	const distanceRef = React.useRef();

	const [distance, setDistance] = React.useState(0);

	const [context, setContext] = React.useState(null);
	const [source, setSource] = React.useState(null);
	const [filter, setFilter] = React.useState(null);
	const [gainNode, setGainNode] = React.useState(null);

	React.useEffect(() => {
		const context = new AudioContext();
		const source = context.createBufferSource();
		setContext(context);
		setSource(source);

		if (Config.getItem(`currentState.${id}.isPlaying`)) {
			new Promise(async () => {
				while (!hasInteracted) await new Promise(r => setTimeout(r, 200));

				events.togglePlayState();
			});
		}

		events.onVolumeChange({
			target: volumeRef.current
		});

		events.onDistanceChange({
			target: distanceRef.current
		});

		return () => {
			if (context.state === "running") {
				try {
					source.stop();
				}
				catch (e) { }
			}
		};
	}, []);

	React.useEffect(() => {
		Config.setItem(`currentState.${id}.isPlaying`, isPlaying);

		if (!isPlaying) {
			if (gainNode) {
				setTransitioningVolume(true);
				lerp(1000, mult => {
					gainNode.gain.value =
						(volumeRef.current.value / 100) * (
							isPlaying
								? mult
								: 1 - mult
						);
				}).then(() => {
					setTransitioningVolume(false);

					source.stop();
				});
			}

			return;
		}

		new Promise(async () => {
			setLoading(true);

			const buffer = await fetch(audio).then(r => r.arrayBuffer());
			const audioBuffer = await new Promise(r => context.decodeAudioData(buffer, r));
			const filter = context.createBiquadFilter();
			const gainNode = context.createGain();

			source.buffer = audioBuffer;
			source.loop = true;

			filter.type = "lowpass";

			gainNode.connect(filter);
			filter.connect(context.destination);
			source.connect(gainNode);

			setFilter(filter);
			setGainNode(gainNode);

			gainNode.gain.value = 0;

			source.start();

			setLoading(false);
			setTransitioningVolume(true);
			lerp(1000, mult => {
				if (volumeRef.current) {
					gainNode.gain.value =
						(volumeRef.current.value / 100) * (
							isPlaying
								? mult
								: 1 - mult
						);
				}
			}).then(() => {
				setTransitioningVolume(false);
			});
		}).catch(console.error);
	}, [isPlaying]);

	React.useEffect(() => {
		if (!filter) return;

		filter.frequency.value = distance > 0.1
			? tween(10000, 200, distance / 100)
			: 24000;
	}, [filter, distance]);

	const events = {
		togglePlayState: () => {
			if (isTransitioningVolume) return;

			setPlaying(!isPlaying);
		},
		onVolumeChange: e => {
			if (gainNode) gainNode.gain.value = e.target.value / 100;
			e.target.parentElement.style = `--value: ${e.target.value}%`;

			Config.setItem(`currentState.${id}.volume`, e.target.value);
		},
		onDistanceChange: e => {
			setDistance(e.target.value);
			e.target.parentElement.style = `--value: ${e.target.value}%`;

			Config.setItem(`currentState.${id}.distance`, e.target.value);
		}
	};

	return (
		<div
			className="SoundCard"
			style={{
				"--primary-color": colors[0],
				"--secondary-color": colors[1]
			}}
		>
			<Icon className="Icon" />

			<h3 className="Name">{name}</h3>

			<div className="SliderContainer FlexCenter">
				<div>
					<Volume2 />

					<Tooltip>
						Volume
					</Tooltip>
				</div>

				<div className="Slider">
					<div className="SliderProgress" />
					<div className="SliderKnob" />

					<input
						ref={volumeRef}
						className="SliderElement"
						type="range"
						defaultValue={
							parseInt(
								Config.getItem(`currentState.${id}.volume`) ?? 50
							)
						}
						min={0} max={100}
						step={1}

						onInput={events.onVolumeChange}
					/>
				</div>
			</div>

			<div className="SliderContainer FlexCenter">
				<div>
					<BarChart />

					<Tooltip>
						Distance Emulation
					</Tooltip>
				</div>

				<div className="Slider">
					<div className="SliderProgress" />
					<div className="SliderKnob" />

					<input
						ref={distanceRef}
						className="SliderElement"
						type="range"
						defaultValue={
							parseInt(
								Config.getItem(`currentState.${id}.distance`) ?? 0
							)
						}
						min={0} max={100}
						step={1}

						onInput={events.onDistanceChange}
					/>
				</div>
			</div>

			<div className="PlayButton FlexCenter" onClick={events.togglePlayState}>
				{isLoading
					? <MinusCircle className="Spin" />
					: isPlaying ? <StopCircle /> : <PlayCircle />}
			</div>
		</div>
	)
}