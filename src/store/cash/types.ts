
export const GET_CASH_LIST = 'GET_CASH_LIST';
export const GET_CASH_VIEW = 'GET_CASH_VIEW';
export const UPDATE_CASH_ITEM = 'UPDATE_CASH_ITEM';
export const DELETE_CASH_ITEM = 'DELETE_CASH_ITEM';
export const CLICK_DETAIL = 'CLICK_DETAIL';
export const CLEAR_CASH = 'CLEAR_CASH';

export const CASH_VALIDATE = 'CASH_VALIDATE';

// Store

export interface StateCash {
    cashList: Cash[];
    cashView: object[];
    cashListPageCount: number;
    cashValidate: object;
    cashOperationPageCount: number;
    cashOperationCountIn: number;
    cashOperationCountOut: number;
    cashOperationTotalIn: number;
    cashOperationTotalOut: number;
    cashViewDetail: string
}

// Models

export interface Cash {

}