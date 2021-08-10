import { Image } from "./Image";

export interface SearchArtist {
    name: string;
    id: string;
    followers: {
        total: number;
    };
    images: Image[];
    uri: string;
    genres: string[];
    popularity: number;
}