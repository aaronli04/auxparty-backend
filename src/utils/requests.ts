export const errors = {
    INVALID_PAYLOAD: 'Invalid payload',
    INVALID_CREDENTIALS: 'Invalid credentials',
    NOT_FOUND: 'Resource not found',
    UNAUTHORIZED: 'Unauthorized request',
    FORBIDDEN: `Permission denied`,
    NO_FILE_PROVIDED: 'No file provided',
    INVALID_FILE_TYPE: 'Invalid file type',
    SUPABASE_ERROR: 'There is an error with Supabase',
    UNKNOWN_ERROR: 'Unknown error',
    JOB_SCHEDULING_FAILED: 'Failed to schedule job',
    NAMESPACE_NOT_FOUND: 'Namespace not found',
    NAMESPACE_MISSING_CODE_URL:
        'Namespace does not have a remote git repository assigned to it yet.',
    VERSION_ALREADY_PUBLISHED: 'Version numbers must always increase',
    CONTRACT_INSTANCE_NOT_FOUND: 'Contract instance not found',
    INTERNAL_ERROR: 'Internal server error',
}

export const codes = {
    SUCCESS: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
}