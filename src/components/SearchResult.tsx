import React from "react"
import { Clickable } from "./Clickable"
import { Flex } from "./Flex"

interface Props {
    name: string;
    image: string;
    extras: string;
    id: string;
    onClick: () => void;
}
export const SearchResult: React.FC<Props> = ({ name, image, extras, id, onClick }) => {
    return(
        <Clickable onClick={onClick}>
            <Flex className="search-result" justifyContent={'space-between'} alignItems={'center'}>
                <Flex className="search-main" alignItems={'center'}>
                    <img src={image} alt="" />
                    <span className="artist-name">
                        {name}
                    </span>
                </Flex>
                <div className="search-extras">
                    {extras}
                </div>
            </Flex>
        </Clickable>
    )
}