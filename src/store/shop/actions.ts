import SellProvider from '../../api/providers/sell';

import { ActionTree } from 'vuex';
import { StateShop } from './types';

export const actions: ActionTree<StateShop, any> = {

    getSellList({ commit }, page) {
        SellProvider.getSellList(page)
            .then( res => commit('GET_SHOP', { 
                item: res.data, 
                pageCount: res.pageCount, 
            }))
            .catch(err => console.log(err));
    },

    getViewSell({ commit }, id) {
        SellProvider.getSellList(id)
            .then( res => commit('GET_SHOP', { item: res.data }))
            .catch(err => console.log(err));
    },

    sendSell({ commit }, item) {
        SellProvider.sendSell(item)
            .then( res => {
                commit('VIEW_SELL', { item: res.data });
                commit('PUSH_CALL_SUCCESS', { title: 'Создана продажа №' + res.data.id, item: ''});
            })
            .catch(err => {
                commit('PUSH_CALL_ERROR', { title: 'Произошла ошибка', item: ''});
            });
    },

    sendSellPart({ commit }, item) {
        SellProvider.sendSellPart(item)
            .then( res => {
                commit('ADD_SELL_PART', { item: res.data });
                commit('PUSH_CALL_SUCCESS', { title: 'Товар добавлен в продажу', item: ''});
            })
            .catch(err => {
                commit('PUSH_CALL_ERROR', { title: 'Произошла ошибка', item: ''});
            });
    },

    sendSellWork({ commit }, item) {
        SellProvider.sendSellWork(item)
            .then( res => {
                commit('ADD_SELL_WORK', { item: res.data });
                commit('PUSH_CALL_SUCCESS', { title: 'Услуга добавлена в продажу', item: ''});
            })
            .catch(err => {
                commit('PUSH_CALL_ERROR', { title: 'Произошла ошибка', item: ''});
            });
    },

    sendSellApply({ commit }, id) {
        commit('BTN_LOADER', true);
        SellProvider.sendSellApply(id)
            .then( res => {
                commit('VIEW_SELL', { item: res.data });
                commit('PUSH_CALL_SUCCESS', { title: 'Продажа успешно проведена', item: ''});
                commit('BTN_LOADER', false);
            })
            .catch(err => {
                commit('PUSH_CALL_ERROR', { title: 'Продажа не найдена или проведена', item: ''});
                commit('BTN_LOADER', false);
            });
    },

    sendSellPayment({ commit }, id) {
        commit('BTN_LOADER', true);
        SellProvider.sendSellPayment(id)
            .then( res => {
                commit('ADD_SELL_PAYMENT', { item: res.data });
                commit('PUSH_CALL_SUCCESS', { title: 'Оплата успешно добавлена', item: ''});
                commit('BTN_LOADER', false);
            })
            .catch(err => {
                commit('PUSH_CALL_ERROR', { title: 'Ошибка оплаты', item: ''});
                commit('BTN_LOADER', false);
            });
    },

    changSellPart({ commit }, item) {
        SellProvider.changSellPart(item.id, item)
            .then( res => {
                commit('UPDATE_SELL_PART', { item: res.data });
                commit('PUSH_CALL_SUCCESS', { title: 'Товар обновлен', item: ''});
            })
            .catch(err => {
                commit('PUSH_CALL_ERROR', { title: 'Произошла ошибка', item: ''});
            });
    },

    deleteSell({ commit }, item) {
        SellProvider.deleteSell(item.id, item)
            .then( res => {
                console.log(res.data );
                commit('PUSH_CALL_SUCCESS', { title: 'Продажа удалена', item: ''});
            })
            .catch(err => {
                commit('PUSH_CALL_ERROR', { title: 'Продажа не найдена или проведена', item: ''});
            });
    },

    deleteSellPart({ commit }, id) {
        SellProvider.deleteSellPart(id)
            .then( res => {
                commit('DEL_SELL_PART', { item: res.data });
                commit('PUSH_CALL_SUCCESS', { title: 'Товар удален из продажи', item: ''});
            })
            .catch(err => {
                commit('PUSH_CALL_ERROR', { title: 'Произошла ошибка', item: ''});
            });
    },

    deleteSellWork({ commit }, id) {
        SellProvider.deleteSellWork(id)
            .then( res => {
                commit('DEL_SELL_WORK', { item: res.data });
                commit('PUSH_CALL_SUCCESS', { title: 'Услуга удалена из продажи', item: ''});
            })
            .catch(err => {
                commit('PUSH_CALL_ERROR', { title: 'Произошла ошибка', item: ''});
            });
    }
};



