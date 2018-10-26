import { MutationTree } from 'vuex';
import {
    GET_STORAGE,
    GET_VALID_STORAGE,
    EDIT_STORAGE,
    DELETE_STORAGE,
    INSERT_STORAGE,
    StateStorage} from './types';

export const mutations: MutationTree<StateStorage> = {

    [GET_STORAGE](state, { item, pageCount, pageCurrent }) {
        state.storages = item;
        state.pageStorCount = pageCount;
        state.pageStorCurrent = pageCurrent;
    },

    [GET_VALID_STORAGE](state, { item }) {
        state.validStorage = item;
    },

    [INSERT_STORAGE](state, { item }) {
        state.storages.push(item);
    },

    [EDIT_STORAGE](state, { item }) {
        const index = state.storages.findIndex( (i) => i['id'] === item.id);
        state.storages.splice(index, 1);
        state.storages.splice(index, 0, item);
    },

    [DELETE_STORAGE](state, { item }) {
        const index = state.storages.findIndex( (i) => i['id'] === item.id);      
        state.storages.splice(index, 1);
    }

};