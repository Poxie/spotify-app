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
                const { artists, name, album, duration_ms, id, uri } = track;
                return(
                    <Track 
                        artists={artists}
                        duration={duration_ms}
                        image={album.images[2].url}
                        name={name}
                        uri={uri}
                        index={key + startFrom}
                        key={id}
                    />
                )
            })}
        </div>
    )
}