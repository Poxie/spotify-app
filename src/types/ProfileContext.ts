import { Artist } from "./Artist";
import { Track } from "./Track";
import { User } from "./User";

export interface ProfileContext {
    user: User;
    tracks: Track[];
    artists: Artist[];
    recommendations: Track[];
    showMore: () => void;
    changeTopType: (id: 'artists' | 'tracks', type: 'allTime' | 'lastSixMonths' | 'lastFourWeeks') => void;
}