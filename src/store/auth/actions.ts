import AuthProvider from '../../api/providers/auth';
import { ActionTree } from 'vuex';
import { StateAuth, AUTH_IN, AUTH_ERROR, AUTH_OUT } from './types';
import { CLEAR_USER } from '../user/types';
import { BTN_LOADER } from '../preloader/types';

export const actions: ActionTree<StateAuth, any> = {

    signIn({ commit, dispatch }, item) {
        return new Promise((resolve, reject) => {
            commit(BTN_LOADER, true);
            AuthProvider.signIn(item)
                .then( res => {
                    commit(AUTH_IN, { saveUser: item.saveUser, auth: true, item: res.data });
                    commit(AUTH_ERROR, { item: {} });
                    commit(BTN_LOADER, false);
                    dispatch('getUserMe');
                    resolve();
                })
                .catch( err => {
                    commit(AUTH_ERROR, { item: err.response.data });
                    commit(BTN_LOADER, false);
                    reject();
                });
        });
    },

    signOut({ commit, dispatch }, item) {
        commit(AUTH_OUT, item);
        dispatch('clearUser');
    }
};