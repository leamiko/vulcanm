import { GetterTree } from 'vuex';
import { StateAuth } from './types';

export const getters: GetterTree<StateAuth, any> = {
    auth: state => state.auth,
    authError: state => state.authError
};