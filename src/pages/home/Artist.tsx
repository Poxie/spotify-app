import React from "react"

interface Props {
    name: string;
    href: string;
}
export const Artist: React.FC<Props> = ({ name, href }) => {
    return(
        <a href={href} className="artist">
            {name}
        </a>
    )
}