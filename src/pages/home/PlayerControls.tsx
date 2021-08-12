import React, { useEffect, useRef, useState } from "react"
import { PlayerButtons } from "./PlayerButtons"
import { PlayerTrack } from "./PlayerTrack"

interface Props {
    preview: string;
}
export const PlayerControls: React.FC<Props> = ({ preview }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        if(isPlaying) {
            if(!audio) {
                const audio = new Audio(preview);
                setAudio(audio);
                return;
            }
            audio.volume = .3;
            audio.play()
                .catch(error => {
                    setError(true);
                    return setIsPlaying(false);
                })
        } else {
            audio?.pause();
        }

        const pause = () => setIsPlaying(false);
        if(audio) {
            audio.addEventListener('pause', pause);
        }
        
        return () => audio?.removeEventListener('pause', pause);
    }, [isPlaying, audio]);

    return(
        <div className="player-controls" style={{pointerEvents: error ? 'none' : 'all'}}>
            <PlayerTrack 
                isPaused={!isPlaying}
                duration={30000}
                audio={audio}
            />
            <PlayerButtons 
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
            />
        </div>
    )
}