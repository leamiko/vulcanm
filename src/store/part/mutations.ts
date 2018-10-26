import { MutationTree } from 'vuex';
import {
    GET_PART,
    GET_PART_PAGE,
    GET_VIEW_PART,
    GET_VATLIST,
    GET_WARRANT_TYPE_LIST,
    GET_REWARD_TYPE_LIST,
    GET_GENERATION_BARCODE,
    GET_VALID_PART,
    GET_LOGS,
    GET_HEAD_PART,
    ADD_BARCODE_LIST,
    EDIT_PART,
    ADD_PART,
    COPY_PART_ITEM,
    EDIT_CHECK_COLUMN,
    EDIT_CHECK_PRICE_COLUMN,
    EDIT_CHECK_STORE_COLUMN,
    DELETE_CATALOG_ITEM,
    DELETE_BARCODE,
    CLEAR_LIST,
    RELOAD_HEAD_PART,
    RELOAD_HEAD_NOMENKL,
    StateParts } from './types';

export const mutations: MutationTree<StateParts> = {
    [GET_PART](state, { item, pageCount, pageCurrent, amountControl }) {
        state.parts = item;
        state.partPageCount = pageCount;
        state.partPageCurrent = pageCurrent;
        state.partAmountControl = amountControl;

        let localStor = JSON.parse(localStorage.getItem('headNomenkl'));
        if (localStor) state.headNomenkl = localStor;
        
    },

    [GET_PART_PAGE](state, { item, pageCount, pageCurrent, amountControl }) {
        state.parts = state.parts.concat(item);
        state.partPageCount = pageCount;
        state.partPageCurrent = pageCurrent;
        state.partAmountControl = amountControl;
    },

    [GET_VIEW_PART](state, { item }) {
        state.viewPart = item;
    },

    [GET_VATLIST](state, { item }) {
        let vatlist = [];
        for (let i in item) { 
            vatlist[Number(i) - 1] = { id: Number(i), name: item[i] } ;
        }
        state.vatlist = vatlist;
    },

    [GET_WARRANT_TYPE_LIST](state, { item }) {
        let warrantTypeList = [];
        for (let i in item) { 
            warrantTypeList[Number(i) - 1] = { id: Number(i), name: item[i] } ;
        }
        state.warrantTypeList = warrantTypeList;
    },

    [GET_REWARD_TYPE_LIST](state, { item }) {
        let rewardTypeList = [];
        for (let i in item) { 
            rewardTypeList[Number(i) - 1] = { id: Number(i), name: item[i] } ;
        }
        state.rewardTypeList = rewardTypeList;
    },

    [GET_GENERATION_BARCODE](state, { item }) {
        state.barcode = item;
    },

    [ADD_BARCODE_LIST](state, { item }) {
        state.barcodeList.push(item);
    },

    [GET_VALID_PART](state, { valid }) {
        state.validPart = valid;
    },

    [EDIT_PART](state, { item }) {
        const index = state.parts.findIndex(i => i['id'] === item.id);
        state.parts.splice(index, 1);
        state.parts.splice(index, 0, item);
    },

    [DELETE_CATALOG_ITEM](state, index) {
        state.catalogs.splice(index, 1);
    },

    [COPY_PART_ITEM](state, { item, index }) {
        state.parts.splice(index + 1, 0, item);
    },

    [CLEAR_LIST](state, index) {
        state.barcodeList = [];
        state.validPart = [];
    },

    [GET_LOGS](state, { item, pageCount }) {
        state.logs = item;
        state.logsPageCount = pageCount;
    },

    [GET_HEAD_PART](state, { storage }) {

        function genHead(stor, local) {
            if (stor.length > local.length) {
                let addArrItems = stor.filter(i => local.map(i => i.storage_id).indexOf(i.id) < 0);
                addArrItems.forEach( (item, i, b) => {
                    local.push(
                        { 'storage_id': item.id, 'name': item.name, 'active': true }
                    ); 
                });
            } else {
                let delArrItems = local.filter(i => stor.map(i => i.id).indexOf(i.storage_id) < 0);
                if (delArrItems.length) {
                    delArrItems.forEach( (item, i, b) => {
                        let indx = local.indexOf(item);
                        local.splice(indx, 1);
                    });
                    genHead(storage, localStor['amounts']);
                }
            }
        }

        let localStor = JSON.parse(localStorage.getItem('headPart'));

        if (localStor) {
            genHead(storage, localStor['amounts']);
            state.headPart = localStor;
        } else {
            let arr = [];
            storage.forEach( (item, i, storage) => { 
                arr.push(
                    { 'storage_id': item.id, 'name': item.name, 'active': true }
                );
            });
            state.headPart['amounts'] = arr;
        }       
    },

    [DELETE_BARCODE]( state, { item }) {
        const index = state.viewPart['barcodes'].findIndex( i => i['id'] === item.id);
        state.viewPart['barcodes'].splice(index, 1);
    },

    [RELOAD_HEAD_PART]( state, head) {
        localStorage.setItem('headPart', JSON.stringify(head));
        state.headPart = head;
    },

    [RELOAD_HEAD_NOMENKL]( state, head) {
        localStorage.setItem('headNomenkl', JSON.stringify(head));
        state.headNomenkl = head;
    }
};
