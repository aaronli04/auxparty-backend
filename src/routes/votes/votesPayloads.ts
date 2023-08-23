import { ValidatedPayload, StringKeyMap } from '../../types'

export interface AddVotePayload {
    auxpartyId: string;
    userId: string;
    voteValue: string;
}

export interface GetVotesBySongPayload {
    auxpartyId: string;
}

export function parseAddVotePayload(data: StringKeyMap): ValidatedPayload<AddVotePayload> {
    const auxpartyId = data?.auxpartyId
    const userId = data?.userId
    const voteValue = data?.voteValue

    if (!auxpartyId) {
        return { isValid: false, payloadError: 'auxparty assigned ID must exist' }
    }

    if (!userId || !voteValue) {
        return { isValid: false, payloadError: 'vote information is incomplete or missing' }
    }

    return {
        isValid: true,
        payload: { auxpartyId, userId, voteValue },
    }
}

export function parseGetVotesBySongPayload(data: StringKeyMap): ValidatedPayload<GetVotesBySongPayload> {
    const auxpartyId = data?.auxpartyId

    if (!auxpartyId) {
        return { isValid: false, payloadError: 'auxparty assigned ID must exist' }
    }

    return {
        isValid: true,
        payload: { auxpartyId },
    }
}