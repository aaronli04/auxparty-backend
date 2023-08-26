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
    uri: string
}

export interface UpdateActiveStatusPayload {
    auxpartyId: string
    active: boolean
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
    const uri = data?.uri

    if (!auxpartyId) {
        return { isValid: false, payloadError: 'Owner must have auxparty assigned ID' }
    }

    if (!roomName || !roomPassword || !playlistId || !uri) {
        return { isValid: false, payloadError: 'Room information is incomplete or missing' }
    }

    return {
        isValid: true,
        payload: { auxpartyId, roomName, roomPassword, playlistId, uri },
    }
}

export function parseUpdateActiveStatusPayload(data: StringKeyMap): ValidatedPayload<UpdateActiveStatusPayload> {
    const auxpartyId = data?.auxpartyId
    const active = data?.active

    if (!auxpartyId) {
        return { isValid: false, payloadError: 'Owner must have auxparty assigned ID' }
    }

    if (!active) {
        return { isValid: false, payloadError: 'Activity information is incomplete or missing' }
    }

    return {
        isValid: true,
        payload: { auxpartyId, active },
    }
}