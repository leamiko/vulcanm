import { MutationTree } from 'vuex';
import {
    GET_PAYMENT_LIST,
    StatePaymentList } from './types';

export const mutations: MutationTree<StatePaymentList> = {

    [GET_PAYMENT_LIST](state, { item, pageCount }) {
        state.paymentList = item;
        state.paymentListPageCount = pageCount;
    }

};