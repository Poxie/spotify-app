import { useEffect, useState } from "react";
import { useAPI } from "../../contexts/ApiProvider"
import { Track } from "../../types/Track";
import { AllTops } from "./AllTops";
import { MostLiked } from "./MostLiked";

export const TopTracks = () => {
    const { get } = useAPI();
    // @ts-ignore
    const [tracks, setTracks] = useState<Track[]>([]);

    useEffect(() => {
        // Fetching global top 50s
        get(`playlists/37i9dQZEVXbMDoHDwVN2tF`)
            .then(res => res.json())
            .then(response => {
                const tracks = response.tracks.items.map((item: any) => item.track);
                setTracks(tracks);
            })
    }, []);

    return(
        <div className="top-tracks">
            <MostLiked 
                items={tracks.slice(0, 10)}
            />
            <AllTops 
                tracks={tracks.slice(10, tracks.length)}
            />
        </div>
    )
}