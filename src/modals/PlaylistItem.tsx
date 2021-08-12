import React from "react"
import { Clickable } from "../components/Clickable"
import { Flex } from "../components/Flex"

interface Props {
    image: string;
    name: string;
    active: boolean;
    id: string;
    setActive: (id: string) => void;
}
export const PlaylistItem: React.FC<Props> = ({ image, name, active, id, setActive }) => {
    return(
        <Clickable className={`playlist-item${active ? ' active' : ''}`} onClick={() => setActive(id)}>
            {image ? (
                <img src={image} alt="" />
            ) : (
                <Flex className="empty-img" alignItems={'center'} justifyContent={'center'}>
                    ?
                </Flex>
            )}
            <div className="playlist-name">
                {name}
            </div>
        </Clickable>
    )
}