import UserStatusProvider from '../../api/providers/user-status';

import { ActionTree } from 'vuex';
import { StateUserStatus } from './types';

export const actions: ActionTree<StateUserStatus, any> = {

    getUserStatusList({ commit }, page) {
        UserStatusProvider.getUserStatusList(page)
            .then(res => commit('GET_USER_STATUS', { 
                item: res.data, 
                pageCount: res.pageCount 
            }))
            .catch(err => console.log(err));
    },

    sendUserStatus( { commit }, item) {
        commit('BTN_LOADER', true);
        UserStatusProvider.sendUserStatus(item)
            .then( res => {
                commit('INSERT_USER_STATUS', { item: res.data });
                commit('GET_VALID_USER_STATUS', { item: [] });
                commit('PUSH_CALL_SUCCESS', { title: 'Успешно добавлено', item: ''});
                commit('BTN_LOADER', false);
            })
            .catch( err => {
                commit('GET_VALID_USER_STATUS', { item: err.response.data });
                commit('PUSH_CALL_ERROR', { title: 'Произошла ошибка', item: ''});
                commit('BTN_LOADER', false);
            });
    },

    changeUserStatus( { commit }, item) {
        commit('BTN_LOADER', true);
        UserStatusProvider.changeUserStatus(item)
            .then( res => {
                commit('EDIT_USER_STATUS', { item: res.data });
                commit('PUSH_CALL_SUCCESS', { title: 'Успешно изменено', item: ''});
                commit('GET_VALID_USER_STATUS', { item: [] });
                commit('BTN_LOADER', false);
            })
            .catch( err => {
                commit('GET_VALID_USER_STATUS', { item: err.response.data });
                commit('PUSH_CALL_ERROR', { title: 'Произошла ошибка', item: ''});
                commit('BTN_LOADER', false);
            });
    },

    deleteUserStatus( { commit }, id) {
        UserStatusProvider.deleteUserStatus(id)
            .then( res => {
                commit('DELETE_USER_STATUS', { item: res.data });
                commit('PUSH_CALL_SUCCESS', { title: 'Успешно удалено ', item: '' });
            })
            .catch( err => {
                commit('PUSH_CALL_ERROR', { title: 'Произошла ошибка', item: ''});
            });
    },

    editRepairsSetting({ commit }, item) {
        commit('EDIT_REPAIRS_SETTING', item);
    }

};