
export const GET_USER_ME = 'GET_USER_ME';
export const ADD_REPAIR_ACTIVE_COLUMN = 'ADD_REPAIR_ACTIVE_COLUMN';
export const CLEAR_USER = 'CLEAR_USER';

// Store

export interface StateUser {
    user: User[];
    repairAllColumn: object[];
    repairActiveColumn: object[];
}

// Models

export interface User {

}