import { Image } from "./Image";

export interface Artist {
    name: string;
    id: string;
    uri: string;
    href: string;
    images: Image[];
    genres?: string[];
}