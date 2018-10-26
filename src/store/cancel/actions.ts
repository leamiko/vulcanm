import CancelProvider from '../../api/providers/cancel';
import { ActionTree } from 'vuex';
import { StateCancel } from './types';

export const actions: ActionTree<StateCancel, any> = {

    getCancelList({ commit }, page) {
        CancelProvider.getCancelList(page)
            .then((res) => {
                commit('GET_CANCEL', { item: res.data, pageCount: res.pageCount });
            })
            .catch( err => console.log(err));  
    },

    getCancelView({ commit }, id) {
        CancelProvider.getViewCancel(id)
            .then((res) => {
                commit('GET_VIEW_CANCEL', { item: res.data });
            })
            .catch( err => console.log(err));  
    },

    sendCancel({ commit }, item) {
        commit('BTN_LOADER', true);
        CancelProvider.sendCancel(item)
            .then((res) => {
                commit('BTN_LOADER', false);
                commit('CANCEL_VALIDATION', [] );
                commit('PUSH_CALL_SUCCESS', { title: 'Списание прошло успешно', item: ''});
            })
            .catch( err => {
                commit('CANCEL_VALIDATION', err.response.data );
                commit('BTN_LOADER', false);
                commit('PUSH_CALL_ERROR', { title: 'Произошла ошибка', item: ''});
            });  
    },

    sendRevertPart({ commit }, item) {
        commit('BTN_LOADER', true);
        CancelProvider.sendRevertPart(item)
            .then((res) => {
                commit('CANCEL_REVERT_PART', { item: res.data });
                commit('BTN_LOADER', false);
                commit('CANCEL_VALIDATION', [] );
                commit('PUSH_CALL_SUCCESS', { title: 'Возврат товара прошел успешно', item: ''});
            })
            .catch( err => {
                commit('CANCEL_VALIDATION', err.response.data );
                commit('BTN_LOADER', false);
                commit('PUSH_CALL_ERROR', { title: 'Произошла ошибка', item: ''});
            });  
    },

    sendRevert({ commit }, item) {
        commit('BTN_LOADER', true);
        CancelProvider.sendRevert(item)
            .then((res) => {
                commit('CANCEL_REVERT_PART', { item: res.data });
                commit('BTN_LOADER', false);
                commit('CANCEL_VALIDATION', [] );
                commit('PUSH_CALL_SUCCESS', { title: 'Списание отменено', item: ''});
            })
            .catch( err => {
                commit('CANCEL_VALIDATION', err.response.data );
                commit('BTN_LOADER', false);
                commit('PUSH_CALL_ERROR', { title: 'Произошла ошибка', item: ''});
            });  
    }
};