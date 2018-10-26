import { GetterTree } from 'vuex';
import { StateDevice } from './types';

export const getters: GetterTree<StateDevice, any> = {
    deviceTypeList: state => state.deviceTypeList,
    deviceVendorList: state => state.deviceVendorList,
    deviceModelList: state => state.deviceModelList,

    searchTypeList: state => state.searchTypeList,
    searchVendorList: state => state.searchVendorList,
    searchModelList: state => state.searchModelList,

    deviceType: state => state.deviceType,
    deviceVendor: state => state.deviceVendor,
    deviceModel: state => state.deviceModel,

    deviceValid: state => state.deviceValid
    
};