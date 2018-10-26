// Mutations Type

export const GET_CANCEL = 'GET_CANCEL';
export const GET_VIEW_CANCEL = 'GET_VIEW_CANCEL';
export const GET_PAGE_CANCEL = 'GET_PAGE_CANCEL';
export const CANCEL_REVERT_PART = 'CANCEL_REVERT_PART';
export const CANCEL_VALIDATION = 'CANCEL_VALIDATION';

// Store

export interface StateCancel {
    cancel: Cancel[];
    cancelView: object;
    cancelPageCurrent: number;
    cancelPageCount: number;
    cancelValid: object[];
}

// Models

export interface Cancel {

}

