import { GetterTree } from 'vuex';
import { StateCashTypes} from './types';

export const getters: GetterTree<StateCashTypes, any> = {
    cashTypeUser: state => state.cashTypeUser,
    cashTypeUserOn: state => state.cashTypeUser.filter(i => i['increase']),
    cashTypeUserOff: state => state.cashTypeUser.filter(i => !i['increase']),
    cashTypeDefault: state => state.cashTypeDefault,
    cashTypeValid: state => state.cashTypeValid,
    cashTypePageCount: state => state.cashTypePageCount,
};