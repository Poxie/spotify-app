import React from "react"
import { Album as AlbumType } from "../../types/Album"
import { Album } from "./Album"

interface Props {
    albums: AlbumType[];
}
export const AlbumList: React.FC<Props> = ({ albums }) => {
    return(
        <div className="album-list">
            {albums.map(album => {
                const { name, id, images, artists, uri } = album;

                return(
                    <Album 
                        name={name}
                        id={id}
                        image={images[0]?.url}
                        uri={uri}
                        key={id}
                    />
                )
            })}
        </div>
    )
}