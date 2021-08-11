import { Image } from "./Image";

export interface User {
    id: string;
    image: Image[];
    display_name: string;
    uri: string;
}