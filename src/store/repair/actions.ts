import RepairProvider from '../../api/providers/repair';

import { ActionTree } from 'vuex';
import { StateRepair } from './types';

export const actions: ActionTree<StateRepair, any> = {

    getRepairList({ commit }, page) {
        RepairProvider.getRepairList(page)
            .then( res => commit('GET_REPAIR', { 
                item: res.data, 
                pageCount: res.pageCount
            }))
            .catch( err => console.log(err));
    },

    getRepairPage({ commit }, page) {
        RepairProvider.getRepairList(page)
            .then( res => commit('GET_REPAIR_PAGE', { 
                item: res.data, 
                pageCount: res.pageCount,
                pageCurrent: res.pageCurrent,
            }))
            .catch( err => console.log(err));
    },

    getViewRepair({ commit }, id) {
        RepairProvider.getViewRepair(id)
            .then( res => commit('GET_REPAIR_VIEW', { 
                item: res.data
            }))
            .catch( err => console.log(err));
    }

};