import React from "react"
import { Track as TrackType } from "../../types/Track"
import { Track } from "./Track"

interface Props {
    tracks: TrackType[];
    startFrom?: number;
}
export const TrackList: React.FC<Props> = ({ tracks, startFrom=11 }) => {
    return(
        <div className="track-list">
            {tracks.map((track, key) => {
                const { artists, name, album, duration_ms, id } = track;
                return(
                    <Track 
                        artists={artists}
                        duration={duration_ms}
                        image={album.images[0].url}
                        name={name}
                        index={key + startFrom}
                        key={id}
                    />
                )
            })}
        </div>
    )
}