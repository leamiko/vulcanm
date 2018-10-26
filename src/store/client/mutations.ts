import { MutationTree } from 'vuex';
import {
    GET_CLIENT,
    GET_CLIENT_INN,
    GET_VALID_PERSON,
    GET_VALID_COMPANY,
    GET_VIEW_CLIENT,
    EDIT_CLIENT,
    INSERT_CLIENT,
    StateClient } from './types';

export const mutations: MutationTree<StateClient> = {

    [GET_CLIENT](state, { item, pageCount, pageCurrent}) {
        state.client = item;
        state.pageCount = pageCount;
        state.pageCurrent = pageCurrent;
    },

    [GET_VIEW_CLIENT](state, { item }) {
        state.viewClient = item;
    },

    [GET_VALID_PERSON](state, { item }) {
        state.clientPersonValid = item;
    },

    [GET_VALID_COMPANY](state, { item }) {
        state.clientCompanyValid = item;
    },

    [GET_CLIENT_INN](state, { item }) {
        state.clientInn = item;
    },

    [EDIT_CLIENT](state, { item }) {
        const index = state.client.findIndex( i => i['id'] === item.id);
        state.client.splice(index, 1);
        state.client.splice(index, 0, item);
        state.viewClient = item;
    },

    [INSERT_CLIENT](state, { item }) {
        state.client.push(item);
    }




};