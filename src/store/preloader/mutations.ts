import { MutationTree } from 'vuex';
import {
    PRELOADER_ACTIVE,
    BTN_LOADER,
    StatePreloader } from './types';

export const mutations: MutationTree<StatePreloader> = {

    [PRELOADER_ACTIVE](state, active) {
        state.preloader = active;
    },

    [BTN_LOADER](state, active) {
        state.btnloader = active;
    }
};