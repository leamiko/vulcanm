import ServiceProvider from '../../api/providers/service';

import { ActionTree } from 'vuex';
import { StateLicenses } from './types';

export const actions: ActionTree<StateLicenses, any> = {

    getLicenseList({ commit }, page) {
        ServiceProvider.getLicenseList(page)
            .then( res => {
                commit('GET_LICENSE_LIST', { item: res.data, pageCount: res.pageCount });
            })
            .catch( err => console.error(err));
    }


};