
export const GET_REPAIR = 'GET_REPAIR';
export const GET_REPAIR_PAGE = 'GET_REPAIR_PAGE';
export const GET_REPAIR_VIEW = 'GET_REPAIR_VIEW';

// Store

export interface StateRepair {
    repair: object[];
    pageCountRepair: number;
    pageCurrentRepair: number;
}

