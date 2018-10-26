// Mutations Type

export const GET_POSTING = 'GET_POSTING';
export const GET_PAGE_POSTING = 'GET_PAGE_POSTING';
export const GET_POSTING_VIEW = 'GET_POSTING_VIEW';
export const CHANGE_POSTING_PART = 'CHANGE_POSTING_PART';
export const POSTING_VALIDATION = 'POSTING_VALIDATION';

export const SEND_POSTING_ITEM = 'SEND_POSTING_ITEM';
export const DELETE_POSTING_ITEM = 'DELETE_POSTING_ITEM';
export const DELETE_POSTING_PART_ITEM = 'DELETE_POSTING_PART_ITEM';

// Store

export interface StatePosting {
    posting: Posting[];
    postingView: object;
    postingPageCurrent: number;
    postingPageCount: number;
    postingValid: object[];
    postingNewItemList: object[];
}

// Models

export interface Posting {

}

