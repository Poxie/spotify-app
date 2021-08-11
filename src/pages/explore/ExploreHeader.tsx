import React, { useEffect, useMemo, useState } from "react"
import { ArtistInfo } from "../../components/ArtistInfo";
import { Button } from "../../components/Button";
import { Flex } from "../../components/Flex"
import { Search } from "../../components/Search"
import { TrackInfo } from "../../components/TrackInfo";
import { useAPI } from "../../contexts/ApiProvider";
import { SearchArtist } from "../../types/SearchArtist";
import { Track } from "../../types/Track";
import { LoadingInfo } from "../home/LoadingInfo";

interface Props {
    onExplore: (track: Track, artist: SearchArtist) => void;
    isExploring: boolean;
}
export const ExploreHeader: React.FC<Props> = ({ onExplore, isExploring }) => {
    const { get } = useAPI();
    const [track, setTrack] = useState<Track | null>(null);
    const [artist, setArtist] = useState<SearchArtist | null>(null);
    const choices = {
        artist: setArtist,
        track: setTrack
    }

    const updateSearchedItem = useMemo(() => (id: string, type: 'artist' | 'track') => {
        get(`${type}s/${id}`)
            .then(res => res.json())
            .then(response => {
                choices[type](response);
            })
    }, []);
    const explore = () => {
        if(!track || !artist) return;
        onExplore(track, artist);
    }

    return(
        <Flex className={`explore-header${isExploring ? ' exploring' : ''}`} alignItems={'center'} flexDirection={'column'}>
            <h1>Time to <span className="underlined">explore</span></h1>
            <Flex className="search-container">
                <div className="explore-search">
                    <Search 
                        onChoice={updateSearchedItem}
                        type={'artist'}
                    />
                    {artist ? (
                        <ArtistInfo 
                            followers={artist.followers.total}
                            genres={artist.genres}
                            image={artist.images[0]?.url}
                            name={artist.name}
                            popularity={artist.popularity}
                            uri={artist.uri}
                        />
                    ) : (
                        <LoadingInfo />
                    )}
                </div>
                <div className="explore-search">
                    <Search 
                        onChoice={updateSearchedItem}
                        type={'track'}
                    />
                    {track ? (
                        <TrackInfo 
                            artists={track.artists}
                            image={track.album.images[0]?.url}
                            name={track.name}
                        />
                    ) : (
                        <LoadingInfo />
                    )}
                </div>
            </Flex>
            {track && artist && (
                <Button onClick={explore}>
                    Let's browse!
                </Button>
            )}
        </Flex>
    )
}