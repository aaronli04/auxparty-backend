import { ValidatedPayload, StringKeyMap } from '../../types'

export interface GetRoomPayload {
    name: string
}

export interface CreateRoomPayload {
    auxpartyId: string
    roomName: string
    roomPassword: string
    active: boolean
}

export function parseGetRoomPayload(data: StringKeyMap): ValidatedPayload<GetRoomPayload> {
    const name = data?.name

    if (!name) {
        return { isValid: false, payloadError: 'Room name must exist' }
    }

    return {
        isValid: true,
        payload: { name },
    }
}

export function parseCreateRoomPayload(data: StringKeyMap): ValidatedPayload<CreateRoomPayload> {
    const auxpartyId = data?.auxpartyId
    const roomName = data?.roomName
    const roomPassword = data?.roomPassword
    const active = data?.active

    if (!auxpartyId) {
        return { isValid: false, payloadError: 'Owner must have auxparty assigned ID' }
    }

    if (!roomName || !roomPassword || !active) {
        return { isValid: false, payloadError: 'Room information is incomplete or missing' }
    }

    return {
        isValid: true,
        payload: { auxpartyId, roomName, roomPassword, active },
    }
}