import { GetterTree } from 'vuex';
import { StatePaymentList } from './types';

export const getters: GetterTree<StatePaymentList, any> = {
    paymentList: state => state.paymentList,
    paymentListPageCount: state => state.paymentListPageCount
};