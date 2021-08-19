import React from "react"
import { Dropdown } from "../../components/Dropdown";
import { Flex } from "../../components/Flex"
import { useProfile } from "../../contexts/ProfileProvider";

const toCamelCase = (id: string) => {
    id = id.replaceAll('4', 'four').replaceAll('6', 'six');
    id = id.toLowerCase();
    id = id.split(' ').map((part, key) => {
        if(key !== 0) {
            part = part.slice(0, 1).toUpperCase() + part.slice(1, part.length);
        }
        return part;
    }).join('');
    return id;
}

interface Props {
    text: string;
    className?: string;
    id?: 'artists' | 'tracks';
    children?: any;
}
export const Header: React.FC<Props> = ({ text, children, className, id }) => {
    const { changeTopType } = useProfile();

    const handleDropdownChange = (typeId: string) => {
        if(!id) return;
        // @ts-ignore: toCammelCase(typeId) will always return valid string
        changeTopType(id, toCamelCase(typeId));
    }

    className = className ? `header ${className}` : 'header';
    return(
        <Flex className={className} justifyContent={'space-between'} alignItems={'center'}>
            <Flex alignItems={'center'}>
                <h1>
                    {text}
                </h1>
                {id && (
                    <Dropdown 
                        items={['All time', 'Last 6 months', 'Last 4 weeks']}
                        onChange={handleDropdownChange}
                    />
                )}
            </Flex>
            {children}
        </Flex>
    )
}