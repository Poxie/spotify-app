import React from "react"
import { Album } from "../../types/Album"
import { AddToPlaylist } from "./AddToPlaylist"
import { PlayerControls } from "./PlayerControls"

interface Props {
    name: string;
    durationMS: number;
    album: Album;
    active: boolean;
    preview: string;
    uri: string;
    hasControls?: boolean;
}
export const SmallPlayer: React.FC<Props> = ({ name, durationMS, album, active, preview, uri, hasControls=true }) => {
    return(
        <div className={`small-player${active ? ' active' : ''}`}>
            <AddToPlaylist uri={uri} />
            <img src={album.images[0].url} alt="" />
            <div className="song-text">
                <a href={uri} className="song-title">
                    {name}
                </a>
                <a href={album.artists[0].uri} className="song-artist">
                    {album.artists[0].name}
                </a>
            </div>
            {hasControls && (
                <PlayerControls 
                    preview={preview}
                />
            )}
        </div>
    )
}