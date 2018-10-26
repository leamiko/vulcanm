import SmsProvider from '../../api/providers/sms';

import { ActionTree } from 'vuex';
import { StateSms } from './types';

export const actions: ActionTree<StateSms, any> = {

    getSmsList({ commit }, page) {
        SmsProvider.getSmsList(page)
            .then( res => commit('GET_SMS', { 
                item: res.data,
                pageCount: res.pageCount,
            }))
            .catch( err => console.log(err));
    }

};