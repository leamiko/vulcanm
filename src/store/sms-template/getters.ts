import { GetterTree } from 'vuex';
import { StateSmsTemplate} from './types';

export const getters: GetterTree<StateSmsTemplate, any> = {
    smsTemplate: state => state.smsTemplate
};