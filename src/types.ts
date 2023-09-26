export type StringKeyMap = { [key: string]: any }

export type StringMap = { [key: string]: string }

export interface ValidatedPayload<T> {
    isValid: boolean
    payload?: T
    payloadError?: string
}

export interface Room {
    auxpartyId: string;
    name: string;
    password: string;
    members: string;
    queue: string;
    playlistId: string;
    uri: string;
    currentlyPlaying: number;
    created_at: DateConstructor;
    modified_at: DateConstructor;
}

export interface User {
    auxpartyId: string;
    spotifyDisplayName: string;
    spotifyEmail: string;
    spotifyExternalLink: string;
    spotifyApiLink: string;
    spotifyUserId: string;
    refreshToken: string;
    accessToken: string;
}

export interface Vote {
    auxpartyId: string;
    userId: string;
    voteValue: string;
    created_at: DateConstructor;
    modified_at: DateConstructor;
}

export interface Song {
    auxpartyId: string;
    roomId: string;
    albumCover: string;
    name: string;
    artists: string;
    uri: string;
    added: boolean;
    created_at: DateConstructor;
    modified_at: DateConstructor;
}