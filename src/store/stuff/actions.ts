import StuffProvider from '../../api/providers/stuff';

import {
    GET_SALARY_PERIOD_TYPE_LIST,
    GET_SELL_PART_SALARY_TYPE_LIST,
    GET_REPAIR_PART_SALARY_TYPE,
} from './types';

import { ActionTree } from 'vuex';
import { StateStuff } from './types';

export const actions: ActionTree<StateStuff, any> = {

    getStuffList({ commit }, page) {
        StuffProvider.getStuffList(page)
            .then( res => commit('GET_STUFF', { 
                item: res.data, 
                pageCount: res.pageCount
            }))
            .catch( err => console.log(err));
    },

    getViewStuff({ commit }, id) {
        StuffProvider.getViewStuff(id)
            .then( res => commit('GET_VIEW_STUFF', { item: res.data }))
            .catch( err => console.log(err));
    },

    sendStuff({ commit }, item) {
        commit('BTN_LOADER', true);
        StuffProvider.sendStuff(item)
            .then( res => {
                commit('INSERT_STORAGE', { item: res.data });
                commit('GET_VALID_STUFF', { item: {} });
                commit('PUSH_CALL_SUCCESS', { title: 'Успешно добавлено', item: ''});
                commit('BTN_LOADER', false);
            })
            .catch( err => {
                commit('GET_VALID_STUFF', { item: err.response.data });
                commit('PUSH_CALL_ERROR', { title: 'Произошла ошибка', item: ''});
                commit('BTN_LOADER', false);
            });
    },

    changeStuff({ commit }, item) {
        commit('BTN_LOADER', true);
        StuffProvider.changeStuff(item.id, item)
            .then( res => {
                commit('EDIT_STUFF', { item: res.data });
                commit('GET_VALID_STUFF', { item: {} });
                commit('PUSH_CALL_SUCCESS', { title: 'Успешно изменено', item: ''});
                commit('BTN_LOADER', false);
            })
            .catch( err => {
                commit('GET_VALID_STUFF', { item: err.response.data });
                commit('PUSH_CALL_ERROR', { title: 'Произошла ошибка', item: ''});
                commit('BTN_LOADER', false);
            });
    },

    deleteStuff({ commit }, id) {
        StuffProvider.deleteStuff(id)
            .then( res => {
                commit('DELETE_STUFF', { item: res.data });
                commit('PUSH_CALL_SUCCESS', { title: 'Успешно удалено', item: ''});
            })
            .catch( err => {
                commit('PUSH_CALL_ERROR', { title: 'Произошла ошибка', item: ''});
            });
    },
    
    getSalaryPeriodTypeList({commit}, item) {
        StuffProvider.getSalaryPeriodTypeList()
            .then(res => commit(GET_SALARY_PERIOD_TYPE_LIST, {item: res.data}))
            .catch(err => console.log(err));
    },
    
    getSellPartSalaryTypeList({commit}, item) {
        StuffProvider.getSellPartSalaryTypeList()
            .then(res => commit(GET_SELL_PART_SALARY_TYPE_LIST, {item: res.data}))
            .catch(err => console.log(err));
    },
    
    getRepairPartSalaryType({commit}, item) {
        StuffProvider.getRepairPartSalaryType()
            .then(res => commit(GET_REPAIR_PART_SALARY_TYPE, {item: res.data}))
            .catch(err => console.log(err));
    },

};