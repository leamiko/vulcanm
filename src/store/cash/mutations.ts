import { MutationTree } from 'vuex';
import {
    GET_CASH_LIST,
    GET_CASH_VIEW,
    UPDATE_CASH_ITEM,
    DELETE_CASH_ITEM,
    CASH_VALIDATE,
    CLICK_DETAIL,
    CLEAR_CASH,
    StateCash } from './types';


export const mutations: MutationTree<StateCash> = {

    [GET_CASH_LIST](state, { item, pageCount }) {
        state.cashList = item;
        state.cashListPageCount = pageCount;
    },

    [GET_CASH_VIEW](state, { item, pageCount, countIn, countOut, totalIn, totalOut }) {
        state.cashView = item;
        state.cashOperationPageCount = pageCount;
        state.cashOperationCountIn = countIn;
        state.cashOperationCountOut = countOut;
        state.cashOperationTotalIn = totalIn;
        state.cashOperationTotalOut = totalOut;
    },

    [UPDATE_CASH_ITEM](state, { item }) {
        const index = state.cashList.findIndex( i => i['id'] === item.id);
        state.cashList.splice(index, 1);
        state.cashList.splice(index, 0, item);
    },

    [DELETE_CASH_ITEM](state, { item }) {
        const index = state.cashList.findIndex( i => i['id'] === item.id);
        state.cashList.splice(index, 1);
    },

    [CASH_VALIDATE](state, { item }) {
        state.cashValidate = item;
    },

    [CLICK_DETAIL](state, item) {
        state.cashViewDetail = item;
    },

    [CLEAR_CASH](state) {
        state.cashView = null;
        state.cashOperationPageCount = null;
        state.cashOperationCountIn = null;
        state.cashOperationCountOut = null;
        state.cashOperationTotalIn = null;
        state.cashOperationTotalOut = null;
    }

};
