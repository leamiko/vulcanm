import TransferProvider from '../../api/providers/transfer';

import { ActionTree } from 'vuex';
import { StateTransfer } from './types';

export const actions: ActionTree<StateTransfer, any> = {

    getTransfer({ commit }, page) {
        TransferProvider.getTransfer(page)
            .then( res => commit('GET_TRANSFER', { 
                item: res.data,
                pageCount: res.pageCount
            }))
            .catch( err => console.log(err));
    },

    getViewTransfer({ commit }, id) {
        TransferProvider.getViewTransfer(id)
            .then( res => commit('GET_VIEW_TRANSFER', { item: res.data }))
            .catch( err => console.log(err));
    },


    sendTransfer({ commit }, item) {
        commit('BTN_LOADER', true);
        TransferProvider.sendTransfer(item)
            .then( res => {
                commit('GET_VIEW_TRANSFER', { item: res.data });
                commit('GET_VALID_TRANSFER', { valid: {} });
                commit('PUSH_CALL_SUCCESS', { title: 'Успешно добавлено', item: ''});
                commit('BTN_LOADER', false);
            })
            .catch( err => {
                commit('GET_VALID_TRANSFER', { item: err.response.data });
                commit('PUSH_CALL_ERROR', { title: 'Произошла ошибка', item: ''});
                commit('BTN_LOADER', false);
            });
    }
    
};