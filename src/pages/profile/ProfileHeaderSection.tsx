import React from "react"
import { Clickable } from "../../components/Clickable"
import { Header } from "./Header"

interface Props {
    header: string;
    onExpand: () => void;
    isExpanded: boolean;
    id?: 'artists' | 'tracks';
    children: any;
}
export const ProfileHeaderSection: React.FC<Props> = ({ children, header, onExpand, isExpanded, id }) => {
    return(
        <div className="profile-header-section">
            <Header
                text={header}
                className={isExpanded ? 'expanded' : undefined}
                id={id}
            >
                <Clickable className="header-action" onClick={onExpand}>
                    {isExpanded ? 'Show less' : 'Show more'}
                </Clickable>
            </Header>
            {children}
        </div>
    )
}