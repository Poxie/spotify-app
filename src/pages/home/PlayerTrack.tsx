import React, { useEffect, useMemo, useRef, useState } from "react"
import { Flex } from "../../components/Flex";


const convertToRedableString = (ms: number) => {
    var minutes = Math.floor(ms / 60000);
    var seconds = parseInt(((ms % 60000) / 1000).toFixed(0));
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}
interface Props {
    isPaused: boolean;
    duration: number;
    audio: HTMLAudioElement | null;
}
export const PlayerTrack: React.FC<Props> = ({ isPaused, duration, audio }) => {
    const [current, setCurrent] = useState(0);
    const interval = useRef<NodeJS.Timeout | null>(null);
    const mouseDown = useRef(false);
    const container = useRef<HTMLDivElement>(null);
    const dot = useRef<HTMLDivElement>(null);
    const audioRef = useRef(audio);
    useEffect(() => {
        audioRef.current = audio;

        if(!audio) return;
        audio.addEventListener('ended', () => {
            setCurrent(0);
        })
    }, [audio]);

    useEffect(() => {
        if(!isPaused) {
            interval.current = setInterval(() => {
                setCurrent(current => current + 1000);
            }, 1000);
        } else {
            if(!interval.current) return;
            clearInterval(interval.current);
            interval.current = null;
        }

        return () => {
            if(interval.current) {
                clearInterval(interval.current);
            }
        }
    }, [isPaused]);

    const changeCurrentTime = useMemo(() => (e: MouseEvent | React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if(!container.current) return;
        const { left: elementLeft, width } = container.current.getBoundingClientRect();
        const left = e.pageX - elementLeft;
        let percentage = left / width;
        if(percentage > 1) percentage = 1;
        if(percentage < 0) percentage = 0;
        const currentTime = Math.floor(percentage * duration);
        setCurrent(currentTime);

        if(!audioRef.current) return;
        audioRef.current.currentTime = currentTime / 1000;
    }, []);
    const handleMouseMove = useMemo(() => (e: MouseEvent) => {
        changeCurrentTime(e);
    }, [setCurrent, audio]);
    const handleMouseUp = useMemo(() => () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);

        if(!dot.current) return;
        dot.current.style.display = '';
    }, []);
    const handleMouseDown = useMemo(() => () => {
        mouseDown.current = true;

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        if(!dot.current) return;
        dot.current.style.display = 'block';
    }, []);

    const percentage = (current / duration) * 100;
    return(
        <div className="player-track">
            <div className="track-container" onMouseDown={handleMouseDown} ref={container} onClick={changeCurrentTime}>
                <div className="track filled" style={{width: `${percentage}%`}} />
                <div className="filled-dot" style={{left: `${percentage - 3}%`}} ref={dot} />
                <div className="track"/>
            </div>
            <Flex className="track-numbers" justifyContent={'space-between'}>
                <span>
                    {convertToRedableString(current)}
                </span>
                <span>
                    {convertToRedableString(duration)}
                </span>
            </Flex>
        </div>
    )
}