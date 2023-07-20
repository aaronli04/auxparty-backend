import { app } from '../express'
import paths from '../../utils/paths'
import { parseGetUserPayload, parseUserLoginPayload } from './userPayloads'
import { codes, errors } from '../../utils/requests'
import supabase from '../../supabase/client'

/**
 * Get user route
 */
app.post(paths.GET_USER, async (req, res) => {
    // Parse & validate payload.
    const { payload, isValid, payloadError } = parseGetUserPayload(req.body)
    if (!isValid) {
        return res.status(codes.BAD_REQUEST).json({ error: payloadError || errors.INVALID_PAYLOAD })
    }

    const { auxpartyId } = payload

    const { data, error } = await supabase
        .from('users')
        .select()
        .eq('auxpartyId', auxpartyId)
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
 * User Spotify login route
 */
app.post(paths.SPOTIFY_LOGIN, async (req, res) => {
    // Parse & validate payload.
    const { payload, isValid, payloadError } = parseUserLoginPayload(req.body)
    if (!isValid) {
        return res.status(codes.BAD_REQUEST).json({ error: payloadError || errors.INVALID_PAYLOAD })
    }

    // Upsert user
    const { data, error } = await supabase
        .from('users')
        .upsert(payload, {
            onConflict: 'auxpartyId'
        })
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