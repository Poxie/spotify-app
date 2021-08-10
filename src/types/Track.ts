import { Album } from "./Album";
import { Artist } from "./Artist";

export interface Track {
    href: string;
    name: string;
    uri: string;
    preview_url: string;
    id: string;
    duration_ms: number;
    artists: Artist[];
    album: Album;
}