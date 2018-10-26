import axios from 'axios';
import {ActionTree} from 'vuex';
import {
    GET_BREADCRUMB,
    GET_ACTION_BTN,
    StateBreadcrumb,
} from './types';

export const actions: ActionTree<StateBreadcrumb, any> = {
    
    addBreadcrumb({commit}, item) {
        commit('GET_BREADCRUMB', item);
    },
    
    addActionBtn({commit}, item) {
        commit('GET_ACTION_BTN', item);
    },
    
    resetBreadcrumb({commit}) {
        commit('GET_BREADCRUMB', []);
        commit('GET_ACTION_BTN', []);
    },
};