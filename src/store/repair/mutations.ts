import { MutationTree } from 'vuex';
import {
    GET_REPAIR,
    GET_REPAIR_PAGE,
    GET_REPAIR_VIEW,
    StateRepair } from './types';

export const mutations: MutationTree<StateRepair> = {

    [GET_REPAIR](state, { item, pageCount, pageCurrent }) {
        state.repair = item;
        state.pageCountRepair = pageCount;
        state.pageCurrentRepair = pageCurrent;
    },

    [GET_REPAIR_PAGE](state, { item, pageCount, pageCurrent }) {
        state.repair = state.repair.concat(item);
        state.pageCountRepair = pageCount;
        state.pageCurrentRepair = pageCurrent;
    }

};