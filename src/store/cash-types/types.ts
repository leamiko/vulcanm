
export const GET_CASH_TYPES = 'GET_CASH_TYPES';
export const GET_VALID_CASH_TYPES = 'GET_VALID_CASH_TYPES';
export const ADD_CASH_TYPES = 'ADD_CASH_TYPES';
export const EDIT_CASH_TYPES = 'EDIT_CASH_TYPES';
export const DELETE_CASH_TYPES = 'DELETE_CASH_TYPES';

// Store

export interface StateCashTypes {
    cashTypeUser: CashTypes[];
    cashTypeDefault: CashTypes[];
    cashTypeValid: object;
    cashTypePageCount: number;
    cashTypePageCurrent: number;
}

// Models

export interface CashTypes {

}