import React from "react"
import { Flex } from "../../components/Flex"
import { Artist as ArtistType } from "../../types/Artist"
import { Artists } from "./Artists"

interface Props {
    name: string;
    image: string;
    artists: ArtistType[];
    duration: number;
    index?: number
}
export const Track: React.FC<Props> = ({ name, image, artists, duration, index }) => {
    return(
        <Flex className="track" alignItems={'center'} justifyContent={'space-between'}>
            <Flex className="info" alignItems={'center'}>
                {index && (
                    <span className="track-index">
                        {index}
                    </span>
                )}
                <img src={image} alt="" />
                {name}
            </Flex>
            <span>
                by
                <Artists 
                    artists={artists}
                />
            </span>
        </Flex>
    )
}