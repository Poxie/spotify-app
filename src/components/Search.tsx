import React, { useMemo, useState } from "react";
import { SearchResults } from "../pages/home/SearchResults";
import { Input } from "./Input"

interface Props {
    onChoice: (value: string) => void;
}
export const Search: React.FC<Props> = ({ onChoice }) => {
    const [value, setvalue] = useState('');
    const [isFocusing, setIsFocusing] = useState(false);

    const handleFocus = useMemo(() => () => {
        setIsFocusing(true);
    }, []);
    const handleBlur = useMemo(() => () => {
        setTimeout(() => {
            setIsFocusing(false);
        }, 100);
    }, []);
    const handleClick = useMemo(() => (value: string) => {
        onChoice(value);
    }, []);
    
    return(
        <div className="search">
            <Input
                examples={['The Chainsmokers', 'Coldplay', 'Alan Walker']}
                rounded={true}
                onChange={setvalue}
                onBlur={handleBlur}
                onFocus={handleFocus}
            />
            {value !== '' && (
                <SearchResults 
                    query={value}
                    onClick={handleClick}
                    visible={isFocusing}
                />
            )}
        </div>
    )
}