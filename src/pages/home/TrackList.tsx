import React from "react"
import { Track as TrackType } from "../../types/Track"
import { Track } from "./Track"

interface Props {
    tracks: TrackType[];
}
export const TrackList: React.FC<Props> = ({ tracks }) => {
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
                        index={key + 11}
                        key={id}
                    />
                )
            })}
        </div>
    )
}