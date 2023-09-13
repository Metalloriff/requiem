import audioCampfire from "./audio/campfire.ogg";
import audioCrickets from "./audio/crickets.ogg";
import audioCyberpunkCity from "./audio/cyberpunk-city.ogg";
import audioHeavyRain from "./audio/heavy-rain.ogg";
import AudioOcassionalFrog from "./audio/ocassional-frog.ogg";
import audioOcean from "./audio/ocean.ogg";
import audioSpringPeepers from "./audio/peepers.wav";
import audioRain from "./audio/rain.ogg";
import audioRiver from "./audio/river.mp3";
import audioSnowstorm from "./audio/snow.ogg";
import audioThunderstorm from "./audio/thunderstorm.wav";
import audioWindTrees from "./audio/wind-trees.ogg";

import background from "./background.mp4";
// Import credits
import credits from "./credits.json";
import { ReactComponent as IconCampfire } from "./icons/campfire.svg";
import { ReactComponent as IconCrickets } from "./icons/crickets.svg";
import { ReactComponent as IconDefault } from "./icons/default.svg";
import { ReactComponent as IconHeavyRain } from "./icons/heavy-rain.svg";
import { ReactComponent as IconOcean } from "./icons/ocean.svg";
import { ReactComponent as IconPeepers } from "./icons/peepers.svg";
import { ReactComponent as IconRain } from "./icons/rain.svg";
import { ReactComponent as IconRiver } from "./icons/river.svg";
import { ReactComponent as IconSnowstorm } from "./icons/snow.svg";
import { ReactComponent as IconThunderstorm } from "./icons/thunderstorm.svg";

import videoAbstract from "./video/abstract.mp4";
import videoAbstractRainbow from "./video/abstractrainbow.mp4";
import videoBlack from "./video/black.mp4";
import videoColors from "./video/colors.mp4";
import videoFire from "./video/fire.mp4";
import videoFish from "./video/fish.mp4";
import videoFlowers from "./video/flowers.mp4";
import videoHearts from "./video/hearts.mp4";
import videoMagic from "./video/magic.mp4";
import videoMilkway from "./video/milkway.mp4";
import videoMoon from "./video/moon.mp4";
import videoNeon from "./video/neon.mp4";
import videoNight from "./video/night.mp4";
import videoOcean from "./video/ocean.webm";
import videoRainBlack from "./video/rain.mp4";
import videoRain from "./video/rain.webm";
import videoSnow from "./video/snow.mp4";
import videoThunderstorm from "./video/thunderstorm.mp4";
import videoWaves from "./video/waves.mp4";

// Export manifest data
export default {
	credits,
	background: videoMilkway,
	sounds: {
		rain: {
			name: "Light Rain",
			colors: ["#aaaaaa", "#5555ff"],
			audio: audioRain,
			Icon: IconRain
		},
		heavyRain: {
			name: "Heavy Rain",
			colors: ["#505055", "#323299"],
			audio: audioHeavyRain,
			Icon: IconHeavyRain
		},
		thunderstorm: {
			name: "Thunderstorm",
			colors: ["black", "#777777"],
			audio: audioThunderstorm,
			Icon: IconThunderstorm
		},
		snowstorm: {
			name: "Snowstorm",
			colors: ["white", "#ddddff"],
			audio: audioSnowstorm,
			Icon: IconSnowstorm
		},
		ocean: {
			name: "Ocean Waves",
			colors: ["#55ffc3", "#55a4ff"],
			audio: audioOcean,
			Icon: IconOcean
		},
		river: {
			name: "River",
			colors: ["#f1faf7", "#2c739d"],
			audio: audioRiver,
			Icon: IconRiver
		},
		peepers: {
			name: "Spring Peepers",
			colors: ["#76ff64", "#f5ff64"],
			audio: audioSpringPeepers,
			Icon: IconPeepers
		},
		ocassionalFrog: {
			name: "Ocassional Frog",
			colors: ["#61c854", "#267e41"],
			audio: AudioOcassionalFrog,
			Icon: IconPeepers
		},
		crickets: {
			name: "Crickets, Katydids",
			colors: ["#ff6937", "#aaff37"],
			audio: audioCrickets,
			Icon: IconCrickets
		},
		campfire: {
			name: "Campfire",
			colors: ["#ef2e08", "#fae908"],
			audio: audioCampfire,
			Icon: IconCampfire
		},
		windTrees: {
			name: "Wind in Trees",
			colors: ["#79f54a", "#174e02"],
			audio: audioWindTrees,
			Icon: IconDefault
		},
		cyberpunkCity: {
			name: "Cyberpunk City",
			colors: ["#3fffff", "#fa3fff"],
			audio: audioCyberpunkCity,
			Icon: IconDefault
		},
	},
	videos: {
		snow: {
			video: videoSnow
		},
		rainBlack: {
			video: videoRainBlack
		},
		black: {
			video: videoBlack
		},
		fire: {
			video: videoFire
		},
		abstract: {
			video: videoAbstract
		},
		abstractRainbow: {
			video: videoAbstractRainbow
		},
		hearts: {
			video: videoHearts
		},
		colors: {
			video: videoColors
		},
		neon: {
			video: videoNeon
		},
		milkway: {
			video: videoMilkway
		},
		city: {
			video: background
		},
		rain: {
			video: videoRain
		},
		thunderstorm: {
			video: videoThunderstorm
		},
		ocean: {
			video: videoOcean
		},
		magic: {
			video: videoMagic
		},
		night: {
			video: videoNight
		},
		fish: {
			video: videoFish
		},
		moon: {
			video: videoMoon
		},
		waves: {
			video: videoWaves,
		},
		flowers: {
			video: videoFlowers,
		},
	},
	defaultPresets: [
		{ "name": "Storm Peepers", "state": { "rain": { "isPlaying": false, "volume": "88", "distance": "0" }, "thunderstorm": { "isPlaying": false, "volume": "24", "distance": "93" }, "peepers": { "isPlaying": false, "volume": "39", "distance": "87" } } }
	]
};