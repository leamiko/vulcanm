
export const GET_STORAGE = 'GET_STORAGE';
export const GET_VALID_STORAGE = 'GET_VALID_STORAGE';
export const EDIT_STORAGE = 'EDIT_STORAGE';
export const DELETE_STORAGE = 'DELETE_STORAGE';
export const INSERT_STORAGE = 'INSERT_STORAGE';

// Store

export interface StateStorage {
    storages: Storage[];
    validStorage: object;
    pageStorCount: number;
    pageStorCurrent: number;
}

// Models

export interface Storage {

}