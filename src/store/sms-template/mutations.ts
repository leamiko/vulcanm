import { MutationTree } from 'vuex';
import {
    GET_SMS_TEMPLATE,
    EDIT_SMS_TEMPLATE,
    StateSmsTemplate } from './types';

export const mutations: MutationTree<StateSmsTemplate> = {

    [GET_SMS_TEMPLATE](state, item) {
        state.smsTemplate = item;
    },

    [EDIT_SMS_TEMPLATE](state, item) {
        state.smsTemplate = item;
    }

};