import ServiceProvider from '../../api/providers/service';

import { ActionTree } from 'vuex';
import { StatePaymentList } from './types';

export const actions: ActionTree<StatePaymentList, any> = {

    getPaymentList({ commit }, page) {
        ServiceProvider.getPaymentList(page)
            .then( res => {
                commit('GET_PAYMENT_LIST', { item: res.data, pageCount: res.pageCount });
            })
            .catch( err => console.error(err));
    }
};