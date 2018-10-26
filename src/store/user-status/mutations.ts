import { MutationTree } from 'vuex';
import {
    GET_USER_STATUS,
    GET_VALID_USER_STATUS,
    EDIT_USER_STATUS,
    DELETE_USER_STATUS,
    INSERT_USER_STATUS,
    EDIT_REPAIRS_SETTING,
    StateUserStatus } from './types';

export const mutations: MutationTree<StateUserStatus> = {

    [GET_USER_STATUS](state, { item, pageCount }) {
        state.userStatus = item;
        state.userStatusPageCount = pageCount;
    },

    [GET_VALID_USER_STATUS](state, { item }) {
        state.validStatus = item;
    },

    [INSERT_USER_STATUS](state, { item }) {
        state.userStatus.push(item);
    },

    [EDIT_USER_STATUS](state, { item }) {
        const index = state.userStatus.findIndex( (i) => i['id'] === item.id);
        state.userStatus.splice(index, 1);
        state.userStatus.splice(index, 0, item);
    },

    [DELETE_USER_STATUS](state, { item }) {
        const index = state.userStatus.findIndex( (i) => i['id'] === item.id);      
        state.userStatus.splice(index, 1);
    },

    [EDIT_REPAIRS_SETTING](state, item) {
        state.repairsSetting = item;
    },

};