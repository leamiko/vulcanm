import { MutationTree } from 'vuex';
import {
    GET_BREADCRUMB,
    GET_ACTION_BTN,
    StateBreadcrumb } from './types';

export const mutations: MutationTree<StateBreadcrumb> = {

    [GET_BREADCRUMB](state, item) {
        state.breadcrumb = item;
    },

    [GET_ACTION_BTN](state, item) {
        state.actionBtn = item;
    }

};