import { GetterTree } from 'vuex';
import { StateSms} from './types';

export const getters: GetterTree<StateSms, any> = {
    sms: state => state.sms,
    smsPageCurrent: state => state.smsPageCurrent,
    smsPageCount: state => state.smsPageCount
};