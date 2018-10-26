import { MutationTree } from 'vuex';
import {
    GET_LICENSE_LIST,
    StateLicenses } from './types';

export const mutations: MutationTree<StateLicenses> = {

    [GET_LICENSE_LIST](state, { item, pageCount }) {
        state.licensesList = item;
        state.licensesListPageCount = pageCount;
    }

};