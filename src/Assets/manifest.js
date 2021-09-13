// Import video files
import background from "./background.mp4";
import videoRain from "./video/rain.webm";
import videoThunderstorm from "./video/thunderstorm.mp4";
import videoOcean from "./video/ocean.webm";

// Import audio files
import audioRain from "./audio/rain.wav";
import audioThunderstorm from "./audio/thunderstorm.wav";
import audioOcean from "./audio/ocean.ogg";

// Import icon files
import { ReactComponent as IconRain } from "./icons/rain.svg";
import { ReactComponent as IconThunderstorm } from "./icons/thunderstorm.svg";
import { ReactComponent as IconOcean } from "./icons/ocean.svg";

// Import credits
import credits from "./credits.json";

// Export manifest data
export default {
    credits,
    background,
    sounds: {
        rain: {
            name: "Light Rain",
            audio: audioRain,
            video: videoRain,
            Icon: IconRain
        },
        thunderstorm: {
            name: "Thunderstorm",
            audio: audioThunderstorm,
            video: videoThunderstorm,
            Icon: IconThunderstorm
        },
        ocean: {
            name: "Ocean Waves",
            audio: audioOcean,
            video: videoOcean,
            Icon: IconOcean
        }
    }
};