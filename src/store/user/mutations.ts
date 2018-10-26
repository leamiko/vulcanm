import { MutationTree } from 'vuex';
import {
    GET_USER_ME,
    ADD_REPAIR_ACTIVE_COLUMN,
    CLEAR_USER,
    StateUser } from './types';

export const mutations: MutationTree<StateUser> = {

    [ADD_REPAIR_ACTIVE_COLUMN](state, item) {
        state.repairActiveColumn = item.map( i => i.value );
    },

    [GET_USER_ME](state, item) {
        state.user = item;
    },

    [CLEAR_USER](state) {
        state.user = [];
    }
};