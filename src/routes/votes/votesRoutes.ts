import { app } from '../express'
import paths from '../../utils/paths'
import { codes, errors } from '../../utils/requests'
import { parseAddVotePayload, parseGetUserVoteBySongPayload, parseGetVotesBySongPayload } from './votesPayloads'
import { addVoteToSong } from '../../shared/votes/addVoteToSong'
import { getVotesBySong } from '../../shared/votes/getVotesBySong'
import { getUserVoteBySong } from '../../shared/votes/getUserVoteBySong'

/**
 * Add vote route
 */
app.post(paths.ADD_VOTE, async (req, res) => {
    // Parse & validate payload.
    const { payload, isValid, payloadError } = parseAddVotePayload(req.body)
    if (!isValid) {
        return res.status(codes.BAD_REQUEST).json({ error: payloadError || errors.INVALID_PAYLOAD })
    }

    const data = await addVoteToSong(payload)

    return res
        .status(codes.SUCCESS)
        .json({ data })
})

/**
 * Get vote route
 */
app.post(paths.GET_VOTE, async (req, res) => {
    // Parse & validate payload.
    const { payload, isValid, payloadError } = parseGetVotesBySongPayload(req.body)
    if (!isValid) {
        return res.status(codes.BAD_REQUEST).json({ error: payloadError || errors.INVALID_PAYLOAD })
    }

    const data = await getVotesBySong(payload)

    return res
        .status(codes.SUCCESS)
        .json({ data })
})

/**
 * Get user vote by song route
 */
app.post(paths.GET_USER_VOTE, async (req, res) => {
    // Parse & validate payload.
    const { payload, isValid, payloadError } = parseGetUserVoteBySongPayload(req.body)
    if (!isValid) {
        return res.status(codes.BAD_REQUEST).json({ error: payloadError || errors.INVALID_PAYLOAD })
    }

    const data = await getUserVoteBySong(payload)

    return res
        .status(codes.SUCCESS)
        .json({ data })
})