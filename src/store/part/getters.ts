import { GetterTree } from 'vuex';
import { StateParts} from './types';

export const getters: GetterTree<StateParts, any> = {
    parts: state => state.parts,
    viewPart: state => state.viewPart,
    vatlist: state => state.vatlist,
    warrantTypeList: state => state.warrantTypeList,
    rewardTypeList: state => state.rewardTypeList,
    partPageCount: state => state.partPageCount,
    partPageCurrent: state => state.partPageCurrent,
    partAmountControl: state => state.partAmountControl,

    barcode: state => state.barcode,
    barcodeList: state => state.barcodeList,
    validPart: state => state.validPart,

    logs: state => state.logs,
    logsPageCount: state => state.logsPageCount,

    heads: state => state.heads,

    headsPart: state => state.headPart,
    headNomenkl: state => state.headNomenkl,

    postingPartsList: state => state.parts.map( i => {
        return { 'id': i['id'], 'name': i['name'], 'part_id': i['id'], 'amount': 1, 'price': i['posting_price'] === null ? 0 : i['posting_price'] };
    }) 
};