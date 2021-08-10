import React from "react"
import { Clickable } from "../../components/Clickable"
import { Flex } from "../../components/Flex"
import { BackIcon } from "../../icons/BackIcon"
import { LoopIcon } from "../../icons/LoopIcon"
import { PauseIcon } from "../../icons/PauseIcon"
import { PlayIcon } from '../../icons/PlayIcon'
import { ShuffleIcon } from "../../icons/ShuffleIcon"
import { SkipIcon } from "../../icons/SkipIcon"

interface Props {
    isPlaying: boolean;
    setIsPlaying: (state: boolean) => void;
}
export const PlayerButtons: React.FC<Props> = ({ isPlaying, setIsPlaying }) => {
    return(
        <Flex className="player-buttons" justifyContent={'space-between'} alignItems={'center'}>
            <ShuffleIcon />
            <BackIcon />
            <Clickable className={'main'} onClick={() => setIsPlaying(!isPlaying)}>
                <Flex alignItems={'center'}>
                    {isPlaying ? (
                        <PauseIcon />
                    ) : (
                        <PlayIcon />
                    )}
                </Flex>
            </Clickable>
            <SkipIcon />
            <LoopIcon />
        </Flex>
    )
}