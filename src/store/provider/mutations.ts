import { MutationTree } from 'vuex';
import {
    GET_PROVIDER,
    GET_VIEW_PROVIDER,
    GET_VALID_PROVIDER,
    EDIT_PROVIDER,
    INSERT_PROVIDER,
    DELETE_PROVIDER,
    StateProvider
} from './types';

export const mutations: MutationTree<StateProvider> = {

    [GET_PROVIDER](state, { item, pageCount, pageCurrent }) {
        state.provider = item;
        state.providerPageCount = pageCount;
        state.providerPageCurrent = pageCurrent;
    },

    [GET_VIEW_PROVIDER](state, { item }) {
        state.viewProvider = item;
    },

    [GET_VALID_PROVIDER](state, { valid }) {
        state.validProvider = valid;
    },

    [INSERT_PROVIDER](state, { item }) {
        state.provider.push(item);
    },

    [EDIT_PROVIDER](state, { item }) {
        let index = state.provider.indexOf(
            state.provider.find( i => i['id'] === item.id)
        );
        state.provider.splice(index, 1);
        state.provider.splice(index, 0, item);
    },

    [DELETE_PROVIDER](state, { item }) {
        let index = state.provider.indexOf(
            state.provider.find( i => i['id'] === item.id)
        );
        state.provider.splice(index, 1);
    }

};