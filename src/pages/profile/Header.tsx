import React from "react"
import { Flex } from "../../components/Flex"

interface Props {
    text: string;
    className?: string;
    children?: any;
}
export const Header: React.FC<Props> = ({ text, children, className }) => {
    className = className ? `header ${className}` : 'header';
    return(
        <Flex className={className} justifyContent={'space-between'} alignItems={'center'}>
            <h1>
                {text}
            </h1>
            {children}
        </Flex>
    )
}