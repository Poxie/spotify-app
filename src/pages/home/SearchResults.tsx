import React, { useEffect, useState } from "react"
import { useAPI } from "../../contexts/ApiProvider";
import { Artist } from "../../types/Artist";
import { SearchArtist } from "../../types/SearchArtist";
import { SearchResult } from "./SearchResult";

interface Props {
    query: string;
    onClick: (id: string) => void;
    type?: 'artist' | 'track';
    visible?: boolean;
}
export const SearchResults: React.FC<Props> = ({ query, onClick, visible, type='artist' }) => {
    const { get } = useAPI();
    const [results, setResult] = useState<SearchArtist[]>([]);

    useEffect(() => {
        get(`search?q=${query}&type=${type}`)
            .then(res => res.json())
            .then(response => {
                const result = response.artists.items.map((item: Artist) => item);
                console.log(JSON.stringify(result));
                setResult(result);
            });
    }, [query]);

    let style = {};
    if(!visible) {
        style = {
            opacity: 0,
            pointerEvents: 'none'
        }
    }
    return(
        <div className="search-results scrollbar" style={style}>
            {results.map(result => {
                const { name, images, followers, id } = result;
                return(
                    <SearchResult 
                        name={name}
                        image={images[0]?.url}
                        extras={`${followers.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} followers`}
                        onClick={() => onClick(id)}
                        id={id}
                        key={id}
                    />
                )
            })}
        </div>
    )
}