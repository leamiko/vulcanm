export const PUSH_CALL_ERROR = 'PUSH_CALL_ERROR';
export const PUSH_CALL_SUCCESS = 'PUSH_CALL_SUCCESS';
export const PUSH_CALL_WARNING = 'PUSH_CALL_WARNING';
export const PUSH_CALL_INFO = 'PUSH_CALL_INFO';

// Store

export interface StatePush {
    error: object;
    success: object;
    warning: object;
    info: object;
}

// Models

export interface Push {

}