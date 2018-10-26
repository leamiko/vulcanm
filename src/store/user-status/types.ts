
export const EDIT_REPAIRS_SETTING = 'EDIT_REPAIRS_SETTING';

export const GET_USER_STATUS = 'GET_USER_STATUS';
export const GET_VALID_USER_STATUS = 'GET_VALID_USER_STATUS';
export const EDIT_USER_STATUS = 'EDIT_USER_STATUS';
export const DELETE_USER_STATUS = 'DELETE_USER_STATUS';
export const INSERT_USER_STATUS = 'INSERT_USER_STATUS';

// Store

export interface StateUserStatus {
    userStatus: UserStatus[];
    userStatusPageCount: number;
    repairStatus: UserStatus[];
    repairsSetting: RepairsSetting[];
    validStatus: object[];
}

// Models

export interface UserStatus {

}
export interface RepairsSetting {

}
