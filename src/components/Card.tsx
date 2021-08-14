import React from "react"

interface Props {
    name: string;
    image: string;
    uri: string;
}
export const Card: React.FC<Props> = ({ name, image, uri }) => {
    return(
        <div className="card">
           <a href={uri}>
                <img src={image} alt="" />
           </a>
            <a href={uri} className="name">
                {name}
            </a>
        </div>
    )
}