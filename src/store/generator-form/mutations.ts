import { MutationTree } from 'vuex';
import {
    GET_FORM,
    INSERT_FORM,
    INSERT_POSITION,
    DELETE_POSITION,
    StateForm
} from './types';

export const mutations: MutationTree<StateForm> = {

    [GET_FORM](state, { item }) {
        state.form = item;
    },

    [INSERT_FORM](state, { item }) {
        item['id'] = state.form.length + 1000;
        state.form.push(item);

        state.newForm = {
            'id': null,
            'label': null,
            'type': null,
            'required': false
        };
    },

    [INSERT_POSITION](state, { index, item, colNum }) {
        if (colNum > 0) {
            state.positionForm['' + colNum].splice(index, 0, item.id);
        }
    },

    [DELETE_POSITION](state, { index, colNum }) {
        state.positionForm['' + colNum].splice(index, 1);
    }
};