import React from "react"

interface Props {
    text: string;
    active: boolean;
}
export const DropdownItem: React.FC<Props> = ({ text, active }) => {
    return(
        <div className={`dropdown-item${active ? ' active' : ''}`}>
            {text}
        </div>
    )
}