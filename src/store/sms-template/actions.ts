import SmsProvider from '../../api/providers/sms';

import { ActionTree } from 'vuex';
import { StateSmsTemplate } from './types';

export const actions: ActionTree<StateSmsTemplate, any> = {

    getSmsTemplateList({ commit }, item) {
        SmsProvider.getSmsTemplateList()
            .then( res => commit('GET_SMS_TEMPLATE', res.data))
            .catch( err => console.log(err));
    },

    changeSmsTemplate({ commit }, item) {
        commit('BTN_LOADER', true);
        SmsProvider.changeSmsTemplate(item)
            .then( res => {
                commit('PUSH_CALL_SUCCESS', { title: 'Успешно изменено', item: ''});
                commit('BTN_LOADER', false);
            })
            .catch( err => {
                commit('PUSH_CALL_ERROR', { title: 'Произошла ошибка', item: ''});
                commit('BTN_LOADER', false);
            });
    }

};