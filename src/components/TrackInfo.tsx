import React from 'react';
import { Artists } from '../pages/home/Artists';
import { Artist } from '../types/Artist';
import { Flex } from './Flex';
import './TrackInfo.scss';

interface Props {
    image: string;
    name: string;
    artists: Artist[];
    uri: string
}
export const TrackInfo: React.FC<Props> = ({ image, name, artists, uri }) => {
    return(
        <Flex className="track-info">
            <a href={uri}>
                <img src={image} alt="" />
            </a>
            <div className="track-text">
                <a href={uri}>
                    <h2 className="name">
                        {name}
                    </h2>
                </a>
                <Artists 
                    artists={artists}
                />
            </div>
        </Flex>
    )
}