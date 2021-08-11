export interface APIContext {
    get: (query: string, userAccessToken?: boolean) => Promise<Response>;
    post: (query: string) => Promise<Response>;
}