import CashTypeProvider from '../../api/providers/cash-type';

import { ActionTree } from 'vuex';
import { StateCashTypes } from './types';

export const actions: ActionTree<StateCashTypes, any> = {

    getCashTypeList({ commit }, page) {
        CashTypeProvider.getCashTypeList(page)
            .then( res => {
                commit('GET_CASH_TYPES', { item: res.data, pageCount: res.pageCount });
            })
            .catch( err => console.log(err));
    },

    sendCashType({ commit }, item) {
        commit('BTN_LOADER', true );
        CashTypeProvider.sendCashType(item)
            .then( res => {
                commit('ADD_CASH_TYPES', { item: res.data });
                commit('GET_VALID_CASH_TYPES', { valid: {} });
                commit('BTN_LOADER', false);
                commit('PUSH_CALL_SUCCESS', { title: 'Успешно добавлено', item: item.name });
            })
            .catch( err => {
                commit('GET_VALID_CASH_TYPES', { valid: err.response.data });
                commit('BTN_LOADER', false);
                commit('PUSH_CALL_ERROR', { title: 'Произошла ошибка', item: ''});
            });
    },

    changeCashType({ commit }, item) {
        commit('BTN_LOADER', true );
        CashTypeProvider.changeCashType(item)
            .then( res => {
                commit('EDIT_CASH_TYPES', { item: res.data });
                commit('GET_VALID_CASH_TYPES', { valid: {} });
                commit('BTN_LOADER', false);
                commit('PUSH_CALL_SUCCESS', { title: 'Успешно добавлено', item: item.name });
            })
            .catch( err => {
                commit('GET_VALID_CASH_TYPES', { valid: err.response.data });
                commit('BTN_LOADER', false);
                commit('PUSH_CALL_ERROR', { title: 'Произошла ошибка', item: ''});
            });
    },

    deleteCashType({ commit }, id) {
        CashTypeProvider.deleteCashType(id)
            .then( res => {
                commit('DELETE_CASH_TYPES', { item: res.data });
                commit('PUSH_CALL_SUCCESS', { title: 'Успешно удалено', item: '' });
            })
            .catch( err => {
                commit('PUSH_CALL_ERROR', { title: 'Произошла ошибка', item: ''});
            });
    },
};