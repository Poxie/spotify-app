import React, { useState } from "react"
import { Button } from "../../components/Button";
import { Track } from "../../types/Track"
import { TrackList } from "./TrackList";

interface Props {
    tracks: Track[];
}
export const AllTops: React.FC<Props> = ({ tracks }) => {
    const [visibleTracks, setVisibleTracks] = useState(10);

    const showMore = () => {
        setVisibleTracks(previous => previous + 10);
    }

    return(
        <div className="all-tops">
            <div className="tops-container">
                <h2>
                    Top <span className="underlined">11 - {tracks.length +  10}</span> Tracks
                </h2>
                <TrackList 
                    tracks={tracks.slice(0, visibleTracks)}
                />
                {visibleTracks < tracks.length && (
                    <Button type={'transparent'} onClick={showMore}>
                        Show More
                    </Button>
                )}
            </div>
        </div>
    )
}