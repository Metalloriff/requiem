// Import video files
import audioOcean from "./audio/ocean.ogg";
// Import audio files
import audioRain from "./audio/rain.wav";
import audioThunderstorm from "./audio/thunderstorm.wav";
import background from "./background.mp4";
// Import credits
import credits from "./credits.json";
import { ReactComponent as IconOcean } from "./icons/ocean.svg";
// Import icon files
import { ReactComponent as IconRain } from "./icons/rain.svg";
import { ReactComponent as IconThunderstorm } from "./icons/thunderstorm.svg";
import videoOcean from "./video/ocean.webm";
import videoRain from "./video/rain.webm";
import videoThunderstorm from "./video/thunderstorm.mp4";




// Export manifest data
export default {
	credits,
	background,
	sounds: {
		rain: {
			name: "Light Rain",
			colors: ["#aaaaaa", "#5555ff"],
			audio: audioRain,
			video: videoRain,
			Icon: IconRain
		},
		thunderstorm: {
			name: "Thunderstorm",
			colors: ["black", "#777777"],
			audio: audioThunderstorm,
			video: videoThunderstorm,
			Icon: IconThunderstorm
		},
		ocean: {
			name: "Ocean Waves",
			colors: ["#55ffc3", "#55a4ff"],
			audio: audioOcean,
			video: videoOcean,
			Icon: IconOcean
		}
	}
};