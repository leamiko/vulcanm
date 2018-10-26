// Mutations Type

export const GET_TRANSFER = 'GET_TRANSFER';
export const GET_VIEW_TRANSFER = 'GET_VIEW_TRANSFER';
export const GET_PAGE_TRANSFER = 'GET_PAGE_TRANSFER';
export const GET_VALID_TRANSFER = 'GET_VALID_TRANSFER';

// Store

export interface StateTransfer {
    transfer: Transfer[];
    viewTransfer: {};
    transferPageCurrent: number;
    transferPageCount: number;
    transferValid: object[];
}

// Models

export interface Transfer {

}

