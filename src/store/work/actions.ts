import WorkProvider from '../../api/providers/work';

import { ActionTree } from 'vuex';
import { StateWork } from './types';

export const actions: ActionTree<StateWork, any> = {

    getWorkList({ commit }, page) {
        WorkProvider.getWorkList(page)
            .then( res => {
                commit('GET_WORK', { item: res.data, pageCount: res.pageCount });
            })
            .catch( err => console.log(err));
    },

    getWorkSearchList({ commit }, item) {
        WorkProvider.getWorkSearchList(item.page, item, item['per-page'])
            .then( res => {
                commit('GET_WORK', { item: res.data, pageCount: res.pageCount });
            })
            .catch( err => console.log(err));
    }
};