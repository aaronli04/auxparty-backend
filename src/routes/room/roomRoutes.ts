import { app } from '../express'
import paths from '../../utils/paths'
import { parseGetRoomByNamePayload, parseCreateRoomPayload, parseGetRoomByAuxpartyIdPayload } from './roomPayloads'
import { codes, errors } from '../../utils/requests'
import supabase from '../../supabase/client'

/**
 * Get room by name route
 */
app.post(paths.GET_ROOM_BY_NAME, async (req, res) => {
    // Parse & validate payload.
    const { payload, isValid, payloadError } = parseGetRoomByNamePayload(req.body)
    if (!isValid) {
        return res.status(codes.BAD_REQUEST).json({ error: payloadError || errors.INVALID_PAYLOAD })
    }

    const { name } = payload

    // Check if active room exists with given name
    const { data, error } = await supabase
        .from('rooms')
        .select()
        .eq('name', name)
        .eq('active', true)
        .limit(1)

    if (error) {
        console.log(error)
        return res.status(codes.BAD_REQUEST).json({ error: errors.SUPABASE_ERROR })
    }

    return res
        .status(codes.SUCCESS)
        .json({
            data: data,
        })
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

    const { auxpartyId } = payload

    // Check if active room exists with given auxpartyId
    const { data, error } = await supabase
        .from('rooms')
        .select()
        .eq('auxpartyId', auxpartyId)
        .eq('active', true)
        .limit(1)

    if (error) {
        console.log(error)
        return res.status(codes.BAD_REQUEST).json({ error: errors.SUPABASE_ERROR })
    }

    return res
        .status(codes.SUCCESS)
        .json({
            data: data,
        })
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

    const { auxpartyId, roomName, roomPassword, active } = payload
    const created_at = new Date();
    const modified_at = new Date()

    // Check if active room exists with given auxpartyId
    const { data: existingRooms, error: fetchError } = await supabase
        .from('rooms')
        .select()
        .eq('auxpartyId', auxpartyId)
        .eq('active', true)
        .limit(1);

    if (fetchError) {
        return res.status(codes.BAD_REQUEST).json({ error: errors.SUPABASE_ERROR });
    }

    if (existingRooms.length > 0) {
        return res.status(codes.BAD_REQUEST).json({ error: 'Active room with the same auxpartyId already exists.' });
    }

    // Create room
    const { data, error } = await supabase
        .from('rooms')
        .insert({ auxpartyId, name: roomName, password: roomPassword, active, created_at, modified_at })
        .select()

    if (error) {
        console.log(error)
        return res.status(codes.BAD_REQUEST).json({ error: errors.SUPABASE_ERROR })
    }

    return res
        .status(codes.SUCCESS)
        .json({
            data: data,
        })
})

/**
 * Get all rooms route
 */
app.get(paths.GET_ALL_ROOMS, async (req, res) => {
    const { data, error } = await supabase
        .from('rooms')
        .select()

    if (error) {
        console.log(error)
        return res.status(codes.BAD_REQUEST).json({ error: errors.SUPABASE_ERROR })
    }

    return res
        .status(codes.SUCCESS)
        .json({
            data: data,
        })
})
