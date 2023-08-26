import { app } from '../express'
import paths from '../../utils/paths'
import { parseGetRoomByNamePayload, parseCreateRoomPayload, parseGetRoomByAuxpartyIdPayload, parseUpdateActiveStatusPayload } from './roomPayloads'
import { codes, errors } from '../../utils/requests'
import { getRoomByName } from '../../shared/rooms/getRoomByName'
import { getRoomByAuxpartyId } from '../../shared/rooms/getRoomByAuxpartyId'
import { createRoom } from '../../shared/rooms/createRoom'
import { getAllRooms } from '../../shared/rooms/getAllRooms'
import { updateActiveStatus } from '../../shared/rooms/updateActiveStatus'

/**
 * Get room by name route
 */
app.post(paths.GET_ROOM_BY_NAME, async (req, res) => {
    // Parse & validate payload.
    const { payload, isValid, payloadError } = parseGetRoomByNamePayload(req.body)
    if (!isValid) {
        return res.status(codes.BAD_REQUEST).json({ error: payloadError || errors.INVALID_PAYLOAD })
    }

    const data = await getRoomByName(payload.name);

    return res
        .status(codes.SUCCESS)
        .json({ data })
})

/**
 * Get room by auxpartyId route
 */
app.post(paths.GET_ROOM_BY_AUXPARTYID, async (req, res) => {
    // Parse & validate payload.
    const { payload, isValid, payloadError } = parseGetRoomByAuxpartyIdPayload(req.body)

    if (!isValid) {
        return res.status(codes.BAD_REQUEST).json({ error: payloadError || errors.INVALID_PAYLOAD })
    }

    const data = await getRoomByAuxpartyId(payload.auxpartyId)

    return res
        .status(codes.SUCCESS)
        .json({ data })
})


/**
 * Create room route
 */
app.post(paths.CREATE_ROOM, async (req, res) => {
    // Parse & validate payload.
    const { payload, isValid, payloadError } = parseCreateRoomPayload(req.body)
    if (!isValid) {
        return res.status(codes.BAD_REQUEST).json({ error: payloadError || errors.INVALID_PAYLOAD })
    }

    const data = await createRoom(payload)

    return res
        .status(codes.SUCCESS)
        .json({ data })
})

/**
 * Get all rooms route
 */
app.get(paths.GET_ALL_ROOMS, async (req, res) => {
    const data = await getAllRooms();

    return res
        .status(codes.SUCCESS)
        .json({ data })
})

/**
 * Update room activity status
 */
app.post(paths.UPDATE_ROOM_ACTIVE, async (req, res) => {
    // Parse & validate payload.
    const { payload, isValid, payloadError } = parseUpdateActiveStatusPayload(req.body)
    if (!isValid) {
        return res.status(codes.BAD_REQUEST).json({ error: payloadError || errors.INVALID_PAYLOAD })
    }

    const data = await updateActiveStatus(payload)

    return res
        .status(codes.SUCCESS)
        .json({ data })
})