import { Image } from "./Image";

export interface User {
    id: string;
    images: Image[];
    display_name: string;
    uri: string;
    followers: {
        total: number;
    }
}