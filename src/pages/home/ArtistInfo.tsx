import React from "react"
import { Flex } from "../../components/Flex"

interface Props {
    name: string;
    uri: string;
    followers: number;
    popularity: number;
    image: string;
    genres: string[];
}
export const ArtistInfo: React.FC<Props> = ({ name, uri, followers, popularity, image, genres }) => {
    return(
        <div className="artist-info">
            <Flex>
                <img src={image} alt="" />
                <div className="artist-text">
                    <a href={uri}>
                        <h2 className="name">
                            {name}
                        </h2>
                    </a>
                    <div className="followers">
                        {followers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} followers
                    </div>
                    <span className="genres">
                        {genres.slice(0,3).join(', ')}
                    </span>
                </div>
            </Flex>
        </div>
    )
}