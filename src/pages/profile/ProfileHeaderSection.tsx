import React from "react"
import { Clickable } from "../../components/Clickable"
import { Flex } from "../../components/Flex"
import { Header } from "./Header"

interface Props {
    header: string;
    onExpand: () => void;
    isExpanded: boolean;
    children: any;
}
export const ProfileHeaderSection: React.FC<Props> = ({ children, header, onExpand, isExpanded }) => {
    return(
        <div className="profile-header-section">
            <Header
                text={header}
                className={isExpanded ? 'expanded' : undefined}
            >
                <Clickable className="header-action" onClick={onExpand}>
                    {isExpanded ? 'Show less' : 'Show more'}
                </Clickable>
            </Header>
            {children}
        </div>
    )
}