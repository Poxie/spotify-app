import React from "react"

interface Props {
    name: string;
    image: string;
    uri: string;
}
export const ProfileTrack: React.FC<Props> = ({ name, image, uri }) => {
    return(
        <div className="profile-track">
            <img src={image} alt="" />
            <a href={uri} className="name">
                {name}
            </a>
        </div>
    )
}