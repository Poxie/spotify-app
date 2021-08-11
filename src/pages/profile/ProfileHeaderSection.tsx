import React from "react"
import { Clickable } from "../../components/Clickable"
import { Flex } from "../../components/Flex"

interface Props {
    header: string;
    onExpand: () => void;
    isExpanded: boolean;
    children: any;
}
export const ProfileHeaderSection: React.FC<Props> = ({ children, header, onExpand, isExpanded }) => {
    return(
        <div className="profile-header-section">
            <Flex className={`header${isExpanded ? ' expanded' : ''}`} justifyContent={'space-between'} alignItems={'center'}>
                <h1>
                    {header}
                </h1>
                <Clickable className="show-all" onClick={onExpand}>
                    {isExpanded ? 'Show less' : 'Show more'}
                </Clickable>
            </Flex>
            {children}
        </div>
    )
}