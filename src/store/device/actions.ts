import DeviceProvider from '../../api/providers/device';

import { ActionTree } from 'vuex';
import { StateDevice } from './types';

export const actions: ActionTree<StateDevice, any> = {

    getDeviceTypeList({ commit }) {
        DeviceProvider.getDeviceTypeList()
            .then( res => {
                commit('GET_DEVICE_TYPE', { item: res.data });
            })
            .catch( err => console.log(err));
    },

    getDeviceVendorList({ commit }, id) {
        DeviceProvider.getDeviceVendorList(id)
            .then( res => {
                commit('GET_DEVICE_VENDOR', { item: res.data });
            })
            .catch( err => console.log(err));
    },

    getDeviceModelList({ commit }, id) {
        DeviceProvider.getDeviceList(id)
            .then( res => {
                commit('GET_DEVICE_MODEL', { item: res.data });
            })
            .catch( err => console.log(err));
    },

    sendDeviceType({ commit }, item) {
        commit('BTN_LOADER', true);
        DeviceProvider.sendDeviceType(item)
            .then( res => {
                commit('ADD_DEVICE_TYPE', { item: res.data });
                commit('BTN_LOADER', false);
                commit('PUSH_CALL_SUCCESS', { title: 'Успешно добавлено', item: '' });
                commit('DEVICE_VALIDATION', {});
            })
            .catch( err => {
                commit('BTN_LOADER', false);
                commit('PUSH_CALL_ERROR', { title: 'Произошла ошибка', item: ''});
            });
    },

    sendDeviceVendor({ commit }, item) {
        commit('BTN_LOADER', true);
        DeviceProvider.sendDeviceVendor(item)
            .then( res => {
                commit('ADD_DEVICE_VENDOR', { item: res.data });
                commit('BTN_LOADER', false);
                commit('PUSH_CALL_SUCCESS', { title: 'Успешно добавлено', item: '' });
                commit('DEVICE_VALIDATION', {});
            })
            .catch( err => {
                commit('BTN_LOADER', false);
                commit('PUSH_CALL_ERROR', { title: 'Произошла ошибка', item: ''});
            });
    },

    sendDeviceModel({ commit }, item) {
        commit('BTN_LOADER', true);
        DeviceProvider.sendDeviceModel(item)
            .then( res => {
                commit('ADD_DEVICE_MODEL', { item: res.data });
                commit('BTN_LOADER', false);
                commit('PUSH_CALL_SUCCESS', { title: 'Успешно добавлено', item: '' });
                commit('DEVICE_VALIDATION', {});
            })
            .catch( err => {
                commit('BTN_LOADER', false);
                commit('PUSH_CALL_ERROR', { title: 'Произошла ошибка', item: ''});
            });
    },

    changeDeviceType({ commit }, item) {
        commit('BTN_LOADER', true);
        DeviceProvider.changeDeviceType(item)
            .then( res => {
                commit('EDIT_DEVICE_TYPE', { item: res.data });
                commit('BTN_LOADER', false);
                commit('PUSH_CALL_SUCCESS', { title: 'Успешно изменено', item: '' });
                commit('DEVICE_VALIDATION', {});
            })
            .catch( err => {
                commit('BTN_LOADER', false);
                commit('PUSH_CALL_ERROR', { title: 'Произошла ошибка', item: ''});
            });
    },

    changeDeviceVendor({ commit }, item) {
        commit('BTN_LOADER', true);
        DeviceProvider.changeDeviceVendor(item)
            .then( res => {
                commit('EDIT_DEVICE_VENDOR', { item: res.data });
                commit('BTN_LOADER', false);
                commit('PUSH_CALL_SUCCESS', { title: 'Успешно изменено', item: '' });
                commit('DEVICE_VALIDATION', {});
            })
            .catch( err => {
                commit('BTN_LOADER', false);
                commit('PUSH_CALL_ERROR', { title: 'Произошла ошибка', item: ''});
            });
    },

    changeDeviceModel({ commit }, item) {
        commit('BTN_LOADER', true);
        DeviceProvider.changeDeviceModel(item)
            .then( res => {
                commit('EDIT_DEVICE_MODEL', { item: res.data });
                commit('BTN_LOADER', false);
                commit('PUSH_CALL_SUCCESS', { title: 'Успешно изменено', item: '' });
                commit('DEVICE_VALIDATION', {});
            })
            .catch( err => {
                commit('BTN_LOADER', false);
                commit('PUSH_CALL_ERROR', { title: 'Произошла ошибка', item: ''});
            });
    },

    deleteDeviceType({ commit }, item) {
        DeviceProvider.deleteDeviceType(item)
            .then( res => {
                commit('DELETE_DEVICE_TYPE', { item: res.data });
                commit('PUSH_CALL_SUCCESS', { title: 'Успешно удалено', item: '' });
            })
            .catch( err => {
                commit('PUSH_CALL_ERROR', { title: 'Произошла ошибка', item: ''});
            });
    },

    deleteDeviceVendor({ commit }, item) {
        DeviceProvider.deleteDeviceVendor(item)
            .then( res => {
                commit('DELETE_DEVICE_VENDOR', { item: res.data });
                commit('PUSH_CALL_SUCCESS', { title: 'Успешно удалено', item: '' });
            })
            .catch( err => {
                commit('PUSH_CALL_ERROR', { title: 'Произошла ошибка', item: ''});
            });
    },

    deleteDeviceModel({ commit }, id) {
        DeviceProvider.deleteDeviceModel(id)
            .then( res => {
                commit('DELETE_DEVICE_MODEL', { item: res.data });
                commit('PUSH_CALL_SUCCESS', { title: 'Успешно удалено', item: '' });
            })
            .catch( err => {
                commit('PUSH_CALL_ERROR', { title: 'Произошла ошибка', item: ''});
            });
    },

    searchDeviceList({commit }, item ) {
        commit('SEARCH_DEVICE', { type: item.type, vendor: item.vendor, model: item.model });
    }
};