
export const GET_CLIENT = 'GET_CLIENT';
export const GET_CLIENT_INN = 'GET_CLIENT_INN';
export const GET_VALID_PERSON = 'GET_VALID_PERSON';
export const GET_VALID_COMPANY = 'GET_VALID_COMPANY';
export const GET_VIEW_CLIENT = 'GET_VIEW_CLIENT';

export const EDIT_CLIENT = 'EDIT_CLIENT';

export const INSERT_CLIENT = 'INSERT_CLIENT';

export const DELETE_CLIENT = 'DELETE_CLIENT';

// Store

export interface StateClient {
    client: Client[];
    clientInn: object[];
    clientPersonValid: object;
    clientCompanyValid: object;
    viewClient: ViewClient;
    pageCurrent: PageCurrent;
    pageCount: PageCount;
}

// Models

export interface Client {

}

export interface PageCurrent {
    
}

export interface PageCount {
    
}

export interface ViewClient {
    
}
    