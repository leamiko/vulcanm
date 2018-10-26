import { GetterTree } from 'vuex';
import { StatePush} from './types';

export const getters: GetterTree<StatePush, any> = {
    error: state => state.error,
    success: state => state.success,
    warning: state => state.warning,
    info: state => state.info
};