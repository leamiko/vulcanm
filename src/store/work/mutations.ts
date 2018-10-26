import { MutationTree } from 'vuex';
import {
    GET_WORK,
    StateWork } from './types';

export const mutations: MutationTree<StateWork> = {
    [GET_WORK](state, { item, pageCurrent, pageCount }) {
        state.work = item;
        state.workPageCurrent = pageCurrent;
        state.workPageCount = pageCount;
    },

    // [GET_VIEW_TRANSFER](state, { item }) {
    //     state.viewTransfer = item;
    // },

    // [GET_PAGE_TRANSFER](state, { item, pageCurrent, pageCount }) {
    //     state.transfer = state.transfer.concat(item);
    //     state.transferPageCurrent = pageCurrent;
    //     state.transferPageCount = pageCount;
    // },

    // [TRANSFER_VALIDATION](state, item) {
    //     state.transferValid = item;
    // }
};