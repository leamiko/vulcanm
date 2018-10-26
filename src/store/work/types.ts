// Mutations Type

export const GET_WORK = 'GET_WORK';

// Store

export interface StateWork {
    work: Work[];
    workPageCurrent: number;
    workPageCount: number;
    workValid: object;
    viewWork: object;
}

// Models

export interface Work {

}

