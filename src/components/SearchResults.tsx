import React, { useEffect, useState } from "react"
import { useAPI } from '../contexts/ApiProvider';
import { Artist } from '../types/Artist';
import { SearchArtist } from '../types/SearchArtist';
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
                const result = response[type + 's'].items.map((item: Artist) => item);
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
            {results.map((result: any) => {
                const { name, images, followers, id, album } = result;
                const image = images ? images[0]?.url : album.images[0]?.url;
                const extras = images ? `${followers.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} followers` : '';
                return(
                    <SearchResult 
                        name={name}
                        image={image}
                        extras={extras}
                        onClick={() => onClick(id)}
                        id={id}
                        key={id}
                    />
                )
            })}
        </div>
    )
}