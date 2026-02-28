import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Game {
    id: string;
    featured: boolean;
    thumbnailUrl: string;
    name: string;
    description: string;
    category: string;
    embedUrl: string;
}
export interface backendInterface {
    getAllGames(): Promise<Array<Game>>;
    getFeaturedGames(): Promise<Array<Game>>;
    getGameById(id: string): Promise<Game>;
    searchGames(searchTerm: string): Promise<Array<Game>>;
}
