import ClientsProvider from '../../api/providers/clients';

import { ActionTree } from 'vuex';
import { StateClient } from './types';

export const actions: ActionTree<StateClient, any> = {

    getClientList({commit}, page) {
        ClientsProvider.getClientList(page)
            .then( res => {
                commit('GET_CLIENT', { item: res.data, pageCount: res.pageCount });
            })
            .catch( err => console.error(err));
    },

    getViewClient({commit}, id) {
        ClientsProvider.getViewClient(id)
            .then( res => {
                commit('GET_VIEW_CLIENT', { item: res.data });
            })
            .catch( err => console.error(err));
    },

    getInnClient({commit}, inn) {
        ClientsProvider.getInnClient(inn)
            .then( res => {
                commit('GET_CLIENT_INN', { item: res.data });
            })
            .catch( err => console.error(err));
    },


    filterClient({commit}, item) {
        ClientsProvider.filterClient(item.page, item)
            .then( res => {
                commit('GET_CLIENT', { item: res.data, pageCount: res.pageCount  });
            })
            .catch( err => console.error(err));
    },

    sendClientPerson({commit}, item) {
        commit('BTN_LOADER', true);
        ClientsProvider.sendClientPerson(item)
            .then( res => {
                commit('INSERT_CLIENT', { item: res.data });
                commit('GET_VALID_PERSON', { item: {} });
                commit('PUSH_CALL_SUCCESS', { title: 'Успешно добавлено', item: ''});
                commit('BTN_LOADER', false);
            })
            .catch( err => {
                commit('PUSH_CALL_ERROR', { title: 'Произошла ошибка', item: ''});
                commit('GET_VALID_PERSON', { item: err.response.data });
                commit('BTN_LOADER', false);
            });
    },

    sendClientCompany({commit}, item) {
        commit('BTN_LOADER', true);
        ClientsProvider.sendClientCompany(item)
            .then( res => {
                commit('INSERT_CLIENT', { item: res.data });
                commit('GET_VALID_COMPANY', { item: {} });
                commit('PUSH_CALL_SUCCESS', { title: 'Успешно добавлено', item: ''});
                commit('BTN_LOADER', false);
            })
            .catch( err => {
                commit('PUSH_CALL_ERROR', { title: 'Произошла ошибка', item: ''});
                commit('GET_VALID_COMPANY', { item: err.response.data });
                commit('BTN_LOADER', false);
            });
    },

    changeClientPerson({commit}, item) {
        commit('BTN_LOADER', true);
        ClientsProvider.changeClientPerson(item)
            .then( res => {
                commit('EDIT_CLIENT', { item: res.data });
                commit('GET_VALID_PERSON', { item: {} });
                commit('PUSH_CALL_SUCCESS', { title: 'Успешно изменено', item: ''});
                commit('BTN_LOADER', false);
            })
            .catch( err => {
                commit('PUSH_CALL_ERROR', { title: 'Произошла ошибка', item: ''});
                commit('GET_VALID_PERSON', { item: err.response.data });
                commit('BTN_LOADER', false);
            });
    },

    changeClientCompany({commit}, item) {
        commit('BTN_LOADER', true);
        ClientsProvider.changeClientCompany(item)
            .then( res => {
                commit('EDIT_CLIENT', { item: res.data });
                commit('GET_VALID_COMPANY', { item: {} });
                commit('PUSH_CALL_SUCCESS', { title: 'Успешно изменено', item: ''});
                commit('BTN_LOADER', false);
            })
            .catch( err => {
                commit('PUSH_CALL_ERROR', { title: 'Произошла ошибка', item: ''});
                commit('GET_VALID_COMPANY', { item: err.response.data });
                commit('BTN_LOADER', false);
            });
    },

    async deleteClient({commit}, id) {  
        commit('BTN_LOADER', true);      
        try {
            let res = await ClientsProvider.deleteClient(id);
            commit('PUSH_CALL_SUCCESS', { title: 'Успешно удалено', item: ''});
            commit('BTN_LOADER', false);
            return res;
        } catch (err) {
            commit('PUSH_CALL_ERROR', { title: 'Произошла ошибка', item: ''});
            commit('BTN_LOADER', false);
            throw err;
        }
    }
};