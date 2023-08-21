import { app } from '../express'
import paths from '../../utils/paths'
import { parseGetUserPayload, parseUserLoginPayload, parseUpdateAccessTokenPayload } from './userPayloads'
import { codes, errors } from '../../utils/requests'
import { getUserByAuxpartyId } from '../../shared/user/getUserByAuxpartyId'
import { handleSpotifyLogin } from '../../shared/user/handleSpotifyLogin'
import { updateAccessToken } from '../../shared/user/updateAccessToken'

/**
 * Get user route
 */
app.post(paths.GET_USER, async (req, res) => {
    // Parse & validate payload.
    const { payload, isValid, payloadError } = parseGetUserPayload(req.body)
    if (!isValid) {
        return res.status(codes.BAD_REQUEST).json({ error: payloadError || errors.INVALID_PAYLOAD })
    }

    const data = await getUserByAuxpartyId(payload.auxpartyId)

    return res
        .status(codes.SUCCESS)
        .json({ data })
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

    const data = await handleSpotifyLogin(payload)

    return res
        .status(codes.SUCCESS)
        .json({ data })
})

/**
 * Update Spotify Access Token route
 */
app.post(paths.UPDATE_ACCESS_TOKEN, async (req, res) => {
    // Parse & validate payload.
    const { payload, isValid, payloadError } = parseUpdateAccessTokenPayload(req.body)
    if (!isValid) {
        return res.status(codes.BAD_REQUEST).json({ error: payloadError || errors.INVALID_PAYLOAD })
    }
    const data = await updateAccessToken(payload)

    return res
        .status(codes.SUCCESS)
        .json({ data })
})