import HomePage from "../../Pages/Home";
import "./BackgroundCard.scss";

function tween(start, end, time) {
	return start + (end - start) * time;
}

export default function BackgroundCard({ id, video }) {
	return (
		<div
			className="BackgroundCard"
			onClick={() => HomePage.setBackground(video)}
		>
			<video src={video} autoPlay={false} preload="metadata" />
		</div>
	)
}