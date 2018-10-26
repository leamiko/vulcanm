import { MutationTree } from 'vuex';
import {
    GET_DEVICE_TYPE,
    GET_DEVICE_VENDOR,
    GET_DEVICE_MODEL,
    ADD_DEVICE_TYPE,
    ADD_DEVICE_VENDOR,
    ADD_DEVICE_MODEL,
    EDIT_DEVICE_TYPE,
    EDIT_DEVICE_VENDOR,
    EDIT_DEVICE_MODEL,
    DELETE_DEVICE_TYPE,
    DELETE_DEVICE_VENDOR,
    DELETE_DEVICE_MODEL,
    SEARCH_DEVICE,
    DEVICE_VALIDATION,
    StateDevice
} from './types';

function formList(elem, list) {
    const l = list;
    let res = [];
    l.forEach(i => res = res.concat(i[elem]));
    return res;
  }

export const mutations: MutationTree<StateDevice> = {

    [GET_DEVICE_TYPE](state, { item }) {
        state.deviceTypeList = item;
        state.deviceVendorList = [];
    },

    [GET_DEVICE_VENDOR](state, { item }) {
        state.deviceVendorList = item;
        state.deviceModelList = [];
    },

    [GET_DEVICE_MODEL](state, { item }) {
        state.deviceModelList = item;
    },

    [SEARCH_DEVICE](state, { type, vendor, model }) {

        function search(array) {
            let result = array;
            if (type.length) {
              const query = type.toLowerCase();
              result = result.filter( type => type.name.toLowerCase().indexOf(query) !== -1);
            } 
            if (vendor.length) {
              const query = vendor.toLowerCase();
              result = result.filter( type => {
                return type.vendors = type.vendors.filter( vendor => vendor.name.toLowerCase().indexOf(query) !== -1 );
              }).filter( vendor => vendor.vendors.length);
            } 
            if (model.length) {
              const query = model.toLowerCase();
              result = result.filter( type => {
                return type.vendors = type.vendors.filter( vendor => {
                  return vendor.devices = vendor.devices.filter( device => device.name.toLowerCase().indexOf(query) !== -1);
                }).filter( dev => dev.devices.length);
              }).filter( vendor => vendor.vendors.length);
            }
            return result;
        }

        const typeList = JSON.parse(JSON.stringify(state.deviceTypeList));
        const result = search(typeList);
        const resVendors = formList('vendors', result);
        const resDevices = formList('devices', resVendors);  

        state.searchTypeList = result;
        state.searchVendorList = resVendors;
        state.searchModelList = resDevices;
    },

    [ADD_DEVICE_TYPE](state, { item }) {
        state.deviceTypeList.push(item);
        state.deviceType = item;
    },

    [ADD_DEVICE_VENDOR](state, { item }) {
        state.deviceTypeList.filter( i => i['id'] === item.type_id)[0]['vendors'].push(item);
        state.deviceVendor = item;
    },

    [ADD_DEVICE_MODEL](state, { item }) {
        state.deviceTypeList.filter( i => {
            return i['vendors'] = i['vendors'].filter( vendor => vendor.id === item.vendor_id );
        }).filter( vendor => vendor['vendors'].length)[0]['vendors'][0].devices.push(item);
        state.deviceModel = item;
    },

    [EDIT_DEVICE_TYPE](state, { item }) {
        const index = state.deviceTypeList.findIndex( i => i['id'] === item.id);
        state.deviceTypeList.splice(index, 1);
        state.deviceTypeList.splice(index, 0, item);
    },

    [EDIT_DEVICE_VENDOR](state, { item }) {
        const typeIndex = state.deviceTypeList.findIndex( i => i['id'] === item.type_id),
              vendorIndex = state.deviceTypeList[typeIndex]['vendors'].findIndex( i => i['id'] === item['id']);          
        state.deviceTypeList[typeIndex]['vendors'].splice(vendorIndex, 1);
        state.deviceTypeList[typeIndex]['vendors'].splice(vendorIndex, 0, item);
    },

    [EDIT_DEVICE_MODEL](state, { item }) {
        const typeList = JSON.parse(JSON.stringify(state.deviceTypeList));
        const list = typeList.filter( i => {
            return i['vendors'] = i['vendors'].filter( vendor => vendor.id === item['vendor_id'] );
        }).filter( vendor => vendor['vendors'].length);
        const typeId = list[0]['id'],
              typeIndex = state.deviceTypeList.findIndex( i => i['id'] === typeId),  
              vendorIndex = state.deviceTypeList[typeIndex]['vendors'].findIndex( i => i['id'] === item['vendor_id']),
              modelIndex = state.deviceTypeList[typeIndex]['vendors'][vendorIndex]['devices'].findIndex( i => i['id'] === item['id']);  

        state.deviceTypeList[typeIndex]['vendors'][vendorIndex]['devices'].splice(modelIndex, 1);
        state.deviceTypeList[typeIndex]['vendors'][vendorIndex]['devices'].splice(modelIndex, 0, item);
    },

    [DELETE_DEVICE_TYPE](state, { item }) {
        const index = state.deviceTypeList.findIndex( i => i['id'] === item.id);
        state.deviceTypeList.splice(index, 1);
    },

    [DELETE_DEVICE_VENDOR](state, { item }) {
        const typeIndex = state.deviceTypeList.findIndex( i => i['id'] === item.type_id),
              vendorIndex = state.deviceTypeList[typeIndex]['vendors'].findIndex( i => i['id'] === item['id']);          
        state.deviceTypeList[typeIndex]['vendors'].splice(vendorIndex, 1);
    },

    [DELETE_DEVICE_MODEL](state, { item }) {
        const typeList = JSON.parse(JSON.stringify(state.deviceTypeList));
        const list = typeList.filter( i => {
            return i['vendors'] = i['vendors'].filter( vendor => vendor.id === item['vendor_id'] );
        }).filter( vendor => vendor['vendors'].length);
        const typeId = list[0]['id'],
              typeIndex = state.deviceTypeList.findIndex( i => i['id'] === typeId),  
              vendorIndex = state.deviceTypeList[typeIndex]['vendors'].findIndex( i => i['id'] === item['vendor_id']),
              modelIndex = state.deviceTypeList[typeIndex]['vendors'][vendorIndex]['devices'].findIndex( i => i['id'] === item['id']);  

        state.deviceTypeList[typeIndex]['vendors'][vendorIndex]['devices'].splice(modelIndex, 1);
    },

    [DEVICE_VALIDATION](state, item) {
        state.deviceValid = item;
    }
};