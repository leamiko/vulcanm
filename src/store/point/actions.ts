import PointProvider from '../../api/providers/point';

import { ActionTree } from 'vuex';
import { StatePoint } from './types';

export const actions: ActionTree<StatePoint, any> = {

    getPointList({ commit }, page) {
        PointProvider.getPointList(page)
            .then( res => commit('GET_POINT', { 
                item: res.data, 
                pageCount: res.pageCount
            }))
            .catch( err => console.log(err));
    },

    getViewPoint({ commit }, id) {
        PointProvider.getViewPoint(id)
            .then( res => commit('GET_VIEW_POINT', { item: res.data }))
            .catch( err => console.log(err));
    },

    sendPoint({ commit }, item) {
        commit('BTN_LOADER', true);
        PointProvider.sendPoint(item)
            .then( res => {
                commit('INSERT_POINT', { item: res.data });
                commit('GET_VALID_POINT', { valid: [] });
                commit('PUSH_CALL_SUCCESS', { title: item.name + ' успешно добавлен', item: ''});
                commit('BTN_LOADER', false);
            })
            .catch( err => {
                commit('GET_VALID_POINT', { valid: err.response.data });
                commit('PUSH_CALL_ERROR', { title: 'Произошла ошибка', item: ''});
                commit('BTN_LOADER', false);
            });
    },

    changePoint({ commit }, item) {
        commit('BTN_LOADER', true);
        PointProvider.changePoint(item.id, item)
            .then( res => {
                commit('EDIT_POINT', { item: res.data });
                commit('GET_VALID_POINT', { valid: [] });
                commit('PUSH_CALL_SUCCESS', { title: item.name + ' успешно изменен', item: ''});
                commit('BTN_LOADER', false);
            })
            .catch( err => {
                commit('GET_VALID_POINT', { valid: err.response.data });
                commit('PUSH_CALL_ERROR', { title: 'Произошла ошибка', item: ''});
                commit('BTN_LOADER', false);
            });
    },

    deletePoint({ commit }, id) {
        commit('BTN_LOADER', true);
        PointProvider.deletePoint(id)
            .then( res => {
                commit('DELETE_POINT', { item: res.data });
                commit('PUSH_CALL_SUCCESS', { title: 'Успешно удалено', item: ''});
                commit('BTN_LOADER', false);
            })
            .catch( err => {
                commit('PUSH_CALL_ERROR', { title: 'Произошла ошибка', item: ''});
                commit('BTN_LOADER', false);
            });
    }
};