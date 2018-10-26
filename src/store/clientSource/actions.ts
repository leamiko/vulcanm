import ClientSourceProvider from '../../api/providers/client-source';

import { ActionTree } from 'vuex';
import { StateClientSource } from './types';

export const actions: ActionTree<StateClientSource, any> = {

    getClientSourceList({ commit }, page) {
        ClientSourceProvider.getClientSourceList(page)
            .then( res => {
                commit('GET_CLIENT_SOURCE', { item: res.data, pageCount: res.pageCount });
            })
            .catch( err => console.log(err));
    },

    sendClientSource( { commit }, item) {
        commit('BTN_LOADER', true);
        ClientSourceProvider.sendClientSource(item)
            .then( res => {
                commit('ADD_CLIENT_SOURCE', { item: res.data });
                commit('GET_VALID_CLIENT_SOURCE', { valid: {} });
                commit('PUSH_CALL_SUCCESS', { title: 'Успешно добавлено', item: item.name });
                commit('BTN_LOADER', false);
            })
            .catch( err => {
                commit('GET_VALID_CLIENT_SOURCE', { valid: err.response.data });
                commit('PUSH_CALL_ERROR', { title: 'Произошла ошибка', item: ''});
                commit('BTN_LOADER', false);
            });
    },

    changeClientSource( { commit }, item) {
        commit('BTN_LOADER', true);
        ClientSourceProvider.changeClientSource(item)
            .then( res => {
                commit('EDIT_CLIENT_SOURCE', { item: res.data });
                commit('GET_VALID_CLIENT_SOURCE', { valid: {} });
                commit('PUSH_CALL_SUCCESS', { title: 'Успешно изменено ', item: item.name });
                commit('BTN_LOADER', false);
            })
            .catch( err => {
                commit('GET_VALID_CLIENT_SOURCE', { valid: err.response.data });
                commit('PUSH_CALL_ERROR', { title: 'Произошла ошибка', item: ''});
                commit('BTN_LOADER', false);
            });
    },

    deleteClientSource( { commit }, id) {
        ClientSourceProvider.deleteClientSource(id)
            .then( res => {
                commit('DELETE_CLIENT_SOURCE', { item: res.data });
                commit('PUSH_CALL_SUCCESS', { title: 'Успешно удалено ', item: '' });
            })
            .catch( err => {
                commit('PUSH_CALL_ERROR', { title: 'Произошла ошибка', item: ''});
            });
    }
};