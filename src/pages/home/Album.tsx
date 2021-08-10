import React from "react"
import { Flex } from "../../components/Flex"

interface Props {
    name: string;
    id: string;
    image: string;
    uri: string;
}
export const Album: React.FC<Props> = ({ name, id, image, uri }) => {
    return(
        <div className="album">
            <Flex alignItems={"center"} className="album-info">
                <img src={image} alt="" />
                <a href={uri}>
                    {name}
                </a>
            </Flex>
        </div>
    )
}