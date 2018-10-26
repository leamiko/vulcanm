import { MutationTree } from 'vuex';
import {
    GET_POSTING,
    GET_PAGE_POSTING,
    GET_POSTING_VIEW,
    POSTING_VALIDATION,
    SEND_POSTING_ITEM,
    CHANGE_POSTING_PART,
    DELETE_POSTING_ITEM,
    DELETE_POSTING_PART_ITEM,
    StatePosting } from './types';

export const mutations: MutationTree<StatePosting> = {
    [GET_POSTING](state, { item, pageCurrent, pageCount }) {
        state.posting = item;
        state.postingPageCurrent = pageCurrent;
        state.postingPageCount = pageCount;
    },

    [GET_POSTING_VIEW](state, { item }) {
        state.postingView = item;
        state.postingNewItemList = item.parts;
    },

    [POSTING_VALIDATION](state, item) {
        state.postingValid = item;
    },

    [SEND_POSTING_ITEM](state, item) {
        state.postingNewItemList.push(item);
    },

    [CHANGE_POSTING_PART](state, item) {
        const index = state.postingNewItemList.findIndex(i => i['id'] === item.id);
        state.postingNewItemList.splice(index, 1);
        state.postingNewItemList.splice(index, 0, item);
    },

    [DELETE_POSTING_ITEM](state, item) {
        const index = state.postingNewItemList.findIndex(i => i['id'] === item.id);
        state.postingNewItemList.splice(index, 1);
    },

    [DELETE_POSTING_PART_ITEM](state, item) {
        const index = state.postingNewItemList.findIndex(i => i['part_id'] === item.id);
        state.postingNewItemList.splice(index, 1);
    }
};