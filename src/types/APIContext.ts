export interface APIContext {
    get: (query: string, userAccessToken?: boolean) => Promise<Response>;
}