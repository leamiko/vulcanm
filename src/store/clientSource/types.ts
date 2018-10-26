
export const GET_CLIENT_SOURCE = 'GET_CLIENT_SOURCE';
export const GET_VALID_CLIENT_SOURCE = 'GET_VALID_CLIENT_SOURCE';
export const ADD_CLIENT_SOURCE = 'ADD_CLIENT_SOURCE';
export const EDIT_CLIENT_SOURCE = 'EDIT_CLIENT_SOURCE';
export const DELETE_CLIENT_SOURCE = 'DELETE_CLIENT_SOURCE';


// Store

export interface StateClientSource {
    clientSource: ClientSource[];
    clientSourcePageCount: number;
    clientSourcePageCurrent: number;
    clientSourceValid: object;
}

// Models

export interface ClientSource {

}