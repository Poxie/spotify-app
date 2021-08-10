import React from "react"

interface Props {
    min?: number;
    max: number;
}
export const LoadingText: React.FC<Props> = ({ min, max }) => {
    min = min ? min : 50;
    const width = Math.random() * (max - min) + min;

    return(
        <div className="loading-text loading-bg" style={{width: `${width}px`}} />
    )
}