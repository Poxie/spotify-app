import React from "react"
import { Flex } from "../../components/Flex"
import { Album } from "../../types/Album"
import { Track } from "../../types/Track"
import { AlbumList } from "./AlbumList"
import { ArtistBox } from "./ArtistBox"
import { TrackList } from "./TrackList"

interface Props {
    albums: Album[];
    tracks: Track[];
}
export const ArtistExtras: React.FC<Props> = ({ albums, tracks }) => {
    return(
        <Flex className="artist-extras" justifyContent={'space-between'}>
            <ArtistBox title={'Most Popular Songs'}>
                <TrackList 
                    tracks={tracks}
                    startFrom={1}
                />
            </ArtistBox>
            <ArtistBox title={'Albums'}>
                <AlbumList 
                    albums={albums}
                />
            </ArtistBox>
        </Flex>
    )
}