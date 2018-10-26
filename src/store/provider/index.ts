import { state } from './state';
import { getters } from './getters';
import { mutations } from './mutations';
import { actions } from './actions';


export const provider = {
    state,
    getters,
    mutations,
    actions
};