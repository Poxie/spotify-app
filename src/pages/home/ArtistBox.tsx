import React from "react"

interface Props {
    title: string;
    children: any;
}
export const ArtistBox: React.FC<Props> = ({ title, children }) => {
    return(
        <div className="artist-box">
            <div className="box-title">
                {title}
            </div>
            <div className="box-content scrollbar">
                {children}
            </div>
        </div>
    )
}