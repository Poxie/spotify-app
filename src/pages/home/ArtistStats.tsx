import React, { useEffect, useState } from "react"
import { Flex } from "../../components/Flex";
import { Loading } from "../../components/Loading";
import { useAPI } from "../../contexts/ApiProvider"
import { Album } from "../../types/Album";
import { SearchArtist } from "../../types/SearchArtist";
import { Track } from "../../types/Track";
import { ArtistExtras } from "./ArtistExtras";
import { ArtistInfo } from "./ArtistInfo";
import { LoadingArtistStats } from "./LoadingArtistStats";
import { RelatedArtists } from "./RelatedArtists";

interface Props {
    id: string;
}
export const ArtistStats: React.FC<Props> = ({ id }) => {
    const { get } = useAPI();
    const [albums, setAlbums] = useState<Album[]>([]);
    const [mostLiked, setMostLiked] = useState<Track[]>([]);
    const [artist, setArtist] = useState<SearchArtist | null>(null);
    const [relatedArtists, setRelatedArtists] = useState<SearchArtist[]>([]);

    useEffect(() => {
        if(id === '') return;

        // Getting artist info
        get(`artists/${id}`)
            .then(res => res.json())
            .then(response => {
                setArtist(response);
            })

        // Getting albums
        get(`artists/${id}/albums`)
            .then(res => res.json())
            .then(response => {
                setAlbums(response.items);
            })

        // Getting top tracks
        get(`artists/${id}/top-tracks?market=US`)
            .then(res => res.json())
            .then(response => {
                setMostLiked(response.tracks);
            })

        // Getting relataed artists
        get(`artists/${id}/related-artists`)
            .then(res => res.json())
            .then(response => {
                setRelatedArtists(response.artists);
            })
            
    }, [id]);

    if(id === '') {
        return(
            <Flex className="waiting-for-artist" flexDirection={'column'} alignItems={'center'}>
                Waiting for an artist to be selected
                <Loading />
            </Flex>
        )
    }

    if(!albums.length || !mostLiked.length || !artist || !relatedArtists.length) {
        return(
            <LoadingArtistStats />
        )
    }

    const { name, followers, genres, uri, images, popularity } = artist;
    return(
        <div className="artist-stats">
            <Flex justifyContent={'space-between'} alignItems={'center'}>
                <ArtistInfo 
                    name={name}
                    followers={followers.total}
                    genres={genres}
                    uri={uri}
                    image={images[0]?.url}
                    popularity={popularity}
                />
                <RelatedArtists 
                    artists={relatedArtists}
                />
            </Flex>
            <ArtistExtras 
                albums={albums}
                tracks={mostLiked}
            />
        </div>
    )
}