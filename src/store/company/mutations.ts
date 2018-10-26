import { MutationTree } from 'vuex';
import {
    GET_COMPANY,
    EDIT_COMPANY,
    StateCompany } from './types';

export const mutations: MutationTree<StateCompany> = {

    [GET_COMPANY](state, { item }) {
        state.company = item;
    },

    [EDIT_COMPANY](state, item) {
        state.company = item;
    },
};