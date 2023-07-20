import { ValidatedPayload, StringKeyMap } from '../../types'

export interface GetUserPayload {
    auxpartyId: string
}

export interface UserLoginPayload {
    auxpartyId: string
    spotifyDisplayName: string
    spotifyEmail: string
    spotifyExternalLink: string
    spotifyAPILink: string
    spotifyUserId: string
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
    const spotifyAPILink = data?.spotifyAPILink
    const spotifyUserId = data?.spotifyUserId

    if (!auxpartyId) {
        return { isValid: false, payloadError: 'User must have auxparty assigned ID' }
    }

    if (!spotifyDisplayName || !spotifyEmail || !spotifyExternalLink || !spotifyAPILink || !spotifyUserId) {
        return { isValid: false, payloadError: 'Spotify information is incomplete or missing' }
    }

    return {
        isValid: true,
        payload: { auxpartyId, spotifyDisplayName, spotifyEmail, spotifyExternalLink, spotifyAPILink, spotifyUserId },
    }
}