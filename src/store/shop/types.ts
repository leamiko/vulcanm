// Mutations Type

export const GET_SHOP = 'GET_SHOP';
export const GET_VIEW_SHOP = 'GET_VIEW_SHOP';
export const GET_PAGE_SHOP = 'GET_PAGE_SHOP';
export const SHOP_VALIDATION = 'SHOP_VALIDATION';

export const VIEW_SELL = 'VIEW_SELL';

export const ADD_SELL_PART = 'ADD_SELL_PART';
export const ADD_SELL_WORK = 'ADD_SELL_WORK';
export const ADD_SELL_PAYMENT = 'ADD_SELL_PAYMENT';

export const DEL_SELL_PART = 'DEL_SELL_PART';
export const DEL_SELL_WORK = 'DEL_SELL_WORK';

export const UPDATE_SELL_PART = 'UPDATE_SELL_PART';

// Store

export interface StateShop {
    shop: StateShop[];
    viewSell: {};
    shopPageCurrent: number;
    shopPageCount: number;
    shopValid: object[];
    sellPart: object;
    sellWork: object;
    sellPartList: object[];
    sellWorkList: object[];
    sellDataList: object[];
    sellPaymentList: object[];
    sellDiscountList: object[];
}

// Models

export interface Shop {

}
