import axios from 'axios';
import { ActionTree } from 'vuex';
import {
    GET_BUG,
    EDIT_BUG,
    DELETE_BUG,
    INSERT_BUG,
    StateBug } from './types';

export const actions: ActionTree<StateBug, any> = {

    getBugList({ commit }, item) {
        commit('GET_BUG', item);

        // axios.get('http://sysapi-dev1.vulcanm.ru/v1/client/index')
        //     .then((res) => {
        //         commit('GET_CLIENT', { item: res.data });
        //         commit('PRELOADER_ACTIVE', { active: false });  // скрываем прелоадер при загрузке данных
        //     }), (err) => {
        //     console.log(err);
        // };
    },

    sendBug({ commit }, item) {
        commit('INSERT_BUG', item);
    },

    changeBug({ commit }, item) {
        commit('EDIT_BUG', item);
    },

    deleteBug({ commit }, item) {
        commit('DELETE_BUG', item);
    }

};