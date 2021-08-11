import { User } from "./User";

export interface AuthenticationContext {
    user: User | null | {};
    login: () => void;
}