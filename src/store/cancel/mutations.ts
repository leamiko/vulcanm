import { MutationTree } from 'vuex';
import {
    GET_CANCEL,
    GET_VIEW_CANCEL,
    GET_PAGE_CANCEL,
    CANCEL_REVERT_PART,
    CANCEL_VALIDATION,
    StateCancel } from './types';

export const mutations: MutationTree<StateCancel> = {
    [GET_CANCEL](state, { item, pageCurrent, pageCount }) {
        state.cancel = item;
        state.cancelPageCurrent = pageCurrent;
        state.cancelPageCount = pageCount;
    },

    [GET_VIEW_CANCEL](state, { item }) {
        state.cancelView = item;
    },

    [CANCEL_REVERT_PART](state, { item }) {
        const index: number = state.cancelView['parts'].findIndex(i => i.id === item['cancel_part_id']);
        let amount: number = state.cancelView['parts'][index]['amount'];
        if (amount > item['amount']) {
            amount -= item['amount'];
            state.cancelView['parts'][index]['amount'] = amount;
        } else {
            state.cancelView['parts'].splice(index, 1);
        }
    },

    [CANCEL_VALIDATION](state, item) {
        state.cancelValid = item;
    }
};

// {"cancel_part_id":29,"amount":1}