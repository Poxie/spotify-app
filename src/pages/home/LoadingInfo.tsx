import React from "react"
import { Flex } from "../../components/Flex"
import { LoadingText } from "./LoadingText"

interface Props {
    small?: boolean;
}
export const LoadingInfo: React.FC<Props> = ({ small }) => {
    return(
        <Flex className={`loading-info${small ? ' small' : ''}`}>
            <div className="loading-bg loading-img" />
            <div>
                <div className="loading-bg loading-username"/>
                <LoadingText 
                    max={120}
                />
                <LoadingText 
                    max={120}
                />
            </div>
        </Flex>
    )
}