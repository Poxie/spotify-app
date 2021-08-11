import React from "react";
import { Artist as ArtistType } from "../../types/Artist";
import { Artist } from "./Artist";

interface Props {
    artists: ArtistType[];
}
export const Artists: React.FC<Props> = ({ artists }) => {
    return(
        <span className="highlight">
            {artists.map(artist => {
                const { name, uri } = artist;
                return(
                    <Artist 
                        href={uri}
                        name={name}
                        key={artist.id}
                    />
                )
            })}
        </span>
    )
}