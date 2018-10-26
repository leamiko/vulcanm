import StorageProvider from '../../api/providers/storage';

import { ActionTree } from 'vuex';
import { StateStorage} from './types';

export const actions: ActionTree<StateStorage, any> = {

    getStorageList({ commit }, page) {
        StorageProvider.getStorageList(page)
            .then( res => {
                commit('GET_STORAGE', { item: res.data, pageCount: res.pageCount });
                commit('GET_HEAD_PART', { storage: res.data });
            })
            .catch( err => console.log(err));
    },

    getAvailableList({ commit }, page) {
        StorageProvider.getAvailableList(page)
            .then( res => commit('GET_HEAD_PART', { storage: res.data }))
            .catch( err => console.log(err));
    },

    sendStorage({ commit }, item) {
        commit('BTN_LOADER', true);
        StorageProvider.sendStorage(item)
            .then( res => {
                commit('INSERT_STORAGE', { item: res.data });
                commit('PUSH_CALL_SUCCESS', { title: item.name + ' успешно добавлен', item: ''});
                commit('BTN_LOADER', false);
                commit('GET_VALID_STORAGE', { item: {} });
            })
            .catch( err => {
                commit('PUSH_CALL_ERROR', { title: 'Произошла ошибка', item: ''});
                commit('BTN_LOADER', false);
                commit('GET_VALID_STORAGE', { item: err.response.data });

            });
    },

    changeStorage({ commit }, item) {
        commit('BTN_LOADER', true);
        StorageProvider.changeStorage(item.id, item)
            .then( res => {
                commit('EDIT_STORAGE', { item: res.data });
                commit('PUSH_CALL_SUCCESS', { title: item.name + ' успешно изменен', item: ''});
                commit('BTN_LOADER', false);
                commit('GET_VALID_STORAGE', { item: {} });
            })
            .catch( err => {
                commit('PUSH_CALL_ERROR', { title: 'Произошла ошибка', item: ''});
                commit('BTN_LOADER', false);
                commit('GET_VALID_STORAGE', { item: err.response.data });
            });
    },

    deleteStorage({ commit }, id) {
        commit('BTN_LOADER', true);
        StorageProvider.deleteStorage(id)
            .then( res => {
                commit('DELETE_STORAGE', { item: res.data });
                commit('PUSH_CALL_SUCCESS', { title: 'Успешно удалено', item: ''});
                commit('BTN_LOADER', false);
            })
            .catch( err => {
                commit('PUSH_CALL_ERROR', { title: 'Произошла ошибка', item: ''});
                commit('BTN_LOADER', false);
            });
    }
};