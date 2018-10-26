// Mutations Type

export const ADD_PART = 'ADD_PART';

export const GET_PART = 'GET_PART';
export const GET_VIEW_PART = 'GET_VIEW_PART';
export const GET_WARRANT_TYPE_LIST = 'GET_WARRANT_TYPE_LIST';
export const GET_REWARD_TYPE_LIST = 'GET_REWARD_TYPE_LIST';
export const GET_PART_PAGE = 'GET_PART_PAGE';
export const GET_VATLIST = 'GET_VATLIST';
export const GET_GENERATION_BARCODE = 'GET_GENERATION_BARCODE';
export const GET_VALID_PART = 'GET_VALID_PART';
export const GET_LOGS = 'GET_LOGS';
export const GET_HEAD_PART = 'GET_HEAD_PART';

export const ADD_BARCODE_LIST = 'ADD_BARCODE_LIST';

export const EDIT_PART = 'EDIT_PART';


export const COPY_PART_ITEM = 'COPY_PART_ITEM';

export const DELETE_CATALOG_ITEM = 'DELETE_CATALOG_ITEM';

export const DELETE_BARCODE = 'DELETE_BARCODE';

export const EDIT_CHECK_COLUMN = 'EDIT_CHECK_COLUMN';
export const EDIT_CHECK_PRICE_COLUMN = 'EDIT_CHECK_PRICE_COLUMN';
export const EDIT_CHECK_STORE_COLUMN = 'EDIT_CHECK_STORE_COLUMN';

export const CLEAR_LIST = 'CLEAR_LIST';
export const RELOAD_HEAD_PART = 'RELOAD_HEAD_PART';
export const RELOAD_HEAD_NOMENKL = 'RELOAD_HEAD_NOMENKL';


// Store

export interface StateParts {
    parts: Parts[];
    viewPart: Parts[];
    vatlist: Vatlist[];
    warrantTypeList: Vatlist[];
    rewardTypeList: Vatlist[];
    partPageCurrent: number;
    partPageCount: number;
    partAmountControl: number;
    barcode: string;
    barcodeList: Parts[];
    validPart: {};
    catalogs: Parts[];
    headNomenkl: Head[];
    headPart: object;
    heads: Head[];
    logs: object[];
    logsPageCount: number;
    logsPageCurrent: number;
}

// Models

export interface Parts {

}

export interface Vatlist {

}

export interface Head {

}
