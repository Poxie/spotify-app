import React from "react"
import { Flex } from "../../components/Flex"
import { Artist as ArtistType } from "../../types/Artist"
import { Artists } from "./Artists"

interface Props {
    name: string;
    image: string;
    artists: ArtistType[];
    duration: number;
    uri: string;
    index?: number
}
export const Track: React.FC<Props> = ({ name, image, artists, duration, uri, index }) => {
    return(
        <Flex className="track" alignItems={'center'} justifyContent={'space-between'}>
            <Flex className="info" alignItems={'center'}>
                {index && (
                    <span className="track-index">
                        {index}
                    </span>
                )}
                <a href={uri}>
                    <img style={{display: 'block'}} src={image} alt="" />
                </a>
                <a href={uri}>
                    {name}
                </a>
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