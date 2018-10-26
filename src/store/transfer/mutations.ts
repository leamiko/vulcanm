import { MutationTree } from 'vuex';
import {
    GET_TRANSFER,
    GET_VIEW_TRANSFER,
    GET_PAGE_TRANSFER,
    GET_VALID_TRANSFER,
    StateTransfer } from './types';

export const mutations: MutationTree<StateTransfer> = {
    [GET_TRANSFER](state, { item, pageCount }) {
        state.transfer = item;
        state.transferPageCount = pageCount;
    },

    [GET_VIEW_TRANSFER](state, { item }) {
        state.viewTransfer = item;
    },

    [GET_PAGE_TRANSFER](state, { item, pageCurrent, pageCount }) {
        state.transfer = state.transfer.concat(item);
        state.transferPageCurrent = pageCurrent;
        state.transferPageCount = pageCount;
    },

    [GET_VALID_TRANSFER](state, item) {
        state.transferValid = item;
    }
};