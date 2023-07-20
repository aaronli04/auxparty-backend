export type StringKeyMap = { [key: string]: any }

export type StringMap = { [key: string]: string }

export interface ValidatedPayload<T> {
    isValid: boolean
    payload?: T
    payloadError?: string
}