import { MutationTree } from 'vuex';
import {
    PUSH_CALL_ERROR,
    PUSH_CALL_SUCCESS,
    PUSH_CALL_WARNING,
    PUSH_CALL_INFO,
    StatePush } from './types';

export const mutations: MutationTree<StatePush> = {

    [PUSH_CALL_ERROR](state, { title, item }) {
        const newItem: object = {'title': title, 'item': item };
        state.error = newItem;
    },
    [PUSH_CALL_SUCCESS](state, { title, item }) {
        const newItem: object = {'title': title, 'item': item };
        state.success = newItem;

    },
    [PUSH_CALL_WARNING](state, { title, item }) {
        const newItem: object = {'title': title, 'item': item };
        state.warning = newItem;

    },
    [PUSH_CALL_INFO](state, { title, item }) {
        const newItem: object = {'title': title, 'item': item };
        state.info = newItem;
    }
};