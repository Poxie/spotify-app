import { User } from "./User";

export interface AuthenticationContext {
    user: User | null | {};
    login: (newWindow?: boolean) => void;
    loginModifyAccess: (newWindow?: boolean) => void;
}