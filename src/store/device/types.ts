
export const GET_DEVICE_TYPE = 'GET_DEVICE_TYPE';
export const GET_DEVICE_VENDOR = 'GET_DEVICE_VENDOR';
export const GET_DEVICE_MODEL = 'GET_DEVICE_MODEL';

export const ADD_DEVICE_TYPE = 'ADD_DEVICE_TYPE';
export const ADD_DEVICE_VENDOR = 'ADD_DEVICE_VENDOR';
export const ADD_DEVICE_MODEL = 'ADD_DEVICE_MODEL';

export const EDIT_DEVICE_TYPE = 'EDIT_DEVICE_TYPE';
export const EDIT_DEVICE_VENDOR = 'EDIT_DEVICE_VENDOR';
export const EDIT_DEVICE_MODEL = 'EDIT_DEVICE_MODEL';

export const DELETE_DEVICE_TYPE = 'DELETE_DEVICE_TYPE';
export const DELETE_DEVICE_VENDOR = 'DELETE_DEVICE_VENDOR';
export const DELETE_DEVICE_MODEL = 'DELETE_DEVICE_MODEL';

export const SEARCH_DEVICE = 'SEARCH_DEVICE';

export const DEVICE_VALIDATION = 'DEVICE_VALIDATION';

// Store

export interface StateDevice {
    deviceValid: {};    

    deviceType: object;
    deviceVendor: object;
    deviceModel: object;

    deviceTypeList: object[];
    deviceVendorList: object[];
    deviceModelList: object[];

    searchTypeList: object[];
    searchVendorList: object[];
    searchModelList: object[];
}

// Models

export interface Device {

}