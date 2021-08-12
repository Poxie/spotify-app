import { Image } from "./Image";
import { User } from "./User";

export interface Playlist {
    uri: string;
    images: Image[];
    id: string;
    name: string;
    owner: User;
}