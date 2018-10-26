import UserProvider from '../../api/providers/user';

import { ActionTree } from 'vuex';
import { StateUser, CLEAR_USER } from './types';

export const actions: ActionTree<StateUser, any> = {

    getUserMe({ commit }, page) {
        UserProvider.getUserMe(page)
            .then( res => commit('GET_USER_ME', res.data))
            .catch( err => console.log(err));
    },

    addRepairActiveColumn({ commit }, item) {
        commit('ADD_REPAIR_ACTIVE_COLUMN', item);
    },

    clearUser({commit}) {
        commit(CLEAR_USER);
    }
};