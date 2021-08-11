import React from "react"
import { Flex } from "../../components/Flex";
import { SearchArtist } from "../../types/SearchArtist"
import { ArtistInfo } from "../../components/ArtistInfo";

interface Props {
    artists: SearchArtist[];
}
export const RelatedArtists: React.FC<Props> = ({ artists }) => {
    const visibleArtists = artists.slice(0, 2);
    return(
        <div className="related-artists">
            <h3 className="header">
                Related Artists
            </h3>
            <Flex className="artist-container">
                {visibleArtists.map(artist => {
                    const { followers, name, id, uri, images, genres, popularity } = artist;
                    return(
                        <ArtistInfo 
                            followers={followers.total}
                            genres={genres}
                            image={images[0]?.url}
                            name={name}
                            popularity={popularity}
                            uri={uri}
                            key={id}
                        />
                    )
                })}
            </Flex>
        </div>
    )
}