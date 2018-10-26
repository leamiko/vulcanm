import CashProvider from '../../api/providers/cash';

import { ActionTree } from 'vuex';
import { StateCash } from './types';

export const actions: ActionTree<StateCash, any> = {

    getCashList({ commit }, page) {
        CashProvider.getCashList(page)
            .then( res => {
                commit('GET_CASH_LIST', { item: res.data, pageCount: res.pageCount } );
            })
            .catch( err => console.log(err));
    },

    getCashOperation({ commit }, item) {
        CashProvider.getCashOperation(1, item)
            .then( res => {
                commit('GET_CASH_VIEW', { 
                    item: res.data, 
                    pageCount: res.pageCount, 
                    countIn: res.countIn, 
                    countOut: res.countOut, 
                    totalIn: res.totalIn, 
                    totalOut: res.totalOut 
                });
            })
            .catch( err => console.log(err));
    },

    changeCashItem({ commit }, item) {
        commit('BTN_LOADER', true );
        CashProvider.changeCashItem(item)
            .then( res => {
                commit('UPDATE_CASH_ITEM', { item: res.data });
                commit('CASH_VALIDATE', { item: {} });
                commit('PUSH_CALL_SUCCESS', { title: 'Касса изменена', item: ''});
                commit('BTN_LOADER', false );
            })
            .catch( err => {
                commit('CASH_VALIDATE', { item: err.response.data });
                commit('PUSH_CALL_ERROR', { title: 'Произошла ошибка', item: ''});
                commit('BTN_LOADER', false );
            });
    },

    deleteCashItem({ commit }, id) {
        commit('BTN_LOADER', true );
        CashProvider.deleteCashItem(id)
            .then( res => {
                commit('DELETE_CASH_ITEM', { item: res.data });
                commit('PUSH_CALL_SUCCESS', { title: 'Касса удалена', item: ''});
                commit('BTN_LOADER', false );
            })
            .catch( err => {
                commit('PUSH_CALL_ERROR', { title: 'Произошла ошибка', item: ''});
                commit('BTN_LOADER', false );
            });
    },

    clickDetail({commit}, item) {
      commit('CLICK_DETAIL', item);  
    },

    clearCashOperation({commit}) {
        commit('CLEAR_CASH')
    }
};