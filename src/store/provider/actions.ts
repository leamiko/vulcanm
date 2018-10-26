import ProviderProvider from '../../api/providers/provider';

import { ActionTree } from 'vuex';
import { StateProvider } from './types';

export const actions: ActionTree<StateProvider, any> = {

    getProviderList({ commit }, page) {
        ProviderProvider.getProviderList(page)
            .then( res => commit('GET_PROVIDER', { 
                item: res.data, 
                pageCount: res.pageCount 
            }))
            .catch( err => console.log(err));
    },

    getViewProvider({ commit }, id) {
        ProviderProvider.getViewProvider(id)
            .then( res => commit('GET_VIEW_PROVIDER', { item: res.data }))
            .catch( err => console.log(err));
    },

    sendProvider({ commit }, item) {
        commit('BTN_LOADER', true);
        ProviderProvider.sendProvider(item)
            .then( res => {
                commit('INSERT_PROVIDER', { item: res.data });
                commit('GET_VALID_PROVIDER', { valid: {} });
                commit('PUSH_CALL_SUCCESS', { title: item.name + ' успешно добавлен', item: ''});
                commit('BTN_LOADER', false);
            })
            .catch( err => {
                commit('GET_VALID_PROVIDER', { valid: err.response.data });
                commit('PUSH_CALL_ERROR', { title: 'Произошла ошибка', item: ''});
                commit('BTN_LOADER', false);
            });
    },

    changeProvider({ commit }, item) {
        commit('BTN_LOADER', true);
        ProviderProvider.changeProvider(item.id, item)
            .then( res => {
                commit('EDIT_PROVIDER', { item: res.data });
                commit('GET_VALID_PROVIDER', { valid: {} });
                commit('PUSH_CALL_SUCCESS', { title: item.name + ' успешно изнемен', item: ''});
                commit('BTN_LOADER', false);
            })
            .catch( err => {
                commit('GET_VALID_PROVIDER', { valid: err.response.data });
                commit('PUSH_CALL_ERROR', { title: 'Произошла ошибка', item: ''});
                commit('BTN_LOADER', false);
            });
    },

    deleteProvider({ commit }, id) {
        commit('BTN_LOADER', true);
        ProviderProvider.deleteProvider(id)
            .then((res) => {
                commit('DELETE_PROVIDER', { item: res.data });
                commit('PUSH_CALL_ERROR', { title: 'Успешно удалено' });
            })
            .catch((err) => {
                commit('PUSH_CALL_ERROR', { title: 'Произошла ошибка', item: ''});
            });
    }
};