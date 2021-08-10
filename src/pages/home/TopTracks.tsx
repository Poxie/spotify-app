import { useEffect, useState } from "react";
import { useAPI } from "../../contexts/ApiProvider"
import { Track } from "../../types/Track";
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

    return(
        <div className="top-tracks">
            <MostLiked 
                items={tracks.splice(0, 15)}
            />
        </div>
    )
}