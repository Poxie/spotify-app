import { Artist } from "./Artist";
import { Image } from "./Image";

export interface Album {
    images: Image[];
    href: string;
    uri: string;
    name: string;
    id: number;
    artists: Artist[];
    release_date: string;
    total_tracks: number;
}