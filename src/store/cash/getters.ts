import { GetterTree } from 'vuex';
import { StateCash} from './types';

export const getters: GetterTree<StateCash, any> = {
    cashList: state => state.cashList,
    cashListPageCount: state => state.cashListPageCount,
    cashValidate: state => state.cashValidate,
    cashView: state => state.cashView,
    cashOperationPageCount: state => state.cashOperationPageCount,
    cashOperationCountIn: state => state.cashOperationCountIn,
    cashOperationCountOut: state => state.cashOperationCountOut,
    cashOperationTotalIn: state => state.cashOperationTotalIn,
    cashOperationTotalOut: state => state.cashOperationTotalOut,
    cashViewDetail: state => state.cashViewDetail
};