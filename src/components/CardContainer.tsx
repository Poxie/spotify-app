import React from "react"
import { Flex } from "./Flex"
import { Artist } from "../types/Artist"
import { Track } from "../types/Track"
import { Card } from "./Card"
import './CardContainer.scss';

interface Props {
    tracks: Track[] | Artist[];
    showAll: boolean;
}
export const CardContainer: React.FC<Props> = ({ tracks, showAll }) => {
    const visibleTracks = showAll ? tracks : tracks.slice(0, 5);
    return(
        <Flex className={`card-container${showAll ? ' expanded' : ''}`} flexWrap={'wrap'} justifyContent={'space-between'}>
            {visibleTracks.map(track => {
                const { id, name, uri } = track;
                let image;
                if(Object.keys(track).includes('album')) {
                    // @ts-ignore: as I check if there is an album property
                    image = track.album.images[1].url;
                } else if(Object.keys(track).includes('images')) {
                    // @ts-ignore: as I check if there is an images property
                    image = track.images[1].url;
                }
                return(
                    <Card
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