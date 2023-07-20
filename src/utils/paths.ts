const prefix = {
    SPOTIFY: '/spotify',
    USER: '/user',
    ROOM: '/room'
}

const paths = {
    HEALTH_CHECK: '/health-check',
    SPOTIFY_LOGIN: `${prefix.SPOTIFY}/login`,
    GET_USER: `${prefix.USER}/get`,
    GET_ROOM: `${prefix.ROOM}/get`,
    CREATE_ROOM: `${prefix.ROOM}/create`
}

export default paths