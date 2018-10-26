
export const GET_POINT = 'GET_POINT';
export const GET_VIEW_POINT = 'GET_VIEW_POINT';
export const GET_VALID_POINT = 'GET_VALID_POINT';
export const EDIT_POINT = 'EDIT_POINT';
export const INSERT_POINT = 'INSERT_POINT';
export const DELETE_POINT = 'DELETE_POINT';

// Store

export interface StatePoint {
    point: Point[];
    typePoint: TypePoint[];
    pointPageCount: number;
    pointPageCurrent: number;
    viewPoint: {};
    validPoint: object;
}

// Models

export interface Point {

}

export interface TypePoint {

}



