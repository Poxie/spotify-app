import React from "react"
import { Flex } from "../../components/Flex"
import { Artist } from "../../types/Artist"
import { Track } from "../../types/Track"
import { ProfileTrack } from "./ProfileTrack"

interface Props {
    tracks: Track[] | Artist[];
    showAll: boolean;
}
export const MostLikedTracks: React.FC<Props> = ({ tracks, showAll }) => {
    const visibleTracks = showAll ? tracks : tracks.slice(0, 5);
    return(
        <Flex className={`most-liked-tracks${showAll ? ' expanded' : ''}`} flexWrap={'wrap'} justifyContent={'space-between'}>
            {visibleTracks.map(track => {
                const { id, name, uri } = track;
                let image;
                if(Object.keys(track).includes('album')) {
                    // @ts-ignore: as I check if there is an album property
                    image = track.album.images[0].url;
                } else if(Object.keys(track).includes('images')) {
                    // @ts-ignore: as I check if there is an images property
                    image = track.images[0].url;
                }
                return(
                    <ProfileTrack
                        name={name}
                        image={image}
                        uri={uri}
                        key={id}
                    />
                )
            })}
        </Flex>
    )
}