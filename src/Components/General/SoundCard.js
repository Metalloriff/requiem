import React from "react";
import "./SoundCard.scss";
import { Play, PlayCircle, StopCircle } from "react-feather";
import HomePage from "../../Pages/Home";
import { lerp } from "../../Classes/Constants";

export default function SoundCard({ id, name, audio, video, Icon }){
    const [isPlaying, setPlaying] = React.useState(false);
    const [isTransitioningVolume, setTransitioningVolume] = React.useState(false);
    
    const playerRef = React.useRef();
    const volumeRef = React.useRef();
    
    React.useEffect(() => {
        if (localStorage.getItem(`play_state_${id}`) === "true") {
            events.togglePlayState();
        }
        
        events.onVolumeChange({
            target: volumeRef.current
        });
    }, []);
    
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
        }
    };
    
    return (
        <div className="SoundCard" onClick={events.focusBackground}>
            <Icon className="Icon"/>
            
            <h3 className="Name">{name}</h3>
            
            <audio
                ref={playerRef}
                src={audio}
                style={{ display: "none" }}
                loop
            />
            
            <input
                ref={volumeRef}
                className="VolumeSlider"
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
            
            <div className="PlayButton FlexCenter" onClick={events.togglePlayState}>
                { isPlaying ? <StopCircle/> : <PlayCircle/> }
            </div>
        </div>
    )
}