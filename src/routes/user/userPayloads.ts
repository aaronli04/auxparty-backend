import { ValidatedPayload, StringKeyMap } from '../../types'

export interface GetUserPayload {
    auxpartyId: string
}

export interface UserLoginPayload {
    auxpartyId: string
    spotifyDisplayName: string
    spotifyEmail: string
    spotifyExternalLink: string
    spotifyApiLink: string
    spotifyUserId: string
    refresh_token: string
    access_token: string
}

export function parseGetUserPayload(data: StringKeyMap): ValidatedPayload<GetUserPayload> {
    const auxpartyId = data?.auxpartyId

    if (!auxpartyId) {
        return { isValid: false, payloadError: 'auxparty assigned ID must exist' }
    }

    return {
        isValid: true,
        payload: { auxpartyId },
    }
}

export function parseUserLoginPayload(data: StringKeyMap): ValidatedPayload<UserLoginPayload> {
    const auxpartyId = data?.auxpartyId
    const spotifyDisplayName = data?.spotifyDisplayName
    const spotifyEmail = data?.spotifyEmail
    const spotifyExternalLink = data?.spotifyExternalLink
    const spotifyApiLink = data?.spotifyApiLink
    const spotifyUserId = data?.spotifyUserId
    const refresh_token = data?.refresh_token
    const access_token = data?.access_token

    if (!auxpartyId) {
        return { isValid: false, payloadError: 'User must have auxparty assigned ID' }
    }

    if (!spotifyDisplayName || !spotifyEmail || !spotifyExternalLink || !spotifyApiLink || !spotifyUserId || !refresh_token || !access_token) {
        return { isValid: false, payloadError: 'Spotify information is incomplete or missing' }
    }

    return {
        isValid: true,
        payload: { auxpartyId, spotifyDisplayName, spotifyEmail, spotifyExternalLink, spotifyApiLink, spotifyUserId, refresh_token, access_token }
    }
}