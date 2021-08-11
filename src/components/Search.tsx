import React, { useMemo, useState } from "react";
import { SearchResults } from "./SearchResults";
import { Input } from "./Input"
import './Search.scss';

interface Props {
    onChoice: (value: string, type: 'artist' | 'track') => void;
    type?: 'artist' | 'track';
}
export const Search: React.FC<Props> = ({ onChoice, type='artist' }) => {
    const [value, setvalue] = useState('');
    const [isFocusing, setIsFocusing] = useState(false);

    const handleFocus = useMemo(() => () => {
        setIsFocusing(true);
    }, []);
    const handleBlur = useMemo(() => () => {
        setTimeout(() => {
            setIsFocusing(false);
        }, 150);
    }, []);
    const handleClick = useMemo(() => (value: string) => {
        onChoice(value, type);
    }, [onChoice, type]);
    
    return(
        <div className="search">
            <Input
                examples={type === 'artist' ? ['The Chainsmokers', 'Coldplay', 'Alan Walker'] : ['Closer', 'Something just like this', 'Viva la vida']}
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
                    type={type}
                />
            )}
        </div>
    )
}