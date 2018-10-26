import { MutationTree } from 'vuex';
import {
    GET_CASH_TYPES,
    GET_VALID_CASH_TYPES,
    ADD_CASH_TYPES,
    EDIT_CASH_TYPES,
    DELETE_CASH_TYPES,
    StateCashTypes } from './types';


export const mutations: MutationTree<StateCashTypes> = {

    [GET_CASH_TYPES](state, { item, pageCount }) {
        state.cashTypeUser = item;
        state.cashTypePageCount = pageCount;
    },

    [GET_VALID_CASH_TYPES](state, { valid }) {
        state.cashTypeValid = valid;
    },

    [ADD_CASH_TYPES](state, { item }) {
        state.cashTypeUser.push(item);
    },

    [EDIT_CASH_TYPES](state, { item }) {
        const index = state.cashTypeUser.findIndex( i => i['id'] === item.id );
        state.cashTypeUser.splice(index, 1);
        state.cashTypeUser.splice(index, 0, item);
    },

    [DELETE_CASH_TYPES](state, { item }) {
        const index = state.cashTypeUser.findIndex( i => i['id'] === item.id );
        state.cashTypeUser.splice(index, 1);
    }
};
