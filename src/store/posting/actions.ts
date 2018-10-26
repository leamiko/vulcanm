import PostingProvider from '../../api/providers/posting';

import { ActionTree } from 'vuex';
import { StatePosting } from './types';

export const actions: ActionTree<StatePosting, any> = {

    getPostingList({ commit }, page) {
        PostingProvider.getPostingList(page)
            .then( res => commit('GET_POSTING', {
                item: res.data,
                pageCount: res.pageCount
            }))
            .catch( err => console.log(err));  
    },

    getPostingView({ commit }, id) {
        PostingProvider.getPostingView(id)
            .then( res => commit('GET_POSTING_VIEW', { item: res.data }))
            .catch( err => console.log(err));  
    },

    sendPosting({ commit }, item) {
        commit('BTN_LOADER', true);
        PostingProvider.sendPosting(item)
            .then( res => {
                commit('GET_POSTING', { item: res.data });
                commit('POSTING_VALIDATION', {} );
                commit('PUSH_CALL_SUCCESS', { title: 'Принятие поступления прошло успешно', item: ''});
                commit('BTN_LOADER', false);
            })
            .catch( err => {
                commit('POSTING_VALIDATION', err.response.data.parts );
                commit('PUSH_CALL_ERROR', { title: 'Произошла ошибка', item: ''});
                commit('BTN_LOADER', false);
            });  
    },

    sendPostingPart({ commit }, item) {
        PostingProvider.sendPostingPart(item)
            .then( res => {
                commit('SEND_POSTING_ITEM', item);
                commit('PUSH_CALL_SUCCESS', { title: 'Товар добавлен в поступление', item: ''});
            })
            .catch( err => {
                commit('PUSH_CALL_ERROR', { title: 'Произошла ошибка', item: ''});
            });  
    },

    changePostingPart({ commit }, item) {
        PostingProvider.changePostingPart(item)
            .then( res => {
                commit('CHANGE_POSTING_PART', item);
                commit('PUSH_CALL_SUCCESS', { title: 'Товар в поступлении изменен', item: ''});
            })
            .catch( err => {
                commit('PUSH_CALL_ERROR', { title: 'Произошла ошибка', item: ''});
            });  
    },

    sendPostingItem({ commit }, item) {
        commit('SEND_POSTING_ITEM', item);
    },

    deletePostingItem({ commit }, item) {
        commit('DELETE_POSTING_ITEM', item);
    },

    deletePostingPartItem({ commit }, item) {
        commit('DELETE_POSTING_ITEM', item);
    },

    deletePostingModalPartItem({ commit }, item) {
        commit('DELETE_POSTING_PART_ITEM', item);
    }
};