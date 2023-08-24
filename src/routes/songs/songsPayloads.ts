import { ValidatedPayload, StringKeyMap } from '../../types'

export interface GetSongByAuxpartyIdPayload {
    auxpartyId: string;
}

export function parseGetSongByAuxpartyIdPayload(data: StringKeyMap): ValidatedPayload<GetSongByAuxpartyIdPayload> {
    const auxpartyId = data?.auxpartyId

    if (!auxpartyId) {
        return { isValid: false, payloadError: 'auxparty assigned ID must exist' }
    }

    return {
        isValid: true,
        payload: { auxpartyId },
    }
}