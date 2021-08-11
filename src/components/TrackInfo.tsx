import React from 'react';
import { Artists } from '../pages/home/Artists';
import { Artist } from '../types/Artist';
import { Flex } from './Flex';
import './TrackInfo.scss';
interface Props {
    image: string;
    name: string;
    artists: Artist[];
}
export const TrackInfo: React.FC<Props> = ({ image, name, artists }) => {
    return(
        <Flex className="track-info">
            <img src={image} alt="" />
            <div className="track-text">
                <h2 className="name">
                    {name}
                </h2>
                <Artists 
                    artists={artists}
                />
            </div>
        </Flex>
    )
}