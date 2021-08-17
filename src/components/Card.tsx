import React from "react"

interface Props {
    name: string;
    image: string;
    uri: string;
    index: number;
}
export const Card: React.FC<Props> = ({ name, image, uri, index }) => {
    const style = {
        animationDelay: `${(index - 5) * .06}s`
    }

    return(
        <div className="card" style={style}>
           <a href={uri}>
                <img src={image} alt="" />
           </a>
            <a href={uri} className="name">
                {name}
            </a>
        </div>
    )
}