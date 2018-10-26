import { MutationTree } from 'vuex';
import {
    GET_SHOP,
    VIEW_SELL,
    SHOP_VALIDATION,
    ADD_SELL_PART,
    ADD_SELL_WORK,
    ADD_SELL_PAYMENT,
    UPDATE_SELL_PART,
    DEL_SELL_PART,
    DEL_SELL_WORK,
    StateShop } from './types';


const transformItem = (item, key) => {
    return { 
        ['id']: item.id, 
        [key + '_id']: item[key].id, 
        'name': item[key].name, 
        'amount': 1, 
        'remain': item['amount'],
        'price': item['price'],
        'date': item['created_at'],
        'storage_id': item['storage_id'], 
        'seller_id': item['seller_id'], 
        'serial': item['serial'], 
        'vat': item[key].vat 
    };
};

const transformList = (arr, key) => {
    return arr.map( i => transformItem(i, key));
};


export const mutations: MutationTree<StateShop> = {
    [GET_SHOP](state, { item, pageCurrent, pageCount }) {
        state.shop = item;
        state.shopPageCurrent = pageCurrent;
        state.shopPageCount = pageCount;
    },

    [SHOP_VALIDATION](state, item) {
        state.shopValid = item;
    },

    [VIEW_SELL](state, { item }) {
        state.viewSell = item;
        state.sellPartList = transformList(item.parts, 'part');
        state.sellWorkList = transformList(item.works, 'work');
        state.sellPaymentList = item.payments;
        state.sellDiscountList = item.discounts;
    },

    [ADD_SELL_PART](state, { item }) {
        const newItem = transformItem(item , 'part');
        state.sellPartList.push(newItem);
    },

    [ADD_SELL_WORK](state, { item }) {
        const newItem = transformItem(item , 'work');
        state.sellWorkList.push(newItem);
    },

    [ADD_SELL_PAYMENT](state, { item }) {
        state.sellPaymentList.push(item);
    },

    [UPDATE_SELL_PART](state, { item }) {
        const index = state.sellPartList.findIndex( i => i['id'] === item.id);
        state.sellPartList[index] = transformItem(item , 'part');
    },

    [DEL_SELL_PART](state, { item }) {
        const index = state.sellPartList.findIndex( i => i['id'] === item.id);
        state.sellPartList.splice(index, 1);
    },

    [DEL_SELL_WORK](state, { item }) {
        const index = state.sellWorkList.findIndex( i => i['id'] === item.id);
        state.sellWorkList.splice(index, 1);
    },
};




