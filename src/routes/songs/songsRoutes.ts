import { app } from '../express'
import paths from '../../utils/paths'
import { codes, errors } from '../../utils/requests'
import { parseGetSongByAuxpartyIdPayload } from './songsPayloads'
import { getSongByAuxpartyId } from '../../shared/songs/getSongByAuxpartyId'

/**
 * Get song route
 */
app.post(paths.GET_SONG, async (req, res) => {
    // Parse & validate payload.
    const { payload, isValid, payloadError } = parseGetSongByAuxpartyIdPayload(req.body)
    if (!isValid) {
        return res.status(codes.BAD_REQUEST).json({ error: payloadError || errors.INVALID_PAYLOAD })
    }

    const data = await getSongByAuxpartyId(payload.auxpartyId)

    return res
        .status(codes.SUCCESS)
        .json({ data })
})