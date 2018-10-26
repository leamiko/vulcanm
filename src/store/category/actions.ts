import CategoryProvider from '../../api/providers/category';

import { ActionTree } from 'vuex';
import { StateCategory, GET_CATEGORY } from './types';

export const actions: ActionTree<StateCategory, any> = {


    async getPartCategory({ commit }) {
        try {
            let cats = await CategoryProvider.getPartCategory();
            commit(GET_CATEGORY, {item: cats.data});
            return cats.data;
        } catch (err) {
            throw err;
        }
    },

    getWorkCategory({ commit }) {
        CategoryProvider.getWorkCategory()
            .then( res => {
                commit('GET_CATEGORY', { item: res.data });
            })
            .catch( err => console.log(err));
    },

    sendPartCategory( { commit }, item ) {
        commit('BTN_LOADER', true );
        CategoryProvider.sendPartCategory(item)
            .then( res => {
                commit('GET_CATEGORY', { item: res.data });
                commit('PUSH_CALL_SUCCESS', { title: 'Успешно добавлено ', item: '' });
                commit('BTN_LOADER', false );
            })
            .catch( err => {
                commit('PUSH_CALL_ERROR', { title: 'Произошла ошибка', item: '' });
                commit('BTN_LOADER', false );
            });
    },

    sendWorkCategory( { commit }, item ) {
        commit('BTN_LOADER', true );
        CategoryProvider.sendWorkCategory(item)
            .then( res => {
                commit('GET_CATEGORY', { item: res.data });
                commit('PUSH_CALL_SUCCESS', { title: 'Успешно добавлено ', item: '' });
                commit('BTN_LOADER', false );
            })
            .catch( err => {
                commit('PUSH_CALL_ERROR', { title: 'Произошла ошибка', item: '' });
                commit('BTN_LOADER', false );
            });
    },

    changePartCategory( { commit }, item ) {
        commit('BTN_LOADER', true );
        CategoryProvider.changePartCategory(item)
            .then( res => {
                commit('GET_CATEGORY', { item: res.data });
                commit('PUSH_CALL_SUCCESS', { title: 'Успешно изменено', item: '' });
                commit('BTN_LOADER', false );
            })
            .catch( err => {
                commit('PUSH_CALL_ERROR', { title: 'Произошла ошибка', item: '' });
                commit('BTN_LOADER', false );
            });
    },

    changeWorkCategory( { commit }, item ) {
        commit('BTN_LOADER', true );
        CategoryProvider.changeWorkCategory(item)
            .then( res => {
                commit('GET_CATEGORY', { item: res.data });
                commit('PUSH_CALL_SUCCESS', { title: 'Успешно изменено', item: '' });
                commit('BTN_LOADER', false );
            })
            .catch( err => {
                commit('PUSH_CALL_ERROR', { title: 'Произошла ошибка', item: '' });
                commit('BTN_LOADER', false );
            });
    },

    deletePartCategory( { commit }, id ) {
        commit('BTN_LOADER', true );
        CategoryProvider.deletePartCategory(id)
            .then( res => {
                commit('GET_CATEGORY', { item: res.data });
                commit('PUSH_CALL_SUCCESS', { title: 'Успешно удалено', item: '' });
                commit('BTN_LOADER', false );
            })
            .catch( err => {
                commit('PUSH_CALL_ERROR', { title: 'Произошла ошибка', item: '' });
                commit('BTN_LOADER', false );
            });
    },

    deleteWorkCategory( { commit }, id ) {
        commit('BTN_LOADER', true );
        CategoryProvider.deleteWorkCategory(id)
            .then( res => {
                commit('GET_CATEGORY', { item: res.data });
                commit('PUSH_CALL_SUCCESS', { title: 'Успешно удалено', item: '' });
                commit('BTN_LOADER', false );
            })
            .catch( err => {
                commit('PUSH_CALL_ERROR', { title: 'Произошла ошибка', item: '' });
                commit('BTN_LOADER', false );
            });
    }

};