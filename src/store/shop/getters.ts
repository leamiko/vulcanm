import { GetterTree } from 'vuex';
import { StateShop } from './types';

export const getters: GetterTree<StateShop, any> = {
    shop: state => state.shop,
    viewSell: state => state.viewSell,
    shopValid: state => state.shopValid, 
    shopPageCount: state => state.shopPageCount, 

    sellPart: state => state.sellPart,
    sellWork: state => state.sellWork,
    sellPartList: state => state.sellPartList,
    sellWorkList: state => state.sellWorkList,
    sellDataList: state => {
        const data: object[] = [...state.sellPartList, ...state.sellWorkList];
        return data.sort((a, b) => a['date'] > b['date'] ? 1 : -1);
    },
    sellPaymentList: state => state.sellPaymentList
};