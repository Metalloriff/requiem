import _ from "lodash";
import { Plus } from "react-feather";
import manifest from "../../Assets/manifest";
import Config from "../../Classes/Config";
import { forceUpdate as forceHomeUpdate } from "../../Pages/Home";
import "./PresetCard.scss";

function tween(start, end, time) {
	return start + (end - start) * time;
}

export function PresetCardItem({ id, name, audio, Icon, colors = [], style }) {
	return (
		<div
			className="PresetCard"
			style={{
				"--primary-color": colors[0],
				"--secondary-color": colors[1],
				...style
			}}
		>
			<h3 className="Name">{name}</h3>

			<Icon className="Icon" />
		</div>
	)
}

export default function PresetCard({ id, state }) {
	const len = Object.entries(state).length;

	const events = {
		onClick: () => {
			for (const stateId in Config.data.currentStates) {
				Config.data.currentStates[stateId].isPlaying = false;
				Config.save();
			}

			for (const [id, _itemState] of Object.entries(state)) {
				const itemState = _.cloneDeep(_itemState);
				itemState.isPlaying = true;
				Config.setItem(`currentState.${id}`, itemState);
			}

			forceHomeUpdate();
		}
	};

	return (
		<div className="PresetCardContainer" {...events}>
			{Object.entries(state).sort(([, a], [, b]) => (a["volume"] - a["distance"]) - (b["volume"] - b["distance"])).map(([id, state], idx) => (
				<PresetCardItem
					id={id}
					key={id}
					state={state}
					style={{
						position: "absolute",
						cursor: "pointer",
						top: (idx * 40),
						// left: idx * (len / 2),
						transformOrigin: "bottom left",
						transform: `rotateZ(${1.75 * idx}deg)`
					}}
					{...manifest.sounds[id]}
				/>
			))}
		</div>
	);
}

export function PlusPresetCard() {
	const events = {
		onClick: () => {
			const name = prompt("Please enter a name for your preset", "");
			if (!name) return;

			const preset = {
				name,
				state: {}
			};

			for (const id in Config.getItem("currentState")) {
				if (Config.getItem(`currentState.${id}.isPlaying`)) {
					preset.state[id] = JSON.parse(JSON.stringify(Config.getItem(`currentState.${id}`)));
				}
			}

			Config.data.presets.push(preset);
			Config.save();
		}
	};

	return (
		<div
			className="PresetCard FlexCenter"
			style={{
				"--primary-color": "#676767",
				"--secondary-color": "#d6d6d6",
				cursor: "pointer"
			}}
			{...events}
		>
			<Plus style={{
				width: 70,
				height: 70
			}} />
		</div>
	);
}