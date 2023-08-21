import { ValidatedPayload, StringKeyMap } from '../../types'

export interface GetRoomByNamePayload {
    name: string
}

export interface GetRoomByAuxpartyIdPayload {
    auxpartyId: string
}

export interface CreateRoomPayload {
    auxpartyId: string
    roomName: string
    roomPassword: string
    playlistId: string
}

export function parseGetRoomByNamePayload(data: StringKeyMap): ValidatedPayload<GetRoomByNamePayload> {
    const name = data?.name

    if (!name) {
        return { isValid: false, payloadError: 'Room name must exist' }
    }

    return {
        isValid: true,
        payload: { name },
    }
}

export function parseGetRoomByAuxpartyIdPayload(data: StringKeyMap): ValidatedPayload<GetRoomByAuxpartyIdPayload> {
    const auxpartyId = data?.auxpartyId

    if (!auxpartyId) {
        return { isValid: false, payloadError: 'auxpartyId must exist' }
    }

    return {
        isValid: true,
        payload: { auxpartyId },
    }
}

export function parseCreateRoomPayload(data: StringKeyMap): ValidatedPayload<CreateRoomPayload> {
    const auxpartyId = data?.auxpartyId
    const roomName = data?.roomName
    const roomPassword = data?.roomPassword
    const playlistId = data?.playlistId

    if (!auxpartyId) {
        return { isValid: false, payloadError: 'Owner must have auxparty assigned ID' }
    }

    if (!roomName || !roomPassword || !playlistId) {
        return { isValid: false, payloadError: 'Room information is incomplete or missing' }
    }

    return {
        isValid: true,
        payload: { auxpartyId, roomName, roomPassword, playlistId },
    }
}