import { Image } from "./Image";

export interface Playlist {
    uri: string;
    images: Image[];
    id: string;
    name: string;
}