import React from "react"
import { Album } from "../../types/Album"
import { PlayerControls } from "./PlayerControls"

interface Props {
    name: string;
    durationMS: number;
    album: Album;
    active: boolean;
    preview: string;
}
export const SmallPlayer: React.FC<Props> = ({ name, durationMS, album, active, preview }) => {
    return(
        <div className={`small-player${active ? ' active' : ''}`}>
            <img src={album.images[0].url} alt="" />
            <div className="song-text">
                <div className="song-title">
                    {name}
                </div>
                <div className="song-artist">
                    {album.artists[0].name}
                </div>
            </div>
            <PlayerControls 
                preview={preview}
            />
        </div>
    )
}