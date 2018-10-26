import PartProvider from '../../api/providers/part';

import { ActionTree } from 'vuex';
import { StateParts } from './types';

export const actions: ActionTree<StateParts, any> = {

    getPartList({ commit }, item) {
        PartProvider.getPartList(item.page, item, item['per-page'])
            .then( res => commit('GET_PART', { 
                item: res.data, 
                pageCount: res.pageCount, 
                pageCurrent: res.pageCurrent,
                amountControl: res.amountControl 
            }))
            .catch( err => console.log(err));
    },

    getPartPage({ commit }, item) {
        PartProvider.getPartList(item.page, item, item['per-page'])
            .then( res => commit('GET_PART_PAGE', { 
                item: res.data, 
                pageCount: res.pageCount, 
                pageCurrent: res.pageCurrent,
                amountControl: res.amountControl 
            }))
            .catch( err => console.log(err));
    },

    getPartAmount({ commit }, item) {
        PartProvider.getPartAmount(item.page, item, item['per-page'])
            .then( res => commit('GET_PART', { 
                item: res.data, 
                pageCount: res.pageCount, 
                amountControl: res.amountControl 
            }))
            .catch( err => console.log(err));
    },

    getViewPart({ commit }, id) {
        PartProvider.getViewPart(id)
            .then( res => commit('GET_VIEW_PART', { item: res.data }))
            .catch( err => console.log(err));
    },
    
    getVatList({ commit }, item) {
        PartProvider.getVatList()
            .then( res => commit('GET_VATLIST', { item: res.data }))
            .catch( err => console.log(err));
    },

    getWarrantTypeList({ commit }, item) {
        PartProvider.getWarrantTypeList()
            .then( res => commit('GET_WARRANT_TYPE_LIST', { item: res.data }))
            .catch( err => console.log(err));
    },

    getRewardTypeList({ commit }, item) {
        PartProvider.getRewardTypeList()
            .then( res => commit('GET_REWARD_TYPE_LIST', { item: res.data }))
            .catch( err => console.log(err));
    },

    async getBarcode({ commit }, item) {
        try {
            let res = await PartProvider.getBarcode();
            return res;
        } catch (err) {
            commit('PUSH_CALL_ERROR', { title: 'Произошла ошибка', item: ''});
            throw err;
        }
    },

    async getPartLogList({ commit }, item) {
        PartProvider.getPartLogList(item)
            .then( res => commit('GET_LOGS', { 
                item: res.data, 
                pageCount: res.pageCount 
            }))
            .catch( err => console.log(err));
    },

    async sendPart({ commit }, item) {
        commit('BTN_LOADER', true);
        try {
            let res = await PartProvider.sendPart(item);
            commit('GET_VIEW_PART', { item: res.data });
            commit('PUSH_CALL_SUCCESS', { title: item.name + ' успешно добавлен', item: ''});
            commit('BTN_LOADER', false);
            return res;
        } catch (err) {
            commit('PUSH_CALL_ERROR', { title: 'Произошла ошибка', item: ''});
            commit('BTN_LOADER', false);
            throw err;
        }
    },

    async sendCopyPart({commit}, item) {  
        commit('BTN_LOADER', true);      
        try {
            let res = await PartProvider.sendCopyPart(item);
            commit('COPY_PART_ITEM', { item: res.data, index: item.index });
            commit('PUSH_CALL_SUCCESS', { title: 'Копия создана успешно', item: ''});
            commit('BTN_LOADER', false);
            return res;
        } catch (err) {
            commit('PUSH_CALL_ERROR', { title: 'Произошла ошибка', item: ''});
            commit('BTN_LOADER', false);
            throw err;
        }
    },

    sendPartImage({ commit }, item) {
        PartProvider.sendPartImage(item)
            .then( res => {
                commit('PUSH_CALL_SUCCESS', { title: 'Изображение успешно добавлено', item: ''});
            })
            .catch( err => {
                commit('PUSH_CALL_ERROR', { title: 'Ошибка добавления изображения', item: ''});
            });
    },

    sendBarcode({ commit }, item) {
        PartProvider.sendBarcode(item)
            .then( res => {
                commit('ADD_BARCODE_LIST', { item: res.data});
            })
            .catch( err => {
                let errorBarcode = { 
                    'part_id': item.part_id, 
                    'value': item.value, 
                    'text': err.response.data[0].message, 
                    'generation': item.generation 
                };
                commit('GET_VALID_PART', { valid: errorBarcode });
                commit('PUSH_CALL_ERROR', { title: 'Произошла ошибка', item: ''});                
            });
    },

    async changePart({ commit }, item) {
        commit('BTN_LOADER', true);
        try {
            let res = await PartProvider.changePart(item);
            commit('EDIT_PART', { item: res.data});
            commit('PUSH_CALL_SUCCESS', { title: item.name + ' успешно изменен', item: ''});
            commit('BTN_LOADER', false);
            return res;
        } catch (err) {
            commit('PUSH_CALL_ERROR', { title: 'Произошла ошибка', item: ''});
            commit('BTN_LOADER', false);   
            throw err;
        }
    },

    deleteBarcode({ commit }, id) {
        PartProvider.deleteBarcode(id)
            .then( res => {
                commit('DELETE_BARCODE', { item: res.data});
                commit('PUSH_CALL_SUCCESS', { title: 'Штрих-код успешно удален', item: ''});   
            })
            .catch( err => {
                commit('PUSH_CALL_ERROR', { title: 'Произошла ошибка', item: ''});                
            });
    },

    reloadHeadPart({ commit }, item) {
        commit('RELOAD_HEAD_PART', item);
    },
    
    reloadHeadNomenkl({ commit }, item) {
        commit('RELOAD_HEAD_NOMENKL', item);
    }
};