import CompanyProvider from '../../api/providers/company';

import { ActionTree } from 'vuex';
import { StateCompany } from './types';

export const actions: ActionTree<StateCompany, any> = {

    getCompanyInfo({ commit }, item) {
        CompanyProvider.getCompanyInfo()
            .then( res => {
                commit('GET_COMPANY', item);
            })
            .catch();
    },

    changeCompanyInfo({ commit }, item) {
        CompanyProvider.changeCompanyInfo(item)
            .then( res => {
                commit('EDIT_COMPANY', item);
            })
            .catch();
    }


};