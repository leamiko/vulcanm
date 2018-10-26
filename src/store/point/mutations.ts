import { MutationTree } from 'vuex';
import {
    GET_POINT,
    GET_VIEW_POINT,
    GET_VALID_POINT,
    EDIT_POINT,
    INSERT_POINT,
    DELETE_POINT,
    StatePoint } from './types';

export const mutations: MutationTree<StatePoint> = {

    [GET_POINT](state, { item, pageCount, pageCurrent }) {
        state.point = item;
        state.pointPageCount = pageCount;
        state.pointPageCurrent = pageCurrent;
    },

    [GET_VIEW_POINT](state, { item }) {
        state.viewPoint = item;
    },

    [GET_VALID_POINT](state, {valid}) {
        state.validPoint = valid;
    },

    [INSERT_POINT](state, item) {
        state.point.push(item.item);
    },

    [EDIT_POINT](state, item ) {
        let index = state.point.indexOf(
            state.point.find( i => i['id'] === item.id)
        );
        state.point.splice(index, 1);
        state.point.splice(index, 0, item);
    },

    [DELETE_POINT](state, item) {
        let index = state.point.findIndex( i => i['id'] === item.id);
        state.point.splice(index, 1);
    }
};