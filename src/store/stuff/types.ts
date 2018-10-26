
export const GET_STUFF = 'GET_STUFF';
export const GET_VIEW_STUFF = 'GET_VIEW_STUFF';
export const GET_VALID_STUFF = 'GET_VALID_STUFF';
export const GET_SALARY_PERIOD_TYPE_LIST = 'GET_SALARY_PERIOD_TYPE_LIST';
export const GET_SELL_PART_SALARY_TYPE_LIST = 'GET_SELL_PART_SALARY_TYPE_LIST';
export const GET_REPAIR_PART_SALARY_TYPE = 'GET_REPAIR_PART_SALARY_TYPE';

export const EDIT_STUFF = 'EDIT_STUFF';
export const DELETE_STUFF = 'DELETE_STUFF';
export const INSERT_STUFF = 'INSERT_STUFF';


// Store

export interface StateStuff {
    stuff: User[];
    viewStuff: User;
    validStuff: object;
    stuffPageCount: number;
    stuffPageCurrent: number;
    salaryPeriodTypeList: object;
    sellPartSalaryTypeList: object;
    repairPartSalaryType: object;
}

// Models

export interface User {
    first_name: string;
    middle_name?: string;
    last_name: string;
}