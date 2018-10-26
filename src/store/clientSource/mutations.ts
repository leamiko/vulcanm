import { MutationTree } from 'vuex';
import {
    GET_CLIENT_SOURCE,
    GET_VALID_CLIENT_SOURCE,
    EDIT_CLIENT_SOURCE,
    ADD_CLIENT_SOURCE,
    DELETE_CLIENT_SOURCE,
    StateClientSource
} from './types';

export const mutations: MutationTree<StateClientSource> = {

    [GET_CLIENT_SOURCE](state, { item, pageCount }) {
        state.clientSource = item;
        state.clientSourcePageCount = pageCount;
    },

    [GET_VALID_CLIENT_SOURCE](state, { valid }) {
        state.clientSourceValid = valid;
    },

    [ADD_CLIENT_SOURCE](state, { item }) {
        state.clientSource.push(item);
    },

    [EDIT_CLIENT_SOURCE](state, { item }) {
        const index = state.clientSource.findIndex(i => i['id'] === item.id);
        state.clientSource.splice(index, 1);
        state.clientSource.splice(index, 0, item);
    },

    [DELETE_CLIENT_SOURCE](state, { item }) {
        const index = state.clientSource.findIndex(i => i['id'] === item.id);
        state.clientSource.splice(index, 1);
    }

};