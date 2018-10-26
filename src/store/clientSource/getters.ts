import { GetterTree } from 'vuex';
import { StateClientSource} from './types';

export const getters: GetterTree<StateClientSource, any> = {

    clientSource: state => state.clientSource,
    clientSourceValid: state => state.clientSourceValid,
    clientSourcePageCount: state => state.clientSourcePageCount,


};