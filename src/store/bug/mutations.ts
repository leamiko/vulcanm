import { MutationTree } from 'vuex';
import {
    GET_BUG,
    EDIT_BUG,
    DELETE_BUG,
    INSERT_BUG,
    StateBug} from './types';

export const mutations: MutationTree<StateBug> = {

    [GET_BUG](state, { item }) {
        state.bug = item;
    },

    [INSERT_BUG](state, item) {
        state.bug.push(item);
    },

    [EDIT_BUG](state, item) {
        const index = state.bug.findIndex( (i) => i['id'] === item.id);
        state.bug[index]['label'] = item.label;
    },

    [DELETE_BUG](state, item) {
        const index = state.bug.indexOf(item);
        state.bug.splice(index, 1);
    }

};