
export const GET_PROVIDER = 'GET_PROVIDER';
export const GET_VIEW_PROVIDER = 'GET_VIEW_PROVIDER';
export const GET_VALID_PROVIDER = 'GET_VALID_PROVIDER';
export const INSERT_PROVIDER = 'INSERT_PROVIDER';
export const EDIT_PROVIDER = 'EDIT_PROVIDER';
export const DELETE_PROVIDER = 'DELETE_PROVIDER';


// Store

export interface StateProvider {
    provider: Provider[];
    providerPageCount: number;
    providerPageCurrent: number;
    viewProvider: object;
    validProvider: object;
}

// Models

export interface Provider {

}