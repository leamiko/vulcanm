import { MutationTree } from 'vuex';
import {
    AUTH_IN,
    AUTH_OUT,
    AUTH_ERROR,
    StateAuth} from './types';

export const mutations: MutationTree<StateAuth> = {

    [AUTH_IN](state, { saveUser, auth, item }) {
        if (saveUser) {
            localStorage.setItem('access', item.access_token);
            localStorage.setItem('refresh', item.refresh_token);
            localStorage.setItem('expires_in', item.expiration_in);
        } else {
            sessionStorage.setItem('access', item.access_token);
            sessionStorage.setItem('refresh', item.refresh_token);
            sessionStorage.setItem('expires_in', item.expiration_in);
        }
        state.auth = auth;
    },

    [AUTH_ERROR](state, { item }) {
        state.authError = item;
    },

    [AUTH_OUT](state, item) {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        localStorage.removeItem('expires_in');
        sessionStorage.removeItem('access');
        sessionStorage.removeItem('refresh');
        sessionStorage.removeItem('expires_in');
        state.auth = item;
    }

};