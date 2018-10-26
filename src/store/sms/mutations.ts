import { MutationTree } from 'vuex';
import {
    GET_SMS,
    StateSms } from './types';

export const mutations: MutationTree<StateSms> = {

    [GET_SMS](state, { item, pageCount, pageCurrent }) {
        state.sms = item;
        state.smsPageCount = pageCount;
        state.smsPageCurrent = pageCurrent;
    }

};