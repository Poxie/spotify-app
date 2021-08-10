import { useEffect, useState } from "react";
import { useAPI } from "../../contexts/ApiProvider"
import { Track } from "../../types/Track";
import { AllTops } from "./AllTops";
import { MostLiked } from "./MostLiked";
import tempTracks from './TempTops.json';

export const TopTracks = () => {
    const { get } = useAPI();
    // @ts-ignore
    const [tracks, setTracks] = useState<Track[]>(tempTracks.reverse());

    useEffect(() => {
        // Fetching global top 50s
        // get(`playlists/37i9dQZEVXbMDoHDwVN2tF`)
        //     .then(res => res.json())
        //     .then(response => {
        //         const tracks = response.tracks.items.map((item: any) => item.track);
        //         console.log(JSON.stringify(tracks));
        //         setTracks(tracks);
        //     })
    }, []);

    const mostLiked = tracks.splice(0, 10);
    return(
        <div className="top-tracks">
            <MostLiked 
                items={mostLiked}
            />
            <AllTops 
                tracks={tracks}
            />
        </div>
    )
}